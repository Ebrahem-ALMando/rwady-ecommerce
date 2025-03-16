"use client"
import React, { useState } from 'react';
import Slider from 'react-slider';
import './FilterCriteriaPrice.css';

const MIN=0;
const MAX=10000;
const PriceSlider = () => {
    const [values, setValues] = useState([MIN, MAX]);
    const handleChange = (newValues) => setValues(newValues);

    return (
        <div style={{ padding: '20px'}}>
            <Slider
                className={"slider"}
                value={values}
                onChange={handleChange}
                min={MIN}
                max={MAX}
            />
            <div
            style={{
                display: 'flex',
                gap: '10px',
                width: '100%',
                marginTop: '15px',

            }}
            >
                <div>
                    <label
                        className={"label-price"}
                        htmlFor="minPrice">من</label>
                    <input
                        disabled={true}
                        className={"input-price"}
                        type="text"
                        id="minPrice"
                        value={`${values[0]} IQD`}
                        onChange={(e) => handleChange([+e.target.value, values[1]])}
                    />
                </div>
                <div>
                    <label
                        className={"label-price"}
                        htmlFor="maxPrice">الى</label>
                    <input
                        disabled={true}
                        className={"input-price"}
                        type="text"
                        id="maxPrice"
                        value={`${values[1]} IQD`}
                        onChange={(e) => handleChange([values[0], +e.target.value])}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceSlider;