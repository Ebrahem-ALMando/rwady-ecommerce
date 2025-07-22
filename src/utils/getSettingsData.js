import {getSettings} from "@/api/services/general/settings/settings";

export async function getSettingData(){
    let  settingDataList = [];
    let initialError=false;

    const setting = await getSettings();
    settingDataList = setting || [];

    let settingData=settingDataList?.data

    if(settingDataList.error)
    {initialError=true}


    return  {settingData,initialError}
}