'use client'

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import {IconButton, Modal, ModalClose, ModalDialog, Sheet, Table} from "@mui/joy";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Image from "next/image";
import ImageNAImage from '../../../resources/image_not_available.png'
import Button from "@mui/joy/Button";
import Paginator from "@/app/app/home/paginator-v2";

export default function Home() {
    const token = sessionStorage.getItem("token")
    const [data, setData] = useState([])
    const [count, setCount] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [openModal, setOpenModal] = useState(null)

    let queryParams = {}

    const handlePreviousPage = () => {
        axios.get(config.server.concat('/app/assets'), {
            headers: {
                'Authorization': token
            },
            params: {...queryParams, offset: pageNumber - 2}
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data.results)
                setCount(response.data.matchCount)
            }
        })
        setPageNumber(pageNumber - 1)
    }

    const handleNextPage = () => {
        axios.get(config.server.concat('/app/assets'), {
            headers: {
                'Authorization': token
            },
            params: {...queryParams, offset: pageNumber}
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data.results)
                setCount(response.data.matchCount)
            }
        })
        setPageNumber(pageNumber + 1)
    }

    useEffect(() => {
        axios.get(config.server.concat('/app/assets'), {
            headers: {
                'Authorization': token
            }
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data.results)
                setCount(response.data.matchCount)
            }
        })
    }, [])

    return <>
        <Box sx={{width: 'auto', height: 1}}>
            <Box sx={{height: 'auto'}}>
                {/*<Typography level="h2">*/}
                {/*    Home*/}
                {/*</Typography>*/}
                <Box sx={{py: 2, display: 'flex', width: 1}}>
                    <Input size="md"
                           startDecorator={<SearchIcon/>}
                           endDecorator={<IconButton><KeyboardReturnIcon/></IconButton>}
                           placeholder='Type something...'
                           sx={{mx: 'auto', width: 0.6}}
                    />
                </Box>
            </Box>
            <Sheet sx={{py: 0, overflow: 'auto', height: '0.87'}}>
                <Table
                    borderAxis="xBetween"
                    color="neutral"
                    size="md"
                    stickyFooter
                    stickyHeader
                    stripe="even"
                    variant="soft"
                    hoverRow
                >
                    <thead>
                    <tr>
                        <th style={{width: '50%'}}>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (<tr key={row.id}>
                        <td>
                            <Box>
                                <Typography
                                    startDecorator={
                                        <Image alt="Item image"
                                               src={row.images === null ? ImageNAImage : config.spaces.concat('/images/').concat(row.images[0])}
                                               width={64}
                                               height={64}
                                               style={{cursor: 'pointer'}}
                                               onClick={() => setOpenModal(row.id)}
                                        />}>
                                    {row.name}
                                </Typography>
                                <Modal open={openModal === row.id} onClose={() => setOpenModal(null)}>
                                    <ModalDialog color="neutral" size="lg" variant="soft" sx={{width: '60vw', height: '60vh', display: 'flex'}}>
                                        <Image alt="Item image" src={row.images === null ? ImageNAImage : config.spaces.concat('/images/').concat(row.images[0])} fill style={{objectFit: 'contain'}}/>
                                        <ModalClose />
                                    </ModalDialog>
                                </Modal>
                            </Box>
                        </td>
                        <td>{row.location}</td>
                        <td>
                            <Box sx={{display: 'flex-inline'}}>
                                {row.maintenanceRecord ? <>
                                    <div>{row.maintenanceRecord.currentStatus.status}</div>
                                    <div>{row.maintenanceRecord.currentStatus.effectiveDate}</div>
                                </> : <div>UNKNOWN</div>}
                            </Box>
                        </td>
                        <td>
                            {row.quantity.value} {row.quantity.unit}
                        </td>
                        </tr>))}
                    </tbody>
                </Table>
            </Sheet>
            <Paginator count={count} pageNumber={pageNumber} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />
        </Box>
    </>
}
