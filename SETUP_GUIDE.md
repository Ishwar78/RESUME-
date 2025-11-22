# Portfolio Admin Panel - Complete Setup Guide

This guide will help you set up and run your new dynamic portfolio website with a full admin panel.

## Architecture Overview

### Backend
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based (email/password)
- **File Uploads**: Local `/uploads` directory (ready for Cloudinary integration)

### Frontend
- **Framework**: React 18 with React Router 6
- **Styling**: TailwindCSS 3
- **UI Components**: Radix UI + Lucide Icons
- **Admin Pages**: Protected routes with authentication

### Database Models
1. **AboutSection** - Profile info, social links, resume URL
2. **SkillCategory** - Organized skills with proficiency levels
3. **Project** - Portfolio projects with details, gallery, demo videos
4. **ExperienceEntry** - Work experience timeline
5. **AdminUser** - Admin authentication (email/password with bcrypt)

---

## Step 1: Environment Setup

### 1.1 Clone/Access Your Project
```bash
# Your project is already set up at /
# All files have been created
```

### 1.2 Configure Environment Variables

**Option A: Using DevServerControl (Recommended for secrets)**

1. Click "Open Settings" in the top right
2. Set the following environment variables:
```
MONGO_URI=mongodb+srv://sharmaishwar970:ISHWAR2002@cluster0.b73q6ph.mongodb.net/Portfolio
JWT_SECRET=your-secure-jwt-secret-key-here
NODE_ENV=development
```

**Option B: Create .env file**

Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb+srv://sharmaishwar970:ISHWAR2002@cluster0.b73q6ph.mongodb.net/Portfolio
JWT_SECRET=your-secure-jwt-secret-key-here
NODE_ENV=development
```

---

## Step 2: Install Dependencies

All dependencies have been installed automatically. They include:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT auth
- `multer` - File uploads
- `react-markdown` - Markdown rendering
- All React UI components and utilities

---

## Step 3: Initialize Admin User

Run the setup script to create the default admin user:

```bash
npx tsx server/scripts/setup-admin.ts
```

This will create:
- **Email**: `admin@example.com`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

---

## Step 4: Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:8080` with both frontend and backend running.

### What's Running:
- React SPA on `/`
- API endpoints on `/api/*`
- Admin panel on `/admin/*`
- Static files from `/public`

---

## Step 5: First Time Access

### Public Portfolio
- **URL**: `http://localhost:8080/`
- Shows your portfolio (initially with sample data)

### Admin Panel
- **URL**: `http://localhost:8080/admin/login`
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## Step 6: Populate Your Content

### 1. Update About Section
1. Go to `/admin/dashboard` → "About Section"
2. Fill in your profile information
3. Upload profile photo and resume PDF
4. Add social links (GitHub, LinkedIn, etc.)
5. Click "Save Changes"

### 2. Manage Skills
1. Go to `/admin/dashboard` → "Skills"
2. Create skill categories (Frontend, Backend, Tools, etc.)
3. Add skills within each category with proficiency levels
4. Toggle "Show in Highlights" for featured skills

### 3. Add Projects
1. Go to `/admin/dashboard` → "Projects"
2. Click "New Project"
3. Fill in project details:
   - Title and URL slug (must be unique)
   - Description and tech stack
   - Project type (personal, freelance, etc.)
   - Thumbnail image
   - Live URL and GitHub links
   - Featured flag
4. Save and edit to add:
   - Detailed markdown content
   - Gallery images
   - Demo video URL

### 4. Add Experience
1. Go to `/admin/dashboard` → "Experience"
2. Click "New Entry"
3. Fill in work experience details
4. Add description bullets and tech used
5. Mark as current if still working there

---

## API Endpoints Reference

### Public Endpoints (No Auth Required)
```
GET  /api/about                    # Get about section
GET  /api/skills                   # Get all skills (grouped by category)
GET  /api/projects                 # Get all projects
GET  /api/projects?featured=true   # Get featured projects only
GET  /api/projects/:slug           # Get single project detail
GET  /api/experience               # Get all experience entries
```

### Admin Authentication
```
POST /api/admin/auth/login         # Login with email/password
POST /api/admin/auth/logout        # Logout
```

### Protected Admin Endpoints (JWT Auth Required)
```
# About
GET  /api/admin/about              # Get about (for editing)
PUT  /api/admin/about              # Update about section

# Skills
GET  /api/admin/skills             # Get all categories
POST /api/admin/skills-category    # Create category
PUT  /api/admin/skills-category/:id        # Update category
DELETE /api/admin/skills-category/:id      # Delete category
POST /api/admin/skills-category/:id/skills # Add skill to category
PUT  /api/admin/skills-category/:id/skills/:skillId # Update skill
DELETE /api/admin/skills-category/:id/skills/:skillId # Delete skill

# Projects
GET  /api/admin/projects           # Get all projects
POST /api/admin/projects           # Create project
GET  /api/admin/projects/:id       # Get project (for editing)
PUT  /api/admin/projects/:id       # Update project
DELETE /api/admin/projects/:id     # Delete project

# Experience
GET  /api/admin/experience         # Get all entries
POST /api/admin/experience         # Create entry
GET  /api/admin/experience/:id     # Get entry (for editing)
PUT  /api/admin/experience/:id     # Update entry
DELETE /api/admin/experience/:id   # Delete entry

# File Uploads
POST /api/admin/upload/image       # Upload image file
POST /api/admin/upload/pdf         # Upload PDF file
POST /api/admin/upload/video       # Upload video file
```

---

## File Structure

