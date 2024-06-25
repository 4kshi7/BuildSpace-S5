import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
 // Ensure to create and import a CSS file for custom cursor styles

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
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

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor w-2 h-2 bg-black rounded-full fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div ref={followerRef} className="cursor-follower w-8 h-8 border-2 border-black rounded-full fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"></div>
        </>
    );
};

export default Cursor;
