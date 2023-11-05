import SearchIcon from "@mui/icons-material/Search";
import {
    Chip,
    ChipDelete,
    IconButton,
    Modal,
    ModalClose,
    ModalDialog,
    Stack
} from "@mui/joy";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import {useState} from "react";
import Box from "@mui/joy/Box";
import {DialogTitle} from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import {FILTER_UPDATE, QUERY_UPDATE} from "@/app/(app)/utils";


export default function Search(props) {
    const [openModal, setOpenModal] = useState(null)
    const [query, setQuery] = props.queryState

    const searchOptions = [
        {label: "Location", name: "location"},
        {label: "AU Inventory No", name: "AUInventoryNo"},
        {label: "Identity No", name: "identityNo"},
        {label: "Brand", name: "brand"},
        {label: "Model", name: "model"},
        {label: "Part No", name: "partNo"},
        {label: "Serial No", name: "serial"},
        {label: "Vendor", name: "vendor"},
        {label: "Status", name: "status"},
    ]

    const endDecorator = <>
        <>
            <IconButton onClick={() => props.handleSearch(QUERY_UPDATE)}>
                <KeyboardReturnIcon/>
            </IconButton>
        </>
    </>

    const startDecorator = <SearchIcon />

    return <>
        <Stack sx={{mx: 'auto', width: 0.6}}>
            <Input size="md"
                   startDecorator={startDecorator}
                   endDecorator={endDecorator}
                   placeholder='Type something...'
                   onChange={(event) => setQuery(event.target.value)}
                   onKeyUp={(event) => {if (event.key === 'Enter') props.handleSearch(QUERY_UPDATE)}}
                   value={query}
            />
            <Box sx={{my: 0.7, display: 'flex', mx: 'auto', maxWidth: 1}}>
                <Typography
                    level="body-xs"
                    textTransform="uppercase"
                    fontWeight="lg"
                    sx={{my: 'auto', marginRight: 0.8,}}
                >
                    Filters
                </Typography>
                <Box sx={{overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap', display: 'grid', gridAutoFlow: 'column', gap: 1}}>
                    {searchOptions.map((option) => <Chip onClick={() => setOpenModal(option.name)} size="md" color="primary" variant={props.filters.has(option.name) ? "solid" : "soft"} key={option.name} endDecorator={props.filters.has(option.name) && <ChipDelete onDelete={() => {props.filters.delete(option.name); props.handleSearch(FILTER_UPDATE)}} />}>{option.label}
                        <Modal open={openModal === option.name} onClose={() => setOpenModal(null)}>
                            <ModalDialog>
                                <ModalClose />
                                <DialogTitle>Filter by {option.label}</DialogTitle>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        props.filters.set(option.name, event.currentTarget.elements.inputField.value)
                                        props.handleSearch(FILTER_UPDATE)
                                        setOpenModal(false);
                                    }}
                                    autoComplete="off"
                                >
                                    <Stack spacing={2}>
                                        <FormControl>
                                            <FormLabel>{option.label}</FormLabel>
                                            <Input name="inputField" defaultValue={props.filters.has(option.name) ? props.filters.get(option.name) : ''} autoFocus required />
                                        </FormControl>
                                        <Button type="submit">Apply filter</Button>
                                    </Stack>
                                </form>
                            </ModalDialog>
                        </Modal>
                    </Chip>)}
                </Box>
            </Box>
        </Stack>
    </>
}
