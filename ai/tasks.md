# Implementation Tasks

## 1. UI Setup
- [x] Add Tailwind CSS, use #0984e3 as the primary color, #e17055 as the secondary color, and use other matching colors as and when needed.
- [x] Create landing page with header, footer, hero section, and put CTA to login/register. In header, keep the logo (you can generate an appropriate one), login and register link. In hero section, keep a heading about the website, a sub-heading, and CTA to login/register.

## 2. Auth Implementation
- [x] Implement Login page and integrate backend API for login. Ensure all fields accepted by backend API is present on the form.
- [x] Implement Register page and integrate backend API for register. Ensure all fields accepted by backend API is present on the form.

## 3. Dashboard & Logout Implementation
- [x] Implement Dashboard page with live inventory statistics, category tabs, text search, item creation, deletion, and local persistence.
- [x] Implement complete Logout flow clearing user state and authentication tokens from local storage.

## 4. Product Database & API Integration (All 4 Use-Cases)
- [x] Use-Case 1: Dashboard paginated product listing (max 20 per page) showing products nearing expiry.
- [x] Use-Case 2: Add Product functionality with UPC barcode scan simulation / manual entry, title, amount, category, and expiry date.
- [x] Use-Case 3: Edit and Delete product functionality per product item.
- [x] Use-Case 4: Search & Filters by title, UPC code, and expiry date ranges (within 1 month, within 3 months, expired, etc.).