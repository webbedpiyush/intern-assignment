import express from "express";
import cors from "cors";

import userRouter from "./routes/user";
import noteRouter from "./routes/note";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
