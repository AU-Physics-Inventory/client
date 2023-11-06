'use client'

import Header from "@/app/(app)/header";
import Sidebar from "@/app/(app)/sidebar";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Box from "@mui/joy/Box";
import {Skeleton} from "@mui/joy";
import {TOKEN_REQUEST, TOKEN_RESPONSE} from "@/app/(app)/utils"

export default function App({children}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [success, setSuccess] = useState(false)
    const tokenChannel = useMemo(() => new BroadcastChannel('token_channel'), [])

    tokenChannel.postMessage({type: TOKEN_REQUEST, data: null})
    tokenChannel.onmessage = (msg) => {
        const request = msg.data
        if (request.type === TOKEN_REQUEST) tokenChannel.postMessage({type: TOKEN_RESPONSE, data: sessionStorage.getItem("token")})
        else if (request.type === TOKEN_RESPONSE) if (request.data != null) sessionStorage.setItem('token', request.data)
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        const performRedirection = (shouldRedirect) => {
            if (shouldRedirect) {
                const searchParamsString = searchParams.toString()
                const redirectTo = searchParamsString === '' ? pathname : pathname + '?' + searchParamsString
                sessionStorage.setItem('redirect', redirectTo)
                router.replace('/login')
            } else setSuccess(true)
        }

        if (token !== null && token.length !== 0) {
            axios.get(config.server.concat('/validate'), {
                headers: {
                    'Authorization': token
                }
            }).then((response) => {
                performRedirection(!(response.status === 200))
            }).catch((err) => {
                performRedirection(true)
            })
        } else performRedirection(true)
    }, [router, pathname, searchParams])

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
