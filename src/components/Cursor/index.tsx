import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./cursor.css";
import { useStore } from "@nanostores/react";
import { isCursorHovering } from "./cursorContext";

const Cursor = () => {
    const cursorSize = 10;
    const [cursorScale, setCursorScale] = useState(1);
    const $isCursorHovering = useStore(isCursorHovering);

    const cursor_r = useRef<HTMLDivElement>(null);

    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };

    const smoothOptions = { damping: 10, stiffness: 500, mass: 0.3 };

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

    useEffect(() => {
        if (window) {
            const onCursorLeave = () => {
                setCursorScale(0);
                cursor_r.current?.classList.remove("cursor--entry");
            };
            const onCursorEnter = () => {
                setCursorScale(1);
                cursor_r.current?.classList.add("cursor--entry");
            };

            document.addEventListener("mouseleave", onCursorLeave);
            document.addEventListener("mouseenter", onCursorEnter);

            return () => {
                document.removeEventListener("mouseleave", onCursorLeave);
                document.removeEventListener("mouseenter", onCursorEnter);
            };
        }
    }, []);

    return (
        <motion.div
            style={{
                left: smoothMouse.x,
                top: smoothMouse.y,
                height: cursorSize,
                scale: cursorScale,
            }}
            className="cursor"
            ref={cursor_r}
        ></motion.div>
    );
};

export default Cursor;
