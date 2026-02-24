"use client";

import React from 'react';
import { Play } from 'lucide-react';

interface TrackRowProps {
    index: number;
    track: {
        id: string;
        name: string;
        artist: string;
        album: string;
        duration: string;
        image: string;
        addedAt: string;
    };
    isSelected: boolean;
    onSelect: (id: string) => void;
    viewMode: 'list' | 'compact';
}

const TrackRow = ({ index, track, isSelected, onSelect, viewMode }: TrackRowProps) => {
    return (
        <div
            onClick={() => onSelect(track.id)}
            className={`group flex items-center gap-4 px-4 rounded-md hover:bg-white/10 transition-colors duration-200 cursor-pointer ${isSelected ? 'bg-white/20' : ''
                } ${viewMode === 'compact' ? 'h-9 py-0' : 'py-2'}`}
        >
            <div className="w-8 flex justify-center items-center text-gray-400 group-hover:text-white transition-colors shrink-0">
                <span className="group-hover:hidden text-sm">{index + 1}</span>
                <Play size={14} className="hidden group-hover:block fill-white" />
            </div>

            <div className={`flex items-center gap-3 min-w-0 ${viewMode === 'compact' ? 'flex-5' : 'flex-4'}`}>
                {viewMode === 'list' && (
                    <img
                        src={track.image}
                        alt={track.name}
                        className="w-10 h-10 object-cover rounded shadow-lg shrink-0"
                    />
                )}
                <div className="flex flex-col min-w-0">
                    <span className={`font-medium truncate ${isSelected ? 'text-[#1DB954]' : 'text-white'} ${viewMode === 'compact' ? 'text-sm' : ''}`}>
                        {track.name}
                    </span>
                    {viewMode === 'list' && (
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors truncate">
                            {track.artist}
                        </span>
                    )}
                </div>
            </div>

            {viewMode === 'compact' && (
                <div className="flex-3 text-sm text-gray-400 group-hover:text-white transition-colors truncate">
                    {track.artist}
                </div>
            )}

            <div className={`hidden lg:flex flex-3 text-sm text-gray-400 group-hover:text-white transition-colors truncate`}>
                {track.album}
            </div>

            <div className={`hidden md:flex flex-2 text-sm text-gray-400 group-hover:text-white transition-colors`}>
                {track.addedAt}
            </div>

            <div className="text-sm text-gray-400 group-hover:text-white transition-colors w-12 text-right pr-4 shrink-0">
                {track.duration}
            </div>
        </div>
    );
};

export default TrackRow;
