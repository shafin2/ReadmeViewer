# I Review - Customer Feedback Widget Platform

A comprehensive Ruby on Rails application that allows businesses to collect customer feedback through customizable widgets embedded on their websites.

## 🚀 Features

### Core Functionality
- **Customizable Feedback Widgets**: Embed beautiful, responsive feedback forms on any website
- **Two Modal Flows**: Choose between simple star rating or detailed feedback collection
- **Smart Trigger Rules**: Control when and how feedback widgets appear to visitors
- **Customer Management**: Organize and track customer profiles and their feedback
- **Advanced Analytics**: Track visitor behavior, review patterns, and engagement metrics

### Widget Customization
- **Appearance Settings**: Customize colors, logos, text, and positioning
- **Modal Flow Options**: Single modal (star rating only) or two-modal (star + detailed form)
- **Field Configuration**: Control which fields are shown and required
- **Customer Mapping**: Optionally create customer profiles from email addresses
- **Trigger Rules**: Set minimum visit counts, time requirements, and page targeting

## 🏗 Architecture

### Tech Stack
- **Backend**: Ruby on Rails 8.0
- **Frontend**: Stimulus.js, Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: Devise
- **Admin Panel**: ActiveAdmin
- **Widget**: Vanilla JavaScript (embeddable)

### Key Models
- **User**: Application users who create workspaces
- **Workspace**: Individual business accounts with their own settings
- **Visitor**: Website visitors tracked across sessions
- **Review**: Feedback submissions with ratings and comments
- **Customer**: Optional customer profiles created from email addresses

## 📋 Complete Testing Workflow

### 1. Initial Setup & Account Creation

#### Step 1: Create Account
1. Visit the application homepage
2. Click "Sign Up" or navigate to `/users/sign_up`
3. Fill in registration form:
   - **Name**: Your full name
   - **Email**: Valid email address
   - **Password**: Minimum 6 characters
4. Click "Sign Up"
5. Check email for confirmation link (if email confirmation is enabled)
6. Click confirmation link to activate account

#### Step 2: Login
1. Navigate to `/users/sign_in`
2. Enter your email and password
3. Click "Sign In"

### 2. Workspace Creation & Configuration

#### Step 3: Create Your First Workspace
1. After login, you'll be prompted to create a workspace
2. Fill in workspace details:
   - **Name**: Your business/project name (e.g., "My Online Store")
   - **Domain**: Your website domain (e.g., "mystore.com" or "localhost" for testing)
3. Click "Create Workspace"
4. Your workspace will be created and automatically selected

### 3. Widget Configuration

#### Step 4: Configure Trigger Rules
1. Navigate to **Settings → Trigger Rules** from the top navigation
2. Configure when the widget should appear:
   - **Modal Flow**: Choose between:
     - "Star Rating Only" - Simple one-click rating
     - "Star Rating + Detailed Form" - Two-step process with form fields
   - **Minimum Impressions**: Number of visits before showing widget (default: 3)
   - **Minimum Time for Impression**: Time visitor must spend to count as impression (default: 5 seconds)
   - **Session Duration**: Time window for counting repeated visits (default: 2 minutes)
   - **Page Targeting**: Specific pages where widget should appear (optional)
3. Click "Update Trigger Rules"

#### Step 5: Customize Widget Appearance
1. Navigate to **Settings → Widget Appearance**
2. Configure visual settings:

   **Branding:**
   - **Logo URL**: Add your company logo
   - **Brand Color**: Primary color for buttons and accents
   - **Modal Colors**: Background and border colors

   **Layout:**
   - **Popup Position**: Center, bottom-right, or bottom-left
   
   **Modal Flow Settings:**
   - **Modal Type**: Star Rating Only OR Star Rating + Detailed Form
   - **Form Fields** (for detailed feedback):
     - Name Field: Show/hide, required/optional
     - Email Field: Show/hide, required/optional  
     - Feedback Field: Show/hide, required/optional
   - **Customer Mapping**: Enable/disable customer profile creation

   **Content:**
   - **Header Title**: Main heading (e.g., "How was your experience?")
   - **Header Subtitle**: Optional subheading
   - **Description Text**: Main body text
   - **Button Text**: Submit button label
   - **Custom CSS**: Advanced styling overrides

3. Use the **Live Preview** on the right to see changes in real-time
4. Click "Save Appearance"

### 4. Widget Integration & Testing

#### Step 6: Get Widget Code
1. From the dashboard or any page, click the **"Get Widget Code"** button
2. Copy the provided script tag:
   ```html
   <script src="http://localhost:3000/widget.js?token=YOUR_WORKSPACE_TOKEN"></script>
   ```

