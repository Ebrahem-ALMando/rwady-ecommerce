"use client";
import React, { useState } from "react";
import { Range } from "react-range";
import styles from "./FilterCriteriaPrice.module.css"; // استيراد الـ CSS Module

const FilterCriteriaPrice = () => {
    const [value, setValue] = useState([100, 300]);

    return (
        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
            <Range
                className={styles.slider}
                values={value}
                onChange={setValue}
                step={10}
                min={0}
                max={1000}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className={`${styles.track}`}
                        style={{ ...props.style, height: "6px", borderRadius: "4px" }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        className={styles.thumb}
                        style={{
                            ...props.style,
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            border: "2px solid #fff",
                        }}
                    />
                )}
            />

            <div className="flex gap-2">
                <input
                    type="text"
                    value={value[0]}
                    readOnly
                    className="border border-gray-400 rounded px-2 py-1 w-24"
                    style={{ backgroundColor: "#f0f0f0", color: "#0741AD" }}
                />
                <span className="text-default-500 font-medium text-small">–</span>
                <input
                    type="text"
                    value={value[1]}
                    readOnly
                    className="border border-gray-400 rounded px-2 py-1 w-24"
                    style={{ backgroundColor: "#f0f0f0", color: "#0741AD" }}
                />
            </div>

            {/* عرض النطاق المحدد */}
            <p className="text-default-500 font-medium text-small">
                Selected budget: {value[0]} – {value[1]}
            </p>
        </div>
    );
};

export default FilterCriteriaPrice
