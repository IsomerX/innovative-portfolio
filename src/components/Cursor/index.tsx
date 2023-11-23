import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import "./cursor.css";
import { useStore } from "@nanostores/react";
import { isCursorHovering } from "./cursorContext";

const Cursor = () => {
    const cursorSize = 10;
    const [cursorScale, setCursorScale] = useState(1);
    const $isCursorHovering = useStore(isCursorHovering);

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothOptions = { damping: 10, stiffness: 100, mass: 0.1 };

    const smoothMouse = {
        x: useSpring(mouse.x, smoothOptions),
        y: useSpring(mouse.y, smoothOptions),
    };

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouse.x.set(clientX - cursorSize / 2);

            mouse.y.set(clientY - cursorSize / 2);
        };
        window.addEventListener("mousemove", manageMouseMove);

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
        };
    }, [cursorSize]);

    useEffect(() => {
        if ($isCursorHovering) {
            setCursorScale(6);
        } else {
            setCursorScale(1);
        }
    }, [$isCursorHovering]);

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
                height: cursorSize,
                scale: cursorScale,
            }}
            className="cursor"
        ></motion.div>
    );
};

export default Cursor;
