import express from "express";
// import { prisma } from "@zync/shared";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
