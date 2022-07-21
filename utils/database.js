import 'dotenv/config';
import mongoose from "mongoose";

const ConnectDB = () => {
  const databaseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  // const databaseUrl = "mongodb://127.0.0.1:27017/note";
  const databaseUrl = process.env.MONGODB_URL;
  try {
    mongoose.connect(databaseUrl, databaseConfig);
    console.log("MongoDB Connected Successfully...");
  } catch (error) {
    console.log(error);
    console.log("MongoDB failed to connect...");
  }
};

export default ConnectDB;
