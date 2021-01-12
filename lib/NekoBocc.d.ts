/**
 * Get latest update.
 */
export function latest(): Promise<{
    result: {
        img: string;
        title: string;
        link: string;
    }[];
}>;

/**
 * Get hentai episode metadata from URL.
 * @param {String} link
 */
export function getHentaiEpisode(link: string): Promise<void | {
    result: {
        img: string;
        title: string;
        synopsis: string;
        genre: string;
        producers: string;
        duration: string;
        quality: string[];
        link: string[];
    };
}>;

/**
 * Get result from Nekopoi.
 * @param {String} query
 */
export function search(query: string): Promise<void | {
    result: {
        img: string;
        title: string;
        link: string;
    }[];
}>;

/**
 * Get hentai metadata.
 * @param {String} link
 */
export function getHentai(link: string): Promise<void | {
    result: {
        img: string;
        title: string;
        synopsis: string;
        views: number;
        japanese: string;
        category: string;
        episode: number;
        status: string;
        aired: string;
        producers: string;
        genre: string;
        duration: string;
        score: number;
    };
}>;

/**
 * Random hentai.
 */
export function random(): Promise<void | {
    result: {
        img: string;
        title: string;
        synopsis: string;
        views: number;
        japanese: string;
        category: string;
        episode: number;
        status: string;
        aired: string;
        producers: string;
        genre: string;
        duration: string;
        score: number;
    };
}>;
