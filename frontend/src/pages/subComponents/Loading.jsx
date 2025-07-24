import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-2">
        <div class="w-2.5 h-2.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="w-2.5 h-2.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="w-2.5 h-2.5 bg-sky-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
