import React from 'react';

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-weather-primary"></div>
    </div>
  );
}

export default Loading;