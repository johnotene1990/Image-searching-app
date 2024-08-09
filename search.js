
const accessKey = 'vTuurK_dgPGLucRtK0pQfUW3ALB_UIkPqhCX8eBWGLk'; // Replace with your actual access key
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1;

// Function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {
    imagesContainer.innerHTML = '';

const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&
page=${pageNo}&client_id=${accessKey}`;

try {
const response = await fetch(url);
const data = await response.json();


if(data.results.length > 0){
    data.results.forEach(photo => {
        // Creating image div
        const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}"/>`;
        
        // Creating overlay
        const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');
        
        // Creating overlay text
        const overlayText = document.createElement('h3');
            overlayText.innerText = photo.alt_description;
        
            overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);
        
            imagesContainer.appendChild(imageElement);
        });
        
        if(data.total_pages ===pageNo){
            loadMoreBtn.style.disply = "none";
        }
        else{
            loadMoreBtn.style.disply = "block";
        }
}
else{
    imagesContainer.innerHTML = '<h2>No image found.</h2>';
    if(loadMoreBtn.style.disply === "block")
        loadMoreBtn.style.disply = "none";
}



} catch (error) {
    console.error('Error fetching images:', error);
    imagesContainer.innerHTML = '<h2>failed to fetching images. Please try again later.</h2>';
    }
};

// Adding Event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
    fetchImages(inputText);
    } else {
    imagesContainer.innerHTML = '<h2>Please enter a search query.</h2>';
    if(loadMoreBtn.style.disply === "block"){
        loadMoreBtn.style.disply = "none";
    }
    }
});

// Adding Event Listener to load more button to fetch more images
loadMoreBtn.addEventListener('click', () =>{
    fetchImages(searchInput.value.trim(), ++page);
})



// const acceskey = '';
// const searchForm = document.querySelector('form');
// const searchInput = document.querySelector('searchInput');
// const imagesContainer = document.querySelector('.images-container');


// // Function to fetch images using unsplash API
// const fetchImages = async (query) => {
//     imagesContainer.innerHTML = '';

//     const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&client_id=${acceskey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     // console.log(data)
//     data.results.forEach(photo => {
//         // creating image div
//         const imageElement = document.createElement('div');
//         imageElement.classList.add('imageDiv');
//         imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;


//         // creating overlay
//         const overlayElement = document.createElement('div');
//         overlayElement.classList.add('overlay');


//         // creeating overlay text
//         const overlayText = document.createElement('h3');
//         overlayText.innerText =`${photo.alt_description}`;

//         overlayElement.appendChild(overlayText);
//         imageElement.appendChild(overlayElement);

//         imagesContainer.appendChild(imageElement);
//     });
// }

// // Adding Event listner to search form
// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const inputText = searchInput.value.trim();
//     if (inputText !== '') {
//     fetchImages(inputText);
//     } else {
//     imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
//     }
//     });

// // searchForm.addEventListener('submit',(e)=>{
// //     e.preventDefault();
// //     const inputText = searchInput.value.trim();
// //     if(inputText !==''){
// //         fetchImages(inputText);
// //     }
// //     else{
// //         imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`
// //     }
// // });
