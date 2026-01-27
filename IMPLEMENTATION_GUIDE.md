# Baynunah HR Portal - Implementation Guide

## Quick Start Guide

### Prerequisites
- Node.js 18.17.0 or higher
- PostgreSQL database (or Supabase account)
- npm or yarn package manager

### Installation Steps

1. **Clone and Install**
   ```bash
   git clone https://github.com/ismaelloveexcel/baynunah-hr-portal.git
   cd baynunah-hr-portal
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update your `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/baynunah_hr"
   NEXTAUTH_SECRET="generate-a-random-secret"
   JWT_SECRET="generate-another-random-secret"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Open Prisma Studio to view/edit data
   npx prisma studio
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Demo & Testing

### Creating Test Data

Since this is a fresh installation, you'll need to create test data. You can use Prisma Studio:

```bash
npx prisma studio
```

#### Create Test Entity
1. Open `Entity` table
2. Add new record:
   - name: "Baynunah Trading LLC"
   - licenseNumber: "BT-12345"
   - address: "Abu Dhabi, UAE"

#### Create Test User & Employee
1. Open `User` table
2. Add new record:
   - email: "john.doe@baynunah.ae"
   - role: "EMPLOYEE"
   - passToken: Generate a UUID (e.g., "550e8400-e29b-41d4-a716-446655440000")
   - entityId: Select the entity you created
   - isActive: true

3. Open `Employee` table
4. Add new record:
   - userId: Select the user you created
   - entityId: Select the entity
   - employeeNumber: "EMP-001"
   - firstName: "John"
   - lastName: "Doe"
   - position: "Software Engineer"
   - department: "IT"
   - contractType: "UNLIMITED"
   - joinDate: Current date
   - contractStartDate: Current date
   - basicSalary: 15000.00

### Accessing the Employee Pass

After creating test data, access the employee pass using the pass token:

```
http://localhost:3000/pass/550e8400-e29b-41d4-a716-446655440000
```

Replace the UUID with your actual passToken.

## Architecture Overview

### Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide Icons

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL

**Authentication:**
- Pass-based (QR code)
- JWT tokens
- No passwords for employees

### Database Structure

```
entities (companies)
  └── users (auth accounts)
      └── employees (employee details)
          ├── timeAttendance
          ├── leaveRequests
          ├── leaveBalances
          ├── documents
          ├── reimbursements
          └── complianceAlerts
```

### Pass System Flow

```
1. HR Admin generates pass → Creates User + Employee
2. Pass token generated (UUID)
3. Employee receives pass link/QR code via email
4. Employee scans QR or opens link
5. Token validated → JWT issued
6. Access granted to employee portal
```

## Key Features Implemented

### ✅ Phase 1: Foundation (COMPLETE)
- [x] Project scaffolding
- [x] Database schema
- [x] UAE compliance library
- [x] Development environment

### ✅ Phase 2: Pass System (MVP COMPLETE)
- [x] Pass-based authentication
- [x] Employee Pass with QR code
- [x] Pass validation API
- [x] vCard generation (save contact)
- [x] Pass access routing

### ✅ Phase 3: Employee Portal (BASIC)
- [x] Employee dashboard
- [x] Quick stats display
- [x] Recent activity feed
- [x] Quick action buttons

### 🚧 In Progress
- [ ] Time tracking (clock in/out)
- [ ] Leave request system
- [ ] Document upload
- [ ] Profile management

### 📋 Upcoming
- [ ] HR Admin portal
- [ ] Compliance monitoring
- [ ] Recruitment module
- [ ] Notifications
- [ ] PWA features

## UAE Compliance Features

### Gratuity Calculator
```typescript
import { calculateGratuity } from '@/lib/uae-compliance'

const gratuity = calculateGratuity(
  15000,  // basic salary
  new Date('2020-01-01'),  // join date
  new Date()  // end date (optional)
)
// Returns calculated gratuity amount
```

### Leave Accrual
```typescript
import { calculateAnnualLeave } from '@/lib/uae-compliance'

const leaveEntitlement = calculateAnnualLeave(
  new Date('2023-01-01'),  // join date
  new Date()  // calculation date
)
// Returns leave days entitled (pro-rata)
```

