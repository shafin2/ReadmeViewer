# GA4 Button IDs Reference Guide

This document provides a comprehensive mapping of all button IDs across the Email Verify application for GA4 event tracking purposes.

## Naming Convention
All button IDs follow the pattern: `<section>-btn-<action>` or `<section>-nav-<page>`

---

## 1. HEADER / NAVIGATION

### Desktop Header Navigation
| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `header-nav-dashboard` | Header | Navigate to Dashboard | All pages (logged in) |
| `header-nav-verification` | Header | Navigate to Email Verification | All pages (logged in) |
| `header-nav-finder` | Header | Navigate to Email Finder | All pages (logged in) |
| `header-nav-usage` | Header | Navigate to Usage History | All pages (logged in) |
| `header-nav-api` | Header | Navigate to API Keys | All pages (logged in, if permitted) |

### Header Action Buttons
| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `header-btn-login` | Header | Navigate to Login Page | All pages (not logged in) |
| `header-btn-signup` | Header | Navigate to Signup Page | All pages (not logged in) |
| `header-btn-free-credits` | Header | Open Referral Modal | All pages (logged in, non-AppSumo) |
| `header-btn-upgrade-plan` | Header | Navigate to Billing | All pages (AppSumo users) |

---

## 2. SIDEBAR / MOBILE MENU

### Mobile Sidebar Navigation
| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `sidebar-nav-dashboard` | Mobile Sidebar | Navigate to Dashboard | All pages (logged in, mobile) |
| `sidebar-nav-verification` | Mobile Sidebar | Navigate to Email Verification | All pages (logged in, mobile) |
| `sidebar-nav-finder` | Mobile Sidebar | Navigate to Email Finder | All pages (logged in, mobile) |
| `sidebar-nav-usage` | Mobile Sidebar | Navigate to Usage History | All pages (logged in, mobile) |
| `sidebar-nav-api` | Mobile Sidebar | Navigate to API Keys | All pages (logged in, mobile, if permitted) |

### Sidebar Action Buttons
| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `sidebar-btn-free-credits` | Mobile Sidebar | Open Referral Modal | All pages (logged in, non-AppSumo, mobile) |
| `sidebar-btn-upgrade-plan` | Mobile Sidebar | Navigate to Billing | All pages (AppSumo users, mobile) |

---

## 3. FOOTER

| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `footer-btn-feedback` | Footer | External Link to Feedback (Canny.io) | All pages |
| `footer-btn-terms` | Footer | Navigate to Terms of Use | All pages |
| `footer-btn-privacy` | Footer | Navigate to Privacy Policy | All pages |
| `footer-btn-contact` | Footer | Mailto Support Email | All pages |

---

## 4. USER PROFILE DROPDOWN

| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `profile-dropdown-btn-profile` | Profile Dropdown | Navigate to User Profile | All pages (logged in) |
| `profile-dropdown-btn-settings` | Profile Dropdown | Navigate to Account Settings | All pages (logged in) |
| `profile-dropdown-btn-team-management` | Profile Dropdown | Navigate to Team Management | All pages (logged in) |
| `profile-dropdown-btn-pricing` | Profile Dropdown | Navigate to Pricing Page | All pages (logged in, non-AppSumo) |
| `profile-dropdown-btn-billing` | Profile Dropdown | Navigate to Billing | All pages (logged in) |
| `profile-dropdown-btn-terms` | Profile Dropdown | Navigate to Terms of Use | All pages (logged in) |
| `profile-dropdown-btn-privacy` | Profile Dropdown | Navigate to Privacy Policy | All pages (logged in) |
| `profile-dropdown-btn-logout` | Profile Dropdown | Logout User | All pages (logged in) |

---

## 5. AUTHENTICATION PAGES

### Login Page (`/users/sign_in`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `auth-btn-login` | Login Form | Submit Login Form |
| `auth-btn-google-login` | Login Page | Sign in with Google OAuth |
| `auth-btn-linkedin-login` | Login Page | Sign in with LinkedIn OAuth |
| `auth-btn-forgot-password` | Login Page | Navigate to Password Reset |
| `auth-btn-goto-signup` | Login Page | Navigate to Signup Page |

### Signup Page (`/users/sign_up`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `auth-btn-signup` | Signup Form | Submit Signup Form |
| `auth-btn-google-signup` | Signup Page | Sign up with Google OAuth |
| `auth-btn-linkedin-signup` | Signup Page | Sign up with LinkedIn OAuth |
| `auth-btn-goto-login` | Signup Page | Navigate to Login Page |

---

## 6. PRICING PAGES

### Monthly Plan & Pay-As-You-Go Pages (`/plans/monthly_plan` & `/plans/pay_as_you_go_plan`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `pricing-btn-monthly-tab` | Pricing Page | Switch to Monthly Plan Tab |
| `pricing-btn-payg-tab` | Pricing Page | Switch to Pay-As-You-Go Tab |
| `pricing-btn-buy-monthly` | Monthly Plan Form | Submit Purchase for Monthly Subscription |
| `pricing-btn-buy-credits` | Pay-As-You-Go Form | Submit Purchase for Credit Pack |

