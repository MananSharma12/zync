import { Router, Request, Response } from 'express';
import { prisma } from "@zync/shared";
import { authMiddleware } from "../middleware";
import { AuthenticatedRequest, ZapCreateSchema } from "../types";

type AuthReqWithZapId = Request & { id: number; params: { zapId: string } };

const router = Router();

router.post('/', authMiddleware, (async (req: AuthenticatedRequest, res: Response) => {
    const id = req.id;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const zapId = await prisma.$transaction(async tx => {
        const zap = await prisma.zap.create({
            data: {
                userId: id,
                name: parsedData.data.name,
                triggerId: "",
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                    }))
                }
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                triggerId: parsedData.data.availableTriggerId,
                zapId: zap.id
            }
        });

        await tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        });

        return zap.id;
    });

    return res.json({
        zapId
    });

}) as unknown as Router);

router.get('/', authMiddleware, (async (req: AuthenticatedRequest, res: Response) => {
    const id = req.id;
    const zaps = await prisma.zap.findMany({
        where: {
            userId: id,
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zaps
    });
}) as unknown as Router);

router.get('/:zapId', authMiddleware, (async (req: Request, res: Response) => {
    const { id, params } = req as AuthReqWithZapId;
    const zapId = params.zapId;

    console.log('zapId:', zapId);
    console.log('userId:', id);

    const zap = await prisma.zap.findFirst({
        where: {
            id: zapId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({
        zap
    });
}) as unknown as Router);

export const zapRouter = router;
