import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ClipsContext from './ClipsContext';
import { getClips } from '../../apis/clips';

export default function ClipsProvider ({ children }) {
    const [clips, setClips] = useState([]);
    const [likedClips, setLikedClips] = useState([])

    const getClipsQuery = useQuery({ queryKey: ['clips'], queryFn: getClips });

    useEffect(() => {
        if (getClipsQuery.isSuccess) {
            setClips(getClipsQuery.data.data.clips);
        }
    }, [getClipsQuery.isSuccess]);

    function search (query) {
        if (!query.trim()) return;
        const filtered = getClipsQuery.data.data.clips.filter((clip) =>
            clip.description.toLowerCase().includes(query.toLowerCase())
        );

        setClips(filtered);
    }

    function handleSortChange(value) {
        if (value === '') {
            setClips(getClipsQuery.data.data.clips);
        }

        if (value === 'most-likes') {
            setClips([...clips].sort((a, b) => b.likes - a.likes));
        }

        if (value === 'most-downloads') {
            setClips([...clips].sort((a, b) => b.downloads - a.downloads));
        }
    }

    const value = {
        getClipsQuery,
        clips,
        setClips,
        likedClips,
        setLikedClips,
        search,
        handleSortChange,
    };

    return (
        <ClipsContext.Provider value={value}>
            {children}
        </ClipsContext.Provider>
    );
}