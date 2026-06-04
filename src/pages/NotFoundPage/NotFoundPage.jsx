import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white min-h-[85vh] justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container py-xxl">
        {/* Border container consistent with other sections */}
        <div className="section-border flex flex-col items-center justify-center text-center px-sm sm:px-xl lg:px-80px py-xxl border-b border-gray-600 border-x-[0.5px] bg-white min-h-[500px]">
          
          {/* 404 Header */}
          <h1 className="text-[64px] sm:text-[80px] md:text-[96px] font-bold text-black tracking-tighter leading-none">
            Oops...404
          </h1>

          {/* Subheading */}
          <h2 className="text-[20px] sm:text-[24px] font-medium text-black leading-snug mt-md max-w-[600px]">
            The page you're looking for can't be found.
          </h2>

          {/* Details */}
          <p className="text-[14px] sm:text-[15px] text-gray-900 leading-[1.5] mt-sm max-w-[480px]">
            But don't worry, you can head back to our homepage or explore some of our other amazing content.
          </p>

          {/* Action button */}
          <div className="mt-xl">
            <Link to="/" className="group button-primary-s">
              <span className="block">
                Go to Homepage
                <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[3px] ml-xs">
                  -&gt;
                </span>
              </span>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
