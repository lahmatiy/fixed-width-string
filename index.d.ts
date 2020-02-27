declare module 'fixed-width-string' {
  export default function (str: string, width: number, options?: {
    padding?: string;
    align?: string;
    ellipsis?: string;
    truncate?: string;
  }): string;
}