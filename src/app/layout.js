import './globals.css'
import {roboto_slab} from "@/app/fonts";

export const metadata = {
    title: 'Physics Inventory',
    description: 'AU Physics Inventory Management'
}

export const viewport = {
    initialScale: 1,
    width: 'device-width'
}

export default function RootLayout({children}) {
    return <html lang="en" className={roboto_slab.className}>
      <body>
        {children}
      </body>
    </html>
}
