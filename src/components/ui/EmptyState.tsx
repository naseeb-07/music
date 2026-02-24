import React from 'react';
import { Music2 } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    description?: string;
}

const EmptyState = ({
    title = "No tracks in this playlist",
    description = "Find some music to add to your collection."
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center text-gray-400">
            <div className="p-6 bg-[#282828] rounded-full mb-6">
                <Music2 size={48} className="text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="max-w-md">{description}</p>
        </div>
    );
};

export default EmptyState;
