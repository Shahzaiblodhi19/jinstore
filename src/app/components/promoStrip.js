// components/PromoStrip.js
"use client"
import { useState, useEffect } from 'react';

export default function PromoStrip() {
    const [timeLeft, setTimeLeft] = useState({
        days: 47,
        hours: 6,
        minutes: 55,
        seconds: 59, // Adding seconds
    });

    useEffect(() => {
        // Function to update the countdown every second (1000ms)
        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                let { days, hours, minutes, seconds } = prevTime;

                // Decrease seconds by 1
                if (seconds > 0) {
                    seconds -= 1;
                } else {
                    // Reset seconds to 59 and decrease minutes by 1
                    seconds = 59;
                    if (minutes > 0) {
                        minutes -= 1;
                    } else {
                        // Reset minutes to 59 and decrease hours by 1
                        minutes = 59;
                        if (hours > 0) {
                            hours -= 1;
                        } else {
                            // Reset hours to 23 and decrease days by 1
                            hours = 23;
                            if (days > 0) {
                                days -= 1;
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000); // Update every second (1000ms)

        // Clean up the interval when the component is unmounted
        return () => clearInterval(countdownInterval);
    }, []);

    // Format time values with leading zeros (padStart)
    const formatTime = (time) => time.toString().padStart(2, '0');

    return (
        <div className='strp bg-[#634C9F] text-white py-3 sm:py-2 px-2'>
            <div className="container">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-[16px] lg:gap-[120px]">
                    <p className="heading text-[0.6875em] sm:text-[0.75em] font-semibold text-center lg:text-left">
                        FREE delivery & 40% Discount for next 3 orders! Place your 1st order in.
                    </p>

                    {/* Middle Section - Sale Timer */}
                    <div className="flex flex-col sm:flex-row justify-start items-center text-center lg:text-left gap-1 sm:gap-0">
                        <p className="text-white font-inter text-[0.6875em] sm:text-[0.75em] lg:text-[0.75em] mt-0 font-medium leading-normal tracking-[-0.32px] opacity-[0.7]">
                            Until the end of the sale:
                        </p>
                        <div className="ml-4 flex items-center gap-1 justify-center lg:justify-start">
                            {/*  Days  */}
                            <span className="text-white font-inter text-sm sm:text-base lg:text-[1.125em] font-semibold leading-normal tracking-[-0.32px]">
                                {formatTime(timeLeft.days)}
                            </span>
                            <span className="text-white font-inter text-xs sm:text-sm lg:text-[0.6875em] font-normal leading-normal tracking-[-0.32px] opacity-70">days</span>

                            {/*  Hours  */}
                            <span className="ml-2 text-white font-inter text-sm sm:text-base lg:text-[1.125em] font-semibold leading-normal tracking-[-0.32px]">
                                {formatTime(timeLeft.hours)}
                            </span>
                            <span className="text-white font-inter text-xs sm:text-sm lg:text-[0.6875em] font-normal leading-normal tracking-[-0.32px] opacity-70">hours</span>

                            {/*  Minutes  */}
                            <span className="ml-2 text-white font-inter text-sm sm:text-base lg:text-[1.125em] font-semibold leading-normal tracking-[-0.32px]">
                                {formatTime(timeLeft.minutes)}
                            </span>
                            <span className="text-white font-inter text-xs sm:text-sm lg:text-[0.6875em] font-normal leading-normal tracking-[-0.32px] opacity-70">minutes</span>

                            {/*  Seconds  */}
                            <span className="ml-2 text-white font-inter text-sm sm:text-base lg:text-[1.125em] font-semibold leading-normal tracking-[-0.32px]">
                                {formatTime(timeLeft.seconds)}
                            </span>
                            <span className="text-white font-inter text-xs sm:text-sm lg:text-[0.6875em] font-normal leading-normal tracking-[-0.32px] opacity-70">sec.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
