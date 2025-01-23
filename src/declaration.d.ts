/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@styles*";
declare module "@components/*";
declare module "@pages/*";
declare module "@store/*";
declare module "@apis/*";
declare module "@services/*";
declare module "@utils/*";

declare module "aos";

interface Window {
  kakao: any;
  Kakao: any;
  naver: any;
}

// env.d.ts
interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
