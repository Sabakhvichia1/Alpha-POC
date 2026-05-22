# PayFlow POC - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Visit **http://localhost:3000**

---

## 📍 Navigation Guide

### Landing Page (Home)
- **URL**: http://localhost:3000
- **What to see**: Product overview, features, and CTA buttons
- **Action**: Click "Get Started" to enter the cabinet

### Dashboard
- **URL**: http://localhost:3000/cabinet
- **What to see**: 
  - 4 metric cards (payroll, pending, employees, next run)
  - Recent activity feed
  - Quick action buttons
  - Upcoming payroll preview
- **Try**: Click "Run Payroll Now" button

### Employees
- **URL**: http://localhost:3000/cabinet/employees
- **What to see**: Table of 5 employees with details
- **Try**: 
  - Click "+ Add Employee" to create new employee
  - Click "Edit" to modify employee details
  - Click "Delete" to remove employee

### Payroll & Payments
- **URL**: http://localhost:3000/cabinet/payroll
- **What to see**: Pending payroll and payment history
- **Try**: 
  - Click "▶ Run Payroll" to process all pending payments
  - Watch pending payments move to history

### Settings
- **URL**: http://localhost:3000/cabinet/settings
- **What to see**: Payment configuration options
- **Try**:
  - Toggle "Enable Automated Payroll"
  - Select payment schedule (weekly, bi-weekly, monthly)
  - Enter mock bank account details
  - Toggle email notifications
  - Click "Save Settings"

---

## 🎯 Key Features to Test

### 1. Employee Management
```
Employees → Add Employee
- Fill in name, email, role, salary
- Select status and payment method
- Click "Add Employee"
- See new employee in table
- Edit or delete as needed
```

### 2. Payroll Processing
```
Dashboard → Run Payroll Now
OR
Payroll & Payments → Run Payroll
- All pending payments marked as "paid"
- Payments move to history
- Totals update
```

### 3. Settings Persistence
```
Settings → Configure
- Change payment schedule
- Enter bank details
- Toggle notifications
- Click "Save Settings"
- Refresh page → Settings persist!
```

### 4. Navigation
```
Sidebar → Click any section
- Dashboard
- Employees
- Payroll & Payments
- Settings
- Collapse/expand sidebar with arrow button
```

---

## 📊 Mock Data Included

### Employees (5 total)
1. Alice Johnson - Senior Engineer - $120,000
2. Bob Smith - Product Manager - $110,000
3. Carol Davis - Designer - $95,000
4. David Wilson - Junior Developer - $75,000
5. Emma Brown - Marketing Manager - $85,000 (on leave)

### Payroll
- Bi-weekly payments calculated from annual salary
- All employees have pending payments initially
- Run payroll to process them

### Activity Log
- 5 sample activities with timestamps
- Shows payroll runs, payments, employee changes

---

## 🔧 Build & Deploy

### Development Build
```bash
npm run dev
```
- Hot reload enabled
- Source maps available
- Slower initial build

### Production Build
```bash
npm run build
npm start
```
- Optimized bundle
- Static generation
- Ready for deployment

### Lint Check
```bash
npm run lint
```

---

## 💾 Data Storage

### In-Memory (Resets on Refresh)
- Employee list
- Payroll records
- Payment history
- Activity log

### localStorage (Persists)
- Payment settings
- Automated payment toggle
- Payment schedule
- Bank account info
- Email notification preference

**Note**: Clear browser cache to reset localStorage data

---

## 🎨 UI/UX Features

- ✅ Responsive sidebar navigation
- ✅ Color-coded status badges
- ✅ Modal dialogs for forms
- ✅ Hover effects and transitions
- ✅ Form validation
- ✅ Success messages
- ✅ Disabled states
- ✅ Accessible design

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Build Fails
```bash
# Clear cache and reinstall
rm -r node_modules .next
npm install
npm run build
```

### Settings Not Persisting
- Check browser localStorage is enabled
- Try incognito/private mode
- Clear browser cache

### Sidebar Not Collapsing
- Click the arrow button (← →) in sidebar header
- Should toggle between full and icon-only view

---

## 📱 Responsive Design

- **Desktop**: Full sidebar + content
- **Tablet**: Sidebar collapses to icons
- **Mobile**: Sidebar may need adjustment (POC focused on desktop)

---

## 🚀 Next Steps

1. **Explore the UI**: Navigate through all pages
2. **Test CRUD**: Add, edit, delete employees
3. **Run Payroll**: Process pending payments
4. **Configure Settings**: Set up payment preferences
5. **Check Persistence**: Refresh page to verify settings save

---

## 📚 Documentation

- **README.md**: Full feature documentation
- **IMPLEMENTATION.md**: Technical details and architecture
- **mockData.ts**: Data structures and utilities

---

## ✨ Tips

- Use the sidebar to navigate between sections
- Click employee names to see full details
- Status badges show employee/payment status at a glance
- Settings auto-save to localStorage
- Run payroll multiple times to build payment history
- Try adding employees with different roles and salaries

---

**Happy testing! 🎉**
