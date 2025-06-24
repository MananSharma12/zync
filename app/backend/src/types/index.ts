import { z } from 'zod';

export interface AuthenticatedRequest extends Request {
    id: number;
}

export const SignupSchema = z.object({
    name: z.string().min(3).max(100),
    username: z.string().trim().toLowerCase().email().min(5),
    password: z.string().min(8).max(100),
});

export const SigninSchema = z.object({
    username: z.string().trim().toLowerCase().email().min(5),
    password: z.string().min(8).max(100),
});

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional(),
    })),
})
