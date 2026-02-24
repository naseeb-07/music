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
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-6 md:p-8 pb-6 bg-linear-to-b from-indigo-900/40 to-black/20 mt-8 md:mt-12">
            <div className="w-48 h-48 md:w-60 md:h-60 shrink-0 shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover rounded shadow-2xl"
                />
            </div>

            <div className="flex flex-col gap-3 md:gap-4 overflow-hidden items-center md:items-start text-center md:text-left w-full">
                <span className="text-xs font-bold uppercase hidden md:block text-white/70">Playlist</span>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-tight md:leading-none max-w-full break-words">
                    {playlist.name}
                </h1>
                <p className="text-gray-400 text-xs md:text-sm lg:text-base line-clamp-3 md:line-clamp-none max-w-2xl px-2 md:px-0">
                    {playlist.description}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-1.5 gap-y-1 text-[11px] md:text-sm font-bold text-white mt-2">
                    <span className="hover:underline cursor-pointer">{playlist.owner}</span>
                    <span className="font-normal opacity-70">•</span>
                    <span className="font-normal opacity-70">1 save</span>
                    <span className="hidden md:inline font-normal opacity-70">•</span>
                    <span className="font-normal opacity-70">{playlist.tracks.length} songs,</span>
                    <span className="font-normal opacity-50 whitespace-nowrap">about 2 hr 15 min</span>
                </div>
            </div>
        </div>
    );
};

export default PlaylistHeader;
