'use client'

import { useGlobalContext } from "@/app/Context/store";
import Link from "next/link";

export const Header = () => {
    const { favImages } = useGlobalContext();

    return (
        <div style={{ width: '100%', backgroundColor: 'gray' }}>
            Doggo
            <Link href='/favourites'>
                <p>{favImages.length}</p>
            </Link>
        </div>
    )
}