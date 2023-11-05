import '../globals.css'
import {roboto_slab} from "@/app/fonts";
import Head from "next/head";
import {CssVarsProvider} from "@mui/joy";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import Sidebar from "@/app/(app)/sidebar";
import Header from "@/app/(app)/header";

export const metadata = {
    title: 'Physics Inventory',
    description: 'AU Physics Inventory Management',
    viewport: 'initial-scale=1, width=device-width'
}

export default function AppLayout({children}) {
    return <CssVarsProvider>
            <CssBaseline/>
				{children}
        </CssVarsProvider>
}
