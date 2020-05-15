declare module 'fixed-width-string' {
  export default function (str: string, width: number, options?: {
    padding?: string;
    align?: 'left' | 'right';
    ellipsis?: string | false | null;
    truncate?: 'left' | 'right';
  }): string;
}
