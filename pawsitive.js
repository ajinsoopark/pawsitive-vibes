document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    const randomDog = document.getElementById('randomDog')
    const randomDogButton = document.getElementById('randomDogButton')
    const breedName = document.getElementById('breedName')
    const moreButton = document.getElementById('moreDogs')

    let currentBreed
    let currentDogImage 
    let prettyBreedName = ''
    let isSubBreed = false

    const sliceBreedName = (url) => {
        const startingIndex = 30
        let endingIndex

        for (let i = startingIndex; i < url.length; i++) {
            if (url[i] === '/') endingIndex = i
        }
        currentBreed = url.slice(startingIndex, endingIndex)
    }

    const beautifyName = (name) => {
        let breedNameArr = []
        let subBreedArr = []
        for (let i = 0; i < name.length; i++) {
            if (name[i] === '-') { isSubBreed = true; continue }
            if (isSubBreed) {
                if (!subBreedArr.length) {
                    subBreedArr.push(name[i].toUpperCase())
                } else if (i === name.length - 1) {
                    subBreedArr.push(name[i], ' ')
                } else subBreedArr.push(name[i])
            } else if (i === 0) {
                breedNameArr.push(name[i].toUpperCase())
            } else {
                breedNameArr.push(name[i])
            }
        }
        prettyBreedName = subBreedArr.join('').concat(breedNameArr.join(''))
    }

    const displayMoreDogsButton = () => {
        moreButton.innerText = `More ${prettyBreedName}s`
        moreButton.style.visibility = 'visible'
    }

    const fetchRandomDog = async () => {
        isSubBreed = false
        await axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
            currentDogImage = res.data.message
        }).then(() => {
            sliceBreedName(currentDogImage)
        }).then(() => {
            beautifyName(currentBreed)
        }).catch(err => console.log(err))
    }

    const displayDogImage = (url) => {
        let dogImageTag = document.createElement('img')
        
        dogImageTag.setAttribute('src', url)
        dogImageTag.setAttribute('alt', 'Random dog')
        if (randomDog.innerHTML) {
            const oldTag = randomDog.childNodes[0]
            randomDog.replaceChild(dogImageTag, oldTag)
        } else {
            randomDog.appendChild(dogImageTag)
        }
    }

    const handleDogButton = () => {
        prettyBreedName = ''
        fetchRandomDog().then(() => {
            displayDogImage(currentDogImage)
            breedName.innerText = prettyBreedName
            displayMoreDogsButton()
        })
    }

    const handleSubBreed = () => {
        let replacedHyphenBreed = currentBreed
        for (let i = 0; i < currentBreed.length; i++) {
            if (currentBreed[i] === '-') {
                return replacedHyphenBreed.slice(0,i) + '/' + replacedHyphenBreed.slice(i + 1)
            }
        }
    }

    const fetchDogByBreed  = async () => {
        if (isSubBreed) {
            await axios.get(`https://dog.ceo/api/breed/${handleSubBreed()}/images/random`)
                .then(res => {
                    currentDogImage = res.data.message
                }).catch(err => console.log(err))
        } else {
            await axios.get(`https://dog.ceo/api/breed/${currentBreed}/images/random`)
                .then(res => {
                    currentDogImage = res.data.message
                }).catch(err => console.log(err))
        }
    }

    randomDogButton.addEventListener('click', event => {
        event.preventDefault()
        handleDogButton()
    })

    moreButton.addEventListener('click', event => {
        event.preventDefault()
        fetchDogByBreed()
        .then(() => {
            displayDogImage(currentDogImage)
        })
    })

})