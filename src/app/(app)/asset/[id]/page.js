'use client'

import {useRouter} from "next/navigation";
import Typography from "@mui/joy/Typography";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Error from "@/app/(app)/error"
import Box from "@mui/joy/Box";
import Image from "next/image";
import ImageNAImage from "@/resources/image_not_available.png";
import {Card, Sheet} from "@mui/joy";
import Button from "@mui/joy/Button";

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
        <Box sx={{width: 1, height: 1, display: 'inline-block'}}>
            <Sheet sx={{width: 1}}>
                <Card sx={{height: '50vh', maxWidth: '800px', maxHeight: '600px', width: '80%', mx: 'auto', border: '2px solid blue'}} variant="plain">
                            <Image alt="Item image"
                                   src={asset.images == null ? ImageNAImage : config.spaces.concat('/images/').concat(asset.images[0])}
                                   fill
                                   sx={{objectFit: 'contain'}}
                                   id={'image-' + asset.id}
                            />
                </Card>
                <Box>
                    <Typography level="title-lg" component="div">
                        {asset.name}
                    </Typography>
                    <Typography level="body-lg">
                        {asset.notes}
                    </Typography>
                    <Button variant="soft" color="primary" size="sm">
                        Edit
                    </Button>
                    <Button variant="soft" color="danger" size="sm">
                        Delete
                    </Button>
                </Box>
            </Sheet>
        </Box>
    </>
}
