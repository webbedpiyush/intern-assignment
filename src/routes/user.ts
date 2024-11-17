import express from "express";
import { auth, db } from "../utils/firebase";

const userRouter = express.Router();

userRouter.post("/register", async (req: any, res: any) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userRecord = await auth.createUser({ email, password });
    await db.collection("users").doc(userRecord.uid).set({ name, email });
    res
      .status(200)
      .json({ message: "User registered successfully", uid: userRecord.uid });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

userRouter.put("/edit", async (req: any, res: any) => {
  const { uid, name, email } = req.body;
  if (!uid || (!name && !email)) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }
  try {
    const userRef = db.collection("users").doc(uid);
    await userRef.update({ ...(name && { name }), ...(email && { email }) });
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

userRouter.delete("/delete", async (req: any, res: any) => {
  const { uid } = req.body;
  if (!uid) {
    return res.status(400).json({
      error: "Missing required field: uid",
    });
  }
  try {
    await auth.deleteUser(uid);
    await db.collection("users").doc(uid).delete();
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default userRouter;
