import Button from "@mui/joy/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/joy/Box";
import {IconButton} from "@mui/joy";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {useState} from "react";

export default function Paginator(props) {
    const [selectedPage, setSelectedPage] = useState(1)
    let lastPage = props.count / 25;
    if (props.count % 25 !== 0) lastPage++;

    const pages = []
    for (let i = 1; i <= lastPage; i++) {
        pages.push(<IconButton
            key={i}
            size="sm"
            variant={Number(i) ? Number(i) === selectedPage ? 'solid' : 'outlined' : 'plain'}
            color="neutral"
            sx={{mx: 0.5, maxWidth: '20px', gridRow: 1, justifyItems: 'center'}}
        >
            {i}
        </IconButton>)
    }

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
                disabled={selectedPage === 1}
            >
                Previous
            </Button>

            <Box sx={{ flex: 1 }}/>

            <Box sx={{overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap', display: 'grid', maxWidth: '60%'}}>
                {/*{*/}
                {/*    // ['1', '2', '3', '4', '5'].map((page) => (*/}
                {/*    //     <IconButton*/}
                {/*    //         key={page}*/}
                {/*    //         size="sm"*/}
                {/*    //         variant={Number(page) ? Number(page) === selectedPage ? 'solid' : 'outlined' : 'plain'}*/}
                {/*    //         color="neutral"*/}
                {/*    //         sx={{mx: 0.5, maxWidth: '20px', gridRow: 1, justifyItems: 'center'}}*/}
                {/*    //     >*/}
                {/*    //         {page}*/}
                {/*    //     </IconButton>*/}
                {/*    // ))*/}
                {/*    pages*/}
                {/*}*/}
            </Box>

            <Box sx={{ flex: 1 }}/>

            <Button
                size="sm"
                variant="outlined"
                color="neutral"
                endDecorator={<KeyboardArrowRightIcon />}
                disabled={selectedPage === lastPage}
            >
                Next
            </Button>
        </Box>
    </>
}
