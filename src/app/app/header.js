'use client'

import Box from "@mui/joy/Box";
import {AspectRatio, Sheet} from "@mui/joy";
import Image from "next/image";
import config from "@/resources/config";
import Typography from "@mui/joy/Typography";

export default function Header() {
    return <>
        <Sheet color="primary" variant="solid">
            {/*<AspectRatio ratio="1" variant="plain">*/}
            {/*    <Image src={config.spaces.concat("/logos/B_Physics Inventory-04.png")}*/}
            {/*           alt="Physics Inventory" width="24" height="24"/>*/}
            {/*</AspectRatio>*/}
            {/*<Typography*/}
            {/*    fontWeight="lg"*/}
            {/*    fontSize="xl"*/}
            {/*    startDecorator={<Box*/}
            {/*        component="span"*/}
            {/*        sx={{*/}
            {/*            width: 48,*/}
            {/*            height: 48,*/}
            {/*        }}>*/}
            {/*        <Image src={config.spaces.concat("/logos/B_Physics Inventory-04.png")}*/}
            {/*               alt="Physics Inventory"*/}
            {/*               width="48"*/}
            {/*               height="48"*/}
            {/*        />*/}
            {/*    </Box>}*/}
            {/*>*/}
            {/*    Physics Inventory*/}
            {/*</Typography>*/}
        </Sheet>
    </>
}
