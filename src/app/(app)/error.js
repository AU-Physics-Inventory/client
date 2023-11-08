'use client'

import {Alert, IconButton} from "@mui/joy";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/joy/Box";
import ReportIcon from "@mui/icons-material/Report";
import WarningIcon from "@mui/icons-material/Warning";

export default function Error(props) {
    const setIcon = (error) => {
        if (error.icon != null) return error.icon
        switch (error.color) {
            case 'danger':
                return <ReportIcon />
            case 'warning':
                return <WarningIcon />
            default:
                return null;
        }
    }

    return <Box sx={{zIndex: 1, position: 'absolute'}}>
        {props.error && <Alert variant="soft" color={props.error.color} startDecorator={setIcon(props.error)} endDecorator={<IconButton variant="soft" color={props.error.color} onClick={props.clearError}><CloseRoundedIcon /></IconButton>}>{props.error.message}</Alert>}
    </Box>
}
