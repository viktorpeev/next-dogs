"use client";

import { useEffect, useState } from "react"
import { useGlobalContext } from "../Context/store";

import styles from './page.module.css'
import { SingleDog } from "../components/SingleDog/SingleDog";

type Params = {
    params: {
        dogBreed: string
    }
}
export default function Galery({ params }: Params) {

    const [dogGallery, setDogGalery] = useState<string[]>();
    const { favImages, setFavImages } = useGlobalContext();

    useEffect(() => {
        const fetchDogGalery = async () => {
            try {
                const res = await fetch(`https://dog.ceo/api/breed/${params.dogBreed}/images`)
                const data = await res.json()

                if (data.status == 'error') {
                    return
                }

                setDogGalery(data.message);
            } catch (error) {
                console.error(error)
            }
        }

        fetchDogGalery()
    }, [])

    const handleFavourite = (dogImage?: string) => {
        if (!dogImage) return;

        if (favImages.includes(dogImage)) {
            setFavImages(favImages.filter(image => image !== dogImage))
        }
        else {
            setFavImages([...favImages, dogImage])
        }

    }

    return (
        <section className={styles.breed_galery}>

            {!dogGallery ? (
                <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
                    Loading Galery...
                </h1>
            ) : (
                <>
                    <div className="text-center">
                        <h1 className={styles.breed_label}>
                            {params.dogBreed}
                        </h1>
                        <div className={styles.breed_singleDog}>
                            {dogGallery.map((dogImage: string, index) => (
                                <SingleDog key={index} dogImage={dogImage} onSelect={handleFavourite} />
                            ))}
                        </div>
                    </div>
                </>
            )}

        </section>

    )
}
