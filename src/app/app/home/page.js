'use client'

import Box from "@mui/joy/Box";
import {Sheet} from "@mui/joy";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Paginator from "@/app/app/home/paginator-v2";
import ResultsTable from "@/app/app/home/table";
import Search from "@/app/app/home/search";

export default function Home() {
    const token = sessionStorage.getItem("token")
    const [data, setData] = useState([])
    const [count, setCount] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const queryParams = useRef({})

    const search = (offset = 0) => {
        axios.get(config.server.concat('/app/assets'), {
            headers: {
                'Authorization': token
            },
            params: {...queryParams.current, offset: offset}
        }).then((response) => {
            if (response.status === 200) {
                setData(response.data.results)
                setCount(response.data.matchCount)
            }
        })
        setPageNumber(offset + 1)
    }

    const handleNewSearch = (query, filters) => {
        queryParams.current = {}
        if (query) queryParams.current.search = query;
        filters.forEach((value, key) => queryParams.current[key] = value)
        search(0)
    }

    const handlePreviousPage = () => {
        search(pageNumber - 2)
    }

    const handleNextPage = () => {
        search(pageNumber)
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
                    <Search handleSearch={handleNewSearch}/>
                </Box>
            </Box>
            <Sheet sx={{py: 0, overflow: 'auto', height: '0.87'}}>
                <ResultsTable data={data}/>
            </Sheet>
            <Paginator count={count} pageNumber={pageNumber} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />
        </Box>
    </>
}
