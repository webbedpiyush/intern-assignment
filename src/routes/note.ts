import express from "express";
import { db } from "../utils/firebase";

const noteRouter = express.Router();

noteRouter.post("/save", async (req: any, res: any) => {
  const { uid, title, content } = req.body;
  if (!uid || !title || !content) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    const timestamp = new Date();
    await db.collection("notes").add({ uid, title, content, timestamp });
    res.status(201).json({
      message: "Note saved successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

noteRouter.get("/get", async (req: any, res: any) => {
  const { uid } = req.query;
  if (!uid) {
    return res.status(400).json({
      error: "Missing required filed : uid",
    });
  }

  try {
    const notesCollection = await db
      .collection("notes")
      .where("uid", "==", uid)
      .get();
    const notes = notesCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(notes);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default noteRouter;
