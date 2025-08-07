'use client';

import {
    Play,
    Pause,
    Volume2,
    SkipForward,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video) return;
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;
        const newTime = (parseFloat(e.target.value) / 100) * video.duration;
        video.currentTime = newTime;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        const newVolume = parseFloat(e.target.value);
        if (video) {
            video.volume = newVolume;
            video.muted = newVolume === 0;
        }
        setVolume(newVolume);
    };


    return (
        <section className="w-full flex px-4 py-6 min-h-screen">
            <div className="w-full max-w-[900px]">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
                    <video
                        ref={videoRef}
                        src={`${videoUrl}`}
                        className="w-full h-full bg-black"
                        onTimeUpdate={handleTimeUpdate}
                        onClick={togglePlay}
                    />

                    {/* Custom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent text-white flex flex-col gap-2">
                        {/* Progress Bar */}
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={progress}
                            onChange={handleProgressChange}
                            className="w-full accent-red-500 h-[3px]"
                        />

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex mt-2 items-center gap-4">
                                {/* Play / Pause */}
                                <button onClick={togglePlay}>
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6" />
                                    ) : (
                                        <Play className="w-6 h-6" />
                                    )}
                                </button>

                                <button >
                                    <SkipForward />
                                </button>


                                {/* Volume / Mute */}
                                <div className="flex items-center gap-3">
                                    <button className="peer">
                                        <Volume2 className="w-6 h-6" />
                                    </button>
                                    <input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-[60px] h-1 accent-white scale-x-0 peer-hover:scale-x-100origin-left transition-transform duration-300 ease-in-out inline-block"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoPlayer;
