'use client';

export default function AbstractBackground() {
    return (
        <>
            {/* Void background with blobs */}
            <div className="void-bg">
                <div className="cosmic-blob blob-1" />
                <div className="cosmic-blob blob-2" />
                <div className="cosmic-blob blob-3" />
            </div>

            {/* Grain texture */}
            <div className="grain-overlay" />
        </>
    );
}
