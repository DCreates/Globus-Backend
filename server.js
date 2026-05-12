import dotenv from "dotenv";
import app from "./app.js";
import connectMongo from "./config/mongo.js";

dotenv.config();

// Connect DB and start server
const startServer = async () => {
  try {
    await connectMongo();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();