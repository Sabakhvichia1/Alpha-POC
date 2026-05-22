# PayFlow - Payroll Management POC

A frontend-only proof of concept web application for payroll management. All data is stored in-memory or localStorage—no backend required.

## Features

### Landing Page
- Hero section with product name, tagline, and CTA
- 6 feature highlight cards
- Call-to-action section
- Footer with links

### Personal Cabinet (Dashboard)
- **Dashboard**: Summary metrics (total payroll, pending payments, active employees, next scheduled run)
- **Recent Activity Feed**: Mocked activity log with timestamps
- **Upcoming Payroll Table**: Quick view of pending payments

### Employees Management
- Employee list with name, role, status, salary, and payment method
- Add new employee modal
- Edit employee details
- Delete employees
- Status badges (active, on-leave, terminated)

### Payroll & Payments
- Pending payroll table with employee details and amounts
- "Run Payroll" button to simulate payroll processing
- Payment history log with timestamps
- Summary cards for pending and paid amounts

### Automated Payments Settings
- Toggle for automated payment schedule
- Payment schedule options (weekly, bi-weekly, monthly)
- Mock bank account connection form
- Email notification preferences
- Settings persist to localStorage

## Tech Stack

- **Framework**: Next.js 16.2.6 with React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **State Management**: React hooks (useState, useEffect)
- **Storage**: localStorage for settings persistence

## Project Structure

```
app/
├── page.tsx                 # Landing page
├── layout.tsx              # Root layout
├── cabinet/
│   ├── layout.tsx          # Cabinet layout with sidebar
│   ├── page.tsx            # Dashboard
│   ├── employees/
│   │   └── page.tsx        # Employees management
│   ├── payroll/
│   │   └── page.tsx        # Payroll & payments
│   └── settings/
│       └── page.tsx        # Settings & configuration
lib/
└── mockData.ts             # Mock data and utilities
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Mock Data

The application includes:
- **5 mock employees** with varying roles and salaries
- **Payroll records** generated bi-weekly
- **Activity log** with 5 sample entries
- **Default payment settings** with mock bank account info

All data is generated in-memory and can be modified through the UI. Changes persist to localStorage for settings.

## Features Walkthrough

### Landing Page
Navigate to the home page to see the product overview with hero section, features, and CTA buttons.

### Dashboard
- View key metrics at a glance
- See recent activity
- Quick access to common actions
- Preview upcoming payroll

### Employees
- View all employees in a table
- Click "Add Employee" to create new records
- Click "Edit" to modify employee details
- Click "Delete" to remove employees
- Filter by status (active, on-leave, terminated)

### Payroll & Payments
- Click "Run Payroll" to simulate processing all pending payments
- Pending payments move to history
- Track payment status and dates
- View total amounts pending and paid

### Settings
- Enable/disable automated payments
- Select payment schedule
- Configure mock bank account details
- Toggle email notifications
- Settings auto-save to localStorage

## Notes

- This is a frontend-only POC with no backend API
- All data is stored in-memory (resets on page refresh) or localStorage (for settings)
- Payment processing is simulated—no real transactions occur
- Bank account information is not validated or encrypted (for demo purposes)
- Responsive design works on desktop and tablet (mobile-optimized for POC)

## Future Enhancements

- Real backend API integration
- Actual authentication and authorization
- Real payment processing
- Database persistence
- Advanced reporting and analytics
- Multi-company support
- Compliance features (tax forms, audit logs)
