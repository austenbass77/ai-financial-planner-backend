const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profiles", profileRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

const familyMembersRouter = require("./routes/familyMembers");
app.use("/api/family-members", authenticateUser, familyMembersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
