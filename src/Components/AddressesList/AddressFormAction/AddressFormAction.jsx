
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../../Profile/EditProfileForm/EditProfileForm.module.css';
import Line from '@/Components/Shared/Line/Line';
import { CloseIcon } from '@/utils/Icons';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import CustomToast from '@/Components/Shared/CustomToast/CustomToast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { getCities } from '@/api/services/general/Addresses/getCities';
import { useLocale } from 'next-intl';
import SearchableSelect from '@/Components/Shared/SearchableSelect/SearchableSelect';
const LocationPickerMap = dynamic(
    () => import('@/Components/AddressesList/AddressFormAction/LocationPickerMap/LocationPickerMap'),
    { ssr: false, loading: () => <p>جارٍ تحميل الخريطة…</p> }
);

const phoneUtil = PhoneNumberUtil.getInstance();

const AddressFormAction = ({ isOpen, setIsOpen, title, mutate, addressData, onSubmit, isDefault = false, countriesData, phone }) => {
    const t = useTranslations('Addresses');
    const lang = useLocale ();
    const defaultCoords = {
        lat: addressData?.latitude || 33.3152,
        lng: addressData?.longitude || 44.3661,
    };
    
    const [formData, setFormData] = useState({
        name: '',
        phone: phone || '',
        country: '',
        city: '',
        address: '',
        latitude: '33.3152',
        longitude: '44.3661',
        is_default: isDefault,
        // extra_address: '' // معلق مؤقتاً
    });
    
    const [mapCoords, setMapCoords] = useState(defaultCoords);
    const [showExtraAddress, setShowExtraAddress] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [cities, setCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(false);

    // دالة التحقق من صحة رقم الهاتف
    const validatePhoneNumber = (phone) => {
        try {
            const parsed = phoneUtil.parse(`+${phone}`);
            return phoneUtil.isValidNumber(parsed);
        } catch {
            return false;
        }
    };

    // تحميل المحافظات عند تغيير الدولة
    const loadCities = async (countryId) => {
        if (!countryId) {
            setCities([]);
            return;
        }
        
        setLoadingCities(true);
        try {
            const citiesResponse = await getCities(countryId);
            if (!citiesResponse?.error && citiesResponse?.data) {
                setCities(citiesResponse.data);
            }
        } catch (error) {
            console.error('Error loading cities:', error);
        } finally {
            setLoadingCities(false);
        }
    };

    useEffect(() => {
        if (addressData) {
            setFormData({
                name: addressData.name || '',
                phone: addressData.phone || phone || '',
                country: addressData.country_id || '',
                city: addressData.city_id || '',
                address: addressData.address || '',
                latitude: addressData.latitude || '33.3152',
                longitude: addressData.longitude || '44.3661',
                is_default: !!addressData.is_default,
                // extra_address: addressData.extra_address || '' // معلق مؤقتاً
            });
            setMapCoords({
                lat: addressData.latitude || defaultCoords.lat,
                lng: addressData.longitude || defaultCoords.lng,
            });
            
            // تحميل المحافظات إذا كان هناك دولة مختارة
            if (addressData.country_id) {
                loadCities(addressData.country_id);
            }
        } else {
            // تحديد الدولة الأولى افتراضياً إذا كانت متاحة
            const defaultCountryId = countriesData && countriesData.length > 0 ? countriesData[0].id : '';
            
            setFormData({ 
                name: '', 
                phone: phone || '',
                country: defaultCountryId, 
                city: '', 
                address: '',
                latitude: '', 
                longitude: '', 
                is_default: false, 
                // extra_address: '' // معلق مؤقتاً
            });
            setMapCoords(defaultCoords);
            setCities([]);
            
            // تحميل المحافظات للدولة الافتراضية
            if (defaultCountryId) {
                loadCities(defaultCountryId);
            }
        }
    }, [addressData, phone, countriesData]);

    // تحميل المحافظات عند تغيير الدولة
    useEffect(() => {
        if (formData.country) {
            loadCities(formData.country);
            // إعادة تعيين المحافظة عند تغيير الدولة (فقط إذا لم يكن تعديل عنوان موجود)
            if (!addressData) {
                setFormData(prev => ({ ...prev, city: '' }));
            }
        } else {
            setCities([]);
        }
    }, [formData.country, addressData]);

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.custom(() => (
                <CustomToast
                    title={t('enterName')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!formData.phone.trim()) {
            toast.custom(() => (
                <CustomToast
                    title={t('enterPhone')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!validatePhoneNumber(formData.phone)) {
            toast.custom(() => (
                <CustomToast
                    title={t('invalidPhone')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!formData.country) {
            toast.custom(() => (
                <CustomToast
                    title={t('selectCountry')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!formData.city) {
            toast.custom(() => (
                <CustomToast
                    title={t('selectCity')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        if (!formData.address.trim()) {
            toast.custom(() => (
                <CustomToast
                    title={t('enterAddress')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        // التحقق من الخريطة فقط إذا كان المستخدم قد اختار إظهارها
        if (showMap && (!formData.latitude || !formData.longitude)) {
            toast.custom(() => (
                <CustomToast
                    title={t('selectLocation')}
                    type="error"
                />
            ) ,{
                duration: 3000,
                position: 'top-center',
            });
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // إعداد البيانات للإرسال
        const submitData = {
            name: formData.name,
            phone: `+${formData.phone}`,
            country: parseInt(formData.country),
            city: parseInt(formData.city),
            address: formData.address,
            is_default: formData.is_default
        };

        // إضافة العنوان الإضافي فقط إذا كان مفعلاً (معلق مؤقتاً)
        // if (showExtraAddress && formData.extra_address.trim()) {
        //     submitData.extra_address = formData.extra_address;
        // }

        // إضافة الإحداثيات فقط إذا كان المستخدم قد اختار إظهار الخريطة
        if (showMap && formData.latitude && formData.longitude) {
            submitData.latitude = formData.latitude;
            submitData.longitude = formData.longitude;
        }

        await onSubmit(submitData);
        
        // إعادة تعيين النموذج مع تحديد الدولة الأولى افتراضياً
        const defaultCountryId = countriesData && countriesData.length > 0 ? countriesData[0].id : '';
        
        setFormData({
            name: '',
            phone: phone || '',
            country: defaultCountryId,
            city: '',
            address: '',
            latitude: '',
            longitude: '',
            is_default: false,
            // extra_address: '' // معلق مؤقتاً
        });
        setShowExtraAddress(false);
        setShowMap(false);
        setCities([]);
        setMapCoords(defaultCoords);
        
        // تحميل المحافظات للدولة الافتراضية
        if (defaultCountryId) {
            loadCities(defaultCountryId);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
            <div
                style={{maxWidth:'700px',maxHeight:'600px' ,overflow:'auto'}}
                className={`${styles.profileContainer}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <button className={styles.closeIcon} onClick={() => setIsOpen(false)}>
                        {CloseIcon}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* اسم العنوان */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>
                            {t('labelName')} <span style={{color: '#dc3545'}}>*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder={t('placeholderName')}
                            className={styles.textInput}
                        />
                    </div>

                    {/* رقم الهاتف */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>
                            {t('phone')} <span style={{color: '#dc3545'}}>*</span>
                        </label>
                        <PhoneInput
                            country={'iq'}
                            preferredCountries={['iq']}
                            enableSearch
                            value={formData.phone}
                            onChange={(value) => {
                                setFormData({...formData, phone: value});
                            }}
                            inputProps={{
                                name: 'phone',
                                required: true,
                                dir: 'ltr',
                                placeholder: t('phonePlaceholder'),
                            }}
                            containerStyle={{
                                direction: 'ltr',
                                width: '100%',
                                borderRadius: '8px',
                                border: '2px solid #e1e5e9',
                                padding: '0px',
                                paddingLeft: '10px',
                            }}
                            inputStyle={{
                                width: '100%',
                                height: '48px',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                paddingLeft: '60px',
                                paddingRight: '10px',
                                boxShadow: 'none',
                                textAlign: 'start',
                            }}
                            buttonStyle={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                borderRadius: '8px 0 0 8px',
                            }}
                            dropdownStyle={{
                                textAlign: 'right',
                                direction: 'rtl',
                                maxHeight: '200px',
                                overflowY: 'auto',
                            }}
                        />
                    </div>

                    {/* العنوان */}
                    <div className={styles.formGroup}>
                        <label className={styles.inputLabel}>
                            {t('address')} <span style={{color: '#dc3545'}}>*</span>
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            placeholder={t('placeholderAddress')}
                            className={styles.textInput}
                            // required
                        />
                    </div>

                    {/* الدولة والمحافظة */}
                    <div className={styles.locationGroup}>
                        <div className={styles.selectWrapper}>
                            <label className={styles.inputLabel}>
                                {t('country')} <span style={{color: '#dc3545'}}>*</span>
                            </label>
                            <SearchableSelect
                                options={countriesData?.map(country => ({
                                    id: country.id,
                                    name: country.name?.[lang] || country.name
                                })) || []}
                                value={formData.country}
                                onChange={(value) => setFormData({...formData, country: value, city: ''})}
                                placeholder={t('selectCountry')}
                                searchPlaceholder={t('searchCountry')}
                            />
                        </div>

                        <div className={styles.selectWrapper}>
                            <label className={styles.inputLabel}>
                                {t('city')} <span style={{color: '#dc3545'}}>*</span>
                            </label>
                            <SearchableSelect
                                options={cities?.map(city => ({
                                    id: city.id,
                                    name: city.name?.[lang] || city.name
                                })) || []}
                                value={formData.city}
                                onChange={(value) => setFormData({...formData, city: value})}
                                placeholder={loadingCities ? t('loadingCities') : t('selectCity')}
                                disabled={!formData.country}
                                loading={loadingCities}
                                searchPlaceholder={t('searchCity')}
                            />
                        </div>
                    </div>

                    {/* العنوان الإضافي - Checkbox */}
                    {/* <div className={styles.formGroup}>
                        <label className={styles.switchLabel}>
                            <input
                                type="checkbox"
                                checked={showExtraAddress}
                                onChange={(e) => setShowExtraAddress(e.target.checked)}
                                className={styles.switchInput}
                            />
                            <span className={styles.switchSlider}></span>
                            <span className={styles.switchText}>{t('addExtraDetails')}</span>
                        </label>
                    </div>

                    {showExtraAddress && (
                        <div className={styles.formGroup}>
                            <label className={styles.inputLabel}>{t('extraAddress')}</label>
                            <input
                                id="extra_address"
                                name="extra_address"
                                type="text"
                                value={formData.extra_address}
                                onChange={(e) => setFormData({...formData, extra_address: e.target.value})}
                                placeholder={t('placeholderExtra_address')}
                                className={styles.textInput}
                            />
                        </div>
                    )} */}

                    {/* الخريطة - Checkbox */}
                    <div className={styles.formGroup}>
                        <label className={styles.switchLabel}>
                            <input
                                type="checkbox"
                                checked={showMap}
                                onChange={(e) => setShowMap(e.target.checked)}
                                className={styles.switchInput}
                            />
                            <span className={styles.switchSlider}></span>
                            <span className={styles.switchText}>{t('addMapLocation')}</span>
                        </label>
                    </div>

                    {showMap && (
                        <div className={styles.formGroup}>
                            <div style={{borderRadius: '8px', overflow: 'hidden'}}>
                        <LocationPickerMap
                            defaultPosition={mapCoords}
                                    height="250px"
                            onSelect={({lat, lng}) => {
                                const latStr = String(lat);
                                const lngStr = String(lng);
                                setMapCoords({lat, lng});
                                setFormData((prev) => ({
                                    ...prev,
                                    latitude: latStr,
                                    longitude: lngStr,
                                }));
                            }}
                        />
                            </div>
                    </div>
                    )}

                    {/* العنوان الافتراضي */}
                    {(!addressData && !isDefault) && (
                        <div className={styles.formGroup}>
                            <label className={styles.switchLabel}>
                                <input
                                    type="checkbox"
                                    name="is_default"
                                    checked={formData.is_default}
                                    onChange={(e) =>
                                        setFormData((prev) => ({...prev, is_default: e.target.checked}))
                                    }
                                    className={styles.switchInput}
                                />
                                <span className={styles.switchSlider}></span>
                                <span className={styles.switchText}>{t('setDefaultLabel')}</span>
                            </label>
                        </div>
                    )}

                    <Line/>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>
                            {t('save')}
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => setIsOpen(false)}
                        >
                            {t('cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(AddressFormAction);
