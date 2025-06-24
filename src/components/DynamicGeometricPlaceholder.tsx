import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import './DynamicGeometricPlaceholder.css';

// All available shape types
const ALL_SHAPES = ['hexagon', 'triangle', 'diamond', 'octagon'] as const;
type ShapeType = typeof ALL_SHAPES[number];

interface DynamicGeometricPlaceholderProps {
    /** Size of the shape */
    size?: number;
    /** Whether the shape should be in "lit up" state */
    isLit?: boolean;
    /** Whether to show hover animations */
    enableHover?: boolean;
    /** Custom className for additional styling */
    className?: string;
    /** Interval in milliseconds between shape changes (default: 3500ms) */
    changeInterval?: number;
    /** Array of shapes to cycle through. If empty, will randomly choose from all available shapes */
    shapes?: readonly ShapeType[] | ShapeType[];
}

const DynamicGeometricPlaceholder = ({
                                         size = 120,
                                         isLit = false,
                                         enableHover = true,
                                         className = '',
                                         changeInterval = 3500,
                                         shapes = ALL_SHAPES
                                     }: DynamicGeometricPlaceholderProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentShapeIndex, setCurrentShapeIndex] = useState(() => {
        // Initialize with a random index if using ALL_SHAPES
        return shapes.length === 0 ? Math.floor(Math.random() * ALL_SHAPES.length) : 0;
    });
    const [isTransitioning, setIsTransitioning] = useState(false);

    // If shapes array is empty, use all available shapes
    const effectiveShapes = shapes.length === 0 ? ALL_SHAPES : shapes;

    const center = size / 2;
    const radius = size * 0.35;
    const currentShape = effectiveShapes[currentShapeIndex];

    // Auto-cycle through shapes
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);

            // After a brief transition delay, change the shape
            setTimeout(() => {
                if (shapes.length === 0) {
                    // For empty shapes array, choose a random shape from ALL_SHAPES
                    // Make sure we don't pick the same shape twice in a row
                    const nextIndex = () => {
                        const randomIndex = Math.floor(Math.random() * ALL_SHAPES.length);
                        return randomIndex !== currentShapeIndex ? randomIndex : (randomIndex + 1) % ALL_SHAPES.length;
                    };
                    setCurrentShapeIndex(nextIndex());
                } else {
                    // Otherwise, cycle through the provided shapes
                    setCurrentShapeIndex((prevIndex) => (prevIndex + 1) % effectiveShapes.length);
                }
                setIsTransitioning(false);
            }, 200);
        }, changeInterval);

        return () => clearInterval(interval);
    }, [changeInterval, effectiveShapes.length, shapes.length, currentShapeIndex]);

    // Generate points for different shapes
    const generateShapePoints = (shapeType: string) => {
        switch (shapeType) {
            case 'triangle':
                return Array.from({length: 3}, (_, i) => {
                    const angle = (Math.PI * 2 / 3) * i - Math.PI / 2;
                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);
                    return `${x},${y}`;
                }).join(' ');

            case 'diamond':
                return Array.from({length: 4}, (_, i) => {
                    const angle = (Math.PI / 2) * i;
                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);
                    return `${x},${y}`;
                }).join(' ');

            case 'octagon':
                return Array.from({length: 8}, (_, i) => {
                    const angle = (Math.PI / 4) * i;
                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);
                    return `${x},${y}`;
                }).join(' ');

            case 'hexagon':
            default:
                return Array.from({length: 6}, (_, i) => {
                    const angle = (Math.PI / 3) * i - Math.PI / 6;
                    const x = center + radius * Math.cos(angle);
                    const y = center + radius * Math.sin(angle);
                    return `${x},${y}`;
                }).join(' ');
        }
    };

    // Generate inner pattern for filled shapes
    const generateInnerPattern = (shapeType: string) => {
        const sides = shapeType === 'triangle' ? 3 :
            shapeType === 'diamond' ? 4 : 
            shapeType === 'octagon' ? 8 : 6;

        return Array.from({length: sides}, (_, i) => {
            const angleOffset = shapeType === 'triangle' ? Math.PI / 2 :
                           shapeType === 'octagon' ? 0 : Math.PI / 6;
            const startAngle = (Math.PI * 2 / sides) * i - angleOffset;
            const endAngle = (Math.PI * 2 / sides) * (i + 1) - angleOffset;

            const x1 = center + radius * Math.cos(startAngle);
            const y1 = center + radius * Math.sin(startAngle);
            const x2 = center + radius * Math.cos(endAngle);
            const y2 = center + radius * Math.sin(endAngle);

            return `M ${center},${center} L ${x1},${y1} L ${x2},${y2} Z`;
        });
    };

    const points = generateShapePoints(currentShape);
    const innerPaths = generateInnerPattern(currentShape);

    const currentState = enableHover ? (isHovered || isLit) : isLit;

    return (
        <div
            className={`geometric-placeholder-container ${className}`}
            onMouseEnter={() => enableHover && setIsHovered(true)}
            onMouseLeave={() => enableHover && setIsHovered(false)}
        >
            <motion.svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                initial={{opacity: 0, scale: 0.8}}
                animate={{
                    opacity: isTransitioning ? 0.7 : 1,
                    scale: isTransitioning ? 0.9 : 1,
                    rotate: isTransitioning ? 5 : 0
                }}
                transition={{duration: 0.3, ease: "easeInOut"}}
                key={currentShapeIndex} // Force re-render on shape change
            >
                <>
                    {/* Polygon outline */}
                    <motion.polygon
                        points={points}
                        fill="none"
                        stroke={currentState ? "var(--highlight)" : "var(--accent)"}
                        strokeWidth="2"
                        initial={{strokeDasharray: 1000, strokeDashoffset: 1000}}
                        animate={{strokeDashoffset: 0}}
                        transition={{duration: 0.8, ease: "easeInOut"}}
                    />

                    {/* Inner pattern segments */}
                    {innerPaths.map((path, index) => (
                        <motion.path
                            key={`${currentShapeIndex}-${index}`}
                            d={path}
                            fill={
                                currentState
                                    ? index % 3 === 0 ? "var(--highlight)" :
                                        index % 3 === 1 ? "var(--highlight-alt)" :
                                            "var(--highlight-alt2)"
                                    : index % 2 === 0 ? "var(--secondary)" : "var(--accent)"
                            }
                            initial={{opacity: 0}}
                            animate={{
                                opacity: currentState ? 0.7 : 0.3
                            }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.05 + 0.2,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </>

                {/* Center dot */}
                <motion.circle
                    cx={center}
                    cy={center}
                    r={3}
                    fill={currentState ? "var(--text)" : "var(--text-secondary)"}
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.3, delay: 0.4}}
                />
            </motion.svg>
        </div>
    );
};

export default DynamicGeometricPlaceholder;