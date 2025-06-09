"use client"
import { useEffect, useRef } from 'react';

const VideoBackground = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = .45;
        }
    }, []);

    return (
        <video
            autoPlay
            loop
            muted
            ref={videoRef}
            playsInline
            className="absolute -top-[30vh] left-0 w-full h-full object-cover z-0 blur-[15px]"
        >
            <source src="/movies/204292-923909617_small.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoBackground;