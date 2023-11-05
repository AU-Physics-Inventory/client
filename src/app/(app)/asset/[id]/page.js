'use client'

import {useRouter} from "next/navigation";

export default function Asset({params}) {
    return <p>Asset {params.id}</p>
}
