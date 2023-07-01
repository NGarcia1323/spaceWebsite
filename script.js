key = 'BHjMJOB3xoB3rqfMEAjHFuachbwBNaNV82KYux9W';
var imgURL;
fetch('https://api.nasa.gov/planetary/apod?api_key='+key)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the returned data
    console.log(data);
    imgURL = data.url;
    info = data.explanation;
    console.log(imgURL)
  })
  .then(function(){
    displayPhotofDay();
    PhotoOfDayExplanation();
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

function displayPhotofDay(){
  let image1 = document.getElementById("dayPhoto");
  image1.src = imgURL;
}
function PhotoOfDayExplanation(){
  let explanation = document.getElementById('explain');
  explanation.textContent = info;
}

const today = new Date();
const dayBefore = new Date();
dayBefore.setDate(today.getDate() - 1);

// Get the date from a week before

// Formatting the dates as strings in YYYY-MM-DD format
const formatDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const todayString = formatDateString(today);
const dayBeforeString = formatDateString(dayBefore)

fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + todayString + '&end_date=' + todayString + '&api_key=' + key)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
  // Process the returned data
  console.log(data);
  asteroids = data.near_earth_objects[todayString];
  var itemList = document.getElementById('itemList');
  for (var i = 0; i < asteroids.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = asteroids[i].name + ' Hazardous: ' + asteroids[i].is_potentially_hazardous_asteroid;
    itemList.appendChild(listItem);
  }
});

const imageUrls = [];

fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + dayBeforeString + '&api_key=' + key)
  .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
   // Process the returned data
   const imageUrls = [];
   for (let i = 0; i < 6; i++) {
     imageUrls.push(data.photos[i].img_src);
   }
   createGallery(imageUrls);
 })
 .catch(error => {
   console.error('Error:', error);
 });

function createGallery(imageUrls) {
  const galleryContainer = document.getElementById('gallery');

  let currentRow;
  imageUrls.forEach((url, index) => {
    if (index % 3 === 0) {
      currentRow = document.createElement('div');
      currentRow.classList.add('gallery-row');
      galleryContainer.appendChild(currentRow);
    }

    const img = document.createElement('img');
    img.src = url;
    img.classList.add('gallery-image'); // Add a class for styling

    currentRow.appendChild(img);
  });
}