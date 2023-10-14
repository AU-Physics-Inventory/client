import SearchIcon from "@mui/icons-material/Search";
import {IconButton} from "@mui/joy";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Input from "@mui/joy/Input";

export default function SearchField(props) {
    return <>
        <Input size="md"
               startDecorator={<SearchIcon/>}
               endDecorator={<IconButton><KeyboardReturnIcon/></IconButton>}
               placeholder='Type something...'
               sx={{mx: 'auto', width: 0.6}}
        />
    </>
}
