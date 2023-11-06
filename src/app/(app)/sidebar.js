'use client'

import {List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, ListSubheader, Sheet} from "@mui/joy";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ScienceIcon from "@mui/icons-material/Science";
import BuildIcon from "@mui/icons-material/Build";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useEffect, useState} from "react";
import {Buffer} from "buffer";
import {useRouter} from "next/navigation";
import Box from "@mui/joy/Box";
import Image from "next/image";
import config from "@/resources/config";
import axios from "axios";

export default function Sidebar() {
    const router = useRouter()
    const [isAdmin, setAdmin] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token")

        if (storedToken == null) {
            router.push('/')
            return
        }

        const jwtPayload = JSON.parse(Buffer.from(storedToken.split('.')[1], 'base64').toString())
        if (jwtPayload.roles.includes('admin')) setAdmin(true)
    }, [router])

    const signOut = () => {
        console.log('Signing out...')
        const token = sessionStorage.getItem('token')
        axios.post(config.server.concat('/logout'), null, {
            headers: {
                'Authorization': token
            }
        }).then(() => {})
            .catch(() => {})

        sessionStorage.removeItem('token')
        router.replace('/login')
    }

    return <Sheet color="primary" variant="soft" sx={{
        width: 'auto',
        px: '10px'
    }}>
        <Box component="span" sx={{display: 'flex', py: 2}}>
            <Image src={config.spaces.concat("/logos/B_Physics Inventory-04.png")} alt="Physics Inventory" style={{margin: "0 auto"}} width="64" height="64"/>
        </Box>
                <List
                    size="sm"
                    sx={{
                        '--ListItem-radius': '6px',
                        '--List-gap': '6px',
                        '&& .Mui-selected, && .Mui-selected:hover': {
                            bgcolor: '#cbb677'
                        }
                    }}
                >
                    <ListSubheader role="presentation" sx={{ fontWeight: 'lg' }}>
                        Dashboard
                    </ListSubheader>
                    <ListItem>
                        <ListItemButton selected={selectedIndex === 0} onClick={() => {
                            setSelectedIndex(0)
                            router.push('/')
                        }}>
                            <ListItemDecorator>
                                <BubbleChartIcon />
                            </ListItemDecorator>
                            <ListItemContent>Home</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled selected={selectedIndex === 1} onClick={() => {
                            setSelectedIndex(1)
                            router.push('/collections')
                        }}>
                            <ListItemDecorator>
                                <LibraryBooksIcon />
                            </ListItemDecorator>
                            <ListItemContent>Collections</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled selected={selectedIndex === 2} onClick={() => {
                            setSelectedIndex(2)
                            router.push('/labs')
                        }}>
                            <ListItemDecorator>
                                <ScienceIcon />
                            </ListItemDecorator>
                            <ListItemContent>Labs</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled selected={selectedIndex === 3} onClick={() => {
                            setSelectedIndex(3)
                            router.push('/maintenance')
                        }}>
                            <ListItemDecorator>
                                <BuildIcon />
                            </ListItemDecorator>
                            <ListItemContent>Maintenance</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    {isAdmin && <>
                        <ListSubheader role="presentation" sx={{ fontWeight: 700, mt: 2 }}>
                            Admin
                        </ListSubheader>
                        <ListItem>
                            <ListItemButton disabled selected={selectedIndex === 4} onClick={() => {
                                setSelectedIndex(4)
                                router.push('/admin/approvals')
                            }}>
                                <ListItemDecorator>
                                    <CheckCircleOutlineIcon />
                                </ListItemDecorator>
                                <ListItemContent>Approvals</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton disabled selected={selectedIndex === 5} onClick={() => {
                                setSelectedIndex(5)
                                router.push('/admin/users')
                            }}>
                                <ListItemDecorator>
                                    <PeopleRoundedIcon />
                                </ListItemDecorator>
                                <ListItemContent>Users</ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    </>}
                    <ListSubheader role="presentation" sx={{ fontWeight: 700, mt: 2 }}>
                        Account
                    </ListSubheader>
                    <ListItem>
                        <ListItemButton disabled selected={selectedIndex === 6} onClick={() => {
                            setSelectedIndex(6)
                            router.push('/account/profile')
                        }}>
                            <ListItemDecorator>
                                <AccountCircleIcon />
                            </ListItemDecorator>
                            <ListItemContent>Profile</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton selected={selectedIndex === 7} onClick={() => {
                            setSelectedIndex(7)
                            signOut()
                        }}>
                            <ListItemDecorator>
                                <ExitToAppIcon />
                            </ListItemDecorator>
                            <ListItemContent>Sign out</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Sheet>
}
