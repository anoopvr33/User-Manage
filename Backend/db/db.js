import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/UserManage")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

export default mongoose;
