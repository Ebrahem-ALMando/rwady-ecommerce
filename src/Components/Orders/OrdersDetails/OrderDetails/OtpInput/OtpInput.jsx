import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const OtpInput = ({
                      otp,
                      setOtp,
                      handleVerifyOtp,
                      verifying,
                      otpError,
                      digits = 8,
                      t,
                      isOneInput = false,
                  }) => {
    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        if (isOneInput) {
            setOtp(e.target.value);
            return;
        }
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = otp.split("");
        newOtp[index] = value;
        setOtp(newOtp.join(""));

        if (value && index < digits - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (isOneInput) {
            return;
        }
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = otp.split("");
            newOtp[index - 1] = "";
            setOtp(newOtp.join(""));
            inputsRef.current[index - 1]?.focus();
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (inputsRef.current[0]) inputsRef.current[0].focus();
    }, []);
    const handlePaste = (e) => {
        if (isOneInput) {
            return;
        }
            e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, digits);

        if (!pasted) return;

        const newOtp = otp.split("");
        for (let i = 0; i < pasted.length; i++) {
            newOtp[i] = pasted[i];
            if (inputsRef.current[i]) {
                inputsRef.current[i].value = pasted[i];
            }
        }

        setOtp(newOtp.join(""));

        inputsRef.current[pasted.length - 1]?.focus();
    };

    return (
                <div className="mt-6 bg-gray-50 pb-4 pt-4 rounded-lg shadow-sm border text-center">
            <h4 className="text-sm font-semibold mb-3 text-gray-800">
                {t("otp.title")}
            </h4>

            <div className="flex justify-center gap-1 mb-3 flex-wrap">
                {isOneInput ? (
            <input
                        type="text" 
                        maxLength={digits}
                        value={otp || ""}
                        onChange={(e) => handleChange(e, 0)}
                        // onKeyDown={(e) => handleKeyDown(e, 0)}
                        onPaste={handlePaste}
                        onKeyDown={(e)=>{
                            if(otp.length>=8){  
                            if(e.key === "Enter"){
                                e.preventDefault();
                                handleVerifyOtp();
                            }
                        }
                        }}
                        ref={(el) => (inputsRef.current[0] = el)}
                        className="w-full h-12 text-center border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 ml-2"
                    />
                ) : (
               <>
                {[...Array(digits)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ""}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        ref={(el) => (inputsRef.current[index] = el)}
                        className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
               </>
                )}
            </div>

            {otpError && (
                <p className="text-red-500 text-sm mb-2">{otpError}</p>
            )}

            <button
                onClick={handleVerifyOtp}
                disabled={verifying || otp.length < digits}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded disabled:opacity-50"
            >
                {verifying ? t("otp.verifying") : t("otp.submit")}
            </button>
        </div>
    );
};

export default OtpInput;

