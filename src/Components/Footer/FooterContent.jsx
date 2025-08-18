import { getSettingData } from "@/utils/getSettingsData";
import { extractSettingValue } from "@/utils/extractSettingValue";
import FooterUI from "./FooterUI";
export default async function FooterContent() {
    const { settingData,initialError } = await getSettingData();
    const settings = {
        snapchat_url: extractSettingValue(settingData, "social_media.snapchat"),
        youtube_url: extractSettingValue(settingData, "social_media.youtube"),
        twitter_url: extractSettingValue(settingData, "social_media.x"),
        instgram_url: extractSettingValue(settingData, "social_media.instagram"),
        facebook_url: extractSettingValue(settingData, "social_media.facebook"),
        telephone: extractSettingValue(settingData, "contacts.phone_number"),
        whatsapp: extractSettingValue(settingData, "contacts.whatsapp_number"),
        email: extractSettingValue(settingData, "contacts.email"),
        client_app_andriod_url: extractSettingValue(settingData, "app.android"),
        client_app_ios_url: extractSettingValue(settingData, "app.ios"),
    };

    return <FooterUI settings={settings} initialError={initialError} />;
}
