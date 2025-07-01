import { Router } from "express";
import { prisma } from "@zync/shared/dist";

const router = Router();

router.get('/available', async (req, res) => {
    const availableActions = await prisma.availableActions.findMany({});
    res.json({
        availableActions
    });
});

export const actionRouter = router;