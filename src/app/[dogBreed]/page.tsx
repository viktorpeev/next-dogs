"use client";

import { useEffect, useState } from "react"
import { useGlobalContext } from "../Context/store";

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

    const handleFavourite = (dogImage: string) => {
        if (favImages.includes(dogImage)) {
            setFavImages(favImages.filter(image => image !== dogImage))
        }
        else {
            setFavImages([...favImages, dogImage])
        }

    }

    return (
        <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {!dogGallery ? (
                <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
                    Loading...
                </h1>
            ) : (
                dogGallery.map((dogImage: string) => (
                    <div style={{ width: '350px', height: '500px', marginTop: '10px', position: 'relative', textAlign: 'center' }}>
                        <img onClick={() => handleFavourite(dogImage)} style={{ width: '350px', height: '500px' }} src={dogImage} />
                        {favImages.includes(dogImage) ? (<span style={{ position: 'absolute', top: '50%', right: '70%', color: 'blue', fontSize: '60px' }}>*</span>) : (<span style={{ position: 'absolute', top: '50%', right: '70%', color: 'red', fontSize: '60px' }}>*</span>)}
                    </div>
                ))
            )}
        </section>
    )
}
