import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import ImageNAImage from "@/resources/image_not_available.png";
import config from "@/resources/config";
import {CircularProgress, Modal, ModalClose, ModalDialog, Table} from "@mui/joy";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function ResultsTable(props) {
    const router = useRouter()
    const [openModal, setOpenModal] = useState(null)
    const [loading, setLoading] = useState(true)

    return <>
        <Table
            borderAxis="xBetween"
            color="neutral"
            size="md"
            stickyFooter
            stickyHeader
            stripe="even"
            variant="soft"
            hoverRow
        >
            <thead>
            <tr>
                <th style={{width: '50%'}}>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
            {props.data.map((row) => (<tr key={row.id}>
                <td>
                    <Box>
                        <Typography
                            onClick={(event) => {
                                if (event.target.id !== 'image-' + row.id) router.push(`/asset/${row.id}`)
                            }}
                            sx={{cursor: 'pointer'}}
                            startDecorator={
                                <Image alt="Item image"
                                       src={row.images === null ? ImageNAImage : config.spaces.concat('/images/').concat(row.images[0])}
                                       width={64}
                                       height={64}
                                       style={{cursor: 'pointer'}}
                                       id={'image-' + row.id}
                                       onClick={() => {setOpenModal(row.id); setLoading(true)}}
                                />}>
                            {row.name}
                        </Typography>
                        <Modal open={openModal === row.id} onClose={() => setOpenModal(null)}>
                            <ModalDialog color="neutral" size="lg" variant="soft" sx={{width: '60vw', height: '60vh', display: 'flex'}}>
                                {loading && <CircularProgress sx={{m: 'auto'}} size="lg" variant="plain" />}
                                <Image onLoadingComplete={() => setLoading(false)} alt="Item image" src={row.images === null ? ImageNAImage : config.spaces.concat('/images/').concat(row.images[0])} fill style={{objectFit: 'contain'}}/>
                                <ModalClose />
                            </ModalDialog>
                        </Modal>
                    </Box>
                </td>
                {/*<td style={{cursor: 'pointer'}} onClick={() => router.push(`/?location=${row.location}`)}>{row.location}</td>*/}
                <td>{row.location}</td>
                <td>
                    <Box sx={{display: 'flex-inline'}}>
                        {row.maintenanceRecord ? <>
                            <div>{row.maintenanceRecord.currentStatus.status}</div>
                            <div>{row.maintenanceRecord.currentStatus.effectiveDate}</div>
                        </> : <div>UNKNOWN</div>}
                    </Box>
                </td>
                <td>
                    {row.quantity.value} {row.quantity.unit}
                </td>
            </tr>))}
            </tbody>
        </Table>
    </>
}
