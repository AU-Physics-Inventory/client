import './globals.css'
import { inter, roboto_slab} from "@/app/fonts";
import Head from "next/head";
import {CssVarsProvider, extendTheme} from "@mui/joy";

export const metadata = {
  title: 'Physics Inventory',
  description: 'AU Physics Inventory Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto_slab.className}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
