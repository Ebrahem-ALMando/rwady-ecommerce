"use client"
import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import './FilterCriteriaPrice.css';

const MIN = 0;
const MAX = 100000;

const PriceSlider = ({ onChange, t, searchParams, setPriceRange, lang }) => {
    const [values, setValues] = useState([MIN, MAX]);

    // Initialize values from URL parameters
    useEffect(() => {
        const minPrice = searchParams?.price_min ? parseInt(searchParams.price_min) : MIN;
        const maxPrice = searchParams?.price_max ? parseInt(searchParams.price_max) : MAX;
        setValues([minPrice, maxPrice]);
    }, [searchParams]);

    const handleChange = (newValues) => {
        setValues(newValues);
    };

    const handleDragEnd = (newValues) => {
        setValues(newValues);
        // Apply price filter only when dragging ends
        setPriceRange(newValues[0], newValues[1], lang);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Slider
                className="slider"
                value={values}
                onChange={handleChange}
                onAfterChange={handleDragEnd}
                min={MIN}
                max={MAX}
            />
            <div style={{
                display: 'flex',
                gap: '10px',
                width: '100%',
                marginTop: '15px',
            }}>
                <div>
                    <label className="label-price" htmlFor="minPrice">{t("priceFrom")}</label>
                    <input
                        disabled
                        className="input-price"
                        type="text"
                        id="minPrice"
                        value={`${values[0]} IQD`}
                    />
                </div>
                <div>
                    <label className="label-price" htmlFor="maxPrice">{t("priceTo")}</label>
                    <input
                        disabled
                        className="input-price"
                        type="text"
                        id="maxPrice"
                        value={`${values[1]} IQD`}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceSlider;
