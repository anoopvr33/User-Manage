import express from "express";
import User from "../../db/Schema/UserSchema/index.js";
import bcrypt from "bcrypt";
import { error } from "console";

const router = express.Router();

router.post("/register", async (req, res) => {
  const body = { ...req.body };
  const isUser = await User.findOne({ email: body.email });

  if (isUser) {
    return res.status(200).json({ error: "User already exists" });
  }

  const hashedpassword = await bcrypt.hash(body.password, 2);
  body.password = hashedpassword;

  const userData = await User.create(body);
  res
    .status(200)
    .json({ message: "User created successfully", data: userData });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(200).json({ error: "username or password incorrect" });
  }
  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res.status(200).json({ error: "username or password incorrect" });
  }

  res.status(200).json({ message: "login succesfully" });
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
});

router.get("/get_all", async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  if (body.password) {
    const hashedpassword = await bcrypt.hash(body.password, 2);
    body.password = hashedpassword;
    console.log("pass", body.password);
    const user = await User.findByIdAndUpdate(id, body);
    return res
      .status(200)
      .json({ mess: "Password updated successfully", user: user });
  }
  const user = await User.findByIdAndUpdate(id, body);
  return res.status(200).json({ message: "Updated", user: user });
});

router.post("/reset/:id", async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };

  const user = await User.findById(id);
  console.log(user);
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    return res.status(200).json({ error: "Incorrect Old Password" });
  }
  res.status(200).json({ message: "password match" });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.status(200).json(user);
});
export default router;
