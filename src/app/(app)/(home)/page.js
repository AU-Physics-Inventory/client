'use client'

import Box from "@mui/joy/Box";
import {Alert, IconButton, Sheet} from "@mui/joy";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "@/resources/config";
import Paginator from "@/app/(app)/(home)/paginator-v2";
import ResultsTable from "@/app/(app)/(home)/table";
import Search from "@/app/(app)/(home)/search";
import {useRouter, useSearchParams} from "next/navigation";
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {QUERY_UPDATE} from "@/app/(app)/utils";

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [data, setData] = useState([])
    const [count, setCount] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('')
    const [filters, setFilters] = useState(new Map())

    const handleError = (message, color) => {
        let icon;
        switch (color) {
            case 'danger':
                icon = <ReportIcon />
                break;
            case 'warning':
                icon = <WarningIcon />
                break;
            default:
                icon = null;
                break;
        }

        setError({message: message, color: color, icon: icon})
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        const urlSearchParams = new URLSearchParams(searchParams)
        if (!urlSearchParams.has('offset')) urlSearchParams.set('offset', '0')

        if (token !== null && token.length !== 0) {
            axios.get(config.server.concat('/app/assets'), {
                headers: {
                    'Authorization': token
                },
                params: urlSearchParams
            }).then((response) => {
                if (response.status === 200) {
                    setData(response.data.results)
                    setCount(response.data.matchCount)
                    setPageNumber(parseInt(urlSearchParams.get('offset'), 10) + 1)
                    setFilters(new Map(urlSearchParams))
                    setQuery(urlSearchParams.has('search') ? urlSearchParams.get('search') : '')
                }
            }).catch((err) => {
                if (err.response) {
                    if (err.response.status === 401 || err.response.status === 403) router.replace('/login')
                    if (err.response.status >= 500) handleError('Internal Server Error', 'danger')
                }
            })
        } else router.replace('/login')
    }, [router, searchParams])

    const search = (offset = 0) => {
        setError(null)
        filters.set('offset', offset)
        router.push('/?' + new URLSearchParams(filters).toString())
    }

    const handleSearchTrigger = (updateType) => {
        if (updateType === QUERY_UPDATE) {
            if (query === '' || query == null) filters.delete('search')
            else filters.set('search', query)
        }

        search(0)
    }

    const handlePreviousPage = () => {
        search(pageNumber - 2)
    }

    const handleNextPage = () => {
        search(pageNumber)
    }

    return <>
        <Box sx={{zIndex: 1, position: 'absolute'}}>
            {error && <Alert variant="soft" color={error.color} startDecorator={error.icon} endDecorator={<IconButton variant="soft" color={error.color} onClick={() => setError(null)}><CloseRoundedIcon /></IconButton>}>{error.message}</Alert>}
        </Box>
        <Box sx={{width: 'auto', height: 1, zIndex: 0}}>
            <Box sx={{height: 'auto'}}>
                <Box sx={{py: 2, display: 'flex', width: 1}}>
                    <Search queryState={[query, setQuery]} handleSearch={handleSearchTrigger} filters={filters}/>
                </Box>
            </Box>
            <Sheet sx={{py: 0, overflow: 'auto', height: '0.87'}}>
                <ResultsTable data={data}/>
            </Sheet>
            <Paginator count={count} pageNumber={pageNumber} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />
        </Box>
    </>
}
