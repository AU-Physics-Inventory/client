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
import ResultsTable from "@/app/app/home/table";
import SearchField from "@/app/app/home/search";

export default function Home() {
    const token = sessionStorage.getItem("token")
    const [data, setData] = useState([])
    const [count, setCount] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)

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
                <Box sx={{py: 2, display: 'flex', width: 1}}>
                    <SearchField />
                </Box>
            </Box>
            <Sheet sx={{py: 0, overflow: 'auto', height: '0.87'}}>
                <ResultsTable data={data}/>
            </Sheet>
            <Paginator count={count} pageNumber={pageNumber} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />
        </Box>
    </>
}
