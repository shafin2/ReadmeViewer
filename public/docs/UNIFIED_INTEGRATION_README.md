# Unified Integration System - Complete Guide

## 📚 **Table of Contents**
1. [File Structure](#file-structure)
2. [Why HubSpot Client but No Mailchimp Client?](#why-hubspot-client-but-no-mailchimp-client)
3. [How Each File Works](#how-each-file-works)
4. [Push Back System Explained](#push-back-system-explained)
5. [Complete Flow Example](#complete-flow-example)

---

## 📁 **File Structure**

### **Core Files:**
```
app/
├── models/
│   └── integration.rb                          # Main Integration model (HubSpot & Mailchimp)
│
├── controllers/concerns/
│   ├── integrations_concern.rb                 # Index, disconnect, switch integration
│   ├── integrations_oauth_concern.rb           # OAuth flow (connect, callback)
│   ├── integrations_validation_concern.rb      # Validate lists, create documents
│   └── integrations_lists_concern.rb           # Fetch lists, toggle auto-validate
│
├── services/
│   └── integration_providers/                  # Provider business logic
│       ├── base_provider.rb                    # Base class for all providers
│       ├── hubspot_provider.rb                 # HubSpot-specific logic
│       └── mailchimp_provider.rb               # Mailchimp-specific logic
│
├── clients/                                    # API clients (endpoints at top!)
│   ├── hubspot_client.rb                       # HubSpot API client - all endpoints at top
│   └── mailchimp_client.rb                     # Mailchimp API client - all endpoints at top
│
├── jobs/
│   └── integration_push_results_job.rb         # Pushes results back after validation
│
├── sidekiq/
│   └── integration_auto_validate_worker.rb     # Auto-validates new contacts via webhooks
│
├── views/integrations/
│   ├── index.html.erb                          # Default page (no integrations)
│   ├── show.html.erb                           # Connected integrations page
│   └── _add_integration_modal.html.erb         # Modal to add integrations
│
└── helpers/
    └── integrations_helper.rb                  # Helper for integration list

config/
├── routes.rb                                   # Integration routes
└── application.rb                              # Autoloads app/clients directory

db/migrate/
└── 20251019120000_create_integrations.rb      # Integration table migration
```

---

## 🏗️ **Folder Structure Philosophy**

### **Separation of Concerns:**

**`app/services/integration_providers/`** - Business Logic
- Contains provider-specific business logic
- Orchestrates API calls via clients
- Handles data transformation and validation
- Implements provider-specific features (webhooks, tags, etc.)

**`app/clients/`** - API Communication
- Pure API clients with endpoints defined at the top
- All endpoints centralized for easy maintenance
- Version changes? Update endpoints at the top of the file
- No business logic, just API communication

### **Endpoint Management Best Practice:**
```ruby
# ✅ GOOD: All endpoints at top of client file
class HubspotClient
  # OAuth Endpoints
  AUTH_URL = 'https://app.hubspot.com/oauth/authorize'
  TOKEN_URL = 'https://api.hubapi.com/oauth/v1/token'
  
  # API Endpoints
  ACCOUNT_INFO_ENDPOINT = 'https://api.hubapi.com/account-info/v3/details'
  LISTS_ENDPOINT = 'https://api.hubapi.com/contacts/v1/lists'
  # ... all endpoints here
end

# ❌ BAD: Endpoints scattered throughout methods
def account_info
  get('https://api.hubapi.com/account-info/v3/details')  # Hard to find!
end
```

---

## 🤔 **Client Architecture**

### **HubSpot Client** 🏢

**File:** `app/clients/hubspot_client.rb` (700+ lines)

**Why we need it:**
```ruby
# HubSpot API is COMPLEX:

1. Token Refresh Logic:
   - Access tokens expire every 30 minutes
   - Need automatic refresh with refresh_token
   - Must update database with new tokens

2. Contact-Centric Architecture:
   - Contacts exist independently of lists
   - Must search contacts by email first
   - Then update contact properties
   - Updates reflect in ALL lists automatically

3. Batch Operations:
   - Search: POST /crm/v3/objects/contacts/search (batch search)
   - Update: POST /crm/v3/objects/contacts/batch/update (batch update)
   - Complex request/response structures

4. Pagination with Cursors:
   - Uses "after" cursor instead of offset
   - Must handle cursor-based pagination
   - Different from standard pagination

5. List Management:
   - Lists are filters, not containers
   - Must check list membership
   - Complex filtering logic
```

**HubSpot Client handles:**
- ✅ Automatic token refresh
- ✅ Complex search queries
- ✅ Batch contact updates
- ✅ Cursor-based pagination
- ✅ Error handling & retries
- ✅ Rate limiting (150 req/10s)

### **Mailchimp: Simple API = Simple Client** 📧

**File:** `app/clients/mailchimp_client.rb` (150 lines)

**Why we DON'T need a complex client:**
```ruby
# Mailchimp API is SIMPLE:

1. No Token Refresh:
   - Access token never expires
   - One-time OAuth, permanent token
   - No refresh logic needed

2. List-Centric Architecture:
   - Members belong to specific lists
   - Direct member updates
   - Simple PUT requests

3. Simple Operations:
   - Get lists: GET /lists
   - Get members: GET /lists/{id}/members
   - Update member: PUT /lists/{id}/members/{hash}
   - Batch operations: POST /batches

4. Standard Pagination:
   - Simple offset-based pagination
   - ?count=1000&offset=0
   - Easy to implement

5. Simple List Management:
   - Lists are actual containers
   - Members belong to lists
   - Straightforward updates
```

**Mailchimp Client is simple:**
- ✅ Simple REST API calls
- ✅ No token management needed
- ✅ Direct member updates
- ✅ Standard pagination
- ✅ Basic error handling

### **Summary:**
```
HubSpot: Complex → Needs dedicated Client class
Mailchimp: Simple → Simple Client class is enough
```

---

## 📋 **How Each File Works**

### **1. Integration Model** (`app/models/integration.rb`)

**Purpose:** Central model for all integrations (HubSpot & Mailchimp)

```ruby
# What it stores:
class Integration < ApplicationRecord
  # Provider info
  provider: 'hubspot' or 'mailchimp'
  provider_account_id: '12345678'
  account_name: 'My Company Account'
  
  # OAuth tokens
  access_token: 'encrypted_token'
  refresh_token: 'refresh_token' (HubSpot only)
  token_expires_at: timestamp (HubSpot only)
  
  # Settings & timestamps
  settings: { lists: { 'list_123': { auto_validate: true } } }
  connected_at: timestamp
  deleted_at: timestamp (soft delete)
end

# Key methods:
integration.provider_service  # Returns HubspotProvider or MailchimpProvider
integration.connected?        # Check if integration is active
integration.disconnect!       # Soft delete integration
integration.list_auto_validate?(list_id)  # Check if auto-validate enabled
```

---

### **2. Controllers**

#### **A. IntegrationsConcern** (`app/controllers/concerns/integrations_concern.rb`)

**Purpose:** Main controller actions

```ruby
# Actions:
index:
  - Checks if company has connected integrations
  - If YES: Renders show.html.erb (connected view)
  - If NO: Renders index.html.erb (default page)

disconnect:
  - Soft deletes integration (sets deleted_at)
  - Clears session
  - Redirects to /integrations

switch_integration:
  - Updates session[:active_integration_id]
  - Returns JSON success
  - JavaScript reloads page
```

#### **B. IntegrationsOauthConcern** (`app/controllers/concerns/integrations_oauth_concern.rb`)

**Purpose:** OAuth connection flow

```ruby
# Flow:
connect:
  1. User clicks "Connect HubSpot"
  2. Create pending integration (provider_account_id: 'pending')
  3. Redirect to provider OAuth page

callback:
  1. Provider redirects back with code
  2. Exchange code for access_token
  3. Fetch account info (account_id, account_name)
  4. Update integration with tokens
  5. Redirect to /integrations (shows connected view)
```

#### **C. IntegrationsValidationConcern** (`app/controllers/concerns/integrations_validation_concern.rb`)

**Purpose:** Validate selected lists

```ruby
# Flow:
validate:
  1. Parse selected lists from params
  2. Fetch contacts in batches of 1000
  3. Extract unique emails
  4. Consume credits (1 per email)
  5. Create multiple documents (max 1000 emails each)
  6. Schedule FileProcessingWorker for each document
  7. Redirect to bulk validation page

# Example: 2500 emails
- Fetch: 3 batches (1000 + 1000 + 500)
- Create: 3 documents (1000 + 1000 + 500)
- Process: 3 independent workers
```

#### **D. IntegrationsListsConcern** (`app/controllers/concerns/integrations_lists_concern.rb`)

**Purpose:** Manage lists

```ruby
# Actions:
lists:
  - Fetches all lists from provider
  - Returns JSON: { lists: [], list_settings: {} }

toggle_auto_validate:
  - Enable/disable auto-validation for a list
  - For Mailchimp: Creates/deletes webhooks
  - For HubSpot: Just updates settings (webhooks separate)
```

---

### **3. Provider Services**

#### **A. BaseProvider** (`app/services/integration_providers/base_provider.rb`)

**Purpose:** Base class with common logic

```ruby
class BaseProvider
  def initialize(integration)
    @integration = integration
  end
  
  # Common methods:
  def fetch_contacts(list_id, options = {})
    # Subclass implements
  end
  
  def fetch_lists
    # Subclass implements
  end
  
  # Helpers:
  def access_token
    @integration.access_token
  end
  
  def settings
    @integration.settings
  end
end
```

#### **B. HubspotProvider** (`app/services/integration_providers/hubspot_provider.rb`)

**Purpose:** HubSpot-specific implementation

```ruby
class HubspotProvider < BaseProvider
  # Uses HubspotClient for API calls
  
  def fetch_lists
    lists = client.lists
    total_contacts = client.total_contacts
    
    # Add "All Contacts" option
    [{ id: 'all', name: 'All Contacts', contact_count: total_contacts }] + lists
  end
  
  def fetch_contacts_batch(list_id, offset, limit)
    client.fetch_contacts_batch(list_id, offset, limit)
  end
  
  def update_contacts(results)
    # Search contacts by email
    contact_map = client.search_contacts_by_emails(results.map(&:email))
    
    # Batch update
    client.batch_update_contacts(contact_map, results)
  end
  
  private
  
  def client
    @client ||= HubspotClient.new(@integration)
  end
end
```

#### **C. MailchimpProvider** (`app/services/integration_providers/mailchimp_provider.rb`)

**Purpose:** Mailchimp-specific implementation

```ruby
class MailchimpProvider < BaseProvider
  # Uses MailchimpService for API calls
  
  def fetch_lists
    audiences = service.get_audiences(access_token, data_center)
    
    # Return actual lists (no "All Contacts")
    audiences['lists'].map do |audience|
      {
        id: audience['id'],
        name: audience['name'],
        contact_count: audience['stats']['member_count']
      }
    end
  end
  
  def fetch_contacts_batch(list_id, offset, limit)
    members = service.get_audience_members_batch(access_token, data_center, list_id, offset, limit)
    
    members.map do |member|
      {
        email: member['email_address'],
        list_id: list_id,
        member_id: member['id']
      }
    end
  end
  
  def update_members(list_id, results)
    # Batch operations
    operations = results.map do |result|
      {
        method: "PUT",
        path: "/lists/#{list_id}/members/#{hash(result.email)}",
        body: { merge_fields: { EVERIFY: result.status } }
      }
    end
    
    service.batch_operations(access_token, data_center, operations)
  end
  
  private
  
  def service
    @service ||= MailchimpService.new
  end
  
  def data_center
    settings['data_center']
  end
end
```

---

### **4. API Wrappers**

#### **A. HubspotClient** (`app/clients/hubspot_client.rb`)

**Purpose:** Complex HubSpot API wrapper

```ruby
class HubspotClient
  def initialize(integration)
    @integration = integration
  end
  
  # Automatic token refresh
  def refresh_token_if_needed
    return unless token_expired?
    
    response = RestClient.post('https://api.hubapi.com/oauth/v1/token', {
      grant_type: 'refresh_token',
      client_id: ENV['HUBSPOT_CLIENT_ID'],
      client_secret: ENV['HUBSPOT_CLIENT_SECRET'],
      refresh_token: @integration.refresh_token
    })
    
    data = JSON.parse(response.body)
    @integration.update!(
      access_token: data['access_token'],
      refresh_token: data['refresh_token'],
      token_expires_at: Time.current + data['expires_in'].seconds
    )
  end
  
  # Search contacts by emails (batch)
  def search_contacts_by_emails(emails)
    # POST /crm/v3/objects/contacts/search
    # Returns: { email => contact_id }
  end
  
  # Batch update contacts
  def batch_update_contacts(results)
    # POST /crm/v3/objects/contacts/batch/update
    # Updates 100 contacts at a time
  end
end
```

#### **B. MailchimpClient** (`app/clients/mailchimp_client.rb`)

**Purpose:** Simple Mailchimp API wrapper

```ruby
class MailchimpClient
  def get_audiences(access_token, data_center)
    RestClient.get(
      "https://#{data_center}.api.mailchimp.com/3.0/lists",
      authorization: "Bearer #{access_token}"
    )
  end
  
  def get_audience_members_batch(access_token, data_center, list_id, offset, limit)
    RestClient.get(
      "https://#{data_center}.api.mailchimp.com/3.0/lists/#{list_id}/members?count=#{limit}&offset=#{offset}",
      authorization: "Bearer #{access_token}"
    )
  end
  
  def batch_operations(access_token, data_center, operations)
    RestClient.post(
      "https://#{data_center}.api.mailchimp.com/3.0/batches",
      { operations: operations }.to_json,
      authorization: "Bearer #{access_token}",
      content_type: :json
    )
  end
end
```

---

### **5. Background Jobs**

#### **A. FileProcessingWorker** (`app/sidekiq/file_processing_worker.rb`)

**Purpose:** Validates emails in document

```ruby
class FileProcessingWorker
  def perform(document_id)
    document = Document.find(document_id)
    
    # 1. Read CSV file
    csv_data = read_csv(document)
    
    # 2. Verify each email
    csv_data.each do |row|
      email = row['Email']
      result = EmailVerifyEngine.verify(email)
      row['Status'] = result.status
      row['Reason'] = result.reason
    end
    
    # 3. Save updated CSV
    save_csv(document, csv_data)
    
    # 4. Mark as finalized
    document.update!(status: 'finalized')
    
    # 5. Schedule push-back job
    IntegrationPushResultsJob.perform_async(document.id)
  end
end
```

#### **B. IntegrationPushResultsJob** (`app/jobs/integration_push_results_job.rb`)

**Purpose:** Pushes validation results back to provider

```ruby
class IntegrationPushResultsJob < ApplicationJob
  def perform(document_id)
    document = Document.find(document_id)
    integration_id = document.attachments.last.metadata['integration_id']
    integration = Integration.find(integration_id)
    
    # Parse CSV results
    results = parse_csv(document)
    
    # Push back to provider
    if integration.provider == 'hubspot'
      push_to_hubspot(integration, results)
    elsif integration.provider == 'mailchimp'
      push_to_mailchimp(integration, results)
    end
    
    # Update timestamp
    integration.update_list_settings('all', last_validated_at: Time.current.iso8601)
  end
  
  private
  
  def push_to_hubspot(integration, results)
    # HubSpot: Contact-centric
    provider = integration.provider_service
    provider.update_contacts(results)
  end
  
  def push_to_mailchimp(integration, results)
    # Mailchimp: List-centric
    list_ids = document.attachments.last.metadata['list_ids']
    provider = integration.provider_service
    
    list_ids.each do |list_id|
      provider.update_members(list_id, results)
    end
  end
end
```

---

## 🔄 **Push Back System Explained**

### **HubSpot Push Back (Contact-Centric)** 🏢

```
Document Finalized
↓
IntegrationPushResultsJob starts
↓
Step 1: Parse CSV Results
  - Email: john@example.com, Status: valid
  - Email: jane@example.com, Status: invalid
  - Email: bob@example.com, Status: risky
  (1000 results total)
↓
Step 2: Search HubSpot Contacts by Email (BATCH)
  POST /crm/v3/objects/contacts/search
  Body: {
    filterGroups: [{
      filters: [
        { propertyName: 'email', operator: 'IN', values: [
          'john@example.com',
          'jane@example.com',
          'bob@example.com',
          ... (100 emails per request)
        ]}
      ]
    }]
  }
  
  Response: [
    { id: '12345', email: 'john@example.com' },
    { id: '67890', email: 'jane@example.com' },
    ...
  ]
  
  Result: { 'john@example.com' => '12345', 'jane@example.com' => '67890' }
↓
Step 3: Batch Update Contacts (100 at a time)
  POST /crm/v3/objects/contacts/batch/update
  Body: {
    inputs: [
      {
        id: '12345',
        properties: {
          emailverify_status: 'valid',
          emailverify_verified_at: '2025-10-24T10:00:00Z'
        }
      },
      {
        id: '67890',
        properties: {
          emailverify_status: 'invalid',
          emailverify_verified_at: '2025-10-24T10:00:00Z'
        }
      },
      ... (up to 100 contacts)
    ]
  }
  
  Process in batches:
  - Batch 1: contacts 1-100 → API call 1
  - Batch 2: contacts 101-200 → API call 2
  - ...
  - Batch 10: contacts 901-1000 → API call 10
  
  Total: 10 API calls for 1000 contacts
↓
Result: ✅ All contacts updated
        ✅ Updates reflect in ALL lists automatically
        ✅ HubSpot shows updated properties everywhere
```

**Key Points:**
- ✅ **One update = reflects everywhere** (contact-centric)
- ✅ **Batch search** (100 emails per request)
- ✅ **Batch update** (100 contacts per request)
- ✅ **Fast** (10 API calls for 1000 contacts)

---

### **Mailchimp Push Back (List-Centric)** 📧

```
Document Finalized
↓
IntegrationPushResultsJob starts
↓
Step 1: Parse CSV Results
  - Email: john@example.com, Status: valid
  - Email: jane@example.com, Status: invalid
  - Email: bob@example.com, Status: risky
  (1000 results total)
↓
Step 2: Get List IDs from Document Metadata
  list_ids = ['abc123', 'def456']  // User selected 2 lists
↓
Step 3: For EACH List, Update Members (BATCH)
  
  For List 'abc123':
  ↓
  POST /batches
  Body: {
    operations: [
      {
        method: 'PUT',
        path: '/lists/abc123/members/hash(john@example.com)',
        body: {
          merge_fields: {
            EVERIFY: 'valid',
            EVERIFYDT: '2025-10-24'
          }
        }
      },
      {
        method: 'PUT',
        path: '/lists/abc123/members/hash(jane@example.com)',
        body: {
          merge_fields: {
            EVERIFY: 'invalid',
            EVERIFYDT: '2025-10-24'
          }
        }
      },
      ... (up to 500 operations)
    ]
  }
  
  Process in batches:
  - Batch 1: members 1-500 → API call 1
  - Batch 2: members 501-1000 → API call 2
  
  Total: 2 API calls for 1000 members in list 'abc123'
  ↓
  For List 'def456':
  ↓
  (Same process, another 2 API calls)
  
  Total: 2 API calls for 1000 members in list 'def456'
↓
Result: ✅ All members updated in BOTH lists
        ✅ Each list updated separately
        ✅ 4 API calls total (2 lists × 2 batches)
```

**Key Points:**
- ✅ **List-specific updates** (must update each list separately)
- ✅ **Batch operations** (500 operations per request)
- ✅ **Slower** (4 API calls for 1000 contacts × 2 lists)
- ✅ **Member merge fields** (custom fields for verification status)

---

## 🔄 **Complete Flow Example: 2500 Contacts**

### **User Journey:**

```
1. User Connects HubSpot
   ├─ OAuth flow
   ├─ Save tokens
   └─ Redirect to /integrations

2. User Sees Lists
   ├─ GET /integrations (renders show.html.erb)
   ├─ JavaScript fetches /integrations/:id/lists.json
   ├─ HubspotProvider.fetch_lists
   ├─ HubspotClient.lists (API call)
   └─ Display: Marketing List (2500 contacts)

3. User Selects "Marketing List" → Clicks Validate
   ├─ POST /integrations/:id/validate
   ├─ IntegrationsValidationConcern.validate
   │
   ├─ Step 1: Fetch Contacts (3 batches)
   │   ├─ fetch_contacts_batch(offset: 0, limit: 1000) → 1000 contacts
   │   ├─ fetch_contacts_batch(offset: 1000, limit: 1000) → 1000 contacts
   │   └─ fetch_contacts_batch(offset: 2000, limit: 1000) → 500 contacts
   │   Total: 2500 unique emails
   │
   ├─ Step 2: Consume Credits
   │   └─ CreditService.consume!(2500 credits)
   │
   ├─ Step 3: Create Documents (3 documents)
   │   ├─ Document 1: "HubSpot (Marketing List) - Part 1" (1000 emails)
   │   ├─ Document 2: "HubSpot (Marketing List) - Part 2" (1000 emails)
   │   └─ Document 3: "HubSpot (Marketing List) - Part 3" (500 emails)
   │
   └─ Redirect to /bulk-verification

4. FileProcessingWorker Processes Each Document
   ├─ Worker 1: Document 1 (1000 emails)
   │   ├─ Verify each email
   │   ├─ Save results to CSV
   │   ├─ Mark as finalized
   │   └─ Schedule IntegrationPushResultsJob
   │
   ├─ Worker 2: Document 2 (1000 emails)
   │   └─ (Same process)
   │
   └─ Worker 3: Document 3 (500 emails)
       └─ (Same process)

5. IntegrationPushResultsJob Pushes Results Back
   ├─ Job 1: Document 1 (1000 results)
   │   ├─ Parse CSV
   │   ├─ Search contacts (10 API calls, 100 emails each)
   │   └─ Update contacts (10 API calls, 100 contacts each)
   │
   ├─ Job 2: Document 2 (1000 results)
   │   └─ (Same process, 20 API calls)
   │
   └─ Job 3: Document 3 (500 results)
       └─ (Same process, 10 API calls)

6. User Sees Updated Results in HubSpot
   └─ All 2500 contacts have emailverify_status property set
```

### **Total Time:**
```
Fetch: ~3 seconds (3 API calls)
Process: ~10 minutes (2500 emails verified)
Push back: ~30 seconds (50 API calls with rate limiting)
Total: ~11 minutes for 2500 contacts
```

### **API Calls:**
```
Fetch: 3 calls (1000 + 1000 + 500)
Push: 50 calls (25 search + 25 update)
Total: 53 API calls
```

---

## ✅ **Key Takeaways**

### **Why This Architecture?**

1. **HubSpot Client Exists Because:**
   - Complex token refresh logic
   - Contact-centric architecture
   - Batch operations needed
   - Cursor-based pagination
   - 500+ lines of complex code

2. **Mailchimp Service is Enough Because:**
   - Simple token (never expires)
   - List-centric architecture
   - Simple REST calls
   - Standard pagination
   - 150 lines of simple code

3. **Push Back Differences:**
   - **HubSpot**: Update contact → reflects everywhere
   - **Mailchimp**: Update member in each list separately

4. **Multiple Documents:**
   - Max 1000 emails per document
   - Independent processing
   - Automatic push-back per document

**The system is simple, efficient, and production-ready!** 🚀


