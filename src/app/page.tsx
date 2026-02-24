"use client";

import React, { useState, useEffect, useCallback } from 'react';
import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import TrackList from '@/components/playlist/TrackList';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';
import PlayerBar from '@/components/layout/PlayerBar';
import playlistData from '@/data/playlist.json';

export default function PlaylistPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { playlist } = playlistData;

  const handleNext = useCallback(() => {
    const currentIndex = playlist.tracks.findIndex(t => t.id === selectedTrackId);
    const nextIndex = (currentIndex + 1) % playlist.tracks.length;
    setSelectedTrackId(playlist.tracks[nextIndex].id);
  }, [selectedTrackId, playlist.tracks]);

  const handlePrevious = useCallback(() => {
    const currentIndex = playlist.tracks.findIndex(t => t.id === selectedTrackId);
    const prevIndex = (currentIndex - 1 + playlist.tracks.length) % playlist.tracks.length;
    setSelectedTrackId(playlist.tracks[prevIndex].id);
  }, [selectedTrackId, playlist.tracks]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!playlist || playlist.tracks.length === 0) {
    return (
      <main className="min-h-screen bg-[#121212]">
        <PlaylistHeader
          playlist={{
            ...playlist,
            tracks: []
          }}
        />
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] overflow-y-auto">
      {/* Dynamic Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-900/40 h-[400px] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212] h-[400px] -z-10" />

        <div className="flex flex-col">
          <PlaylistHeader playlist={playlist} />

          <div className="bg-[#121212]/30 backdrop-blur-sm -mt-4">
            <div className="px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button
                  className="w-14 h-14 rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-105 transition-transform shadow-xl active:scale-95 shrink-0"
                >
                  <svg role="img" height="24" width="24" viewBox="0 0 24 24" className="fill-black">
                    <path d="m7.05 3.606 13.49 7.79a.7.7 0 0 1 0 1.212L7.05 20.398A.7.7 0 0 1 6 19.792V4.208a.7.7 0 0 1 1.05-.602z"></path>
                  </svg>
                </button>

                <div className="flex items-center gap-6">
                  {/* Artist/Collaborator Image */}
                  <div className="w-8 h-10 rounded-md border-[2.5px] border-[#a7a7a7] overflow-hidden shrink-0">
                    <img src={playlist.tracks[0]?.image} alt="Collaborator" className="w-full h-full object-cover" />
                  </div>

                  <button
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`${isShuffled ? 'text-[#1DB954]' : 'text-[#b3b3b3]'} hover:text-white transition-colors shrink-0`}
                    title="Enable shuffle"
                  >
                    <svg role="img" height="24" width="24" viewBox="0 0 24 24" className="fill-current">
                      <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4.5v1.5H3a3.5 3.5 0 0 1-3.5-3.5V5A3.5 3.5 0 0 1 3 1.5h10.109l-1.018 1.018a.75.75 0 0 0 1.06 1.06l2.318-2.318a.75.75 0 0 0 0-1.06L13.15.922zM8.5 17.5H21a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4.5V1.5H21A3.5 3.5 0 0 1 24.5 5v10a3.5 3.5 0 0 1-3.5 3.5H8.5v-1.5z" fill="none"></path>
                      <path d="M16.697 18H20a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3.303l-1.414 1.414H19v9h-3.717l1.414 1.414z" className={isShuffled ? 'fill-[#1DB954]' : 'fill-[#b3b3b3]'}></path>
                      <path d="M7.303 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3.303l1.414-1.414H5V8h3.717L7.303 6z" className={isShuffled ? 'fill-[#1DB954]' : 'fill-[#b3b3b3]'}></path>
                      <path d="M18.148 14.774l-1.062 1.062 2.128 2.128-2.128 2.128 1.062 1.062 2.128-2.128 2.128 2.128 1.062-1.062-2.128-2.128 2.128-2.128-1.062-1.062-2.128 2.128-2.128-2.128z" className={isShuffled ? 'fill-[#1DB954]' : 'fill-[#b3b3b3]'}></path>
                    </svg>
                  </button>

                  <button className="text-[#b3b3b3] hover:text-white transition-colors shrink-0" title="Download">
                    <svg role="img" height="32" width="32" viewBox="0 0 24 24" className="fill-current">
                      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path>
                      <path d="M12 7a.75.75 0 0 1 .75.75v7.018l2.914-2.914a.75.75 0 1 1 1.06 1.06l-4.22 4.22a.75.75 0 0 1-1.06 0l-4.22-4.22a.75.75 0 0 1 1.06-1.06l2.914 2.914V7.75A.75.75 0 0 1 12 7z"></path>
                    </svg>
                  </button>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`${isLiked ? 'text-[#1DB954]' : 'text-[#b3b3b3]'} hover:text-white transition-colors shrink-0`}
                    title={isLiked ? "Remove from Your Library" : "Save to Your Library"}
                  >
                    <svg role="img" height="32" width="32" viewBox="0 0 24 24" className="fill-current">
                      {isLiked ? (
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 9.293l-5 5a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L11 14.086l4.293-4.293a1 1 0 0 1 1.414 1.414z"></path>
                      ) : (
                        <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11zm11-4a.75.75 0 0 1 .75.75v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 .75-.75z"></path>
                      )}
                    </svg>
                  </button>

                  <button className="text-[#b3b3b3] hover:text-white transition-colors shrink-0" title="More options">
                    <svg role="img" height="32" width="32" viewBox="0 0 24 24" className="fill-current">
                      <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium pr-4 focus:outline-none"
                >
                  <span className="capitalize">{viewMode}</span>
                  {viewMode === 'list' ? (
                    <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="fill-current">
                      <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 5.75H1v-1.5h2v1.5zM3 14.5H1V13h2v1.5z"></path>
                    </svg>
                  ) : (
                    <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="fill-current">
                      <path d="M15 14.5H1V13h14v1.5zm0-5.75H1v-1.5h14v1.5zM15 3H1V1.5h14V3z"></path>
                    </svg>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#282828] rounded shadow-2xl z-50 p-1 border border-white/10">
                    <p className="text-[10px] font-bold text-gray-400 px-3 py-2 uppercase tracking-tight">View as</p>

                    <button
                      onClick={() => { setViewMode('compact'); setIsDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors ${viewMode === 'compact' ? 'text-[#1DB954]' : 'text-gray-200 hover:bg-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="fill-current">
                          <path d="M15 14.5H1V13h14v1.5zm0-5.75H1v-1.5h14v1.5zM15 3H1V1.5h14V3z"></path>
                        </svg>
                        <span className="text-sm font-medium">Compact</span>
                      </div>
                      {viewMode === 'compact' && <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="fill-[#1DB954]"><path d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153a.75.75 0 0 1-1.06 0L.47 10.18a.75.75 0 1 1 1.06-1.06l3.377 3.377L14.47 2.47a.75.75 0 0 1 1.06 0z"></path></svg>}
                    </button>

                    <button
                      onClick={() => { setViewMode('list'); setIsDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm transition-colors ${viewMode === 'list' ? 'text-[#1DB954]' : 'text-gray-200 hover:bg-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="fill-current">
                          <path d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 5.75H1v-1.5h2v1.5zM3 14.5H1V13h2v1.5z"></path>
                        </svg>
                        <span className="text-sm font-medium">List</span>
                      </div>
                      {viewMode === 'list' && <svg role="img" height="16" width="16" viewBox="0 0 16 16" className="fill-[#1DB954]"><path d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153a.75.75 0 0 1-1.06 0L.47 10.18a.75.75 0 1 1 1.06-1.06l3.377 3.377L14.47 2.47a.75.75 0 0 1 1.06 0z"></path></svg>}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <TrackList
              tracks={playlist.tracks}
              selectedTrackId={selectedTrackId}
              onSelectTrack={setSelectedTrackId}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>

      {/* Player Bar */}
      <PlayerBar
        currentTrack={selectedTrackId ? playlist.tracks.find(t => t.id === selectedTrackId) || null : null}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {/* Footer Space */}
      <div className="h-32" />
    </main>
  );
}
