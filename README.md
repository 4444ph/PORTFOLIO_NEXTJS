This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Panel

This portfolio includes a complete content management system accessible at `/admin`.

### Setup

1. Ensure MongoDB is running (local or Atlas)
2. Set environment variables in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ADMIN_USERNAME=(your admin username can be anything)
   ADMIN_PASSWORD=(your admin password can be anything)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

### Usage

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Login with your admin credentials (default: admin/admin123)
3. Manage your portfolio content:
   - **Hero** - Edit hero section content
   - **Skills** - Add/edit/delete skills
   - **Experience** - Manage work experience
   - **Projects** - Add/edit/delete projects

### Features

- 🔐 JWT-based authentication
- ✨ Modern admin UI with retro aesthetic
- 📝 Full CRUD operations for all content
- 🔄 Real-time updates on frontend
- 📱 Responsive design
- 🎨 Success/error notifications

> **Note:** For production, change the default admin credentials and use a strong JWT secret!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
