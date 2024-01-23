const form = document.getElementById('form')
const rawImages = document.getElementById('rawImages')
const body = document.querySelector('body')
const TTS = document.getElementById('altTxt')
const thumbnails = document.getElementById('thumbnails')
const next = document.getElementById('next')
const previous = document.getElementById('previous')
const txtDiv = document.getElementById('txtDiv')

let images = []
let imgIndex = 0

form.addEventListener('submit', function(e) {
    e.preventDefault()
    let imgQuery = e.target.input.value
    search(imgQuery)
    console.log(imgQuery)
})

next.addEventListener('click', function() {
    console.log('NEXT')
})

previous.addEventListener('click', function() {
    console.log('Previous')
})

async function search(searchParam) {
    let response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchParam}?orientation=landscape&client_id=6rfnZF6E-D2i5eNGx326prxPJT2P1JP71C-YrJvYpMM`)
    let data = await response.json()
    images = data.results
    // console.log(images[imgIndex])
    loadImgs(images[imgIndex])
    next.style.display = 'block'
    previous.style.display = 'block'
    txtDiv.style.display = 'none'
    // let img = document.createElement('img')
    // img.src = data.results[0].urls.raw
    // rawImages.appendChild(img)
}

function loadImgs(arrayImgs) {
    rawImages.innerHTML = ''
    thumbnails.innerHTML = ''
    console.log(arrayImgs)

    let imgTag = document.createElement('img')

    imgTag.src = arrayImgs.urls.raw
    imgTag.alt = arrayImgs.alt_description
    ttsAlt(arrayImgs.alt_description)
    console.log(imgTag)

    rawImages.appendChild(imgTag)
    ttsAlt(arrayImgs.alt_description)


    // apiImgs.forEach(img => {
    //     let imgs = document.createElement('img')
    //     imgs.src = img.urls.raw
    //     rawImages.appendChild(imgs)
    // })
    
    images.forEach(img => {
        let imgs = document.createElement('img')
        imgs.src = img.urls.raw

        thumbnails.appendChild(imgs)
    })
}


function ttsAlt(altTxt) {
    TTS.textContent = `Image description: ${altTxt}`
}