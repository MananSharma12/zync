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