### Overtime Calculation
```typescript
import { calculateOvertimePay } from '@/lib/uae-compliance'

const overtimePay = calculateOvertimePay(
  15000,  // basic salary
  2.5,    // overtime hours
  false   // is night/weekend?
)
// Returns overtime payment amount
```

## API Endpoints

### Pass Authentication
```
POST /api/auth/pass-validate
Body: { passToken: "uuid" }
Response: { success: true, token: "jwt", user: {...} }
```

## Customization Guide

### Branding Colors

Update in `tailwind.config.ts`:

```typescript
baynunah: {
  teal: '#00A9A5',  // Primary color
  green: '#4CAF50', // Secondary color
  navy: '#1E3A5F',  // Dark accent
}
```

### Entity Configuration

Multiple entities are supported. Each employee is linked to an entity:
- Baynunah Trading LLC
- Baynunah Services LLC
- Baynunah Consulting LLC
- etc.

### Leave Types

Configured in Prisma schema:
- ANNUAL (30 days/year)
- SICK (90 days total)
- MATERNITY (60 days)
- PATERNITY (3-5 days)
- EMERGENCY
- OFFSET_DAY
- UNPAID

## Security Best Practices

1. **Never commit .env file**
   - Use `.env.example` as template
   - Keep secrets secure

2. **Pass Token Security**
   - Tokens are UUIDs (non-guessable)
   - Validated on every request
   - Can be revoked (isActive = false)

3. **JWT Tokens**
   - 24-hour expiry
   - Signed with secret key
   - Contains minimal data

4. **Database Security**
   - Use connection pooling
   - Enable SSL in production
   - Regular backups

## Deployment Guide

### Recommended Platform: Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login
   vercel login
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Add in Vercel dashboard:
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - JWT_SECRET
   - NEXT_PUBLIC_APP_URL

3. **Database**
   - Use Supabase (managed PostgreSQL)
   - Or Neon, PlanetScale, etc.

### Alternative: Docker

```dockerfile
# Coming soon - Dockerfile for self-hosting
```

## Troubleshooting

### Issue: Prisma Client Not Generated
```bash
npx prisma generate
```

### Issue: Database Connection Failed
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Check firewall/network access

### Issue: Pass Not Working
- Verify passToken exists in database
- Check user.isActive = true
- Ensure employee record exists

### Issue: Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## Development Workflow

1. **Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Database Changes**
   ```bash
   # Edit prisma/schema.prisma
   npx prisma db push
   npx prisma generate
   ```

3. **Code & Test**
   ```bash
   npm run dev
   # Test at http://localhost:3000
   ```

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

## Performance Tips

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize images before upload

2. **Database Queries**
   - Use Prisma's include/select wisely
   - Add indexes for frequent queries
   - Use pagination

3. **API Routes**
   - Implement caching where appropriate
   - Use middleware for auth checks
   - Return minimal data

4. **Frontend**
   - Use React Server Components
   - Lazy load components
   - Minimize client-side JavaScript

## Testing

### Manual Testing Checklist

- [ ] Employee pass displays correctly
- [ ] QR code is scannable
- [ ] Pass validation works
- [ ] Dashboard loads with data
- [ ] Leave balance is accurate
- [ ] Clock in/out functions
- [ ] Document upload works
- [ ] Mobile responsive
- [ ] Dark mode (if implemented)

### Automated Testing (Future)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## Support & Documentation

- **Technical Docs**: See ARCHITECTURE.md
- **API Docs**: See /api-docs (coming soon)
- **User Guide**: See /docs/user-guide.md (coming soon)

## Contributing

This is a private project for Baynunah Group. Internal contributors:

1. Follow code style (Prettier + ESLint)
2. Write clear commit messages
3. Test before pushing
4. Update documentation

## License

Proprietary - All rights reserved by Baynunah Group.

## Changelog

### v1.0.0 (2026-01-27)
- Initial release
- Pass-based authentication
- Employee portal MVP
- UAE compliance library
- Basic dashboard

---

**Need Help?**
Contact: hr@baynunah.ae
