"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Volume2,
    VolumeX,
    Volume1,
    Mic2,
    ListMusic,
    MonitorSmartphone,
    Maximize2,
    PlusCircle
} from 'lucide-react';

interface PlayerBarProps {
    currentTrack: {
        id: string;
        name: string;
        artist: string;
        image: string;
        duration: string;
        audio?: string;
    } | null;
    onNext: () => void;
    onPrevious: () => void;
}

const PlayerBar = ({ currentTrack, onNext, onPrevious }: PlayerBarProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const volumeBarRef = useRef<HTMLDivElement>(null);

    // Initialize Audio
    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            if (repeatMode === 'one') {
                audio.currentTime = 0;
                audio.play();
            } else {
                onNext();
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [onNext, repeatMode]);

    // Handle Track Change
    useEffect(() => {
        if (currentTrack?.audio && audioRef.current) {
            audioRef.current.src = currentTrack.audio;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback interrupted or failed:", e));
            }
        }
    }, [currentTrack?.id]);

    // Handle Play/Pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Playback failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handle Volume & Mute
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !audioRef.current || !duration) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        audioRef.current.currentTime = percentage * duration;
    };

    const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!volumeBarRef.current) return;
        const rect = volumeBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newVolume = Math.max(0, Math.min(100, Math.floor((x / rect.width) * 100)));
        setVolume(newVolume);
        if (newVolume > 0) setIsMuted(false);
    };

    if (!currentTrack) return null;

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
    const effectiveVolume = isMuted ? 0 : volume;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/5 h-20 md:h-24 px-2 md:px-4 flex items-center justify-between z-50 select-none">
            {/* Left: Track Info */}
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-[30%] min-w-0">
                <img
                    src={currentTrack.image}
                    alt={currentTrack.name}
                    className="w-10 h-10 md:w-14 md:h-14 rounded shadow-lg object-cover shrink-0"
                />
                <div className="flex flex-col min-w-0 mr-2">
                    <span className="text-xs md:text-sm font-medium text-white truncate hover:underline cursor-pointer">
                        {currentTrack.name}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-[#b3b3b3] hover:underline cursor-pointer truncate">
                        {currentTrack.artist}
                    </span>
                </div>
                <button className="text-[#b3b3b3] hover:text-white transition-colors shrink-0">
                    <PlusCircle size={18} className="md:w-5 md:h-5" />
                </button>
            </div>

            {/* Center: Playback Controls & Progress */}
            <div className="flex flex-col items-center flex-1 md:max-w-[40%] md:w-full gap-1 md:gap-2">
                <div className="flex items-center gap-4 md:gap-6">
                    <button
                        onClick={() => setIsShuffled(!isShuffled)}
                        className={`${isShuffled ? 'text-[#1DB954]' : 'text-[#b3b3b3]'} hover:text-white transition-colors relative hidden sm:block`}
                    >
                        <Shuffle size={18} />
                        {isShuffled && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1DB954] rounded-full" />}
                    </button>
                    <button onClick={onPrevious} className="text-[#b3b3b3] hover:text-white transition-colors">
                        <SkipBack size={20} fill="currentColor" className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-lg"
                    >
                        {isPlaying ? (
                            <Pause size={20} fill="black" className="text-black md:w-6 md:h-6" />
                        ) : (
                            <Play size={20} fill="black" className="ml-0.5 text-black md:w-6 md:h-6" />
                        )}
                    </button>
                    <button onClick={onNext} className="text-[#b3b3b3] hover:text-white transition-colors">
                        <SkipForward size={20} fill="currentColor" className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={() => setRepeatMode(prev => prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off')}
                        className={`${repeatMode !== 'off' ? 'text-[#1DB954]' : 'text-[#b3b3b3]'} hover:text-white transition-colors relative hidden sm:block`}
                    >
                        <Repeat size={18} />
                        {repeatMode !== 'off' && (
                            <>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1DB954] rounded-full" />
                                {repeatMode === 'one' && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold">1</span>}
                            </>
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full max-w-[500px] px-2 md:px-0">
                    <span className="text-[10px] text-[#b3b3b3] w-8 md:w-10 text-right">{formatTime(currentTime)}</span>
                    <div
                        ref={progressBarRef}
                        onClick={handleProgressClick}
                        className="flex-1 h-1 bg-[#4d4d4d] rounded-full group cursor-pointer relative"
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1DB954] rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full opacity-0 md:group-hover:opacity-100 shadow-lg"
                            style={{ left: `${progressPercentage}%`, transform: `translate(-50%, -50%)` }}
                        />
                    </div>
                    <span className="text-[10px] text-[#b3b3b3] w-8 md:w-10">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Right: Volume & Utilities */}
            <div className="hidden md:flex items-center justify-end gap-3 w-[30%] min-w-[180px]">
                <button className="text-[#b3b3b3] hover:text-white transition-colors">
                    <Mic2 size={16} />
                </button>
                <button className="text-[#b3b3b3] hover:text-white transition-colors">
                    <ListMusic size={16} />
                </button>
                <button className="text-[#b3b3b3] hover:text-white transition-colors">
                    <MonitorSmartphone size={16} />
                </button>
                <div className="flex items-center gap-2 w-32">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-[#b3b3b3] hover:text-white transition-colors shrink-0">
                        {isMuted || volume === 0 ? <VolumeX size={18} /> : volume < 50 ? <Volume1 size={18} /> : <Volume2 size={18} />}
                    </button>
                    <div
                        ref={volumeBarRef}
                        onClick={handleVolumeClick}
                        className="flex-1 h-1 bg-[#4d4d4d] rounded-full group cursor-pointer relative"
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-white group-hover:bg-[#1DB954] rounded-full"
                            style={{ width: `${effectiveVolume}%` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg"
                            style={{ left: `${effectiveVolume}%`, transform: `translate(-50%, -50%)` }}
                        />
                    </div>
                </div>
                <button className="text-[#b3b3b3] hover:text-white transition-colors">
                    <Maximize2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default PlayerBar;
