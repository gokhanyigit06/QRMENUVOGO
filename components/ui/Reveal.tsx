'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface Props {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    className?: string;
}

export default function Reveal({
    children,
    width = '100%',
    delay = 0,
    duration = 0.5,
    y = 30,
    x = 0,
    className
}: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} className={className} style={{ position: 'relative', width }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: y, x: x },
                    visible: { opacity: 1, y: 0, x: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration, delay, ease: [0.17, 0.67, 0.83, 0.91] }}
            >
                {children}
            </motion.div>
        </div>
    );
}
