import Link from "next/link"

type Dog = {
    dogImage?: string;
    dogBreed?: string
}

export const SingleDog = ({ dogImage, dogBreed }: Dog) => {

    return (
        <Link href={`/${dogBreed}`} >
            <div style={{ width: '350px', height: '500px', marginTop: '10px', position: 'relative', textAlign: 'center' }}>
                <img style={{ width: '350px', height: '500px' }} src={dogImage} />
                <span style={{ position: 'absolute', top: '95%', right: '70%' }}>{dogBreed}</span>
            </div>
        </Link >
    )
}