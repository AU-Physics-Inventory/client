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
import {Sheet, Table} from "@mui/joy";
import Button from "@mui/joy/Button";
import ArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Cell from "@/app/(app)/asset/[id]/cell";

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
            }, params: {
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
        <Error error={error} clearError={() => setError(null)}/>
        <Box sx={{overflowY: 'auto', overflowX: 'hidden'}}>
            <Sheet sx={{width: 1}}>
                <Box sx={{
                    height: '30vh',
                    maxWidth: '800px',
                    maxHeight: '600px',
                    width: '80%',
                    mx: 'auto',
                    my: 2,
                    position: 'relative',
                    display: 'flex',
                    gap: 1
                }} variant="plain">
                    <div style={{width: 'auto', margin: 'auto'}}>
                        <Button
                            size="md"
                            variant="plain"
                            color="neutral"
                            onClick={() => console.log('Clicked')}
                        >
                            <ArrowLeftIcon/>
                        </Button>
                    </div>
                    <div style={{width: 'auto', flex: 1}}>
                        <Image alt="Item image"
                               src={asset.images == null ? ImageNAImage : config.spaces.concat('/images/').concat(asset.images[0])}
                               fill
                               objectFit={'contain'}
                               id={'image'.concat('-').concat(asset.id).concat('-').concat(asset.images ? asset.images[0] : '')}
                        />
                    </div>
                    <div style={{width: 'auto', margin: 'auto'}}>
                        <Button
                            size="md"
                            variant="plain"
                            color="neutral"
                        >
                            <ArrowRightIcon/>
                        </Button>
                    </div>
                </Box>
                <Box>
                    <Box>
                        <Box>
                            <Sheet variant={'soft'} sx={{display: 'flex', justifyContent: 'space-between', flex: 1, padding: 1}}>
                                <Typography level={'h3'}>
                                    {asset.name}
                                </Typography>
                                <Box sx={{display: 'flex', gap: 1}}>
                                    <Button variant="soft" color="primary" size="sm">
                                        Edit
                                    </Button>
                                    <Button variant="soft" color="danger" size="sm">
                                        Delete
                                    </Button>
                                </Box>
                            </Sheet>
                        </Box>
                        <Table variant='outlined' borderAxis='bothBetween' size='lg'>
                            <tbody>
                            <tr>
                                <Cell name='ID' value={asset.id} />
                                <Cell name='Keywords' value={asset.keywords ? asset.keywords.join(', ') : ''} />
                            </tr>
                            <tr>
                                <Cell name='Location' value={asset.location} />
                                <Cell name='Identity No.' value={asset.identityNo} />
                            </tr>
                            <tr>
                                <Cell name='Quantity' value={asset.quantity ? asset.quantity.value + ' '.concat(asset.quantity.unit) : null} />
                                <Cell name='Status' value={asset.maintenanceRecord ? asset.maintenanceRecord.currentStatus.status : null} />
                            </tr>
                            </tbody>
                        </Table>
                    </Box>
                    <Box>
                        <Typography variant={'soft'} color={'primary'} sx={{textTransform: 'uppercase', my: 1, mb: 0}}>
                            Manufacturer Details
                        </Typography>
                        {asset.manufacturerInfo && <Table variant={'outlined'} borderAxis={'bothBetween'} size={'lg'}>
                            <tbody>
                            <tr>
                                <Cell name={'Brand'} value={asset.manufacturerInfo.brand} />
                                <Cell name={'Model'} value={asset.manufacturerInfo.model} />
                            </tr>
                            <tr>
                                <Cell name={'Part No.'} value={asset.manufacturerInfo.partNo} />
                                <Cell name={'Serial No.'} value={asset.manufacturerInfo.serialNo} />
                            </tr>
                            </tbody>
                        </Table>}
                    </Box>
                    <Box>
                        <Typography variant={'soft'} color={'success'} sx={{textTransform: 'uppercase', my: 1, mb: 0}}>
                            Notes
                        </Typography>
                        <Typography variant={'plain'} level="body-lg">
                            {asset.notes}
                        </Typography>
                    </Box>
                </Box>
            </Sheet>
        </Box>
    </>
}
