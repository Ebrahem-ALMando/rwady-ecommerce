import {getTokenWithClient} from "@/utils/getTokenWithClient";

export function checkAuthClient() {
    const token=getTokenWithClient()
    return !!(token && token[2]);
}