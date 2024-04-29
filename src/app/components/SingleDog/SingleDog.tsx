import Link from "next/link"
import styles from './SingleDog.module.css'
import { useGlobalContext } from "@/app/Context/store";

type Dog = {
    dogImage?: string;
    dogBreed?: string
    onSelect?: (image?: string) => void;
}

export const SingleDog = ({ dogImage, dogBreed, onSelect }: Dog) => {

    const { favImages } = useGlobalContext();

    return (

        <>{dogBreed ? (
            <Link href={`/${dogBreed}`} >
                <div className={styles.card_container}>
                    <img className={styles.card_container__img} src={dogImage} />
                    <span className={styles.card_container__label}>{dogBreed}</span>
                </div>
            </Link >
        )
            : (
                <div style={{cursor: 'pointer'}} onClick={() => onSelect?.(dogImage)} className={styles.card_container}>
                    <img className={styles.card_container__img} src={dogImage} />
                    <span style={dogImage && favImages.includes(dogImage) ? { color: 'gold' } : { color: 'white' }} className={styles.card_container__star}>&#8902;</span>
                </div>
            )}</>

    )
}