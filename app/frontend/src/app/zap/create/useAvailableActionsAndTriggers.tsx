import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "@/config";
import type { ZapOptionsResponse } from "@/types";

const fetchAvailableActionsAndTriggers = async (): Promise<ZapOptionsResponse> => {
    const [triggerRes, actionsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`),
        axios.get(`${BACKEND_URL}/api/v1/action/available`),
    ]);

    return {
        availableTriggers: triggerRes.data.availableTriggers ?? [],
        availableActions: actionsRes.data.availableActions ?? [],
    };
}

export const useAvailableActionsAndTriggers = () => {
    return useQuery({
        queryKey: ['availableActionsAndTriggers'],
        queryFn: fetchAvailableActionsAndTriggers
    });
}
