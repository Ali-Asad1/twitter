import { Poppins, Roboto, Vazirmatn } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-poppins",
  preload: true,
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  preload: true,
});

// local fonts

export const chirp = localFont({
  src: [
    {
      path: "../../public/fonts/chirp/chirp_heavy.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp/chirp_bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp/chirp_medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp/chirp_regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp/chirp_light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/chirp/chirp_thin.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-chirp",
  preload: true,
});

export const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "300", "400", "600", "700", "900"],
  variable: "--font-vazirmatn",
  preload: true,
});
