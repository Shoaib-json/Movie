# MovieApp

A full-featured web application for managing and reviewing movies, built with Node.js, Express, and MongoDB.

 🌟 Features

- 🎬 Movie Management: Add, update, and delete movies
- 👤 User Authentication: Secure login and registration with Passport.js
- ✍️ Reviews & Ratings: Users can review and rate movies
- 🖼️ Image Uploads: Supports movie poster uploads
- 📱 Responsive Design: Works across devices
- 🔐 Session Management: Secure user sessions
- ⚡ Flash Messages: Instant feedback for user actions

---

 📌 Prerequisites

Ensure you have the following installed before running the application:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

---

 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/Shoaib-json/MovieApp.git
cd MovieApp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/movie
SESSION_SECRET=your_secret_key_here
```

---

 📂 Project Structure

```
MovieApp/
├── models/       # Database models
│   ├── user.js   # User schema
│   ├── review.js # Review schema
│   └── list.js   # Movie listing schema
├── routes/       # Application routes
│   ├── listing.js
│   ├── login.js
│   └── review.js
├── views/        # EJS templates
├── public/       # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── app.js        # Main server file
└── package.json  # Dependencies & scripts
```

---

 📦 Dependencies

- Express - Web framework
- Mongoose - MongoDB ORM
- Passport.js - Authentication middleware
- EJS - Template engine
- Connect-flash - Flash messages
- Method-override - Supports HTTP methods (PUT, DELETE)
- Express-session - Session middleware

---

 🔥 Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Run the application:
```bash
npm start
```

3. Open in browser:
```
http://localhost:8080
```

---

 🔗 API Routes

# User Authentication
- `GET /user/register` - Show registration form
- `POST /user/register` - Register a new user
- `GET /user/login` - Show login form
- `POST /user/login` - Authenticate user
- `GET /user/logout` - Logout user

# Movie Management
- `GET /` - List all movies
- `POST /movies` - Add a new movie
- `GET /movies/new` - Show movie submission form
- `GET /movies/:id` - Show movie details
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

# Movie Reviews
- `POST /movies/:id/reviews` - Add a review
- `DELETE /movies/:id/reviews/:reviewId` - Delete a review

---

 🔐 Authentication & Security

This application implements Passport.js with Local Strategy authentication. Users can:
- Register securely with hashed passwords
- Login and access protected routes
- Manage sessions using express-session

# Security Features
✅ Password hashing using bcrypt.js  
✅ Session management with cookies  
✅ CSRF protection  
✅ Input validation to prevent injection attacks  
✅ Access control for restricted routes  

---

 🛠 Error Handling

- Custom 404 page for missing resources
- Flash messages for user feedback
- Global error handler for unexpected issues
- MongoDB connection error handling

---

 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to GitHub (`git push origin feature/your-feature`)
5. Open a Pull Request 🚀

---

 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

 🙌 Acknowledgments

Special thanks to:
- Express.js team
- Passport.js contributors
- MongoDB team
- All open-source contributors ❤️

---

 📩 Support

For support, email shoaibkhan1504@gmail.com or open an issue in the repository.
 
