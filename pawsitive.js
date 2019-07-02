document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    const randomDog = document.getElementById('randomDog')
    const randomDogButton = document.getElementById('randomDogButton')
    const breedName = document.getElementById('breedName')
    const moreButton = document.getElementById('moreDogs')

    let currentBreed
    let currentDogImage 
    let prettyBreedName = ''

    const sliceBreedName = (url) => {
        const startingIndex = 30
        let endingIndex

        for (let i = startingIndex; i < url.length; i++) {
            if (url[i] === '/') endingIndex = i
        }
        currentBreed = url.slice(startingIndex, endingIndex)
    }

    const beautifyName = (name) => {
        for (let i = 0; i < name.length; i++) {
            if (name[i] === '-') {
                prettyBreedName += ' '
            } else if (i === 0 || prettyBreedName[prettyBreedName.length - 1] === ' ') {
                prettyBreedName += name[i].toUpperCase()
            } else {
                prettyBreedName += name[i]
            }
        }
    }

    const displayMoreDogsButton = () => {
        moreButton.innerText = `More ${prettyBreedName}s`
        moreButton.style.visibility = 'visible'
    }

    const fetchRandomDog = async () => {
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
            const oldTag = randomDog.childNodes[1]
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

    randomDogButton.addEventListener('click', event => {
        event.preventDefault()
        handleDogButton()
    })

})