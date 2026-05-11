/**
 * Wedding Song Selector - Song Filtering Hook
 * Handles search, sort, and genre filtering
 */

import { useMemo } from "react";

export function useSongFiltering(songs, search, sortBy, filterGenre) {
    return useMemo(() => {
        let list = songs.filter(s =>
            (filterGenre === "All" || s.genre === filterGenre) &&
            (s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()))
        );

        if (sortBy === "alpha") {
            list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "singer") {
            list = [...list].sort((a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title));
        } else if (sortBy === "genre") {
            list = [...list].sort((a, b) => a.genre.localeCompare(b.genre) || a.title.localeCompare(b.title));
        }

        return list;
    }, [songs, search, sortBy, filterGenre]);
}