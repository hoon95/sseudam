declare module "@styles*";
declare module "@components/*";
declare module "@pages/*";
declare module "@store/*";
declare module "@apis/*";
declare module "@services/*";
declare module "@utils/*";

declare module "aos";

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kakao: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Kakao: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  naver: any;
}
