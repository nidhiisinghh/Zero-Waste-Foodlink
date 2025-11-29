"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

const SPRING = {
    mass: 0.1,
    damping: 10,
    stiffness: 131,
};

export const CursorEffect = () => {
    const xSpring = useSpring(0, SPRING);
    const ySpring = useSpring(0, SPRING);
    const opacitySpring = useSpring(0, SPRING);
    const scaleSpring = useSpring(0, SPRING);

    // Use motion values for immediate updates if needed, but springs are smoother
    // We'll drive the springs from the mouse position

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset by half the cursor size (e.g., 20px / 2 = 10px) to center it
            xSpring.set(e.clientX - 10);
            ySpring.set(e.clientY - 10);

            // Ensure it's visible when moving
            opacitySpring.set(1);
            scaleSpring.set(1);
        };

        const handleMouseEnter = () => {
            opacitySpring.set(1);
            scaleSpring.set(1);
        };

        const handleMouseLeave = () => {
            opacitySpring.set(0);
            scaleSpring.set(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [xSpring, ySpring, opacitySpring, scaleSpring]);

    return (
        <motion.div
            style={{
                x: xSpring,
                y: ySpring,
                opacity: opacitySpring,
                scale: scaleSpring,
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
            }}
            className="size-5 rounded-full bg-green-300 mix-blend-difference"
        />
    );
};