#### Step 7: Test Widget Integration
1. Create a test HTML file or add to your existing website:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Test Page</title>
   </head>
   <body>
       <h1>Welcome to My Website</h1>
       <p>This is a test page for the feedback widget.</p>
       
       <!-- Add the widget script at the bottom -->
       <script src="http://localhost:3000/widget.js?token=YOUR_WORKSPACE_TOKEN"></script>
   </body>
   </html>
   ```

2. Open the test page in a browser
3. The widget behavior will depend on your trigger rules:
   - **First visit**: May not show (if minimum impressions > 1)
   - **Subsequent visits**: Will show based on your trigger rules
   - **Time requirements**: Must spend minimum time for visit to count

#### Step 8: Test Different Widget Flows

**Testing Single Modal Flow:**
1. Set Modal Flow to "Star Rating Only" in Widget Appearance
2. Visit your test page (meeting trigger requirements)
3. Widget should show with:
   - Star rating (1-5 stars)
   - Immediate submission after selecting stars
   - Success message
   - No additional form fields

**Testing Two Modal Flow:**
1. Set Modal Flow to "Star Rating + Detailed Form"
2. Configure which form fields to show/require
3. Visit your test page
4. Widget flow:
   - **Step 1**: Star rating with "Continue" button
   - **Step 2**: Detailed form with configured fields
   - Validation based on required field settings
   - Success message after submission

### 5. Customer Mapping Testing

#### Understanding Customer Mapping Options:

**Option A: Customer Mapping Enabled**
- **Requirements**: Email field must be shown and collected
- **Behavior**: 
  - Creates customer profiles from email addresses
  - Links reviews to customer profiles
  - Enables customer tracking across multiple reviews
  - Shows customer data in Customers section

**Option B: Customer Mapping Disabled**
- **Behavior**:
  - Reviews are still collected and stored
  - No customer profiles are created
  - Anonymous feedback collection
  - Simpler setup, no email requirements

#### Step 9: Test Customer Mapping Enabled
1. Go to Widget Appearance → Modal Flow
2. Ensure "Enable Customer Mapping" is checked
3. Set Modal Flow to "Star Rating + Detailed Form"
4. Ensure Email Field is shown (required for customer mapping)
5. Submit a review with an email address
6. Check **Customers** section - new customer profile should be created
7. Submit another review with the same email - should link to existing customer

#### Step 10: Test Customer Mapping Disabled
1. Go to Widget Appearance → Modal Flow
2. Uncheck "Enable Customer Mapping"
3. Submit reviews (with or without email)
4. Reviews are collected but no customer profiles are created
5. All feedback appears in Reviews section as anonymous submissions

### 6. Analytics & Management

#### Step 11: View Analytics
1. **Dashboard**: Overview of total reviews, average ratings, recent activity
2. **Reviews**: All feedback submissions with filtering options
3. **Visitors**: Track visitor behavior, impressions, and eligibility
4. **Customers**: Customer profiles with their review history (if mapping enabled)

#### Step 12: Export Data
1. **Customer Export**: Download customer data as CSV
2. **Review Data**: Export reviews and analytics
3. **Sample CSV**: Download template for customer imports

### 7. Advanced Testing Scenarios

#### Scenario A: E-commerce Store with Customer Mapping
```
Business: Online store wanting to track customer satisfaction
Configuration:
- Modal Flow: Two-modal (detailed feedback)
- Customer Mapping: Enabled
- Required Fields: Name, Email
- Trigger Rules: Show after 2 visits, 30 seconds minimum
- Page Targeting: /checkout, /order-complete

Expected Behavior:
- Widget shows on checkout/completion pages
- Collects detailed customer information
- Creates customer profiles for follow-up
- Links multiple purchases to same customer
```

#### Scenario B: Blog with Simple Feedback
```
Business: Content blog wanting quick feedback
Configuration:
- Modal Flow: Single modal (star rating only)
- Customer Mapping: Disabled
- Trigger Rules: Show after 1 visit, 10 seconds minimum
- Page Targeting: All pages

Expected Behavior:
- Simple star rating appears quickly
- No personal information collected
- Anonymous feedback collection
- Minimal visitor interruption
```

#### Scenario C: SaaS Platform with Detailed Analytics
```
Business: Software platform tracking user satisfaction
Configuration:
- Modal Flow: Two-modal (detailed feedback)
- Customer Mapping: Enabled
- Required Fields: Email, Feedback
- Trigger Rules: Show after 3 visits, 60 seconds minimum
- Page Targeting: /dashboard, /features

