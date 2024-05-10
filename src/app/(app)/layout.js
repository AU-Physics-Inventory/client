import '../globals.css'
import {roboto_slab} from "@/app/fonts";
import {CssVarsProvider} from "@mui/joy";
import CssBaseline from "@mui/joy/CssBaseline";
import App from "@/app/(app)/app";

export const metadata = {
    title: 'Physics Inventory',
	description: 'AU Physics Inventory Management',
}

export const viewport = {
	initialScale: 1,
	width: 'device-width'
}

export default function AppLayout({children}) {
	return <CssVarsProvider>
            <CssBaseline/>
				<App className={roboto_slab.className}>
					{children}
				</App>
        </CssVarsProvider>
}
