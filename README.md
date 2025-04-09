# 👗 Faishonista

**Faishonista** is a modern fashion e-commerce platform that brings the latest trends, curated collections, and personalized style recommendations to fashion enthusiasts. Whether you're shopping for chic outfits, accessories, or style inspiration — Faishonista has you covered.

## 🌟 Features

- 🛍️ Beautiful product showcase with filter & sort options  
- 🔍 Smart search and category-based browsing  
- 👤 User authentication with login, registration & role-based access  
- 🛒 Cart, Wishlist, and Order Tracking  
- 🧾 Admin panel to manage inventory, users, and orders  
- 💳 Integrated payment gateway (Stripe)  
- ⚡ Fast performance with optimized loading and responsive design  

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Redux Toolkit  
- Tailwind CSS / Bootstrap  
- Axios  

**Backend**  
- Node.js  
- Express.js  
- MongoDB Atlas  
- Multer (for image uploads)  
- JWT (Authentication & Authorization)  

**Others**  
- Stripe API (Payment)  
- Cloudinary (Image Hosting - optional)  

## 🚀 Getting Started

### Prerequisites

- Node.js & npm  
- MongoDB (local or Atlas)  
- Stripe account (for live payment integration)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/faishonista.git
cd faishonista

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in the required MongoDB URI, JWT_SECRET, and Stripe keys

# Start backend server
npm run server

# In a new terminal tab, start the frontend
npm run client
