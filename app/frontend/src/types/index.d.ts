export interface Zaps {
    id: string;
    name: string;
    triggerId: string;
    userId: number;
    actions: {
        id: string
        zapId: string
        actionId: string
        sortingOrder: number
        type: {
            id: string
            name: string
        }
    }[];
}

export type Step = "name" | "trigger" | "actions" | "review"

export type Action = { id: string; name: string; description?: string }
export type Trigger = { id: string; name: string; description?: string }

export type ZapOptionsResponse = {
    availableTriggers: Trigger[]
    availableActions: Action[]
}
