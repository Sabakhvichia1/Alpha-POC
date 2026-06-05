# Convex Database Integration Guide

This guide will walk you through integrating Convex (a real-time database) into your Financial Monitoring application.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Convex Setup](#convex-setup)
4. [Schema Definition](#schema-definition)
5. [Queries and Mutations](#queries-and-mutations)
6. [Frontend Integration](#frontend-integration)
7. [Migration from localStorage](#migration-from-localstorage)

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Convex account (sign up at https://convex.dev)
- Your current Next.js app running

---

## Installation

### Step 1: Install Convex Package

```bash
cd alpha-poc
npm install convex
```

### Step 2: Initialize Convex

```bash
npx convex dev
```

This command will:
- Create a `convex/` directory in your project
- Set up `convex.json` configuration file
- Create `.env.local` with your deployment URL
- Open your browser to log in to Convex

**Follow the prompts:**
1. Log in with GitHub, Google, or Email
2. Create a new project (name it: `financial-monitoring`)
3. Copy the deployment URL to `.env.local`

---

## Convex Setup

### Step 3: Update Environment Variables

After initialization, your `.env.local` should have:

```env
CONVEX_DEPLOYMENT=dev:your-deployment-name-123456
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### Step 4: Update `next.config.ts`

No changes needed! Convex works out of the box with Next.js 15+.

---

## Schema Definition

### Step 5: Create Schema File

Create `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  employees: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("on-leave"),
      v.literal("terminated")
    ),
    salary: v.number(),
    paymentMethod: v.union(
      v.literal("direct-deposit"),
      v.literal("bank-transfer"),
      v.literal("check")
    ),
    joinDate: v.string(),
    employmentType: v.union(
      v.literal("hourly"),
      v.literal("daily"),
      v.literal("monthly")
    ),
    monthlyBaseline: v.number(),
    pensionScheme: v.boolean(),
    taxStatus: v.union(
      v.literal("standard"),
      v.literal("small-business")
    ),
    userId: v.string(), // Links to Clerk user (when you add it)
  }).index("by_userId", ["userId"]),

  payrollRecords: defineTable({
    employeeId: v.id("employees"),
    employeeName: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("paid"),
      v.literal("failed")
    ),
    grossSalary: v.number(),
    incomeTax: v.number(),
    pensionContribution: v.number(),
    netSalary: v.number(),
    paymentDate: v.optional(v.string()),
    userId: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_employeeId", ["employeeId"])
    .index("by_status", ["status"]),

  ssGeExpenses: defineTable({
    standardListings: v.number(),
    vipListings: v.number(),
    vipPlusListings: v.number(),
    superVipListings: v.number(),
    adBoostBudget: v.number(),
    userId: v.string(),
  }).index("by_userId", ["userId"]),

  paymentSettings: defineTable({
    automatedPayments: v.boolean(),
    paymentSchedule: v.union(
      v.literal("weekly"),
      v.literal("bi-weekly"),
      v.literal("monthly")
    ),
    bankAccount: v.object({
      accountHolder: v.string(),
      accountNumber: v.string(),
      routingNumber: v.string(),
    }),
    emailNotifications: v.boolean(),
    userId: v.string(),
  }).index("by_userId", ["userId"]),
});
```

---

## Queries and Mutations

### Step 6: Create Employee Queries

Create `convex/employees.ts`:

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all employees for a user
export const getEmployees = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("employees")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get single employee
export const getEmployee = query({
  args: { id: v.id("employees") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create employee
export const createEmployee = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("on-leave"),
      v.literal("terminated")
    ),
    salary: v.number(),
    paymentMethod: v.union(
      v.literal("direct-deposit"),
      v.literal("bank-transfer"),
      v.literal("check")
    ),
    joinDate: v.string(),
    employmentType: v.union(
      v.literal("hourly"),
      v.literal("daily"),
      v.literal("monthly")
    ),
    monthlyBaseline: v.number(),
    pensionScheme: v.boolean(),
    taxStatus: v.union(
      v.literal("standard"),
      v.literal("small-business")
    ),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("employees", args);
  },
});

// Update employee
export const updateEmployee = mutation({
  args: {
    id: v.id("employees"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("active"),
        v.literal("on-leave"),
        v.literal("terminated")
      )
    ),
    salary: v.optional(v.number()),
    paymentMethod: v.optional(
      v.union(
        v.literal("direct-deposit"),
        v.literal("bank-transfer"),
        v.literal("check")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Delete employee
export const deleteEmployee = mutation({
  args: { id: v.id("employees") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
```

### Step 7: Create Payroll Queries

Create `convex/payroll.ts`:

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get payroll records for a user
export const getPayrollRecords = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payrollRecords")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get pending payroll
export const getPendingPayroll = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payrollRecords")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();
  },
});

// Create payroll record
export const createPayrollRecord = mutation({
  args: {
    employeeId: v.id("employees"),
    employeeName: v.string(),
    amount: v.number(),
    dueDate: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("paid"),
      v.literal("failed")
    ),
    grossSalary: v.number(),
    incomeTax: v.number(),
    pensionContribution: v.number(),
    netSalary: v.number(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("payrollRecords", args);
  },
});

// Update payroll status
export const updatePayrollStatus = mutation({
  args: {
    id: v.id("payrollRecords"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("paid"),
      v.literal("failed")
    ),
    paymentDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});
```

### Step 8: Create Settings Queries

Create `convex/settings.ts`:

```typescript
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get user settings
export const getSettings = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("paymentSettings")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    
    return settings;
  },
});

