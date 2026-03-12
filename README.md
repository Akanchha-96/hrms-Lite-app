## HRMS- Human Resource Management Sysem

### Project Overview

This project is a simple HRMS that allows organizations to manage employees and tract their attendance through a web interface.
This system provides APIs and a frontend UI to perform basic HR operations such as 
-Managing employee records
-Marking employee attendance
-Viewing employee lists
-Viewing attendance records

This application follows a basic full stack architecture where
-A Python_ Flask backend exposes RESTAPIs for employee and attendance operations.
-A React based frontend provides a user interface to interact with these APIs.

The project is designed as a lightweight internal tool and demonstartes how to structure a small full stack system with clear separation between backend and frontend components.
-----

### Tech Stack

**Backend**
-Python
-Flask
-JSON responses
-Utility module for validation
-Database connection module(db.py)

**Frontend**
-React.js
-Javascript
-HTML
-CSS

**Development & Tooling**
-Node.js
-npm
-VS code
-Git

------------
## Install backend dependencies
pip install flask

## Run Backend

cd backend
python app.py
Backend will run at http://127.0.0.1:5000

## Run Frontend

cd frontend
npm install(to install frontend dependencies)
npm start(to run react application)

The frontend will run at: http://localhost:3000
The React Application communicates with Flask 
Backend running on port 5000

## Assumptions
1. The backend runs locally on port 5000
2. The frontend runs on port 3000
3. API endpoints are accessible only from the local environment
4. The database connection is configured in db.py.
5. Employee ID is used as the primary reference for attendance records.

## Author

Developed as a simple full-stack HRMS prototype for managing employees and attendance records.
Akanchha Jha
email:akanchhajha96@gmail.com
Phone:7903812915