```
project/
├── client/                          # React frontend
│   ├── pages/
│   │   ├── Index.tsx               # Home page
│   │   ├── AdminLogin.tsx          # Admin login
│   │   ├── AdminDashboard.tsx      # Admin dashboard
���   │   ├── AdminAbout.tsx          # About management
│   │   ├── AdminSkills.tsx         # Skills management
│   │   ├── AdminProjects.tsx       # Projects management
│   │   ├── AdminExperience.tsx     # Experience management
│   │   ├── ProjectDetail.tsx       # Project detail page
│   │   └── ... (other pages)
│   ├── components/
│   │   ├── ProtectedRoute.tsx      # Auth guard component
│   │   └── ... (UI components)
│   ├── hooks/
│   │   ├── useAuth.ts             # Authentication hook
│   │   └── useApi.ts              # API requests hook
│   └── ...
│
├── server/                          # Express backend
│   ├── models/                      # MongoDB schemas
│   │   ├── AboutSection.ts
│   │   ├── SkillCategory.ts
│   │   ├── Project.ts
│   │   ├── ExperienceEntry.ts
│   │   └── AdminUser.ts
│   ├── routes/                      # API route handlers
│   │   ├── public.ts               # Public API
│   │   ├── auth.ts                 # Auth endpoints
│   │   ├── upload.ts               # File uploads
│   │   ├── admin-about.ts
│   │   ├── admin-skills.ts
│   │   ├── admin-projects.ts
│   │   └── admin-experience.ts
│   ├── middleware/
│   │   ├── auth.ts                 # JWT auth middleware
│   │   └── upload.ts               # Multer config
│   ├── config/
│   │   └── db.ts                   # MongoDB connection
│   ├── scripts/
│   │   └── setup-admin.ts          # Admin user setup
│   └── index.ts                     # Express app setup
│
├── public/
│   └── uploads/                     # Uploaded files directory
│
├── shared/                          # Shared types
│   └── api.ts
│
└── package.json
```

---

## Deployment Instructions

### Build for Production
```bash
npm run build
```

This creates:
- `dist/spa/` - React build
- `dist/server/` - Express build

### Run Production Build
```bash
npm start
```

### Deploy to Netlify (Recommended)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Create `netlify.toml` (already exists)

3. Deploy:
```bash
netlify deploy --prod
```

4. Set environment variables in Netlify dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`

---

## Customization Guide

### Change Default Admin Credentials
1. Create a new admin user via the script with your desired email
2. Update the setup script and run it again
3. Delete the old admin from MongoDB

### Add More Skill Levels
Edit `server/models/SkillCategory.ts`:
```typescript
level: {
  type: String,
  enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'],
  // Add more levels here
}
```

### Customize Admin Dashboard
Edit `client/pages/AdminDashboard.tsx` to add more sections, change colors, or add shortcuts.

### Style the Project Detail Page
Edit `client/pages/ProjectDetail.tsx` and modify the Tailwind classes to match your design.

### Add More File Types
Edit `server/middleware/upload.ts` to support more file types (SVG, WebP, etc.)

---

## Troubleshooting

### MongoDB Connection Error
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas network whitelist
- Ensure IP address is allowed

### JWT Authentication Failing
- Clear browser localStorage
- Log out and log back in
- Regenerate `JWT_SECRET` if compromised

### File Upload Issues
- Check `/public/uploads` directory exists
- Verify file size limits in `server/middleware/upload.ts`
- Check file MIME type restrictions

### Admin Login Not Working
- Verify MongoDB is connected first
- Check admin user exists: Run setup script again
- Clear browser cache and localStorage

---

## Security Best Practices

### Before Going Live:
1. ✅ Change JWT_SECRET to a strong random key
2. ✅ Change admin password from default
3. ✅ Set NODE_ENV to 'production'
4. ✅ Use HTTPS only
5. ✅ Set strong MongoDB password
6. ✅ Configure MongoDB IP whitelist
7. ✅ Add rate limiting to login endpoint
8. ✅ Enable CORS restrictions
9. ✅ Use httpOnly cookies for tokens (optional upgrade)
10. ✅ Regular backups of MongoDB

---

## Performance Optimization

### Frontend
- Images are served from `/uploads` (consider Cloudinary)
- Use responsive images with proper sizing
- Implement lazy loading for gallery images

### Backend
- MongoDB indexes are auto-created by Mongoose
- Consider adding caching for GET requests
- Implement pagination for large data sets

---

## Next Steps

1. ✅ Set up environment variables
2. ✅ Run setup-admin.ts to create admin user
3. ✅ Start dev server with `npm run dev`
4. ✅ Log into admin panel
5. ✅ Populate your portfolio content
6. ✅ Customize styling and design
7. ✅ Test all features
8. ✅ Deploy to production

---

## Support & Help

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Mongoose Docs](https://mongoosejs.com/)
- [React Router Docs](https://reactrouter.com/)
- [TailwindCSS Docs](https://tailwindcss.com/)

### Common Questions

**Q: Can I use a different database?**
A: Yes, but you'll need to create new models. MongoDB is optimized for this setup.

**Q: How do I add more admin users?**
A: Create them through MongoDB directly or add a user management page in the admin panel.

**Q: Can I integrate with Cloudinary?**
A: Yes! Replace the file upload middleware in `server/middleware/upload.ts`

**Q: How do I add more fields to projects?**
A: Edit the Project model in `server/models/Project.ts` and the admin form in `client/pages/AdminProjects.tsx`

---

## License

This portfolio system is yours to use and modify. Feel free to customize it to your needs!

---

**Created with ❤️ by Builder.io Fusion**
Last Updated: 2024
