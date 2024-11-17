"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../utils/firebase");
const userRouter = express_1.default.Router();
userRouter.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const userRecord = await firebase_1.auth.createUser({ email, password });
        await firebase_1.db.collection("users").doc(userRecord.uid).set({ name, email });
        res
            .status(200)
            .json({ message: "User registered successfully", uid: userRecord.uid });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
userRouter.put("/edit", async (req, res) => {
    const { uid, name, email } = req.body;
    if (!uid || (!name && !email)) {
        return res.status(400).json({
            error: "Missing required fields",
        });
    }
    try {
        const userRef = firebase_1.db.collection("users").doc(uid);
        await userRef.update(Object.assign(Object.assign({}, (name && { name })), (email && { email })));
        res.status(200).json({
            message: "User updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
userRouter.delete("/delete", async (req, res) => {
    const { uid } = req.body;
    if (!uid) {
        return res.status(400).json({
            error: "Missing required field: uid",
        });
    }
    try {
        await firebase_1.auth.deleteUser(uid);
        await firebase_1.db.collection("users").doc(uid).delete();
        res.status(200).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map