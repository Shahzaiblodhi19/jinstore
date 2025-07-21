"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PromoStrip() {
    const [timeLeft, setTimeLeft] = useState({
        days: 47,
        hours: 6,
        minutes: 55,
        seconds: 59,
    });

    const prevTimeRef = useRef(timeLeft);

    const stripRef = useRef(null);
    const headingRef = useRef(null);
    const labelRef = useRef(null);
    const digitRefs = {
        days: useRef(null),
        hours: useRef(null),
        minutes: useRef(null),
        seconds: useRef(null),
    };

    // Animate full strip on mount
    useEffect(() => {
        gsap.set(stripRef.current, { opacity: 0, y: -50 });
        gsap.timeline()
            .to(stripRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out',
            })
            .from([headingRef.current, labelRef.current], {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out',
            }, "-=0.6");
    }, []);

    // Animate only the seconds digit — amazing flip effect
    useEffect(() => {
        const prev = prevTimeRef.current;

        const secEl = digitRefs.seconds.current;
        if (timeLeft.seconds !== prev.seconds && secEl) {
            gsap.fromTo(
                secEl,
                {
                    rotationX: -90,
                    transformPerspective: 600,
                    opacity: 0,
                },
                {
                    rotationX: 0,
                    transformPerspective: 600,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(2)",
                }
            );
        }

        prevTimeRef.current = timeLeft;
    }, [timeLeft]);

    // Countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds -= 1;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes -= 1;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours -= 1;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days -= 1;
                            }
                        }
                    }
                }

                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => time.toString().padStart(2, '0');

    return (
        <div ref={stripRef} className="strp bg-[#634C9F] text-white py-3 sm:py-2 px-2">
            <div className="container">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-[16px] lg:gap-[120px]">
                    <p
                        ref={headingRef}
                        className="heading text-[0.6875em] sm:text-[0.75em] font-semibold text-center lg:text-left"
                    >
                        FREE delivery & 40% Discount for next 3 orders! Place your 1st order in.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-start items-center text-center lg:text-left gap-1 sm:gap-0">
                        <p
                            ref={labelRef}
                            className="text-white font-inter text-[0.6875em] sm:text-[0.75em] font-medium leading-normal tracking-[-0.32px] opacity-[0.7]"
                        >
                            Until the end of the sale:
                        </p>

                        <div className="ml-4 flex items-center gap-1 justify-center lg:justify-start">
                            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                                <div key={unit} className="flex items-center ml-2 gap-1">
                                    <div
                                        ref={digitRefs[unit]}
                                        className="text-white font-inter text-sm sm:text-base lg:text-[1.125em] font-semibold leading-normal tracking-[-0.32px]"
                                        style={{
                                            display: "inline-block",
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {formatTime(timeLeft[unit])}
                                    </div>
                                    <span className="text-white font-inter text-xs sm:text-sm lg:text-[0.6875em] font-normal leading-normal tracking-[-0.32px] opacity-70">
                                        {unit === 'seconds' ? 'sec.' : unit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
