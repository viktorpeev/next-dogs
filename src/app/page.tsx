'use client'

import { useState, useEffect } from "react"
import { SingleDog } from "./components/SingleDog/SingleDog"


export default function Home() {
  const [dogs, setDogs] = useState<string[]>([])
  const [dogsCopy, setDogsCopy] = useState<string[]>()
  const [text, setText] = useState("")
  const [timer, setTimer] = useState<any>(null)

  const [unionDogImage, setUnionDogImage] = useState<{ [breed: string]: string | undefined }>()

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await res.json()

        const dogsArray = Object.keys(data.message)

        const dogImagePromises = dogsArray.map((dog) =>
          fetch(`https://dog.ceo/api/breed/${dog}/images/random`).then((response) => response.json())
        );

        Promise.all(dogImagePromises).then((results) => {
          createDogImageUnion(results, dogsArray);
        });

        setDogs(dogsArray);
        setDogsCopy(dogsArray);

      } catch (error) {
        console.error(error)
      }
    }

    fetchDogData()
  }, [])


  const createDogImageUnion = (imageArray: { [message: string]: string }[], breedArray: string[]) => {
    const result = Object.fromEntries(breedArray.map((k, i) => [k, imageArray?.[i].message]));

    setUnionDogImage(result);
  }

  const searchForDog = (value: any) => {
    const trimmedValue = value.trim();
    setText(value);

    if (!trimmedValue.length) return;

    const filteredData: string[] = [];
    const regex = new RegExp('^' + trimmedValue + '?\\w', 'gi');



    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      dogs.forEach(dog => {
        if (dog.match(regex)) {
          filteredData.push(dog)
        }
      })

      setDogsCopy([...filteredData])
    }, 500)

    setTimer(newTimer)
  }



  return (
    <>
      {!dogsCopy ? (
        <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl text-white">
                The Dog App
              </h1>

              <form
                className="max-w-xl mx-auto"
                autoComplete="off"
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search for a dog / breed"
                  className="py-2 px-4 rounded shadow w-full bg-slate-400 text-white placeholder-white"
                  value={text}
                  onChange={(e) => searchForDog(e.target.value)}
                />
              </form>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {dogsCopy.map((dog, index) => (
                <SingleDog key={index} dogImage={unionDogImage?.[dog]} dogBreed={dog} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}