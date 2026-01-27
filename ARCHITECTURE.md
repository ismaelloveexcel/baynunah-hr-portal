# Baynunah HR Portal - System Architecture

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui (built on Radix UI)
- **State Management**: React Context + Zustand
- **Forms**: React Hook Form + Zod validation
- **PWA**: next-pwa for Progressive Web App capabilities

### Backend
- **API**: Next.js API Routes (serverless)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: JWT-based pass system
- **File Storage**: Supabase Storage / AWS S3
- **Caching**: Redis (optional for production)

### Key Libraries
- **QR Code**: qrcode.react
- **PDF Generation**: @react-pdf/renderer + jsPDF
- **Date/Time**: date-fns (UAE timezone support)
- **Geolocation**: browser geolocation API
- **Notifications**: Firebase Cloud Messaging (PWA push)
- **Email**: Resend / SendGrid
- **Analytics**: Vercel Analytics

## System Architecture

### Pass-Based Authentication System

```
┌─────────────────────────────────────────────────────────────┐
│                     Pass Generation                          │
│  HR Admin Portal → Generate Pass → Unique Token → QR Code   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   Pass Distribution                          │
│         Email/SMS → Pass Link → Add to Home Screen           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Pass Authentication                       │
│   User Opens Pass → JWT Validation → Role-Based Access      │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema Overview

```
Users
├── id (UUID)
├── email
├── password_hash (for HR admin only)
├── role (EMPLOYEE, CANDIDATE, HIRING_MANAGER, HR_ADMIN)
├── entity_id (FK to Entities)
└── pass_token (unique, for pass-based auth)

Employees
├── id (UUID)
├── user_id (FK to Users)
├── employee_number
├── first_name / last_name
├── position
├── department
├── join_date
├── contract_type
├── salary_structure
└── profile_completion_percentage

Entities
├── id (UUID)
├── name (e.g., "Baynunah Trading LLC")
├── license_number
└── address

TimeAttendance
├── id
├── employee_id
├── clock_in_time
├── clock_out_time
├── location_type (OFFICE, WFH, CLIENT_SITE, etc.)
├── gps_coordinates
└── overtime_hours

LeaveRequests
├── id
├── employee_id
├── leave_type
├── start_date / end_date
├── days_requested
├── status (PENDING, APPROVED, REJECTED)
├── approver_id
└── balance_after_request

Documents
├── id
├── user_id
├── document_type
├── file_url
├── expiry_date
├── status (PENDING, VERIFIED)
└── uploaded_at

ComplianceAlerts
├── id
├── alert_type
├── severity
├── related_employee_id
├── description
└── due_date
```

## Module Architecture

### 1. Pass System Module
**Location**: `/app/pass/[token]`
- Dynamic route for pass access
- QR code display component
- Entity selector
- Offline capability (PWA)
- Contact card generation (vCard format)

### 2. Employee Portal Module
**Location**: `/app/employee/`
- Dashboard (widgets: attendance, leave balance, pending actions)
- Profile management
- Time tracking (clock in/out)
- Leave requests
- Document uploads
- Reimbursements
- Policy library

### 3. HR Admin Portal Module
**Location**: `/app/admin/`
- Analytics dashboard
- Employee management
- Document generation
- Compliance monitoring
- System configuration
- Bulk operations

### 4. Candidate Portal Module
**Location**: `/app/candidate/`
- Application tracking
- Interview scheduling
- Document submission
- Assessment access

### 5. Hiring Manager Portal Module
**Location**: `/app/hiring/`
- Candidate review
- Interview evaluation
- Approval workflows
- Team feedback

### 6. UAE Compliance Engine
**Location**: `/lib/compliance/`
- Calculation utilities:
  - Gratuity calculator
  - Leave accrual calculator
  - Overtime calculator
  - WPS file generator
- Monitoring services:
  - Contract expiry checker
  - Visa expiry tracker
  - Document status validator
  - Working hours monitor
- Alert generator

### 7. Document Generation Module
**Location**: `/lib/documents/`
- Template engine
- PDF generation
- Contract generator (Arabic + English)
- Certificate generator
- Letter templates
- Digital signature support

## Security Implementation

### Pass Token System
```typescript
// Pass token structure
{
  token: "unique_uuid",
  user_id: "user_uuid",
  role: "EMPLOYEE",
  entity_id: "entity_uuid",
  expires_at: "2025-12-31",
  issued_at: "2024-01-01"
}

