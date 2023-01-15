export interface NekopoiResult {
    img: string;
    title: string;
    link: string;
}
export interface NekopoiTextIndex {
    i: number;
    text: string;
}
export interface NekopoiEpisodeMetadata {
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
}
export interface NekopoiPageMetadata {
    img: string;
    title: string;
    synopsis: string;
    genre: string;
    producers: string;
    duration: string;
    quality: Array<string>;
    link: Array<string>;
}
export declare const latest: () => Promise<NekopoiResult[] | undefined>;
export declare const search: (query: string) => Promise<NekopoiResult[] | void>;
export declare const get: (url: string) => Promise<NekopoiEpisodeMetadata | NekopoiPageMetadata | void>;
export declare const random: () => Promise<NekopoiEpisodeMetadata | NekopoiPageMetadata | void>;
