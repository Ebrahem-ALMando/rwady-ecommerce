export const handleChangeForm = (e,setFormData) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};