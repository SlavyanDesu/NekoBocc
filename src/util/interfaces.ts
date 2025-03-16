export interface HentaiRelease {
  /**
   * Thumbnail URL of post.
   */
  img?: string;

  /**
   * Title of post.
   */
  title?: string;

  /**
   * URL of post.
   */
  url?: string;

  /**
   * Genre of post.
   */
  genre?: string;

  /**
   * Duration of hentai.
   */
  duration?: string;
}

export interface HentaiMetadata {
  /**
   * Image thumbnail URL.
   */
  img?: string;

  /**
   * Title of hentai.
   */
  title?: string;

  /**
   * Synopsis of hentai.
   */
  synopsis?: string;

  /**
   * Total views of hentai.
   */
  views?: number;

  /**
   * Japanese title of hentai.
   */
  japanese?: string;

  /**
   * Category page.
   */
  category?: string;

  /**
   * Total episode of hentai.
   */
  episode?: number;

  /**
   * Status of hentai.
   */
  status?: string;

  /**
   * Date aired of hentai.
   */
  aired?: string;

  /**
   * Producer of hentai.
   */
  producer?: string;

  /**
   * Genre of hentai.
   */
  genre?: string;

  /**
   * Duration of hentai.
   */
  duration?: string;

  /**
   * Score of hentai.
   */
  score?: number;

  /**
   * URL of episode(s).
   */
  url?: string[];
}

export interface EpisodeMetadata {
  /**
   * Image thumbnail URL.
   */
  img: string;

  /**
   * Title of hentai.
   */
  title: string;

  /**
   * Synopsis of hentai.
   */
  synopsis: string;

  /**
   * Genre of hentai.
   */
  genre: string;

  /**
   * Producer of hentai.
   */
  producer: string;

  /**
   * Duration of hentai.
   */
  duration: string;

  /**
   * Size of each quality.
   */
  size: Record<string, string>;

  /**
   * Object of download links.
   */
  download: Record<string, string[]>;
}

export interface TextIndex {
  /**
   * A string of each `<p>` elements.
   */
  text: string;
}
