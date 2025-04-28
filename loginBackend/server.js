const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", // Add your root password here if set
    database: "validation"
});

db.connect((err) => {
    if (err) {
      console.error("Database connection failed: ", err);
      return;
    }
    console.log("Connected to MySQL database");
  });


app.use(express.json());
// API for user login validation
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err){
            return res.status(500).json({ error: "Database query error" });
        }
        if (result.length > 0) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    });
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
