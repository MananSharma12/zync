import { Router } from "express";
import { prisma } from "@zync/shared/dist";

const router = Router();

router.get('/available', async (req, res) => {
    const availableTriggers = await prisma.availableTriggers.findMany({});
    res.json({
        availableTriggers
    });
});

export const triggerRouter = router;