import Button from "@mui/joy/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/joy/Box";
import {IconButton, Sheet} from "@mui/joy";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useState} from "react";

export default function Paginator(props) {
    const maxPageNumber = Math.ceil(props.count / 25)

    return <>
        <Box
            sx={{
                pt: 2,
                gap: 1,
                display: {
                    md: 'flex'
                }
            }}
        >
            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                startDecorator={<KeyboardArrowLeftIcon />}
                disabled={props.pageNumber === 1}
                onClick={props.handlePreviousPage}
            >
                Previous
            </Button>

            <Box sx={{ flex: 1 }}/>

            <Box>
                <Sheet
                    size="sm"
                    variant='solid'
                    color="neutral"
                    sx={{py: 0.5, px: 1, borderRadius: 50}}
                >
                    Page {maxPageNumber === 0 ? 0 : props.pageNumber} of {maxPageNumber}
                </Sheet>
            </Box>

            <Box sx={{ flex: 1 }}/>

            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardArrowRightIcon />}
                disabled={props.pageNumber >= maxPageNumber}
                onClick={props.handleNextPage}
            >
                Next
            </Button>
        </Box>
    </>
}
