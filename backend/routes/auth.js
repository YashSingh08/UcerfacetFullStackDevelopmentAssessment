// const express = require("express");
// const router = express.Router();
// const users = require("../data/users.json"); // Mocked user data

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   // Check if the user exists in the data
//   const user = users.find((u) => u.email === email && u.password === password);

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   // Return user data or a token for authentication
//   res.json({ user });
// });

// module.exports = router;
