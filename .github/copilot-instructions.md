# Copilot Custom Instructions for Baynunah HR Portal

## Project Overview

This is a **Baynunah HR Portal** - a comprehensive, mobile-first HR management system designed specifically for the Baynunah Group in Abu Dhabi, UAE. The system helps a solo HR professional manage a startup group while ensuring full **UAE Labor Law compliance**.

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React Context + Zustand
- **Forms**: React Hook Form + Zod validation
- **Authentication**: JWT-based pass system (not traditional login)

## Key Architecture Decisions

### Pass-Based Authentication
- Employees access the system via unique pass tokens, NOT traditional login
- HR Admin is the only user with direct portal login
- Passes are generated with unique UUIDs and distributed via email/SMS

### UAE Labor Law Compliance Engine
The system includes comprehensive UAE Labor Law compliance (`/lib/uae-compliance.ts`):
- **Gratuity**: Years 1-5 = 21 days/year, Years 5+ = 30 days/year
- **Annual Leave**: 30 days after 1 year (pro-rata before)
- **Sick Leave**: 90 days (15 full pay, 30 half pay, 45 unpaid)
- **Working Hours**: 8 hours/day, 48 hours/week (6 hours during Ramadan)
- **Overtime**: 125% standard, 150% night/weekend

### Mobile-First Design
- 80% of users access via mobile devices
- Minimum touch target: 44x44px
- Progressive Web App (PWA) capabilities
- Offline support is critical

## Coding Standards

### TypeScript
- Always use strict TypeScript
- Prefer interfaces over types for object shapes
- Use `unknown` instead of `any`
- Always define return types for functions
- Use Zod schemas for runtime validation

### React/Next.js
- Use Server Components by default
- Use Client Components (`'use client'`) only when necessary (state, effects, event handlers)
- Follow the App Router conventions
- Use `async/await` in Server Components for data fetching
- Place reusable components in `/components`

### Prisma
- Use the singleton pattern for the Prisma client (`/lib/prisma.ts`)
- Always use parameterized queries (Prisma handles this)
- Use transactions for operations that modify multiple tables

### Error Handling
- Always wrap async operations in try-catch blocks
- Return structured error responses from API routes
- Use Zod for input validation in API routes
- Log errors to console in development, use proper logging in production

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first responsive design (base styles are mobile)
- Use the project's color scheme (teal/green for Baynunah branding)
- Ensure sufficient color contrast for accessibility

## File Organization

```
/app                    # Next.js App Router pages
  /api                  # API routes
  /admin                # HR Admin portal pages
  /employee             # Employee portal pages
  /pass                 # Pass-based access pages
/components             # Reusable React components
/lib                    # Utility functions
  /auth                 # Authentication utilities
  /uae-compliance.ts    # UAE Labor Law calculations
  /prisma.ts            # Prisma client singleton
/prisma                 # Database schema
/public                 # Static assets
```

## API Route Conventions

- Use RESTful conventions
- Return consistent response structure:
  ```typescript
  // Success
  { success: true, data: {...} }
  
  // Error
  { success: false, error: "Error message" }
  ```
- Always validate input with Zod
- Use appropriate HTTP status codes

## Security Requirements

1. **Never** expose sensitive data in client components
2. **Always** validate user permissions before data operations
3. **Never** log sensitive information (passwords, tokens, personal data)
4. Use parameterized queries only (Prisma default)
5. Sanitize all user inputs
6. Use HTTPS for all external communications

## UAE-Specific Considerations

- All dates should handle UAE timezone (GMT+4)
- Support Arabic language in the future (RTL layout considerations)
- Monetary values in AED (UAE Dirham)
- Follow UAE Federal Decree-Law No. 33 of 2021 for all compliance calculations
- Consider Islamic holidays and Ramadan working hours

## Testing Guidelines

- Write unit tests for compliance calculations
- Test API routes with different user roles
- Ensure all calculations match UAE Labor Law requirements
- Test mobile responsiveness at 320px, 768px, and 1024px breakpoints

## Common Patterns

### API Route Example
```typescript
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  employeeId: z.string().uuid(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = schema.parse(body)
    
    // Business logic here
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid input' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Server Component Example
```typescript
import { prisma } from '@/lib/prisma'

export default async function EmployeeList() {
  const employees = await prisma.employee.findMany({
    select: { id: true, firstName: true, lastName: true },
  })
  
  return (
    <ul>
      {employees.map((emp) => (
        <li key={emp.id}>{emp.firstName} {emp.lastName}</li>
      ))}
    </ul>
  )
}
```

### Client Component Example
```typescript
'use client'

import { useState } from 'react'

export function ClockInButton() {
  const [loading, setLoading] = useState(false)
  
  const handleClockIn = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/attendance/clock-in', {
        method: 'POST',
      })
      // Handle response
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <button 
      onClick={handleClockIn} 
      disabled={loading}
      className="min-h-[44px] min-w-[44px] px-4 py-2 bg-teal-600 text-white rounded-lg"
    >
      {loading ? 'Clocking in...' : 'Clock In'}
    </button>
  )
}
```

## Build and Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

## Environment Variables

Required environment variables (see `.env.example`):
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT token signing
- `NEXT_PUBLIC_APP_URL` - Application URL

## Important Notes

1. This is a **private project** for Baynunah Group - do not suggest public deployment without security review
2. All employee data is **sensitive** and must be handled according to UAE data protection requirements
3. When working with compliance calculations, always refer to `/lib/uae-compliance.ts` for the authoritative implementation
4. Mobile experience is the **primary** concern - always test on mobile viewports first
