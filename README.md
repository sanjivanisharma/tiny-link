# TinyLink — URL Shortener (Node + Express + Neon Postgres)

TinyLink is a minimal, URL-shortening service inspired by Bit.ly.  
It allows users to shorten URLs, track click statistics, and manage links.


## Tech Stack

**Backend**
- Node.js  
- Express.js  
- Neon Postgres

**Frontend (Future Work)**
- EJS templating  
- TailwindCSS styling  

**Deployment**
- Render 
- Neon for hosted Postgres  


## Features

### Create Short Links
- Generates a short code using a long URL.
- Accepts an optional custom short code.
- Validates URL before saving.
- Codes are globally unique; duplicates return **409**.
- Auto-generate code (6–8 alphanumeric chars) when custom code not provided.

### Redirect
- Visiting `/:code` issues an HTTP **302 redirect** to the original URL.
- Each redirect updates:
  - total click count  
  - last clicked time  

### Delete Links
- Remove links from DB.
- After deletion, `/:code` returns **404** and never redirect again.

### Health Check (`/healthz`)
Returns:
```json
{ "ok": true, "version": "1.0" }


## Project Structure

```
.
├── server.js                 
├── package.json
│
├── /routes
│   ├── links.route.js                
│   ├── pages.route.js              
│   ├── user.route.js              
│
├── /controllers
│   ├── links.controller.js     
│   └── user.controller.js 
│
├── /db
│   ├── pool.js              
│   └── queries.js        
│
├── .env.example
└── README.md

## Installation & Setup

### 1️⃣ Clone the Repository

Clone repository: ``` https://github.com/sanjivanisharma/tiny-link.git ```

### 2️⃣ Install Dependencies

Run ``` npm install ``` to install all the required packages in the application.

### 3️⃣ Start the Application

Run ``` npm start ``` to start the application.

The app is served on http://localhost:3000/.

## Future Scope

- To be implemented using EJS and tailwindcss
- Pages (Dashboard and Stats)