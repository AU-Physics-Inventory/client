'use client'

import {useState} from "react";
import Typography from "@mui/joy/Typography";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from "@mui/joy/Box";

export default function Cell(props) {
    const [sx, setSx] = useState({display: 'none'})

    const showCopyImage = (val) => {
        if (val) setSx({})
        else setSx({display: 'none'})
    }

    const handleClick = () => {
        navigator.clipboard.writeText(props.value);
    }

    return <td>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', flex: 1}} onMouseEnter={() => showCopyImage(true)} onMouseLeave={() => showCopyImage(false)} onClick={handleClick}>
            <Typography>
                <Typography sx={{fontWeight: 'bold'}} variant='soft' color={'neutral'}>
                    {props.name}:
                </Typography>{' '}
                <Typography>
                    {props.value ? props.value : props.defaultValue ? props.defaultValue : 'None'}
                </Typography>
            </Typography>
            <Box sx={{...sx, my: 'auto', mx: 0, height: 1}}>
                <ContentCopyIcon sx={{opacity: 0.4, height: '20px'}}/>
            </Box>
        </Box>
    </td>
}
