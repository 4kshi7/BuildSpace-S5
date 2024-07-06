import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Nav2 } from "../Navbar/Nav2";

const PomodoroTimer = () => {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [breakType, setBreakType] = useState("work");
    const [customTime, setCustomTime] = useState(25);

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else if (time === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = (minutes) => {
        setIsActive(false);
        setTime(minutes * 60);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const getTimeForBreakType = (type) => {
        switch (type) {
            case "work":
                return 25;
            case "short":
                return 5;
            case "long":
                return 15;
            case "custom":
                return customTime;
            default:
                return 25;
        }
    };

    const handleReset = () => {
        const resetTime = getTimeForBreakType(breakType);
        resetTimer(resetTime);
    };

    const handleBreakTypeChange = (type) => {
        setBreakType(type);
        const newTime = getTimeForBreakType(type);
        resetTimer(newTime);
    };

    const handleCustomTimeChange = (e) => {
        const newTime = parseInt(e.target.value) || 1;
        setCustomTime(newTime);
        if (breakType === "custom") {
            resetTimer(newTime);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white">
            <Nav2 />
            <div className="container mx-auto lg:px-36 md:px-8 px-4 pt-8 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex justify-center items-center mb-12"
                >
                    <h1 className="text-[#5AD1B1] font-bold text-4xl sm:text-5xl">
                        Pomodoro Timer
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#062719]/20 rounded-xl p-8 max-w-2xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-8xl font-bold text-center mb-8"
                    >
                        {formatTime(time)}
                    </motion.div>

                    <div className="flex justify-center space-x-4 mb-8">
                        <TimerButton
                            onClick={() => handleBreakTypeChange("work")}
                            active={breakType === "work"}
                        >
                            Work
                        </TimerButton>
                        <TimerButton
                            onClick={() => handleBreakTypeChange("short")}
                            active={breakType === "short"}
                        >
                            Short Break
                        </TimerButton>
                        <TimerButton
                            onClick={() => handleBreakTypeChange("long")}
                            active={breakType === "long"}
                        >
                            Long Break
                        </TimerButton>
                    </div>

                    <div className="flex justify-center items-center space-x-4 mb-8">
                        <TimerButton
                            onClick={() => handleBreakTypeChange("custom")}
                            active={breakType === "custom"}
                        >
                            Custom
                        </TimerButton>
                        <input
                            type="number"
                            value={customTime}
                            onChange={handleCustomTimeChange}
                            className="bg-[#0b4334] text-white px-4 py-2 rounded-full w-20 text-center"
                            min="1"
                        />
                        <span className="text-[#5AD1B1]">minutes</span>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTimer}
                            className={`${isActive ? "bg-[#FF6B6B]" : "bg-[#5AD1B1]"
                                } text-black px-8 py-3 rounded-full font-semibold text-lg`}
                        >
                            {isActive ? "Pause" : "Start"}
                        </motion.button>
                        {isActive && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReset}
                                className="bg-[#0b4334] text-white px-8 py-3 rounded-full font-semibold text-lg"
                            >
                                Reset
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const TimerButton = ({ children, onClick, active }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${active ? "bg-[#5AD1B1] text-black" : "bg-[#0b4334] text-white"
            } px-4 py-2 rounded-full font-semibold`}
    >
        {children}
    </motion.button>
);

export default PomodoroTimer;