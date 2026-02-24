"use client";

import React from 'react';
import { Clock } from 'lucide-react';
import TrackRow from './TrackRow';

interface TrackListProps {
    tracks: any[];
    selectedTrackId: string | null;
    onSelectTrack: (id: string) => void;
    viewMode: 'list' | 'compact';
}

const TrackList = ({ tracks, selectedTrackId, onSelectTrack, viewMode }: TrackListProps) => {
    return (
        <div className="px-8 py-4 pb-20">
            {/* Table Header - Sticky */}
            <div className="sticky top-[64px] z-10 flex items-center gap-4 px-4 py-3 border-b border-white/10 bg-[#121212] mb-4 text-gray-400 text-sm font-light tracking-wider">
                <div className="w-8 text-center shrink-0">#</div>
                <div className={`${viewMode === 'compact' ? 'flex-5' : 'flex-4'}`}>Title</div>
                {viewMode === 'compact' && <div className="flex-3">Artist</div>}
                <div className={`hidden lg:block flex-3`}>Album</div>
                <div className={`hidden md:block flex-2`}>Date added</div>
                <div className="w-12 flex justify-end pr-4 shrink-0">
                    <Clock size={16} />
                </div>
            </div>

            {/* Tracks */}
            <div className="flex flex-col gap-1">
                {tracks.map((track, index) => (
                    <TrackRow
                        key={track.id}
                        index={index}
                        track={track}
                        isSelected={selectedTrackId === track.id}
                        onSelect={onSelectTrack}
                        viewMode={viewMode}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrackList;
