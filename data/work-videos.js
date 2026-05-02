/**
 * work-videos.js - Video Catalog Data
 *
 * Exports an array of YouTube videos to be displayed in the gallery
 * Each video object contains:
 * - youtubeURL: YouTube video ID (used to construct full URL)
 * - title: Display title for the video
 * - description: Short description of the video
 *
 * This data is imported and used by WorkYoutube.js component
 */

const videos = [
  {
    youtubeURL: "BJItzCl8b2w",
    title: "Until I Found You | Violin & Piano Duo",
    description: "Stephen Sanchez Until I Found You on the violin & piano"
  },
  {
    youtubeURL: "4pVpf9lRLrA",
    title: "If I Ain't Got You | LOVUR Quartet",
    description: "The LOVUR Quartet covers Alicia Key's hit single."
  },
  {
    youtubeURL: "rR6gVKZ2XvQ",
    title: "Libertango | Violin & Piano Duo",
    description: "A romantic cover of Piazzolla's Libertango"
  },
  {
    youtubeURL: "d4oa_XxoTAw",
    title: "Gimme! Gimme! Gimme! | LOVUR String Quartet",
    description: "An upbeat jam session covering ABBA's hit song"
  },
  {
    youtubeURL: "Pe0ogwgxjeQ",
    title: "If I Ain't Got You | Violin & Piano Duo",
    description: "A groovy rendition of Alicia Key's hit song"
  },
  {
    youtubeURL: "JSxn7m3OHF8",
    title: "POV | LOVUR String Quartet",
    description: "Slow it down with this heartfelt cover of Ariana Grande's song POV"
  }
];

// Export the videos array for use in other files
export default videos;