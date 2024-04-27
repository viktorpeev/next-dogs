import Link from "next/link"
import { useEffect, useState } from "react"

type Dog = {
    dog: string
}

export const SingleDog = ({ dog }: Dog) => {

    const [dogImage, setDogImage] = useState<string>()

    useEffect(() => {
        const fetchDogImage = async () => {
            try {
                const res = await fetch(`https://dog.ceo/api/breed/${dog}/images/random`)
                const data = await res.json()

                setDogImage(data.message);
            } catch (error) {
                console.error(error)
            }
        }

        fetchDogImage()
    }, [])
    return (
        <Link href={`/${dog}`} >
            <div style={{ width: '350px', height: '500px', marginTop: '10px', position: 'relative', textAlign: 'center' }}>
                <img style={{ width: '350px', height: '500px' }} src={dogImage} />
                <span style={{ position: 'absolute', top: '95%', right: '70%' }}>{dog}</span>
            </div>
        </Link >
    )
}