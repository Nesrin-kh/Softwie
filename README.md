# Skin Care Website

## Project Description
This is a web application for managing and showcasing skincare products. It consists of:
- **Frontend**: A user interface built using React.js to display products and manage them via an admin dashboard.
- **Backend**: A RESTful API developed with Node.js, Express, and SQLite for database management.
- **Admin Dashboard**: Manage products (add, edit, delete).

## Features
- User Features:
  - View a list of skincare products with their descriptions, prices, and images.
Add products to a cart (though cart functionality will be developed further in the future).
- Admin Features:
  - Secure login system for the admin to access the dashboard.
  - Add, update, or delete products via the admin dashboard.
- Product details (name, price, and description) can be managed directly by the admin.
- Authentication:
  - Admin-only authentication ensures only authorized users can manage products.

## Prerequisites

Before running the project locally, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/) for package management
- [SQLite](https://www.sqlite.org/) for the database

## Setting Up the Project

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Nesrin-kh/Softwie.git
cd SkinCare
## 2. Install Dependencies

The project consists of both a frontend (React) and a backend (Node.js). You'll need to install dependencies for both separately.

### Frontend (React)

Navigate to the `frontend` directory:

```bash
cd frontend
npm install

Navigate to the `backend` directory:
cd ../backend
npm install

## 3. Initialize the Database

```bash 
sqlite3 backend/db/database.sqlite 

##4. Access the Application
Once both the frontend and backend servers are running, open your browser and navigate to http://localhost:3000 to access the application.
You should now see the skin care website running locally on your machine.

# Frontend environment variables

# The URL for your backend API
REACT_APP_API_URL=http://localhost:5000

# SQLite database connection URL
DATABASE_URL=sqlite:./db/database.sqlite

# Optional: If you're using a JWT or other auth system, add secret keys
JWT_SECRET=your_jwt_secret_key_here



