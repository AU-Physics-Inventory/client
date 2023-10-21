'use client'

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Header from "@/app/(app)/header";
import Box from "@mui/joy/Box";
import Sidebar from "@/app/(app)/sidebar";
import {Skeleton} from "@mui/joy";

export default function App({children}) {
    const router = useRouter()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("token")

        if (token !== null && token.length !== 0) {
            axios.get(config.server.concat('/validate'), {
                headers: {
                    'Authorization': token
                }
            }).then((response) => {
                if (response.status === 200) setSuccess(true)
                else router.replace('/login')
            }).catch((err) => {
                router.replace('/login')
            })
        } else router.replace('/login')
    }, [router])

    return <>
    {success ? <>
        <Header />
        <Box sx={{display: 'flex', height: '100vh', width: '100vw'}}>
            <Sidebar/>
            <Box sx={{p: 3, width: 'auto'}}>
                {children}
            </Box>
        </Box>
    </> : <Skeleton sx={{height: '100vh', width: '100vw'}} />}
    </>
}
