# Baynunah HR Portal

A comprehensive, mobile-first HR management system designed specifically for the Baynunah Group in Abu Dhabi, UAE. This system is built to help a solo HR professional manage a startup group while ensuring full UAE Labor Law compliance.

## 🎯 Project Overview

This is NOT a full HRIS - it's a practical, mobile-first HR assistant that reduces administrative burden while ensuring UAE Labor Law compliance.

### Key Features

- **Pass-Based Authentication System** - No direct portal access except for HR Admin
- **Employee Portal** - Self-service profile management, time tracking, leave requests
- **UAE Labor Law Compliance Engine** - Automated calculations for gratuity, leave, overtime
- **Time & Attendance Management** - Clock in/out with location tracking
- **Leave Management System** - UAE-compliant leave types and workflows
- **Document Management** - Upload, track, and manage compliance documents
- **Recruitment Module** - Candidate tracking, interview scheduling, onboarding
- **HR Admin Dashboard** - Complete system management and analytics
- **Mobile-First PWA** - Installable on mobile devices with offline capabilities

## 🏗️ Technology Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Progressive Web App (PWA)**

### Backend
- **Next.js API Routes** (Serverless)
- **Prisma ORM**
- **PostgreSQL** (via Supabase)

### Key Libraries
- **QR Code Generation** - for employee passes
- **PDF Generation** - for contracts and certificates
- **Date/Time** - UAE timezone support
- **JWT Authentication** - pass-based access

## 📁 Project Structure

```
baynunah-hr-portal/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── admin/             # HR Admin portal
│   ├── employee/          # Employee portal
│   ├── pass/              # Pass-based access
│   └── api/               # API routes
├── components/            # Reusable React components
├── lib/                   # Utility functions and libraries
│   ├── uae-compliance.ts  # UAE Labor Law calculations
│   ├── prisma.ts          # Prisma client
│   └── auth.ts            # Authentication utilities
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── ARCHITECTURE.md       # Detailed system architecture
└── package.json          # Dependencies

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ismaelloveexcel/baynunah-hr-portal.git
   cd baynunah-hr-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials and other configuration:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/baynunah_hr"
   NEXTAUTH_SECRET="your-secret-key"
   JWT_SECRET="your-jwt-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Database Schema

The database schema is designed to handle:

- **User Management** - Users, Employees, Candidates, Hiring Managers
- **Time & Attendance** - Clock in/out records, overtime tracking
- **Leave Management** - Leave requests, balances, approval workflows
- **Document Management** - Employee documents with expiry tracking
- **Compliance Alerts** - Automated alerts for compliance issues
- **Reimbursements** - Expense submission and approval
- **Recruitment** - Candidate applications, interviews
- **Notifications** - In-app notification system
- **Audit Logs** - Complete audit trail

See `prisma/schema.prisma` for the complete schema definition.

## 🇦🇪 UAE Labor Law Compliance

The system includes comprehensive UAE Labor Law compliance features:

### Gratuity Calculation
- Years 1-5: 21 days per year
- Years 5+: 30 days per year

### Leave Entitlements
- **Annual Leave**: 30 days after 1 year (pro-rata for partial years)
- **Sick Leave**: 90 days (15 full pay, 30 half pay, 45 unpaid)
- **Maternity Leave**: 60 days (45 full pay, 15 half pay)

### Working Hours
- Standard: 8 hours/day, 48 hours/week
- Ramadan: 6 hours/day
- Overtime: 125% standard, 150% night/weekend

### Compliance Monitoring
- Contract expiry tracking
- Visa & Emirates ID expiry alerts
- Document expiry notifications
- Overtime limit monitoring
- WPS submission deadlines

## 🎨 Design Principles

- **Mobile-First** - Optimized for mobile devices (80% of usage)
- **Clean & Minimalist** - Soft shadows, rounded corners, white space
- **Icon-Driven** - Clear, colorful icons with labels
- **Card-Based Layout** - Modular, scannable information
- **Touch-Friendly** - 44px minimum touch targets
- **Baynunah Branding** - Teal/green color scheme

## 🔐 Security

- Pass-based authentication (unique tokens)
- JWT with 24-hour expiry
- HTTPS only
- Input validation with Zod
- SQL injection prevention via Prisma
- XSS prevention via React
- Audit logging for sensitive operations

## 📱 Progressive Web App (PWA)

The application can be installed on mobile devices and includes:
- Offline capabilities
- Push notifications
- Camera access for document scanning
- Geolocation for attendance tracking
- Add to home screen

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

## 📊 Implementation Phases

### Phase 1: Architecture & Foundation ✅
- [x] Technology stack defined
- [x] Project structure created
- [x] Database schema designed
- [x] Development environment set up
- [x] UAE compliance library created

### Phase 2: Core Pass System (In Progress)
- [ ] Employee Pass with QR code
- [ ] Pass authentication flow
- [ ] Entity selection mechanism
- [ ] Pass distribution system

### Phase 3: Employee Portal
- [ ] Dashboard with widgets
- [ ] Profile management
- [ ] Time tracking (clock in/out)
- [ ] Leave requests
- [ ] Document uploads

### Phase 4: HR Admin Portal
- [ ] Analytics dashboard
- [ ] Employee management
- [ ] Document generation
- [ ] Compliance monitoring
- [ ] System configuration

### Phase 5: Advanced Features
- [ ] Recruitment module
- [ ] Hiring manager portal
- [ ] Notification system
- [ ] PWA optimization
- [ ] Production deployment

## 🤝 Contributing

This is a private project for Baynunah Group. For questions or support, contact the HR department.

## 📄 License

Proprietary - All rights reserved by Baynunah Group.

## 🆘 Support

For technical support or questions:
- **HR Contact**: hr@baynunah.ae
- **Technical Issues**: Open an issue in this repository

## �� Notes

- This system is specifically designed for UAE Labor Law compliance
- All calculations follow Federal Decree-Law No. 33 of 2021
- The system supports both English and Arabic (future enhancement)
- Multi-entity support is built-in for the Baynunah Group structure

---

**Last Updated**: January 27, 2026  
**Version**: 1.0.0  
**Location**: Abu Dhabi, UAE 🇦🇪
