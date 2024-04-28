'use client'

import { useGlobalContext } from "../Context/store";

export default function Favourites() {
    const { favImages, setFavImages } = useGlobalContext();

    const handleSelect = (dogImage: string) => {
        setFavImages(favImages.filter(image => image !== dogImage))
    }

    return (
        <>{favImages.map((dogImage: string) => (
            <div style={{ width: '350px', height: '500px', marginTop: '10px', position: 'relative', textAlign: 'center' }}>
                <img onClick={() => handleSelect(dogImage)} style={{ width: '350px', height: '500px' }} src={dogImage} />
                <span style={{ position: 'absolute', top: '50%', right: '70%', color: 'blue', fontSize: '60px' }}>*</span>
            </div>
        ))}</>
    )
}
