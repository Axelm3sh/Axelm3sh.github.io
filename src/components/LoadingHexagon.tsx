import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import './LoadingHexagon.css';

interface LoadingHexagonProps {
    /** Duration of the loading animation in seconds */
    duration?: number;
    /** Optional manual progress value (0-100) */
    progress?: number;
}

const LoadingHexagon = ({duration = 2, progress}: LoadingHexagonProps) => {
    // Base hexagon geometry configuration
    const size = 100;
    const center = size / 2;
    const radius = 40;

    // Generate outer hexagon points by calculating 6 vertices in a circle
    const points = Array.from({length: 6}, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    const [slices, setSlices] = useState<{ path: string, visible: boolean }[]>([]);
    const [currentProgress, setCurrentProgress] = useState(0);

    // Initialize the internal hexagon slices that fill up during loading
    useEffect(() => {
        const numberOfSlices = 6;
        // Calculate path for each triangular slice from center to outer vertices
        const newSlices = Array.from({length: numberOfSlices}, (_, i) => {
            const startAngle = (Math.PI / 3) * i - Math.PI / 6;
            const endAngle = (Math.PI / 3) * (i + 1) - Math.PI / 6;

            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);

            const path = `M ${center},${center} L ${x1},${y1} L ${x2},${y2} Z`;

            return {
                path,
                visible: false
            };
        });

        setSlices(newSlices);
    }, []);

    // Handle progress updates - either from prop or internal timer
    useEffect(() => {
        if (progress !== undefined) {
            setCurrentProgress(progress);
        } else {
            const interval = setInterval(() => {
                setCurrentProgress(prev => {
                    const next = prev + (100 / (duration * 10));
                    return next > 100 ? 100 : next;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [duration, progress]);

    // Update slice visibility based on current progress
    useEffect(() => {
        const slicesToShow = Math.ceil((currentProgress / 100) * slices.length);

        setSlices(prev =>
            prev.map((slice, index) => ({
                ...slice,
                visible: index < slicesToShow
            }))
        );
    }, [currentProgress, slices.length]);

    return (
        <div className="loading-hexagon-container">
            <motion.svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
            >
                <motion.polygon
                    points={points}
                    fill="none"
                    stroke="var(--highlight)"
                    strokeWidth="2"
                    initial={{strokeDasharray: 1000, strokeDashoffset: 1000}}
                    animate={{strokeDashoffset: 0}}
                    transition={{duration: duration * 0.3}}
                />

                {slices.map((slice, index) => (
                    <motion.path
                        key={index}
                        d={slice.path}
                        fill={
                            Math.floor(index / 2) % 3 === 0 ? "var(--highlight)" :
                                Math.floor(index / 2) % 3 === 1 ? "var(--highlight-alt)" :
                                    "var(--highlight-alt2)"
                        }
                        initial={{opacity: 0}}
                        animate={{opacity: slice.visible ? 0.8 : 0}}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut"
                        }}
                    />
                ))}

                <motion.circle
                    cx={center}
                    cy={center}
                    r={3}
                    fill="var(--text)"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.3}}
                />
            </motion.svg>
        </div>
    );
};

export default LoadingHexagon;