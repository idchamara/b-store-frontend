
import { useEffect, useState } from "react";
import {
    MdChevronLeft,
    MdChevronRight,
    MdZoomIn
} from "react-icons/md";

export default function ImageSlider({ images = [] }) {

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="w-full aspect-square flex items-center justify-center
                rounded-3xl border border-white/10 bg-[#1a1010]">
                <p className="text-gray-500">No product images available</p>
            </div>
        );
    }

    const previousImage = () => {
        setActiveIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setActiveIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="w-full flex flex-col gap-5">

            {/* Main Image Container */}
            <div className="relative w-full aspect-square overflow-hidden
                rounded-3xl border border-red-900/30
                bg-gradient-to-br from-[#291010] to-[#100909]
                shadow-[0_15px_50px_rgba(0,0,0,0.4)]">

                {/* Main Image */}
                <img
                    key={images[activeIndex]}
                    src={images[activeIndex]}
                    alt="Product"
                    className="w-full h-full object-contain p-5
                    transition-all duration-500"
                />

                {/* Image Counter */}
                <div className="absolute top-5 left-5 px-4 py-2
                    rounded-full bg-black/50 backdrop-blur-xl
                    border border-white/10">
                    <span className="text-white text-xs font-semibold tracking-wider">
                        {String(activeIndex + 1).padStart(2, "0")}
                        <span className="text-gray-500 mx-2">/</span>
                        {String(images.length).padStart(2, "0")}
                    </span>
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={previousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2
                            w-11 h-11 rounded-full flex items-center justify-center
                            bg-black/50 backdrop-blur-xl border border-white/10
                            text-white hover:bg-red-700 hover:border-red-500
                            transition-all duration-300 cursor-pointer"
                            aria-label="Previous image"
                        >
                            <MdChevronLeft size={28} />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2
                            w-11 h-11 rounded-full flex items-center justify-center
                            bg-black/50 backdrop-blur-xl border border-white/10
                            text-white hover:bg-red-700 hover:border-red-500
                            transition-all duration-300 cursor-pointer"
                            aria-label="Next image"
                        >
                            <MdChevronRight size={28} />
                        </button>
                    </>
                )}

                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-24
                    bg-gradient-to-t from-black/30 to-transparent
                    pointer-events-none" />
            </div>

            {/* Thumbnail Section */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2
                    scrollbar-thin scrollbar-thumb-red-900
                    scrollbar-track-transparent">

                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative flex-shrink-0 w-20 h-20
                            sm:w-24 sm:h-24 overflow-hidden rounded-xl
                            border-2 transition-all duration-300 cursor-pointer
                            ${
                                activeIndex === index
                                    ? "border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.35)]"
                                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-red-900"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`Product thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {activeIndex === index && (
                                <div className="absolute inset-0
                                    bg-red-600/10" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Image Information */}
            <div className="flex items-center justify-between px-1">
                <div>
                    <p className="text-white text-sm font-semibold">
                        Product Gallery
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        Select an image to preview
                    </p>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                    <MdZoomIn size={18} />
                    <span className="text-xs">Product View</span>
                </div>
            </div>

        </div>
    );
}
