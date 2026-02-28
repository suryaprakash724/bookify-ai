'use client';

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-[var(--bg-card)] shadow-soft-lg">
        <div className="loading-shadow p-8">
          <div className="loading-animation size-10 border-2 border-[var(--accent-warm)] border-t-transparent rounded-full" />
          <p className="loading-title">Processing your book...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
