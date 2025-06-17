import express from "express";
import { prisma } from "@zync/shared";

const app = express();
app.use(express.json());

app.post("/hook/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    await prisma.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body,
            }
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        });
    });

    res.json({
        message: "webhook received"
    })
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})