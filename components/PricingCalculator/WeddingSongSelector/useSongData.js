/**
 * Wedding Song Selector - Song Data Hook
 * Transforms raw song data into structured format
 */

import { useMemo } from "react";
import { rawSongs, getGenre } from "./constants";

export function useSongData() {
    return useMemo(() => {
        return rawSongs.map(s => {
            const dashIdx = s.indexOf(" - ");
            const artist = s.substring(0, dashIdx);
            const title = s.substring(dashIdx + 3);
            return { artist, title, genre: getGenre(artist), id: s };
        });
    }, []);
}