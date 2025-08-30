# React + Vite

# 🛍️ Om Frontend – eCommerce Web App

Welcome to the **Om Frontend** repository – a fully responsive, modern **eCommerce web application** built with **React.js + Redux**. This frontend connects to the backend via REST APIs and enables both **users** and **admins** to interact with a powerful product system.

---

## 🌐 Live Demo

🔗 **[Visit Now → Om Frontend](https://om-frontend.vercel.app/login)**  
---

## ✨ Features

### 👤 Users
- 🔍 Browse all available products
- 📄 View detailed product descriptions
- 🛒 Add products to shopping cart
- 💳 Buy products directly

### 🔐 Admins
- 🧾 Admin Dashboard
- ➕ Create New Products
- ✏️ Update Existing Products
- ❌ Delete Products
- 🛠️ Manage Product Inventory

---

## 🛠️ Tech Stack

### 💻 Frontend
- ⚛️ React.js
- 🎯 Redux Toolkit
- 🔗 React Router
- 🎨 Tailwind CSS
- ⚡ Vite
- 📡 Axios

### 🧠 Backend (in [`Om-backend`](https://github.com/Sid9879/Om-backend))
- 🟢 Node.js + Express.js
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication
- ☁️ Cloudinary (image uploads)

---

## 📁 Folder Structure

Om-frontend/
├── public/
├── src/
│ ├── assets/ # Images & logos
│ ├── components/ # Reusable UI components
│ ├── pages/ # Views like Home, Product, AdminPanel, etc.
│ ├── routes/ # App routing and protection
│ ├── store/ # Redux state slices
│ ├── App.jsx
│ └── main.jsx
├── .env
├── package.json
└── README.md



---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository

git clone https://github.com/Sid9879/Om-frontend.git
cd Om-frontend
2️⃣ Install dependencies
npm install
3️⃣ Add environment variables
Create a .env file in root:

VITE_API_URL=http://localhost:8090/api
Replace with your production or local backend URL.

4️⃣ Start development server
npm run dev
App runs at http://localhost:5173

📦 API Endpoints (used by frontend)
Method	Endpoint	Description
GET	/products	Fetch all products
GET	/products/:id	Fetch single product
POST	/products	Create product (Admin)
PUT	/products/:id	Update product (Admin)
DELETE	/products/:id	Delete product (Admin)
POST	/auth/login	Login
POST	/cart	Add item to cart
POST	/order	Place order

🧪 Authentication & Authorization
🔐 JWT-based auth with secure token handling

👤 Role-based access: admin & user

🔒 Protected routes for Admin Dashboard

🔮 Upcoming Features
📦 Order history tracking

📊 Admin analytics dashboard

💸 Payment gateway integration (e.g. Razorpay/Stripe)

📬 Email confirmations on order

👨‍🎓 Author
Siddharth Singh
📫 GitHub – @Sid9879