Expected Behavior:
- Targets engaged users (3+ visits)
- Collects detailed feedback with email
- Creates customer profiles for support
- Tracks satisfaction over time
```

## 🔧 Configuration Options Reference

### Trigger Rules
| Setting | Description | Default | Range |
|---------|-------------|---------|--------|
| Modal Flow | Single or two-modal experience | Two Modal | single_modal, two_modal |
| Minimum Impressions | Visits before showing widget | 3 | 1-100 |
| Min Time for Impression | Time to count as impression | 5 seconds | 0-3600 seconds |
| Session Duration | Time window for repeat visits | 2 minutes | 60-86400 seconds |
| Page Targeting | Specific pages to show widget | All pages | URL paths |

### Widget Appearance
| Category | Setting | Description |
|----------|---------|-------------|
| Branding | Logo URL | Company logo image |
| Branding | Brand Color | Primary color for buttons |
| Branding | Modal Colors | Background and border colors |
| Layout | Popup Position | center, bottom-right, bottom-left |
| Content | Header Title | Main modal heading |
| Content | Description Text | Body text explaining purpose |
| Content | Button Text | Submit button label |
| Fields | Name Field | Show/hide, required/optional |
| Fields | Email Field | Show/hide, required/optional |
| Fields | Feedback Field | Show/hide, required/optional |
| Advanced | Customer Mapping | Enable customer profile creation |
| Advanced | Custom CSS | Additional styling overrides |

### Customer Mapping Logic
| Modal Flow | Email Field | Customer Mapping | Result |
|------------|-------------|------------------|---------|
| Single Modal | N/A | Disabled | ✅ Star rating only, no customers |
| Single Modal | N/A | Enabled | ❌ Not allowed (no email collected) |
| Two Modal | Hidden | Enabled | ❌ Not allowed (email required) |
| Two Modal | Shown | Enabled | ✅ Full customer tracking |
| Two Modal | Shown | Disabled | ✅ Reviews only, no customer profiles |

## 🚨 Troubleshooting

### Common Issues

**Widget Not Appearing:**
- Check domain matches workspace domain exactly
- Verify trigger rules are met (visit count, time, page targeting)
- Check browser console for JavaScript errors
- Ensure script tag is correctly placed

**Customer Mapping Not Working:**
- Verify customer mapping is enabled in Widget Appearance
- Ensure email field is shown and being collected
- Check that modal flow is set to "Two Modal"
- Confirm email addresses are valid format

**Reviews Not Saving:**
- Check required field validation
- Verify workspace token is correct
- Ensure API endpoints are accessible
- Check server logs for validation errors

### Browser Console Debugging
Open browser developer tools and check for:
```javascript
// Widget loading
"Review Widget: Main widget module loaded successfully"

// Configuration
"ReviewWidget initialized with config: {token: '...', ...}"

// API calls
"ReviewWidget: Tracking visitor..."
"ReviewWidget: Submitting review..."
```

## 🔐 Security Considerations

- **Domain Validation**: Widgets only work on registered domains
- **Token Authentication**: Each workspace has unique token
- **Input Sanitization**: All user input is sanitized
- **Rate Limiting**: API endpoints have rate limiting
- **HTTPS**: Use HTTPS in production for secure data transmission

## 📊 Performance

- **Widget Size**: ~15KB minified JavaScript
- **Load Time**: Async loading, non-blocking
- **API Response**: < 100ms average response time
- **Database**: Optimized queries with proper indexing
- **Caching**: Application-level caching for better performance

## 🔄 Deployment

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost/ireviews_production

# Email (if confirmation required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Application
RAILS_ENV=production
SECRET_KEY_BASE=your-secret-key
```

### Production Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations: `rails db:migrate`
4. Precompile assets: `rails assets:precompile`
5. Start server: `rails server -e production`

## 📞 Support

For issues or questions:
1. Check this README for common solutions
2. Review application logs
3. Test in development environment first
4. Verify configuration matches expected behavior

## 🎯 Success Metrics

After following this guide, you should be able to:
- ✅ Create accounts and workspaces
- ✅ Configure widget appearance and behavior
- ✅ Embed widgets on test websites
- ✅ Collect feedback in both single and two-modal flows
- ✅ Manage customer profiles (when mapping enabled)
- ✅ View analytics and export data
- ✅ Troubleshoot common issues

The I Review platform provides a complete solution for collecting, managing, and analyzing customer feedback across your web properties.
