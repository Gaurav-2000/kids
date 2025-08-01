# Little Start - Kids E-commerce Platform

A modern, fully-functional e-commerce platform for kids clothing built with Next.js 14, TypeScript, Prisma, and NextAuth.

## 🚀 Features

### 🛍️ Customer Features
- **Product Browsing**: Browse products by categories, collections, and gender
- **Search & Filters**: Advanced search with price, category, and sorting filters
- **Shopping Cart**: Add/remove items, update quantities, persistent cart
- **User Authentication**: Sign up/sign in with email or Google OAuth
- **Checkout Process**: Complete order placement with multiple payment options
- **Order Tracking**: View order history and track order status
- **Responsive Design**: Mobile-first design that works on all devices

### 👨‍💼 Admin Features
- **Dashboard**: Overview of products, users, orders, and revenue
- **Product Management**: Add, edit, delete products with image uploads
- **Order Management**: View and process customer orders
- **User Management**: Manage customer accounts
- **Category Management**: Organize products into categories

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/littlestart"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npm run db:seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Default Login Credentials

- **Admin**: admin@littlestart.com / admin123
- **Test User**: test@example.com / password123

## ✅ Fully Functional Features

- ✅ Responsive navigation with mobile menu
- ✅ Working search functionality
- ✅ Product browsing and filtering
- ✅ Shopping cart with persistence
- ✅ User authentication (email + Google OAuth)
- ✅ Complete checkout process
- ✅ Order management
- ✅ Admin dashboard
- ✅ Product management
- ✅ Database integration
- ✅ API endpoints
- ✅ Image optimization with fallbacks

**Little Start** - Ready for production! 🚀
