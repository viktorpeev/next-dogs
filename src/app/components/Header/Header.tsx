'use client'

import { useGlobalContext } from "@/app/Context/store";
import Link from "next/link";
import styles from './Header.module.css'

export const Header = () => {
    const { favImages } = useGlobalContext();

    return (
        <div className={styles.header} style={{ width: '100%', backgroundColor: 'gray' }}>
            <div className={styles.label_container}>
                <Link href='/'>
                    <h1>Doggo</h1>
                </Link>
            </div>

            <Link className={styles.favourites_container} href='/favourites'>
                <p className={styles.favourites}>{`Favourites: ${favImages.length}`}</p>
            </Link>
        </div>
    )
}