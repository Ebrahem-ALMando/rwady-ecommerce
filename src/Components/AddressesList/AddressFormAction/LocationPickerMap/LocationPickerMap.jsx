'use client';

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import {useEffect, useRef, useState} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import styles from './Map.module.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './MapItems.css'
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
});

// مكوّن لتحديث المركز بدون إعادة إنشاء الخريطة
function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView([center.lat, center.lng], map.getZoom());
    }, [center, map]);
    return null;
}

// شريط البحث الجغرافي
function SearchControl({ onSelect }) {
    const map = useMap();
    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const control  = new GeoSearchControl({ provider, style: 'bar', showMarker: false});
        map.addControl(control);
        map.on('geosearch/showlocation', ({ location }) => {
            onSelect({ lat: location.y, lng: location.x });
        });
        return () => map.removeControl(control);
    }, [map, onSelect]);
    return null;
}


function ClickHandler({ onSelect }) {
    useMapEvents({
        click(e) {
            onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
}

const LocationPickerMap = ({ defaultPosition, onSelect, height = '330px' }) => {
    // const mapRef = useRef();
    const [position, setPosition]   = useState(defaultPosition);
    const [mapInstance, setMapInstance] = useState(null);

    // تنظيف المثيل القديم ومعرف الحاوية عند unmount أو إعادة mount
    useEffect(() => {
        return () => {
            if (mapInstance) {
                mapInstance.remove();
                const container = document.getElementById('leaflet-map');
                if (container && container._leaflet_id) {
                    container._leaflet_id = null;
                }
            }
        };
    }, [mapInstance]);

    // مسح _leaflet_id من الحاوية قبل إنشاء أي خريطة جديدة
    useEffect(() => {
        const container = document.getElementById('leaflet-map');
        if (container && container._leaflet_id) {
            container._leaflet_id = null;
        }
    }, []);

    // عند تغير defaultPosition
    useEffect(() => {
        setPosition(defaultPosition);
    }, [defaultPosition]);

    return (
        <>
            <MapContainer
                // id="leaflet-map"
                key={`${position.lat}-${position.lng}`}
                center={[position.lat, position.lng]}
                zoom={13}
                style={{height: height, width: '100%'}}
                whenCreated={setMapInstance}
                className={styles.customMapContainer}
            >

                <ChangeView center={position}/>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={[position.lat, position.lng]}/>
                <ClickHandler
                    onSelect={(pos) => {
                        setPosition(pos);
                        onSelect(pos);
                    }}
                />

                <SearchControl
                    className={styles.search}
                    onSelect={(pos) => {
                        setPosition(pos);
                        onSelect(pos);
                    }}
                />
            </MapContainer>
            {/* <div style={{marginTop: 10, display: 'flex', gap: '10px', justifyContent: 'center'}}>
                <button
                    type="button"
                    onClick={() => {
                        if (!navigator.geolocation) {
                            alert('المتصفح لا يدعم تحديد الموقع');
                            return;
                        }
                        navigator.geolocation.getCurrentPosition((pos) => {
                            const coords = {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude,
                            };
                            setPosition(coords);
                            onSelect(coords);
                            if (mapInstance) {
                                mapInstance.setView(coords, 13);
                            }
                        }, () => {
                            alert('تعذر الحصول على الموقع الحالي');
                        });
                    }}
                    className={styles.saveButton}
                >
                    🧭 العثور على موقعي الحالي
                </button>
            </div> */}

            {/*        <div style={{marginTop: 10, display: 'flex', gap: '10px', justifyContent: 'center'}}>*/}
            {/*    <button*/}
            {/*        type="button"*/}
            {/*        onClick={() => {*/}
            {/*            if (!mapInstance) return;*/}
            {/*            const center = mapInstance.getCenter();*/}
            {/*            const pos = {lat: center.lat, lng: center.lng};*/}
            {/*            setPosition(pos);*/}
            {/*            onSelect(pos);*/}
            {/*        }}*/}
            {/*        className={styles.saveButton}*/}
            {/*    >*/}
            {/*        📍 تحديد العنوان من مركز الخريطة*/}
            {/*    </button>*/}

            {/*    <button*/}
            {/*        type="button"*/}
            {/*        onClick={() => {*/}
            {/*            if (!navigator.geolocation) {*/}
            {/*                alert('المتصفح لا يدعم تحديد الموقع');*/}
            {/*                return;*/}
            {/*            }*/}
            {/*            navigator.geolocation.getCurrentPosition((pos) => {*/}
            {/*                const coords = {*/}
            {/*                    lat: pos.coords.latitude,*/}
            {/*                    lng: pos.coords.longitude,*/}
            {/*                };*/}
            {/*                setPosition(coords);*/}
            {/*                onSelect(coords);*/}
            {/*                if (mapInstance) {*/}
            {/*                    mapInstance.setView(coords, 13);*/}
            {/*                }*/}
            {/*            });*/}
            {/*        }}*/}
            {/*        className={styles.saveButton}*/}
            {/*    >*/}
            {/*        🧭 العثور على موقعي الحالي*/}
            {/*    </button>*/}
            {/*</div>*/}
        </>
    );
};

export default LocationPickerMap;

