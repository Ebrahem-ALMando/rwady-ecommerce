"use server"
import {cookies} from "next/headers";

export const  getTokenWithServer=async ()=>{

    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
}