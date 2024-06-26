import '../globals.css'
import {CssVarsProvider} from "@mui/joy";
import CssBaseline from "@mui/joy/CssBaseline";

export const metadata = {
    title: 'Physics Inventory',
    description: 'AU Physics Inventory Management'
}

export const viewport = {
    initialScale: 1,
    width: 'device-width'
}

export default function AppLayout({children}) {
    return <CssVarsProvider>
            <CssBaseline/>
				{children}
        </CssVarsProvider>
}
