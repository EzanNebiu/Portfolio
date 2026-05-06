import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ImageSlider({ images, alt, className }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className={cn('relative w-full aspect-video bg-navy-700 rounded-lg flex items-center justify-center', className)}>
        <p className="text-text-secondary">No images available</p>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={cn('relative w-full aspect-video overflow-hidden rounded-lg', className)}>
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-video overflow-hidden rounded-lg group"
        tabIndex={0}
        role="region"
        aria-label="Image carousel"
        aria-roledescription="carousel"
      >
        {/* Images */}
        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
            className="w-full h-full object-cover"
            style={{ opacity: prefersReducedMotion ? undefined : opacity }}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 300 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            drag={prefersReducedMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                goToNext();
              } else if (swipe > 10000) {
                goToPrevious();
              }
            }}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy-900/80 hover:bg-navy-900 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy-900/80 hover:bg-navy-900 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Image navigation">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                currentIndex === index
                  ? 'bg-blue w-8'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              role="tab"
              aria-label={`Go to image ${index + 1}`}
              aria-selected={currentIndex === index}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-navy-900/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Previews */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-navy-700 scrollbar-track-transparent">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all',
              currentIndex === index
                ? 'border-blue scale-105'
                : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
            )}
            aria-label={`Thumbnail ${index + 1}`}
          >
            <img
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
