"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeftRight } from "lucide-react"

interface BeforeAfterSliderProps {
    beforeImage: string
    afterImage: string
    title: string
    description?: string
}

export function BeforeAfterSlider({ beforeImage, afterImage, title, description }: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX

        // Calculate percentage
        let position = ((x - rect.left) / rect.width) * 100
        position = Math.max(0, Math.min(100, position))

        setSliderPosition(position)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove)
            window.addEventListener('mouseup', handleMouseUp)
            window.addEventListener('touchmove', handleMove)
            window.addEventListener('touchend', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('touchmove', handleMove)
            window.removeEventListener('touchend', handleMouseUp)
        }
    }, [isDragging])


    return (
        <div className="group relative rounded-xl overflow-hidden shadow-lg border-2 border-slate-100 select-none">
            <div
                ref={containerRef}
                className="relative h-64 md:h-80 w-full cursor-col-resize"
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
            >
                {/* After Image (Background/Underneath) - Wait, logic wise usually Before is underneath? */}
                {/* Let's put After visually on Right (100%) and Before on Left (0%) */}
                {/* Or standard is: Base is AFTER, Overlay is BEFORE clipped. */}

                {/* Layer 1: After Image (Full visibility by default if overlay hidden) */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${afterImage})` }}
                />

                {/* Layer 2: Before Image (Clipped by slider position) */}
                <div
                    className="absolute inset-0 bg-cover bg-center border-r-2 border-white"
                    style={{
                        backgroundImage: `url(${beforeImage})`,
                        width: `${sliderPosition}%`
                    }}
                />

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize flex items-center justify-center shadow-xl"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md text-teal-600">
                        <ArrowLeftRight className="h-4 w-4" />
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-bold">
                    BEFORE
                </div>
                <div className="absolute top-4 right-4 bg-teal-600/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-bold">
                    AFTER
                </div>
            </div>

            <div className="bg-white p-4">
                <h3 className="font-bold text-slate-900">{title}</h3>
                {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
            </div>
        </div>
    )
}
