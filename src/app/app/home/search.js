import SearchIcon from "@mui/icons-material/Search";
import {Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack} from "@mui/joy";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Input from "@mui/joy/Input";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/joy/Typography";
import {useState} from "react";

export default function Search(props) {
    const [query, setQuery] = useState('')

    const selectedFilters = new Map()

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
                        sx={{px: 1}}
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
        </Stack>
    </>
}
