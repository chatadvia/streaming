import React, { useRef, useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import cnMerge from '../utils/cnMerge';
import useMovieStore from './../store/useMovieStore';

const MovieGrid: React.FC = () => {
  const { movies } = useMovieStore();
    const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft > 0) {
        carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth < scrollWidth) {
        carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollTo({ left: 0 });
    }
  }, [movies]);

  return (
    <div className="relative w-full mt-16">
      <button
        onClick={scrollLeft}
        className={cnMerge(
          'absolute left-0 top-1/2 transform -translate-y-1/2 z-10',
          'bg-gray-800 text-white p-2 rounded-full',
          'hover:bg-gray-600',
        )}
      >
        ◀
      </button>

      <div
        ref={carouselRef}
        className={cnMerge(
          'flex overflow-x-scroll scrollbar-hide',
          'snap-x snap-mandatory',
        )}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={cnMerge(
              'snap-start flex-shrink-0',
              'w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4',
              'px-2',
            )}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className={cnMerge(
          'absolute right-0 top-1/2 transform -translate-y-1/2 z-10',
          'bg-gray-800 text-white p-2 rounded-full',
          'hover:bg-gray-600',
        )}
      >
        ▶
      </button>
    </div>
  );
};

export default MovieGrid;
