🚀 Live Demo
Service	URL
Frontend (Render) https://url-shortner-1-0c8i.onrender.com
Backend (Render)	https://u-c71s.onrender.com

Health Check	https://u-c71s.onrender.com/healthz
🎯 Features
Core Functionalities

✔ Create short links from long URLs
✔ Custom short code support (unique globally)
✔ Redirect using short code (/:code, 302 redirect)
✔ Click count tracking & last clicked timestamp
✔ Delete link + redirect disabled afterward (404)
✔ Dashboard to manage all links
✔ Stats page /code/:code
✔ Copy short URL button
✔ Search/filter by code or URL
✔ Clean responsive UI with TailwindCSS
✔ Loading, success & error states
✔ Health Check endpoint /healthz

📁 Project Structure
root
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
└── frontend
    ├── src
    ├── components
    ├── pages
    ├── App.jsx
    └── .env

🛠 Tech Stack
Layer	Technology
Frontend	React (Vite), Tailwind CSS, Axios
Backend	Node.js, Express
Database	MongoDB Atlas
Hosting	Render (Backend) + Render (Frontend)
Tools	Git, Postman, VS Code
🔗 API Endpoints
Method	Path	Description
POST	/api/links	Create short link (409 if duplicate code)
GET	/api/links	List all links
GET	/api/links/:code	Stats for one short code
DELETE	/api/links/:code	Delete link
GET	/:code	Redirect if exists, 404 if missing
GET	/healthz	System health info
🧠 URL Format Rules

Short codes must match:

[A-Za-z0-9]{6,8}


Custom codes must be unique

Open redirection allowed (for project)

⚙ Environment Variables
Backend .env.example
PORT=3000
MONGO_URI=your-mongo-uri
BASE_URL=https://u-c71s.onrender.com

Frontend .env
VITE_BASE_URL=https://u-c71s.onrender.com

🏗 Deployment Instructions
Backend (Render)

Connect GitHub repo

Set Root directory to backend

Build command: npm install

Start command: node server.js

Add environment variables

Deploy

Frontend (Render)

Import GitHub repository

Set project root to frontend

Environment variable: VITE_BASE_URL

Deploy

🧪 Automated Test Expectations
Test	Result
/healthz returns 200	✔
Create link	✔
Duplicate code returns 409	✔
Redirect increments count	✔
Deleted link returns 404	✔
UI search / filter / copy	✔
