"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export function TypingText({ texts }: { texts: string[] }) {
    const [index, setIndex] = useState(0);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => texts[index].slice(0, latest));

    useEffect(() => {
        const controls = animate(count, texts[index].length, {
            type: "tween",
            duration: 1.5,
            ease: "easeInOut",
            onComplete: () => {
                setTimeout(() => {
                    // Delete
                    animate(count, 0, {
                        type: "tween",
                        duration: 1,
                        ease: "easeInOut",
                        onComplete: () => {
                            setIndex((prev) => (prev + 1) % texts.length);
                        }
                    });
                }, 2000); // Wait before deleting
            }
        });
        return controls.stop;
    }, [index, texts, count]);

    return <motion.span>{displayText}</motion.span>;
}
