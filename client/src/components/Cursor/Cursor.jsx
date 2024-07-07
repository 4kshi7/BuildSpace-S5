import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
            if (!isLargeScreen) return;
            
            gsap.to(cursor, {
                duration: 0.2,
                left: e.clientX,
                top: e.clientY,
            });
            gsap.to(follower, {
                duration: 0.6,
                left: e.clientX,
                top: e.clientY,
            });
        };

        const onResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
        };
    }, [isLargeScreen]);

    if (!isLargeScreen) return null;

    return (
        <>
            <div ref={cursorRef} className="cursor w-2 h-2 bg-white rounded-full fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div ref={followerRef} className="cursor-follower w-8 h-8 border-2 border-white rounded-full fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"></div>
        </>
    );
};

export default Cursor;