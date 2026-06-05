# Clerk Authentication Integration Guide

This guide will walk you through integrating Clerk authentication into your Financial Monitoring application.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Clerk Setup](#clerk-setup)
4. [Environment Configuration](#environment-configuration)
5. [Provider Setup](#provider-setup)
6. [Protected Routes](#protected-routes)
7. [User Authentication](#user-authentication)
8. [Integration with Convex](#integration-with-convex)

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Clerk account (sign up at https://clerk.com)
- Your Next.js app running
- (Optional) Convex already integrated

---

## Installation

### Step 1: Install Clerk Package

```bash
cd alpha-poc
npm install @clerk/nextjs
```

---

## Clerk Setup

### Step 2: Create Clerk Application

1. Go to https://dashboard.clerk.com
2. Click "Add application"
3. Name your application: "Financial Monitoring"
4. Choose authentication methods:
   - ✅ Email
   - ✅ Google (recommended)
   - ✅ GitHub (optional)
   - ❌ Phone (optional)
5. Click "Create application"

### Step 3: Get API Keys

After creating your application:
1. You'll see your API keys on the dashboard
2. Copy both the **Publishable Key** and **Secret Key**
3. Keep the page open, you'll need these keys

---

## Environment Configuration

### Step 4: Add Environment Variables

Update your `.env.local` file:

```env
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/cabinet
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/cabinet

# Your existing Convex keys (if using)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment-name-123456
```

**Important:** Never commit `.env.local` to Git!

---

## Provider Setup

### Step 5: Wrap App with ClerkProvider

Update `app/layout.tsx`:

```typescript
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AppProvider } from '@/contexts/AppContext';
import './globals.css';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexProvider client={convex}>
            <AppProvider>
              {children}
            </AppProvider>
          </ConvexProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### Step 6: Create Middleware for Protected Routes

Create `middleware.ts` in the root directory:

```typescript
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ["/api/public"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

---

## User Authentication

### Step 7: Create Sign In Page

Create `app/sign-in/[[...sign-in]]/page.tsx`:

```typescript
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ფინანსური მონიტორინგი
          </h1>
          <p className="text-gray-600">
            შედით თქვენს ანგარიშში
          </p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/80 backdrop-blur-sm shadow-xl",
            }
          }}
        />
      </div>
    </div>
  );
}
```

### Step 8: Create Sign Up Page

Create `app/sign-up/[[...sign-up]]/page.tsx`:

```typescript
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ფინანსური მონიტორინგი
          </h1>
          <p className="text-gray-600">
            შექმენით ანგარიში
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white/80 backdrop-blur-sm shadow-xl",
            }
          }}
        />
      </div>
    </div>
  );
}
```

### Step 9: Update Landing Page

Update `app/page.tsx` to add sign in/up buttons:

```typescript
'use client';

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getTranslation } from "@/lib/translations";
import { useAppContext } from "@/contexts/AppContext";

export default function Home() {
  const { language, toggleLanguage } = useAppContext();
  const { isSignedIn } = useUser();
  const t = getTranslation(language);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <nav className="border-b border-white/50 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{t.appName}</div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm shadow-md"
            >
              {language === 'ka' ? 'EN' : 'ქარ'}
            </button>
            {isSignedIn ? (
              <Link
                href="/cabinet"
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg"
              >
                {t.dashboard}
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm sm:text-base"
                >
                  {language === 'ka' ? 'შესვლა' : 'Sign In'}
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg"
                >
                  {language === 'ka' ? 'რეგისტრაცია' : 'Sign Up'}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Rest of your landing page... */}
    </div>
  );
}
```

---

## Protected Routes

### Step 10: Add User Menu to Cabinet Layout

Update `app/cabinet/layout.tsx`:

```typescript
'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { useAppContext } from '@/contexts/AppContext';
import { getTranslation } from '@/lib/translations';

export default function CabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, toggleLanguage, isPlanned, toggleScenario } = useAppContext();
  const { user } = useUser();
  const t = getTranslation(language);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Sidebar - existing code... */}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button - existing code... */}
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{t.appName}</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
              <button
                onClick={toggleLanguage}
                className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-xs sm:text-sm shadow-md"
              >
                {language === 'ka' ? 'EN' : 'ქარ'}
              </button>
              
              {/* Scenario toggle - existing code... */}
              
              {/* User button */}
              <div className="flex items-center gap-3">
                <span className="hidden md:inline text-sm text-gray-600">
                  {user?.firstName || user?.emailAddresses[0].emailAddress}
                </span>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 sm:w-10 sm:h-10"
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {/* Mobile scenario toggle - existing code... */}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
```

---

## Integration with Convex

### Step 11: Configure Convex with Clerk

Update `convex/auth.config.js`:

```javascript
export default {
  providers: [
    {
      domain: "https://your-clerk-domain.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
};
```

### Step 12: Update Convex Provider

Update `app/layout.tsx` to use Clerk with Convex:

```typescript
'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { AppProvider } from '@/contexts/AppContext';
import './globals.css';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <AppProvider>
              {children}
            </AppProvider>
          </ConvexProviderWithClerk>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### Step 13: Update Queries to Use Clerk User ID

Update `app/cabinet/employees/page.tsx`:

```typescript
'use client';

import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

export default function EmployeesPage() {
  const { user } = useUser();
  const userId = user?.id || "";
  
  // Now queries automatically use the authenticated user's ID
  const employees = useQuery(
    api.employees.getEmployees, 
    userId ? { userId } : "skip"
  ) || [];
  
  const createEmployee = useMutation(api.employees.createEmployee);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createEmployee({
      ...formData,
      salary: parseFloat(formData.salary),
      userId, // Uses Clerk user ID
      joinDate: new Date().toISOString().split('T')[0],
      monthlyBaseline: parseFloat(formData.salary),
    });
    
    handleCloseModal();
  };
  
  // Rest of your component...
}
```

---

## Customization

### Step 14: Customize Clerk Appearance

Update Clerk theme in `app/layout.tsx`:

```typescript
<ClerkProvider
  appearance={{
    baseTheme: undefined,
    variables: {
      colorPrimary: '#2563eb', // blue-600
      colorBackground: '#ffffff',
      colorInputBackground: '#f9fafb',
      colorInputText: '#111827',
      borderRadius: '0.5rem',
    },
    elements: {
      formButtonPrimary: 
        'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
      card: 'bg-white/80 backdrop-blur-sm shadow-xl',
      headerTitle: 'text-gray-900',
      headerSubtitle: 'text-gray-600',
      socialButtonsBlockButton: 
        'border-gray-200 hover:bg-gray-50',
      formFieldLabel: 'text-gray-700',
      footerActionLink: 'text-blue-600 hover:text-blue-700',
    },
  }}
>
  {/* ... */}
</ClerkProvider>
```

---

## Testing

### Step 15: Test Authentication Flow

1. **Start your dev servers:**
   ```bash
   # Terminal 1: Convex (if using)
   npx convex dev
   
   # Terminal 2: Next.js
   npm run dev
   ```

2. **Test the flow:**
   - ✅ Visit `http://localhost:3000`
   - ✅ Click "Sign Up" button
   - ✅ Create an account with email
   - ✅ Verify email (check inbox)
   - ✅ Get redirected to `/cabinet`
   - ✅ See user menu in top right
   - ✅ Sign out
   - ✅ Sign in again
   - ✅ Data is user-specific

---

## User Management

### Clerk Dashboard Features

Access your Clerk Dashboard (https://dashboard.clerk.com):

- 👥 **Users**: View and manage all users
- 📧 **Email Templates**: Customize verification emails
- 🎨 **Branding**: Add your logo and colors
- 🔐 **Security**: Configure MFA, session duration
- 📊 **Analytics**: View sign-up trends
- 🌍 **Localization**: Add Georgian translations

---

## Add Georgian Translations to Clerk

### Step 16: Customize Clerk Text

Add to your ClerkProvider:

```typescript
<ClerkProvider
  localization={{
    signIn: {
      start: {
        title: "შედით თქვენს ანგარიშში",
        subtitle: "გაგრძელებისთვის",
        actionText: "არ გაქვთ ანგარიში?",
        actionLink: "რეგისტრაცია",
      },
    },
    signUp: {
      start: {
        title: "შექმენით ანგარიში",
        subtitle: "დასაწყებად",
        actionText: "უკვე გაქვთ ანგარიში?",
        actionLink: "შესვლა",
      },
    },
  }}
>
  {/* ... */}
</ClerkProvider>
```

---

## Production Deployment

### Step 17: Production Setup

1. **Add production domain to Clerk:**
   - Go to Clerk Dashboard
   - Settings → Domains
   - Add your production domain (e.g., `yourapp.com`)

2. **Update environment variables:**
   ```env
   # Production keys (different from development)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxx
   ```

3. **Deploy to Vercel/Netlify:**
   - Add environment variables in dashboard
   - Deploy your app
   - Test authentication on production

---

## Common Issues

### Issue: "Clerk: Missing publishable key"
**Solution:** Check `.env.local` has `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

### Issue: Redirect loop after sign in
**Solution:** Verify middleware.ts publicRoutes includes "/"

### Issue: User data not showing
**Solution:** Make sure you're using `user?.id` from Clerk

### Issue: Styling not working
**Solution:** Ensure Clerk components have `appearance` prop

---

## Security Best Practices

1. ✅ Never expose `CLERK_SECRET_KEY` in client code
2. ✅ Use middleware to protect all `/cabinet` routes
3. ✅ Validate user IDs on backend (Convex queries)
4. ✅ Enable MFA for admin accounts
5. ✅ Set appropriate session timeouts
6. ✅ Monitor failed login attempts
7. ✅ Use HTTPS in production

---

## Advanced Features

### Email Verification
- Automatically handled by Clerk
- Customize email templates in dashboard

### Password Reset
- Built-in forgot password flow
- Customize reset email template

### Social Login
- Add Google: Dashboard → Social Connections
- Add GitHub: Same location
- No extra code needed!

### Multi-Factor Authentication
- Enable in Dashboard → Security
- Users can opt-in from their profile

---

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk + Next.js Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk + Convex Integration](https://docs.convex.dev/auth/clerk)
- [Clerk Dashboard](https://dashboard.clerk.com)

---

## Next Steps

1. ✅ Test authentication flow
2. ✅ Customize branding and emails
3. ✅ Add social login providers
4. ✅ Configure production environment
5. ✅ Monitor user analytics
6. 🚀 Deploy to production!

---

**Need help? Check the Clerk Discord community or documentation!**
