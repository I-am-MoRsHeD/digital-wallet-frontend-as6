# 💳 Digital Wallet Frontend

A **secure, role-based, and user-friendly** frontend application for a **Digital Wallet System** (similar to bKash or Nagad) built with **React.js**, **Redux Toolkit**, and **RTK Query**.  
This app consumes a backend API to enable **Users**, **Agents**, and **Admins** to perform financial operations and manage wallets seamlessly.

---

## 🚀 Features

### 🌐 Public Landing Section
- Responsive landing page with navbar, hero banner, and footer
- About, Features, Contact, and FAQ pages
- Smooth transitions, skeleton loaders, and realistic data

### 🔑 Authentication
- JWT-based login & registration (User / Agent)
- Persisted authentication state
- Role-based redirects
- Secure logout

### 👤 User Dashboard
- Wallet overview with balance & recent transactions
- Deposit, Withdraw, and Send Money
- Transaction history with pagination & filtering
- Profile management

### 🏪 Agent Dashboard
- Cash In/Out overview with balance & recent transactions
- Cash-in & cash-out operations for users
- Agent Transaction history with pagination & filtering
- Profile management

### 🛠️ Admin Dashboard
- System overview: total users, agents, transactions, volume
- Manage users & agents (block/unblock, approve/suspend)
- View/filter/search all transactions
- Profile management

### 🎨 General Features
- Role-based navigation menus
- Global loading & error handling
- Toast notifications
- Dark/Light theme toggle
- Charts & tables for data visualization
- Fully responsive design with accessibility considerations

---

## 🛠️ Tech Stack

### Frontend
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (form validation)
- [Lucide Icons](https://lucide.dev/)

### Backend (separate repo)
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt (authentication)

---

## 📦 Installation & Setup

### 1. Clone Repositories
```bash
git clone https://github.com/I-am-MoRsHeD/digital-wallet-frontend-as6
cd digital-wallet-frontend-as6
```
### 2. Install Dependencies
```bash
npm i
# or
bun i
```
### 3. Environment Variables
```bash
Create a .env file in the frontend as per .env.example
```
### 4. Run the project
```bash
npm run dev
# or 
bun dev
```

---
### 🌍 Deployment
- Frontend : Vercel/Netlify
- Backend : Render/Railway/Heroku
- Make sure CORS, cookies, and HTTPS (secure: true, sameSite: "none") are configured properly.

---

### 🎥 Demo
- Frontend : https://digital-wallet-frontend-as6.vercel.app/
- Backend : https://digital-wallet-backend-as5.vercel.app/

---
