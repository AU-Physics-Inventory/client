'use client'

import {useRouter} from "next/navigation";
import Typography from "@mui/joy/Typography";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Error from "@/app/(app)/error"
import Box from "@mui/joy/Box";

export default function Asset({params}) {
    const router = useRouter()
    const [asset, setAsset] = useState({})
    const [error, setError] = useState(null)

    const handleError = (message, color, icon = null) => {
        setError({message: message, color: color, icon: icon})
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        axios.get(config["server"].concat('/app/assets/asset'), {
            headers: {
                'Authorization': token
            },
            params: {
                id: params.id
            }
        }).then((response) => {
            if (response.status === 200) setAsset(response.data)
            else handleError('An unexpected error occurred', 'warning')
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) router.replace('/login')
                if (error.response.status >= 500) handleError('Internal Server Error', 'danger')
            }
        })
    }, [params.id, router]);

    return <>
        <Error error={error} clearError={() => setError(null)} />
        <Box>
            <Typography>
                {asset.name}
            </Typography>
        </Box>
    </>
}
