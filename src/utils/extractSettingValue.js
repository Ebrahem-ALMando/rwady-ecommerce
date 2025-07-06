export const extractSettingValue = (settings, key) => {
    return settings?.find(item => item.key === key)?.value || "";
};
