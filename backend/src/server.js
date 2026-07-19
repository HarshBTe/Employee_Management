require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const seedSuperAdmin = require("./config/seedAdmin");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await seedSuperAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();