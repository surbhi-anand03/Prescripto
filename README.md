# 🏥 Prescripto – Doctor Appointment, Prescription & Payment Management System

Prescripto is a **full-stack MERN healthcare web application** that enables users to **book doctor appointments, manage schedules, handle digital prescriptions, and make secure online payments**.
The system is built using a **scalable REST API architecture**, **JWT-based authentication**, **role-based access control**, and **Razorpay payment gateway integration (Test Mode)** for transaction handling and payment flow simulation.

This project demonstrates **end-to-end full stack development**, healthcare workflows, authentication, and payment gateway integration in a production-like environment.

---

## 🚀 Live Demo

🔗 **Deployed Application:**
[https://prescriptoo-frontend-k4dk.onrender.com/](https://prescriptoo-frontend-k4dk.onrender.com/)

📱 **QR Code (PNG) – Scan to Open Website:**

![Prescripto QR Code](prescripto.svg)

---

## 🛠️ Tech Stack (ATS Optimized)

**Frontend**

* React.js (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* Responsive UI Design

**Backend**

* Node.js
* Express.js
* RESTful APIs

**Database**

* MongoDB

**Authentication & Security**

* JWT Authentication
* Role-Based Access Control (RBAC)
* Protected Routes
* Secure API Endpoints

**Payments**

* Razorpay Payment Gateway (Test Mode)

**Deployment & DevOps**

* Render (Frontend & Backend)

---

## ✨ Core Features

### 👤 Patient Module

* User registration & login (JWT-based)
* Book doctor appointments
* Online payment for appointments (Razorpay – Test Mode)
* View appointment & payment history
* Secure access to personal data

### 🧑‍⚕️ Doctor Module

* View assigned appointments
* Manage availability & schedule
* Access patient appointment details

### 🛠️ Admin Module

* Add, update, and manage doctors
* View all appointments 

---

## ⭐ Advanced Features

* Razorpay payment integration
* Full CRUD operations
* Role-based dashboards (Admin / Doctor / Patient)
* REST API communication between frontend & backend
* Toast notifications for real-time feedback
* Mobile-first, responsive design
* Clean, modular, and scalable codebase

---

## 📂 Project Setup (Local Development)

```bash
# Clone the repository
git clone https://github.com/surbhi-anand03/Prescripto.git

# Install dependencies
npm install

# Start frontend
npm run dev

# Start backend
npm start
```

---

## 📌 Notes

* Payments are integrated using **Razorpay Test Mode**.
* The implementation includes **order creation, payment handling, and verification logic**.
* Can be switched to **Live Mode** by updating Razorpay keys and completing KYC.

---

## 📌 Future Enhancements

* Enable Razorpay Live Mode
* Payment invoices & transaction reports
* Video consultation module
* Admin analytics dashboard
