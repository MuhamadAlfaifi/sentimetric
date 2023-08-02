import { Readex_Pro as FontMono, Noto_Sans_Arabic as FontSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["arabic"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["arabic", "latin"],
  variable: "--font-mono",
})
