require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Allow credentials so cookies are set across domains in dev/prod
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev frontend
      "http://localhost:3000",
      "https://brilliant-moxie-595ab1.netlify.app", // production frontend
    ],
    credentials: true, // allow cookies
  })
);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connect error:", err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
