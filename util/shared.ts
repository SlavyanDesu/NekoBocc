export const baseUrl: string = 'https://nekopoi.care';
export const valid = (url: string) => url.match(new RegExp(/^(?:https?:\/\/)?(?:[^.]+\.)?nekopoi\.care(\/.*)?$/gm));
export const header: {} = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
  }
}
export const endpoints = {
  latest: '/category/hentai/page/__PAGE',
  search: '/search/__QUERY',
  random: '/random'
}