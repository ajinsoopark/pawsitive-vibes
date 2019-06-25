document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body')
    const randomDog = document.getElementById('randomDog')
    const randomDogButton = document.getElementById('randomDogButton')
    let currentBreed
    let currentDogImage 


    const fetchRandomDog = async () => {
        await axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
            currentDogImage = res.data.message
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

    const sliceBreedName = (url) => {
        
    }

    const handleDogButton = () => {
        fetchRandomDog().then(() => {
            displayDogImage(currentDogImage)
            console.log(currentDogImage)
        })
    }

    randomDogButton.addEventListener('click', event => {
        event.preventDefault()
        handleDogButton()
    })

})