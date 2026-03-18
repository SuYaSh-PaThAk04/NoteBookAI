import React from 'react';
import { useNavigate } from 'react-router-dom';

function Last() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden shadow-lg dark:bg-black">
      {/* Background gradient layer */}
      <div className='my-16 mx-10 md:mx-16 rounded-4xl bg-green-700 dark:bg-gray-900'>
     

      {/* Content layer */}
      <div className="py-12 px-6 lg:px-20 text-center text-white dark:text-gray-100 transition-colors duration-500">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
          Ready to Transform Your Documents?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-green-100 dark:text-gray-300">
          Join thousands of users already using 
          <span className="font-semibold text-white dark:text-green-400"> Knowtify </span>
          to work smarter with their content.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-green-700 dark:bg-green-600 dark:text-gray-100 
                       px-8 py-4 md:px-10 md:py-4 rounded-2xl text-lg md:text-xl font-semibold 
                       shadow-md hover:shadow-xl hover:scale-105 
                       dark:hover:bg-green-500 transition-all duration-300"
          >
            🚀 Start Analyzing Now
          </button>
        </div>
      </div></div>
    </section>
  );
}

export default Last;
