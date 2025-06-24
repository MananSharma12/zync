import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "@zync/shared";
import { JWT_PASSWORD } from "../config";
import { authMiddleware } from "../middleware";
import { AuthenticatedRequest, SignupSchema, SigninSchema } from "../types";

const router: Router = Router();

router.post('/signup', (async (req: Request, res: Response) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "invalid data"
        });
    }

    const userExists = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password,
        }
    });

    if (userExists) {
       return res.status(403).json({
           message: "user already exists"
       });
    }

    await prisma.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name,
        },
    });

    return res.json({
        message: "please verify your account by checking your email"
    });
}) as unknown as Router);

router.post('/signin', (async (req: Request, res: Response) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "invalid inputs"
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password,
        }
    });

    if (!user) {
        return res.status(403).json({
            message: "invalid credentials"
        });
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD);

    return res.json({
        token,
    })
}) as unknown as Router);

router.get('/', authMiddleware, (async (req: AuthenticatedRequest, res: Response) => {
    const id = req.id;
    const user = await prisma.user.findFirst({
       where: {
           id,
       },
       select: {
           name: true,
           email: true,
       }
    });

    return res.json({
        user,
    });
}) as unknown as Router);

export const userRouter = router;