// JWT payload
{
  sub: "user_id",
  role: "EMPLOYEE",
  entity: "entity_id",
  pass_token: "unique_uuid",
  iat: 1234567890,
  exp: 1234567890
}
```

### Security Measures
1. **Pass tokens**: Unique, non-guessable UUIDs
2. **JWT**: Signed with HS256, 24-hour expiry
3. **Rate limiting**: Prevent brute force
4. **HTTPS only**: All communications encrypted
5. **CORS**: Restricted origins
6. **Input validation**: Zod schemas
7. **SQL injection**: Prisma parameterized queries
8. **XSS prevention**: React automatic escaping
9. **CSRF**: SameSite cookies
10. **Audit logs**: All sensitive operations logged

## Mobile-First Design

### Progressive Web App (PWA)
- Installable on mobile devices
- Offline capabilities
- Push notifications
- Background sync
- Camera access (for document scanning)
- Geolocation (for attendance)

### Responsive Breakpoints
```css
mobile: 320px - 767px (primary focus)
tablet: 768px - 1023px
desktop: 1024px+
```

### Touch-Friendly UI
- Minimum touch target: 44x44px
- Swipe gestures for navigation
- Pull-to-refresh
- Bottom navigation for mobile
- Large, clear buttons
- Simplified forms (one field per screen on mobile)

## Deployment Architecture

### Development
- Local: `localhost:3000`
- Database: Local PostgreSQL or Supabase dev instance

### Staging
- Vercel Preview Deployment
- Supabase Staging Database

### Production
- Platform: Vercel (serverless)
- Database: Supabase (managed PostgreSQL)
- CDN: Vercel Edge Network
- File Storage: Supabase Storage
- Monitoring: Vercel Analytics + Sentry
- Backups: Daily automated backups

## API Structure

```
/api/auth/
  - POST /login (HR admin only)
  - POST /pass-auth (pass token validation)
  - POST /refresh-token

/api/employees/
  - GET /[id] (profile)
  - PATCH /[id] (update profile)
  - GET /[id]/documents
  - POST /[id]/documents (upload)

/api/attendance/
  - POST /clock-in
  - POST /clock-out
  - GET /timesheet
  - GET /overtime

/api/leave/
  - GET /balance
  - POST /request
  - GET /history
  - PATCH /[id] (approve/reject)

/api/admin/
  - GET /dashboard-stats
  - GET /employees
  - POST /employees (bulk import)
  - GET /compliance-alerts
  - POST /generate-document

/api/compliance/
  - GET /calculate-gratuity
  - GET /calculate-leave-accrual
  - GET /generate-wps-file
  - GET /expiry-alerts

/api/pass/
  - POST /generate (create new pass)
  - GET /[token] (validate and get pass data)
  - DELETE /[token] (revoke pass)
```

## UAE Compliance Framework

### Labor Law Compliance Rules

1. **Employment Contracts**
   - Must be registered with MOHRE
   - Probation: Max 6 months
   - Notice period: 30-90 days based on contract

2. **Working Hours**
   - Standard: 8 hours/day, 48 hours/week
   - Ramadan: 6 hours/day
   - Overtime: 125% regular hours, 150% night/weekend

3. **Leave Entitlements**
   - Annual: 30 days/year (after 1 year)
   - Sick: 90 days (15 full, 30 half, 45 unpaid)
   - Maternity: 60 days (45 full, 15 half)

4. **End of Service Benefits (Gratuity)**
   ```
   Years 1-5: 21 days per year
   Years 5+: 30 days per year
   Calculation: (Basic salary / 30) × days
   ```

5. **Wage Protection System (WPS)**
   - Salary transfer by specific date
   - SIF file format compliance
   - Bank account validation

## Implementation Priorities

### Phase 1 (Tonight - Architecture)
✅ Technology stack selected
✅ Architecture documented
✅ Database schema designed
- [ ] Project scaffolding
- [ ] Development environment setup

### Phase 2 (MVP - Week 1)
- [ ] Pass system implementation
- [ ] Employee portal basic features
- [ ] HR admin dashboard
- [ ] Time tracking
- [ ] Leave requests

### Phase 3 (Core Features - Week 2)
- [ ] Document management
- [ ] Compliance engine
- [ ] UAE law calculations
- [ ] Document generation

### Phase 4 (Advanced - Week 3)
- [ ] Recruitment module
- [ ] Hiring manager portal
- [ ] Advanced analytics
- [ ] Notification system

### Phase 5 (Polish - Week 4)
- [ ] PWA optimization
- [ ] Performance tuning
- [ ] Security audit
- [ ] User testing
- [ ] Production deployment

## Development Guidelines

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Component-driven development
- Atomic design principles
- Comprehensive error handling
- Logging (development vs production)

### Testing Strategy
- Unit tests: Vitest
- Integration tests: Playwright
- E2E tests: Cypress (optional)
- API tests: Supertest
- Coverage target: 70%+

### Git Workflow
- Main branch: production-ready
- Develop branch: integration
- Feature branches: feature/[name]
- Commit convention: Conventional Commits

## Cost Estimation

### Monthly Operational Costs (Production)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Email service: $10-20/month
- Domain: $15/year
- **Total**: ~$55-65/month

### One-time Costs
- Development: Self-implemented
- Design assets: Free (Tailwind + Shadcn)
- Icons: Free (Lucide Icons)

## Success Metrics

### Technical KPIs
- Page load time: < 2 seconds
- API response time: < 500ms
- Uptime: 99.9%
- Mobile performance score: > 90

### Business KPIs
- HR follow-ups reduced by 70%
- Document generation time: < 2 minutes
- Compliance alerts: Zero missed deadlines
- Employee satisfaction: > 4.5/5

---

**Last Updated**: 2026-01-27
**Version**: 1.0
**Owner**: Baynunah HR Team
