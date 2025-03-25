import {fetchAPI} from "@/api/api";

export const getDownSlider=async ()=>{
    return await fetchAPI("down-sliders")
}