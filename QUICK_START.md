# 🚀 Portfolio Admin Panel - Quick Start Guide

Welcome to your new dynamic portfolio system! This guide will get you up and running in 5 minutes.

## What You Got

✅ **Complete Backend System**

- Express.js API with MongoDB
- JWT authentication for admin panel
- File upload system (images, PDFs, videos)
- RESTful API endpoints

✅ **Admin Dashboard**

- Secure login page (`/admin/login`)
- Profile/About management
- Skills organization with categories
- Project management with rich details
- Experience/Work history tracking

✅ **Public Portfolio**

- Dynamic content from database
- Project detail pages with markdown content
- Gallery and video support
- Fully responsive design

## 🎯 First 5 Steps

### Step 1: Set Environment Variables (2 min)

```bash
# Your MONGO_URI is already configured
# Set JWT_SECRET for production use

# Option 1: Using Settings UI
# Click "Open Settings" → Set JWT_SECRET

# Option 2: Create .env file
echo 'JWT_SECRET=your-super-secret-key-here' > .env
```

### Step 2: Create Admin User (1 min)

```bash
npx tsx server/scripts/setup-admin.ts
```

This creates: `admin@example.com` / `admin123`

### Step 3: Start Development Server (1 min)

```bash
npm run dev
```

Server runs at `http://localhost:8080`

### Step 4: Access Admin Panel (30 sec)

1. Go to `http://localhost:8080/admin/login`
2. Login with default credentials
3. Dashboard appears!

### Step 5: Add Your Content (1 min)

1. Click "About Section" → Fill your profile
2. Click "Skills" → Add skill categories
3. Click "Projects" → Add portfolio projects
4. Click "Experience" → Add work history

**Done!** Your portfolio is now dynamic 🎉

---

## 📁 What Was Created

```
server/
├── models/              # Database schemas
├── routes/              # API endpoints
├── middleware/          # Auth & file upload
├── config/              # Database config
└── scripts/             # Setup tools

client/
├── pages/
│   ├── Admin*/          # ← 5 new admin pages
│   └── ProjectDetail/   # ← New project detail page
├── hooks/
│   ├── useAuth.ts       # ← Auth hook
│   └── useApi.ts        # ← API hook
└── components/
    └── ProtectedRoute/  # ← Auth guard

shared/
└── types.ts             # ← Shared types
```

---

## 🔑 Key Features

### Authentication

- Email/password login
- JWT tokens (30-day expiry)
- Protected admin routes
- Automatic redirects to login

### Content Management

- **About**: Profile photo, resume, social links
- **Skills**: Categories with proficiency levels
- **Projects**: Rich details with markdown, gallery, videos
- **Experience**: Timeline with descriptions and tech

### File Uploads

- Images: Auto-resize and serve from `/uploads`
- PDFs: For resume downloads
- Videos: Links to demo videos

---

## 🌐 API Endpoints Quick Reference

### Public (No Auth)

```
GET  /api/about                   # Get about data
GET  /api/skills                  # Get all skills
GET  /api/projects                # Get projects list
GET  /api/projects/:slug          # Get project detail
GET  /api/experience              # Get experience
```

### Admin (JWT Auth Required)

```
POST /api/admin/auth/login        # Login
GET  /api/admin/about             # Get (for edit)
PUT  /api/admin/about             # Update
GET  /api/admin/skills            # Get categories
POST /api/admin/skills-category   # Create category
DELETE /api/admin/skills-category/:id  # Delete category
POST /api/admin/projects          # Create project
PUT  /api/admin/projects/:id      # Update project
DELETE /api/admin/projects/:id    # Delete
POST /api/admin/experience        # Create
PUT  /api/admin/experience/:id    # Update
DELETE /api/admin/experience/:id  # Delete
```

---

## 🛠️ Customization Examples

### Change Admin Login Email

1. Edit `server/scripts/setup-admin.ts`
2. Change `admin@example.com` to your email
3. Run the script again

### Add More File Types

Edit `server/middleware/upload.ts` and add MIME types.

### Change Project Detail Design

Edit `client/pages/ProjectDetail.tsx` TailwindCSS classes.

### Customize Skill Levels

Edit `server/models/SkillCategory.ts` schema.

---

## 📚 Full Documentation

See **SETUP_GUIDE.md** for:

- Detailed architecture
- All API endpoints
- Deployment instructions
- Troubleshooting
- Security best practices

---

## ⚠️ Important Notes

### Before Going Live

1. ✅ Change `JWT_SECRET` to a strong key
2. ✅ Change admin password
3. ✅ Set `NODE_ENV=production`
4. ✅ Configure MongoDB credentials securely
5. ✅ Use HTTPS only

### File Uploads

- Files go to `public/uploads/`
- For production, migrate to Cloudinary
- Max file size: 5MB (images), 20MB (PDFs), 100MB (videos)

### Database

- MongoDB connection required
- Collections auto-created by Mongoose
- Backups recommended

---

## 🆘 Troubleshooting

**MongoDB connection error?**

- Check `MONGO_URI` is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure network access is enabled

**Admin login failing?**

- Clear browser localStorage
- Run setup script again
- Check MongoDB is running

**Files not uploading?**

- Check `/public/uploads/` directory exists
- Verify file size limits
- Check browser console for errors

---

## 🎓 Next Steps

1. **Populate Your Portfolio**: Add all your projects and experience
2. **Customize Design**: Modify colors, fonts, layout in TailwindCSS
3. **Add Features**: Integrate with Cloudinary, add comments, etc.
4. **Deploy**: Follow deployment section in SETUP_GUIDE.md
5. **Go Live**: Share your portfolio!

---

## 📞 Support

- **React Router**: https://reactrouter.com/
- **Express.js**: https://expressjs.com/
- **MongoDB**: https://docs.mongodb.com/
- **TailwindCSS**: https://tailwindcss.com/

---

**Built with ❤️ using Builder.io Fusion**

Happy building! 🚀
