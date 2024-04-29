'use client'

import { useState, useEffect } from "react"
import { SingleDog } from "./components/SingleDog/SingleDog"
import styles from './page.module.css'


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
        <h1>
          Loading Galery...
        </h1>
      ) : (
        <>
          <section className={styles.homepage_galery}>
            <div>
              <h1 className={styles.homepage_label}>
                Breeds
              </h1>

              <div
                className={styles.search_container}
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Type to filter"
                  className={styles.search}
                  value={text}
                  onChange={(e) => searchForDog(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.homepage_singleDog}>
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