"use client"
import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import './FilterCriteriaPrice.css';

const MIN = 0;
const MAX = 10000;

const PriceSlider = ({ onChange }) => {
    const [values, setValues] = useState([MIN, MAX]);

    const handleChange = (newValues) => {
        setValues(newValues);
    };

    useEffect(() => {
        onChange?.(values[0], values[1]);
    }, [values]);

    return (
        <div style={{ padding: '20px' }}>
            <Slider
                className="slider"
                value={values}
                onChange={handleChange}
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
                    <label className="label-price" htmlFor="minPrice">من</label>
                    <input
                        disabled
                        className="input-price"
                        type="text"
                        id="minPrice"
                        value={`${values[0]} IQD`}
                    />
                </div>
                <div>
                    <label className="label-price" htmlFor="maxPrice">إلى</label>
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