---

## 7. DASHBOARD PAGES

### Dashboard - Email Verification (`/dashboard`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `dashboard-btn-bulk-verify` | Dashboard | Navigate to Bulk Email Verification |
| **Existing ID:** `email-field` | Instant Verify | Email Input Field |
| **Existing ID:** (submit button has data-target) | Instant Verify | Submit Email Verification |

### Dashboard - Email Finder (`/email_finder`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `dashboard-btn-bulk-finder` | Email Finder | Navigate to Bulk Email Finder |
| **Existing ID:** `emailFinderSubmit` | Email Finder Form | Submit Email Finder Search |

### Dashboard - File Upload Modal
| Button ID | Location | Action |
|-----------|----------|--------|
| **Existing ID:** `schedule-button-<document_id>` | Upload Modal | Open Schedule Modal |
| **Existing ID:** `verify-file-button` | Upload Modal | Start File Verification |

---

## 8. USER PROFILE & SETTINGS

### Profile Page (`/users/profile`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `profile-btn-save` | Update Profile Form | Save Profile Changes |

### Account Settings Page (`/users/account_settings`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `settings-btn-change-password` | Change Password Form | Submit Password Change |

### Billing Page (`/users/billing`)
| Button ID | Location | Action |
|-----------|----------|--------|
| **Existing ID:** `btn-newcard` | Billing Page | Open Add Card Modal |

### Referrals Page (`/users/referrals`)
| Button ID | Location | Action |
|-----------|----------|--------|
| `referrals-btn-refer-now` | Referrals Page | Open Referral Modal |

---

## 9. MODALS

### Referral Modal
| Button ID | Location | Action |
|-----------|----------|--------|
| `referral-modal-btn-cancel` | Referral Modal | Cancel and Close Modal |
| **Existing ID:** `send-referral` | Referral Modal | Submit Referral Invitation |

### Logout Confirmation Modal
| Button ID | Location | Action |
|-----------|----------|--------|
| **Existing ID:** (modal triggers automatically) | Logout Modal | Confirm Logout |

---

## 10. BANNERS

### AppSumo Banner (Promotional Banner on Pricing Pages)
| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `banner-btn-appsumo-code` | AppSumo Banner | Open AppSumo Code Modal | Pricing Pages |
| `banner-btn-appsumo-deal` | AppSumo Banner | External Link to AppSumo Deal | Pricing Pages (Desktop) |

### Promotional Banner (Site-wide Promotions)
| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `banner-btn-promo-mobile` | Promotional Banner | CTA Link (Mobile) | Various Pages |
| `banner-btn-promo-desktop` | Promotional Banner | CTA Link (Desktop) | Various Pages |

### Plan Status Banner
| Button ID | Location | Action | Page |
|-----------|----------|--------|------|
| `banner-btn-plan-status` | Plan Status Banner | Navigate to Plan/Billing Action | Dashboard (when plan status needs attention) |

---

## 11. USAGE HISTORY & API PAGES

### Usage History Pages (`/usage_history`)
| Button ID | Location | Action |
|-----------|----------|--------|
| **Existing ID:** `instant-verify-tab` | Usage History | Switch to Website Usage Tab |
| **Existing ID:** `bulk-verify-tab` | Usage History | Switch to API Usage Tab |
| **Existing ID:** `usage-table-export` | Usage History | Export Usage Data to CSV |

---

## IMPORTANT NOTES

### Existing IDs (DO NOT CHANGE)
The following IDs are **already in use** in the application and should **NOT be modified**:
- `emailFinderSubmit` - Email Finder submit button
- `btn-newcard` - Add new credit card button
- `send-referral` - Send referral invitation button
- `schedule-button-<document_id>` - Schedule file processing button
- `verify-file-button` - Verify uploaded file button
- `instant-verify-tab` - Usage tab switcher
- `bulk-verify-tab` - Usage tab switcher
- `usage-table-export` - Export usage data button
- `email-field` - Email verification input field

### Data Attributes
Some buttons use `data-controller` and `data-action` attributes for Stimulus controllers. These should remain intact.

### Dynamic IDs
Some buttons have dynamic IDs based on database records (e.g., `schedule-button-<%= document.id %>`). These are intentional and allow tracking specific document actions.

---

## GA4 Implementation Guide

### Recommended Event Names:
- **Navigation**: `navigation_click`
- **CTA Buttons**: `cta_click`
- **Form Submissions**: `form_submit`
- **Modal Actions**: `modal_action`
- **Authentication**: `auth_action`

### Example GA4 Event Parameters:
```javascript
gtag('event', 'cta_click', {
  'button_id': 'pricing-btn-buy-monthly',
  'button_location': 'pricing_page',
  'button_text': 'Buy',
  'page_path': window.location.pathname
});
```

---

## Maintenance

**Last Updated:** October 14, 2025  
**Version:** 1.0  
**Maintained By:** Development Team

### Change Log:
- **v1.0** (Oct 14, 2025): Initial documentation with systematic button ID implementation across all major pages

---

## Support

For questions or updates to this document, please contact the development team or refer to the main application documentation.
