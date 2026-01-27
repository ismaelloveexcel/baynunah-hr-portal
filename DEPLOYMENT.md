# Deployment Guide - Baynunah HR Portal

## Pre-Deployment Checklist

### 1. Environment Setup ✅
- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] JWT secrets generated (use: `openssl rand -base64 32`)
- [ ] NEXT_PUBLIC_APP_URL set to production URL
- [ ] Email service configured (Resend/SendGrid)
- [ ] File storage configured (Supabase/S3)

### 2. Database Setup ✅
- [ ] Production database created
- [ ] Prisma schema pushed: `npx prisma db push`
- [ ] Database backups configured
- [ ] Connection pooling enabled
- [ ] SSL enabled

### 3. Security Hardening ✅
- [ ] All secrets stored securely (not in code)
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Security headers configured

### 4. Performance Optimization ✅
- [ ] Images optimized
- [ ] Build tested: `npm run build`
- [ ] Bundle size analyzed
- [ ] CDN configured for static assets
- [ ] Caching strategy implemented

### 5. Testing ✅
- [ ] All features manually tested
- [ ] Mobile responsiveness verified
- [ ] Different browsers tested
- [ ] Pass system tested
- [ ] API endpoints tested
- [ ] Error pages tested

## Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Pros:**
- Zero-config deployment
- Automatic HTTPS
- Edge network (fast globally)
- Preview deployments
- Built-in analytics
- Free tier available

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure Environment Variables**
   - Go to Vercel dashboard → Project → Settings → Environment Variables
   - Add all variables from `.env`:
     ```
     DATABASE_URL
     NEXTAUTH_SECRET
     JWT_SECRET
     NEXT_PUBLIC_APP_URL
     RESEND_API_KEY
     SUPABASE_URL
     SUPABASE_ANON_KEY
     ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

6. **Configure Custom Domain** (Optional)
   - Go to Vercel dashboard → Project → Settings → Domains
   - Add: `hr.baynunah.ae` or similar
   - Update DNS records as instructed

### Option 2: Docker + AWS/DigitalOcean

**Dockerfile:**
```dockerfile
# Coming soon - full Docker setup
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Option 3: Traditional VPS (Ubuntu)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/ismaelloveexcel/baynunah-hr-portal.git
cd baynunah-hr-portal

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with production values

# Generate Prisma client
npx prisma generate

# Build application
npm run build

# Start with PM2
pm2 start npm --name "baynunah-hr" -- start

# Set up PM2 to start on boot
pm2 startup
pm2 save

# Configure Nginx reverse proxy
sudo apt install nginx
# Configure Nginx (see below)
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name hr.baynunah.ae;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Options

### Option 1: Supabase (Recommended) ⭐

**Pros:**
- Managed PostgreSQL
- Auto backups
- Real-time subscriptions
- File storage included
- Free tier: 500MB database

**Setup:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy database URL (Settings → Database → Connection string)
4. Update `DATABASE_URL` in environment

### Option 2: Neon

**Pros:**
- Serverless PostgreSQL
- Auto-scaling
- Generous free tier
- Fast cold starts

