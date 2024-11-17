"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../utils/firebase");
const noteRouter = express_1.default.Router();
noteRouter.post("/save", async (req, res) => {
    const { uid, title, content } = req.body;
    if (!uid || !title || !content) {
        return res.status(400).json({
            error: "Missing required fields",
        });
    }
    try {
        const timestamp = new Date();
        await firebase_1.db.collection("notes").add({ uid, title, content, timestamp });
        res.status(201).json({
            message: "Note saved successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
noteRouter.get("/get", async (req, res) => {
    const { uid } = req.query;
    if (!uid) {
        return res.status(400).json({
            error: "Missing required filed : uid",
        });
    }
    try {
        const notesCollection = await firebase_1.db
            .collection("notes")
            .where("uid", "==", uid)
            .get();
        const notes = notesCollection.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
exports.default = noteRouter;
//# sourceMappingURL=note.js.map