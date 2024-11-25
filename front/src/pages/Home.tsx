import React from 'react';
import cnMerge from './../utils/cnMerge';
import MovieGrid from './../components/MovieGrid';

export const HomePage: React.FC = () => {
  
  return (
  <div className={cnMerge("bg-secondaryBg min-h-screen flex flex-col")}>
    <main className={cnMerge("flex-1 flex flex-col items-center justify-center p-6")}>
      <section className={cnMerge("text-center w-full max-w-3xl mx-auto")}>
        <h1 className={cnMerge('text-text font-bold text-3xl sm:text-4xl md:text-5xl mb-6')}>
          Adicionados recentementes
        </h1>
        <MovieGrid />
      </section>
    </main>

    <footer className={cnMerge('bg-footerBg py-4 text-center')}>
      <p className={cnMerge('text-sm text-gray-500')}>
        © 2024 MovieApp. All rights reserved.
      </p>
    </footer>
  </div>
  )
  };
