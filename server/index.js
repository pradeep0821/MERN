import express from "express";
import cors from "cors";

const app = express();

// Allow Netlify frontend
app.use(
  cors({
    origin: "https://brilliant-moxie-595ab1.netlify.app", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

app.use(express.json());

// Example route
app.post("/api/auth/register", (req, res) => {
  res.json({ message: "Register route working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
