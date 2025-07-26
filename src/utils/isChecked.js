export const isChecked = (key, id,selected) => {
    const value = selected?.[key];
    if (Array.isArray(value)) return value.includes(String(id));
    console.log(value)
    console.log(String(id))
    return value === String(id);
};
