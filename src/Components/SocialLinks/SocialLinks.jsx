import { getSettingData } from "@/utils/getSettingsData";
import { extractSettingValue } from "@/utils/extractSettingValue";
import SocialLinksUI from "./SocialLinksUI";

export default async function SocialLinks() {
  const { settingData, initialError } = await getSettingData();

  const methods = [
    {
      type: "whatsapp",
      link: `https://wa.me/${extractSettingValue(settingData, "contacts.whatsapp_number")?.replace(/\D/g, "")}`,
      description: extractSettingValue(settingData, "contacts.whatsapp_number"),
      color: "#25D366",
    },
    {
      type: "messenger",
      link: extractSettingValue(settingData, "contacts.messenger_url"),
      description: "Messenger",
      color: "#006AFF",
    },
    {
      type: "email",
      link: `mailto:${extractSettingValue(settingData, "contacts.email")}`,
      description: extractSettingValue(settingData, "contacts.email"),
      color: "#EA4335",
    },
    {
      type: "phone",
      link: `tel:${extractSettingValue(settingData, "contacts.phone_number")}`,
      description: extractSettingValue(settingData, "contacts.phone_number"),
      color: "#0741ad",
    },
  ].filter(m => !!m.link);

  return <SocialLinksUI methods={methods} initialError={initialError} />;
}
