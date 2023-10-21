import SearchIcon from "@mui/icons-material/Search";
import {
    Chip,
    ChipDelete,
    Dropdown,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    Modal,
    ModalClose,
    ModalDialog,
    Stack
} from "@mui/joy";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Input from "@mui/joy/Input";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/joy/Typography";
import {useState} from "react";
import Box from "@mui/joy/Box";
import {DialogTitle} from "@mui/material";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import {Map} from "immutable";


export default function Search(props) {
    const [query, setQuery] = useState('')
    const [openModal, setOpenModal] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState(Map())

    const handleFilterSelection = (newFilterState) => {
        props.handleSearch(query, newFilterState)
        setSelectedFilters(newFilterState)
    }

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
            <IconButton onClick={() => props.handleSearch(query, selectedFilters)}>
                <KeyboardReturnIcon/>
            </IconButton>
        </>
    </>

    const startDecorator = <>
        <>
            <SearchIcon/>
            <Dropdown>
                <MenuButton sx={{mx: 0}} slots={{root: IconButton}}
                            slotProps={{root: {variant: 'plain', color: 'neutral'}}}>
                    <ExpandMoreIcon/>
                </MenuButton>
                <Menu size="sm" sx={{
                    boxShadow: 'sm',
                    flexGrow: 0,
                    minWidth: 200,
                    maxHeight: 240,
                    overflow: 'auto',
                }}>
                    <Typography
                        level="body-xs"
                        textTransform="uppercase"
                        fontWeight="lg"
                        sx={{px: 1, py: 0.3}}
                    >
                        Filters
                    </Typography>
                    {searchOptions.map((option) => <MenuItem key={option.name}>{option.label}</MenuItem>)}
                </Menu>
            </Dropdown>
        </>
    </>

    return <>
        <Stack sx={{mx: 'auto', width: 0.6}}>
            <Input size="md"
                   startDecorator={startDecorator}
                   endDecorator={endDecorator}
                   placeholder='Type something...'
                   onChange={(event) => setQuery(event.target.value)}
                   onKeyUp={(event) => {if (event.key === 'Enter') props.handleSearch(query, selectedFilters)}}
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
                    {searchOptions.map((option) => <Chip onClick={() => setOpenModal(option.name)} size="md" color="primary" variant={selectedFilters.has(option.name) ? "solid" : "soft"} key={option.name} endDecorator={selectedFilters.has(option.name) && <ChipDelete onDelete={() => handleFilterSelection(selectedFilters.remove(option.name))} />}>{option.label}<Modal open={openModal === option.name} onClose={() => setOpenModal(null)}>
                            <ModalDialog>
                                <ModalClose />
                                <DialogTitle>Filter by {option.label}</DialogTitle>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        handleFilterSelection(selectedFilters.set(option.name, event.currentTarget.elements.inputField.value))
                                        setOpenModal(false);
                                    }}
                                    autoComplete="off"
                                >
                                    <Stack spacing={2}>
                                        <FormControl>
                                            <FormLabel>{option.label}</FormLabel>
                                            <Input name="inputField" defaultValue={selectedFilters.has(option.name) ? selectedFilters.get(option.name) : ''} autoFocus required />
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
