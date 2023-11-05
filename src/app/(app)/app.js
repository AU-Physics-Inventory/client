'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Header from "@/app/(app)/header";
import Box from "@mui/joy/Box";
import Sidebar from "@/app/(app)/sidebar";
import {Skeleton} from "@mui/joy";
import {TOKEN_REQUEST, TOKEN_RESPONSE} from "@/app/(app)/utils"

const tokenChannel = new BroadcastChannel('token_channel')
tokenChannel.postMessage({type: TOKEN_REQUEST, data: null})
tokenChannel.onmessage = (msg) => {
    const request = msg.data
    if (request.type === TOKEN_REQUEST) tokenChannel.postMessage({type: TOKEN_RESPONSE, data: sessionStorage.getItem("token")})
    else if (request.type === TOKEN_RESPONSE) if (request.data != null) sessionStorage.setItem('token', request.data)
}

export default function App({children}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        let redirect = false

        if (token !== null && token.length !== 0) {
            axios.get(config.server.concat('/validate'), {
                headers: {
                    'Authorization': token
                }
            }).then((response) => {
                redirect = !(response.status === 200)
            }).catch((err) => {
                redirect = true
            })
        } else redirect = true

        if (redirect) {
            const searchParamsString = searchParams.toString()
            const redirectTo = searchParamsString === '' ? pathname : pathname + '?' + searchParamsString
            sessionStorage.setItem('redirect', redirectTo)
            router.replace('/login')
        } else setSuccess(true)
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