**Setup:**
1. Create account at [neon.tech](https://neon.tech)
2. Create database
3. Copy connection string
4. Update `DATABASE_URL`

### Option 3: Self-Hosted PostgreSQL

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb baynunah_hr

# Create user
sudo -u postgres createuser --interactive

# Update DATABASE_URL
DATABASE_URL="postgresql://user:password@localhost:5432/baynunah_hr"
```

## Post-Deployment Tasks

### 1. Create Initial HR Admin User

Use Prisma Studio or direct SQL:

```sql
INSERT INTO users (id, email, password_hash, role, pass_token, is_active)
VALUES (
  gen_random_uuid(),
  'admin@baynunah.ae',
  '$2a$10$...',  -- bcrypt hash
  'HR_ADMIN',
  gen_random_uuid(),
  true
);
```

Or use Prisma Studio:
```bash
npx prisma studio --browser none
# Opens on port 5555
```

### 2. Configure Email Service

**Using Resend:**
```env
RESEND_API_KEY="re_..."
FROM_EMAIL="hr@baynunah.ae"
```

**Using SendGrid:**
```env
SENDGRID_API_KEY="SG...."
FROM_EMAIL="hr@baynunah.ae"
```

### 3. Set Up File Storage

**Using Supabase Storage:**
- Create bucket: `employee-documents`
- Set policies for authenticated access
- Update environment variables

**Using AWS S3:**
```env
AWS_REGION="me-south-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
S3_BUCKET_NAME="baynunah-hr-documents"
```

### 4. Configure Domain & SSL

**For Vercel:**
- Auto-configured HTTPS
- Add custom domain in dashboard

**For VPS:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d hr.baynunah.ae

# Auto-renewal
sudo certbot renew --dry-run
```

### 5. Set Up Monitoring

**Vercel Analytics:**
- Built-in, no setup required

**Self-Hosted Options:**
- PM2 monitoring: `pm2 monitor`
- Uptime monitoring: UptimeRobot
- Error tracking: Sentry

```bash
# PM2 logs
pm2 logs baynunah-hr

# PM2 monitoring
pm2 monit
```

## Backup Strategy

### Database Backups

**Automated (Supabase):**
- Daily backups included
- Point-in-time recovery

**Manual:**
```bash
# Export database
pg_dump -U username -h hostname baynunah_hr > backup_$(date +%Y%m%d).sql

# Import database
psql -U username -h hostname baynunah_hr < backup.sql
```

**Automated Script:**
```bash
#!/bin/bash
# backup-db.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > /backups/baynunah_hr_$DATE.sql
# Upload to S3 or cloud storage
```

**Cron Job:**
```bash
# Run daily at 2 AM
0 2 * * * /path/to/backup-db.sh
```

### File Backups

If using local storage:
```bash
# Backup uploaded files
tar -czf documents_backup_$(date +%Y%m%d).tar.gz /path/to/uploads
```

## Scaling Considerations

### Horizontal Scaling
- Vercel: Automatic
- Docker: Use Kubernetes or Docker Swarm
- VPS: Load balancer + multiple instances

### Database Scaling
- Read replicas for reporting
- Connection pooling (PgBouncer)
- Regular VACUUM and ANALYZE

### Caching
- Redis for session storage
- CDN for static assets
- API response caching

## Monitoring & Logging

### Application Logs
```bash
# Vercel
vercel logs

# PM2
pm2 logs baynunah-hr --lines 100

# Docker
docker logs baynunah-hr
```

### Performance Monitoring
- Vercel Analytics (built-in)
- Google Lighthouse
- Web Vitals

### Error Tracking
```typescript
// Add Sentry (optional)
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
})
```

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

### Git-based
```bash
# Revert to previous commit
git revert HEAD
git push

# Or reset to specific commit
git reset --hard [commit-hash]
git push --force
```

### Database
```bash
# Restore from backup
psql -U username -h hostname baynunah_hr < backup.sql
```

## Cost Estimates (Monthly)

### Minimal Setup (Startup)
- Vercel Hobby: $0
- Supabase Free: $0
- Domain: $1-2/month
- **Total: ~$2/month**

### Production Setup (Recommended)
- Vercel Pro: $20
- Supabase Pro: $25
- Email (Resend): $10
- Domain: $1-2/month
- **Total: ~$56/month**

### Enterprise Setup
- Vercel Enterprise: $150+
- Dedicated Database: $100+
- Enhanced support: $200+
- **Total: $450+/month**

## Support Contacts

- **Deployment Issues**: deployment@baynunah.ae
- **Database Issues**: dba@baynunah.ae
- **Security Concerns**: security@baynunah.ae

## Compliance & Legal

- [ ] Data residency requirements met (UAE data stays in UAE)
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] GDPR considerations (if applicable)
- [ ] UAE data protection compliance

---

**Last Updated**: January 27, 2026
**Version**: 1.0.0
**Status**: Ready for Production 🚀
