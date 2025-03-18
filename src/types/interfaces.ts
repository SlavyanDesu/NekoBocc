export interface HentaiRelease {
  /**
   * URL of the thumbnail image.
   */
  img: string;

  /**
   * Title of the post.
   */
  title: string;

  /**
   * URL of the post.
   */
  url: string;

  /**
   * Genres associated with the post.
   */
  genre: string[];

  /**
   * Duration of the hentai (if available).
   */
  duration: string | null;
}

export interface HentaiMetadata {
  /**
   * URL of the thumbnail image.
   */
  img: string;

  /**
   * Title of the hentai.
   */
  title: string;

  /**
   * Synopsis of the hentai.
   */
  synopsis: string;

  /**
   * Total number of views.
   */
  views: number;

  /**
   * Japanese title of the hentai.
   */
  japanese: string;

  /**
   * Category of the hentai.
   */
  category: string;

  /**
   * Total number of episodes.
   */
  episode: number;

  /**
   * Current status of the hentai (e.g., Ongoing, Completed).
   */
  status: string;

  /**
   * Release date of the hentai.
   */
  aired: string;

  /**
   * Production studio(s) or producer(s).
   */
  producer: string[];

  /**
   * List of genres.
   */
  genre: string[];

  /**
   * Duration of each episode.
   */
  duration: string;

  /**
   * User rating or score.
   */
  score: number;

  /**
   * URLs of available episodes.
   */
  url: string[];
}

export interface EpisodeMetadata {
  /**
   * URL of the thumbnail image.
   */
  img: string;

  /**
   * Title of the hentai.
   */
  title: string;

  /**
   * Synopsis of the hentai.
   */
  synopsis: string;

  /**
   * List of genres.
   */
  genre: string[];

  /**
   * Production studio(s) or producer(s).
   */
  producer: string[];

  /**
   * Duration of the episode.
   */
  duration: string;

  /**
   * File size for each available quality.
   * The key is the resolution (e.g., "1080p"), and the value is the size.
   */
  size: Record<string, string>;

  /**
   * Download links categorized by quality.
   * The key is the resolution, and the value is an array of URLs.
   */
  download: Record<string, string[]>;
}