// Get ss.ge expenses
export const getSSGeExpenses = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const expenses = await ctx.db
      .query("ssGeExpenses")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    
    return expenses;
  },
});

// Update settings
export const updateSettings = mutation({
  args: {
    userId: v.string(),
    automatedPayments: v.optional(v.boolean()),
    paymentSchedule: v.optional(
      v.union(
        v.literal("weekly"),
        v.literal("bi-weekly"),
        v.literal("monthly")
      )
    ),
    bankAccount: v.optional(
      v.object({
        accountHolder: v.string(),
        accountNumber: v.string(),
        routingNumber: v.string(),
      })
    ),
    emailNotifications: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    // Find existing settings
    const existing = await ctx.db
      .query("paymentSettings")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, updates);
    } else {
      // Create default settings
      await ctx.db.insert("paymentSettings", {
        userId,
        automatedPayments: false,
        paymentSchedule: "monthly",
        bankAccount: {
          accountHolder: "",
          accountNumber: "",
          routingNumber: "",
        },
        emailNotifications: true,
        ...updates,
      });
    }
  },
});

// Update ss.ge expenses
export const updateSSGeExpenses = mutation({
  args: {
    userId: v.string(),
    standardListings: v.number(),
    vipListings: v.number(),
    vipPlusListings: v.number(),
    superVipListings: v.number(),
    adBoostBudget: v.number(),
  },
  handler: async (ctx, args) => {
    const { userId, ...data } = args;
    
    const existing = await ctx.db
      .query("ssGeExpenses")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, data);
    } else {
      await ctx.db.insert("ssGeExpenses", { userId, ...data });
    }
  },
});
```

---

## Frontend Integration

### Step 9: Add Convex Provider

Update `app/layout.tsx`:

```typescript
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConvexProvider client={convex}>
          <AppProvider>
            {children}
          </AppProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
```

### Step 10: Update Employees Page

Update `app/cabinet/employees/page.tsx`:

```typescript
'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function EmployeesPage() {
  // For now, use a hardcoded userId (replace with Clerk later)
  const userId = "temp-user-id";
  
  // Fetch employees from Convex
  const employees = useQuery(api.employees.getEmployees, { userId }) || [];
  
  // Mutations
  const createEmployee = useMutation(api.employees.createEmployee);
  const updateEmployee = useMutation(api.employees.updateEmployee);
  const deleteEmployee = useMutation(api.employees.deleteEmployee);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update
      await updateEmployee({
        id: editingId,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        salary: parseFloat(formData.salary),
        paymentMethod: formData.paymentMethod,
      });
    } else {
      // Create
      await createEmployee({
        ...formData,
        salary: parseFloat(formData.salary),
        userId,
        joinDate: new Date().toISOString().split('T')[0],
        monthlyBaseline: parseFloat(formData.salary),
      });
    }
    
    handleCloseModal();
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteEmployee({ id: id as any });
    }
  };
  
  // Rest of your component...
}
```

---

## Migration from localStorage

### Step 11: Create Migration Script (Optional)

If you have existing data in localStorage, create `scripts/migrate-to-convex.ts`:

```typescript
// Run this once to migrate your localStorage data to Convex
// This is optional if you're starting fresh

import { ConvexHttpClient } from "convex/browser";

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function migrate() {
  // Get data from localStorage
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  const settings = JSON.parse(localStorage.getItem('paymentSettings') || '{}');
  const expenses = JSON.parse(localStorage.getItem('ssGeExpenses') || '{}');
  
  const userId = "temp-user-id"; // Use actual user ID from Clerk later
  
  // Migrate employees
  for (const emp of employees) {
    await client.mutation("employees:createEmployee", {
      ...emp,
      userId,
    });
  }
  
  console.log('Migration complete!');
}

// Run: ts-node scripts/migrate-to-convex.ts
migrate();
```

---

## Testing

### Step 12: Run Development Server

```bash
# Terminal 1: Run Convex backend
npx convex dev

# Terminal 2: Run Next.js frontend
npm run dev
```

Visit `http://localhost:3000` and test:
- ✅ Create employee
- ✅ Edit employee
- ✅ Delete employee
- ✅ Data persists after refresh

---

## Dashboard Integration

The Convex dashboard (https://dashboard.convex.dev) provides:
- 📊 Real-time data viewer
- 🔍 Query logs and performance
- 🐛 Debugging tools
- 📈 Usage analytics

---

## Next Steps

1. ✅ Deploy to production: `npx convex deploy`
2. 🔐 Add Clerk authentication (see CLERK_INTEGRATION_GUIDE.md)
3. 🔒 Add user-specific data isolation
4. 📱 Add real-time subscriptions
5. 🚀 Optimize queries with indexes

---

## Common Issues

### Issue: "Convex URL not found"
**Solution:** Make sure `.env.local` has `NEXT_PUBLIC_CONVEX_URL`

### Issue: "Cannot find module '@/convex/_generated/api'"
**Solution:** Run `npx convex dev` to generate types

### Issue: Data not showing
**Solution:** Check Convex dashboard for errors, verify userId matches

---

## Resources

- [Convex Documentation](https://docs.convex.dev)
- [Convex + Next.js Guide](https://docs.convex.dev/quickstart/nextjs)
- [Convex Dashboard](https://dashboard.convex.dev)

---

**Ready to add authentication? Continue with `CLERK_INTEGRATION_GUIDE.md`**
