require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatgptRoutes = require('./routes/chatgptRoutes'); // Correct path

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use("/api", chatgptRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
