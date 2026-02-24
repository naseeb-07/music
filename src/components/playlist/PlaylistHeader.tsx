import React from 'react';

interface PlaylistHeaderProps {
    playlist: {
        name: string;
        description: string;
        image: string;
        owner: string;
        likes: string;
        tracks: any[];
    };
}

const PlaylistHeader = ({ playlist }: PlaylistHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row items-end gap-6 p-8 pb-6 bg-gradient-to-b from-indigo-900/40 to-black/20 mt-12">
            <div className="w-48 h-48 md:w-60 md:h-60 shrink-0 shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover rounded shadow-2xl"
                />
            </div>

            <div className="flex flex-col gap-2 md:gap-4 overflow-hidden">
                <span className="text-xs font-bold uppercase hidden md:block">Playlist</span>
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight truncate leading-none">
                    {playlist.name}
                </h1>
                <p className="text-gray-400 text-sm md:text-base line-clamp-2 md:line-clamp-none max-w-2xl">
                    {playlist.description}
                </p>

                <div className="flex items-center gap-1 text-sm font-bold text-white">
                    <span>{playlist.owner}</span>
                    <span className="mx-1 font-normal opacity-70">•</span>
                    <span className="font-normal opacity-70">1 save</span>
                    <span className="mx-1 font-normal opacity-70">•</span>
                    <span className="font-normal opacity-70">{playlist.tracks.length} songs,</span>
                    <span className="ml-1 font-normal opacity-50">about 2 hr 15 min</span>
                </div>
            </div>
        </div>
    );
};

export default PlaylistHeader;
