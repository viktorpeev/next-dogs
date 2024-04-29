'use client'

import { useGlobalContext } from "../Context/store";
import { SingleDog } from "../components/SingleDog/SingleDog";
import styles from './page.module.css';

export default function Favourites() {
    const { favImages, setFavImages } = useGlobalContext();

    const handleSelect = (dogImage?: string) => {
        setFavImages(favImages.filter(image => image !== dogImage))
    }

    return (
        <>
            <section className={styles.favourite_galery}>

                {!favImages ? (
                    <h1>
                        Loading Galery...
                    </h1>
                ) : (
                    <>
                        <div>
                            <h1 className={styles.favourite_label}>
                                Favourites
                            </h1>
                            <div className={styles.favourite_singleDog}>
                                {favImages.map((dogImage: string, index) => (
                                    <SingleDog key={index} dogImage={dogImage} onSelect={handleSelect} />
                                ))}
                            </div>
                        </div>
                    </>
                )}

            </section>
        </>
    )
}
