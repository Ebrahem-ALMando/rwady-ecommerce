import Navbar from "@/Components/Header/Navbar";
import { getSettingData } from "@/utils/getSettingsData";
import { extractSettingValue } from "@/utils/extractSettingValue";

const Header=async()=>{
    const { settingData } = await getSettingData();
   const downloadApp = extractSettingValue(settingData, "app.android");
    return(
            <Navbar  downloadApp={downloadApp}/>
    )
}
export default Header