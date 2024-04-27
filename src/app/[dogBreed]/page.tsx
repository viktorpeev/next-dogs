"use client";

import { useEffect, useState } from "react"

type Params = {
    params: {
        dogBreed: string
    }
}
export default function Galery({ params }: Params) {

    const [dogGallery, setDogGalery] = useState<string[]>();

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

    return (
        <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {!dogGallery ? (
                <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
                    Loading...
                </h1>
            ) : (
                dogGallery.map((dogImage: string) => (
                    <div style={{ width: '350px', height: '500px', marginTop: '10px', position: 'relative', textAlign: 'center' }}>
                        <img style={{ width: '350px', height: '500px' }} src={dogImage} />
                    </div>
                ))
            )}
        </section>
    )
}
