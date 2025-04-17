#  **BookSwap Capstone Project Plan**

RENDER DEPLOYMENT LINK - `https://s63-parv-bookswap.onrender.com`
NETLIFY DEPLOYMENT LINK - `https://stirring-crumble-516475.netlify.app/`

##  **1. Project Overview**

BookSwap is a web-based platform that allows users to buy and sell pre-owned books. It provides an intuitive interface where users can list books for sale, browse available books, and request purchases. The platform is designed to facilitate seamless transactions without the complexity of real-time chat.

---

## **2. How It Works**

### **User Registration & Authentication**

- Users sign up/login using **JWT authentication**.
- Secure authentication ensures that only registered users can list books and request purchases.

### **Listing Books for Sale**

Users can add books to the marketplace by filling out a form with:

- **Title & Author**
- **Genre** (Fiction, Non-fiction, Sci-Fi, etc.)
- **Condition** (New, Like New, Used, Fair)
- **Price**
- **Cover Image** *(Optional)*

### **Browsing & Filtering**

Users can search and filter books based on:

- **Genre** (e.g., Fiction, Romance, Science, History)
- **Condition** (New, Used, Fair) *(Optional)*
- **Price Range** *(Optional)*

### **Wishlist Feature**

- Users can add books to their wishlist for future reference.

### **Request System (No Real-Time Chat)**

- Buyers can send a **purchase request** to the seller.
- The request contains a **buyer message** and optional **contact details**.
- The seller can accept or reject the request.
- No real-time chat—all communication is handled through requests.

### **User Profiles & Reviews** *(Optional)*

- Users can view **seller profiles** before making a purchase.
- Buyers can rate and review sellers after a transaction. *(Optional)*

### **Admin Dashboard (Optional)**

- Admins can **moderate listings** to remove inappropriate or spam content.

---

## **3. Technologies Used**

### **Frontend (React)**

- **React.js** - For building a dynamic and user-friendly UI.
- **React Router** - For navigation between pages.

### **Backend (Node.js & Express.js)**

- **Node.js** - For handling server-side logic.
- **Express.js** - For building API endpoints.

### **Database (MongoDB or SQL)**

- **MongoDB (NoSQL)** - Storing books, users, purchase requests, and reviews.
- **SQL (Optional alternative)** - Structured storage for better relationships.

### **Authentication (JWT)**

- **JSON Web Token (JWT)** - Secure login system for authentication and authorization.

### **Cloud Storage (Optional - Cloudinary)**

- **Cloudinary** - Storing images instead of keeping them in the database.

### **Deployment**

- **Frontend:** Vercel
- **Backend:** Render

---

## **4. Why is BookSwap a Great Capstone Project?**

✅ **Full-Stack MERN Project** – Uses MongoDB, Express, React, and Node.js.

✅ **CRUD Functionality** – Users can add, update, delete, and search books.

✅ **Authentication & Authorization** – Uses JWT for secure login & data protection.

✅ **Scalable & Practical** – Can later add delivery options, premium listings, or seller verification.

✅ **No Chat Complexity** – A simple request system keeps it manageable.

---

## **5. Daily Plan (40-Day Timeline)**

### **Week 1: Project Setup & Initial Designs**

📌 **Day 1:** Create low-fidelity wireframes for BookSwap using Figma.

📌 **Day 2:** Create high-fidelity wireframes & finalize UI/UX design.

📌 **Day 3:** Set up GitHub repository with README, issues, and project tasks.

📌 **Day 4:** Initialize frontend with React (Vite) & set up project structure.

📌 **Day 5:** Initialize backend with Node.js & Express.js, setup basic routes.

📌 **Day 6:** Setup MongoDB database & define basic schema for users and books.

📌 **Day 7:** Implement authentication (JWT) - User signup & login APIs.

---

### **Week 2: Building Core Features**

📌 **Day 8:** Implement JWT authentication in the frontend (React Context API).

📌 **Day 9:** Implement book listing form with fields (title, genre, price, etc.).

📌 **Day 10:** Implement GET API to fetch all books from the database.

📌 **Day 11:** Implement frontend page to display book listings.

📌 **Day 12:** Implement search & filter feature for book listings.

📌 **Day 13:** Implement POST API to add new books to the marketplace.

📌 **Day 14:** Implement frontend logic to submit new book listings.

---

### **Week 3: Enhancing User Experience**

📌 **Day 15:** Implement book details page (shows book description, seller info).

📌 **Day 16:** Implement PUT API to update book details.

📌 **Day 17:** Implement DELETE API to remove a book listing.

📌 **Day 18:** Implement wishlist feature (frontend & backend logic).

📌 **Day 19:** Implement request system (backend: API to send a purchase request).

📌 **Day 20:** Implement request system (frontend: UI to send & manage requests).

📌 **Day 21:** Implement frontend notifications for purchase requests.

---

### **Week 4: Deployment & Testing**

📌 **Day 22:** Deploy backend (Express.js API) on Render.

📌 **Day 23:** Deploy frontend (React app) on Vercel.

📌 **Day 24:** Test authentication system (signup, login, logout).

📌 **Day 25:** Test book listing features (adding, updating, deleting books).

📌 **Day 26:** Test wishlist and request system.

📌 **Day 27:** Perform UI improvements based on testing feedback.

📌 **Day 28:** Optimize API performance & database queries.

---

### **Updated Timeline Adjustments:**

📌 **Day 29:** Implement file upload functionality (Cloudinary or local).

📌 **Day 30:** Update Bruno/API templates in the repo.

📌 **Day 31-40:** Continue with optional features & final revisions.

---

## **6. Expected Credit Points from This Plan**

| **Task** | **Credits** |
| --- | --- |
| Low-fidelity design | 0.5 |
| High-fidelity design | 0.5 |
| GitHub project setup | 0.5 |
| GitHub task tracking (10+ days) | 0.5 |
| GET API used | 0.5 |
| POST API used | 0.5 |
| PUT API used | 0.5 |
| DELETE API used | 0.5 |
| Deployed backend server | 0.5 |
| Database schema created | 0.5 |
| Database read & write | 0.5 |
| Implemented entity relationships | 0.5 |
| Initialized frontend (React) | 0.5 |
| Deployed frontend | 0.5 |
| Created React components | 0.5 |
| Matching design & end state | 0.5 |
| Authentication (JWT) | 0.5 |
| Using JWTs in application | 0.5 |

💡 **Total:** **10+ credits** (excluding optional features)

---

### **Final Notes:**

🚀 **A structured 40-day plan** with a **5-day buffer**.

📌 Optional features can be skipped or added based on time availability.

🛠️ **Consistent daily submissions** are key to earning full credits.

---


