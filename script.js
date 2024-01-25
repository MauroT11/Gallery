const form = document.getElementById('form')
const rawImages = document.getElementById('rawImages')
const body = document.querySelector('body')
const TTS = document.getElementById('altTxtDiv')
const thumbnails = document.getElementById('thumbnails')
const next = document.getElementById('next')
const previous = document.getElementById('previous')
const txtDiv = document.getElementById('txtDiv')
const nextImg = document.getElementById('nextImg')


let images = []
let imgIndex = 0
let nextImgIndex = 1

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let imgQuery = e.target.input.value
    search(imgQuery)
})

next.addEventListener('click', function() {
    console.log('NEXT')
    if (images.length > 0) {
        imgIndex++
        nextImgIndex++
        loadImgs(images[imgIndex])
        loadNextImg(images[nextImgIndex])
    } else if (images.length < 10) {
        console.log('NOTHING NEXT')
    }
})

previous.addEventListener('click', function() {
    console.log('Previous')
    if (images.length > 1) {
        imgIndex--
        loadImgs(images[imgIndex])
    } else if (images.length == 0) {
        console.log('NOTING')
    }
})

async function search(searchParam) {
    console.log(searchParam)
    let response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchParam}&orientation=landscape&client_id=6rfnZF6E-D2i5eNGx326prxPJT2P1JP71C-YrJvYpMM`)
    let data = await response.json()
    images = data.results
    // nImg = data.results[imgIndex++]
    
    loadImgs(images[imgIndex])

    // DISPLAYS BUTTONS AND HIDES HEADER TEXT AFTER SEARCHING PHOTOS
    next.style.display = 'block'
    previous.style.display = 'block'
    txtDiv.style.display = 'none'
    TTS.style.display = 'flex'
    thumbnails.style.display = 'flex'
    body.style.backgroundColor = 'black'
}

// DISPLAYS IMAGES TO THE SCREEN, THUMBSNAILS AND ASSIGNS ALT TEXT TO A CALLBACK FUNCTION
function loadImgs(arrayImgs) {
    rawImages.innerHTML = ''
    thumbnails.innerHTML = ''
    // console.log(arrayImgs)

    let imgTag = document.createElement('img')

    // IMG TO DISPLAY
    imgTag.src = arrayImgs.urls.raw
    imgTag.alt = arrayImgs.alt_description
    // console.log(imgTag)

    display(imgTag)
    ttsAlt(arrayImgs.alt_description)

    
    // RENDERS ALL PHOTOS FROM FETCH AS THUMBNAILS AT THE TOP OF THE SCREEN
    images.forEach(img => {
        let imgs = document.createElement('img')
        let imgRaw = document.createElement('img')

        imgs.src = img.urls.thumb
        imgs.alt = img.alt_description

        imgRaw.src = img.urls.raw

        thumbnails.appendChild(imgs)

        imgs.addEventListener('click', () => {
            display(imgRaw)
            ttsAlt(img.alt_description)
        })

        
    })
}

function loadNextImg(arrNextImg) {

    let nextImgTag = document.createElement('img')
    // LOADS NEXT IMG OFF SCREEN
    nextImgTag.src = arrNextImg.urls.raw
    console.log(nextImgTag)

    nextImg.appendChild(nextImgTag)
}

function display(source) {
    rawImages.innerHTML = ''

    rawImages.appendChild(source)
}

// DISPLAYS ALT TEXT TO HTML
function ttsAlt(altTxt) {
    TTS.textContent = `Image description: ${altTxt}`.toUpperCase()
}