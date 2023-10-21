import '../globals.css'
import {roboto_slab} from "@/app/fonts";
import Head from "next/head";
import {CssVarsProvider} from "@mui/joy";
import CssBaseline from "@mui/joy/CssBaseline";
import App from "@/app/(app)/app";

export const metadata = {
    title: 'Physics Inventory', description: 'AU Physics Inventory Management',
}

export default function AppLayout({children}) {
	return <CssVarsProvider>
            <CssBaseline/>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width"/>
				</Head>
				<App>
					{children}
				</App>
        </CssVarsProvider>
}
