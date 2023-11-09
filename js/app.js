'use strict';
const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const leftImg = document.querySelector('section img:first-child');
const middleImg = document.querySelector('section img:nth-child(2)');
const lastImg = document.querySelector('section img:nth-child(3)');
const showResultsButton = document.querySelector('button');
let leftProduct = null;
let middleProduct = null;
let lastProduct = null;
let clickCtr = 0;
const maxClicks = 25;



function AssortedImage(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

AssortedImage.allPhotos = [];
AssortedImage.workingPhotos = [];

function initPhotos() {
  for (let photoName of productNames) {
    const currentPhoto = new AssortedImage(photoName, `img/assets lab 11/${photoName}.jpg`);
    AssortedImage.allPhotos.push(currentPhoto);
  }
}

// first image on the left
// second image in the middle
// third image on the right 
function renderPhotos() {
  // check if clicks  has reached the max
  console.log(clickCtr);
  if (clickCtr == maxClicks) {
    endVoting();
    return;

  }


  if (AssortedImage.workingPhotos.length < 3) {
    AssortedImage.workingPhotos = AssortedImage.allPhotos.slice();
    shuffleArray(AssortedImage.workingPhotos);
  }

  let leftOver = null;
  if (AssortedImage.workingPhotos.length === 1);
  leftOver = AssortedImage.workingPhotos[0];

  if (AssortedImage.workingPhotos.length <= 1)
  shuffleArray(AssortedImage.workingPhotos);

  if (leftOver) {
    removeItem(AssortedImage.workingPhotos, leftOver)
    AssortedImage.workingPhotos.push(leftOver)
  }


  // retrieves and removes the last item

  leftProduct = AssortedImage.workingPhotos.pop();
  leftImg.setAttribute('src', leftProduct.src);

  middleProduct = AssortedImage.workingPhotos.pop();
  middleImg.setAttribute('src', middleProduct.src);

  lastProduct = AssortedImage.workingPhotos.pop();
  lastImg.setAttribute('src', lastProduct.src);



  leftProduct.views += 1;
  middleProduct.views += 1;
  lastProduct.views += 1;

}

function removeItem(array, item) {
  const index =array.indexOf(item);
  if(index != -1) {
    array.splice(index,1);
  }
}


// disable the images
function endVoting() {
  leftImg.removeEventListener('click', handleLeftClick);
  middleImg.removeEventListener('click', handleMiddleClick);
  lastImg.removeEventListener('click', handleLastClick);

  showResultsButton.hidden = false;
  showResultsButton.addEventListener('click', handleViewResultsClick);
  showResultsButton.style.display = 'block'

}
function handleShowResultsButton() {
  renderResults();
  showResultsButton.style.display = 'none';

}
// Fisher-Yates shuffle array- ChatGPT 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function handleLeftClick() {
  leftProduct.clicks += 1;
  clickCtr++
  console.log(productNames);
  renderPhotos();
}
function handleMiddleClick() {
  middleProduct.clicks += 1;
  clickCtr++
  renderPhotos();
}
function handleLastClick() {
  lastProduct.clicks += 1;
  clickCtr++
  renderPhotos();
}

function handleViewResultsClick() {
  renderChart();
  showResultsButton.style.display = 'none';
}

function initEventListener() {
  leftImg.addEventListener('click', handleLeftClick);
  middleImg.addEventListener('click', handleMiddleClick);
  lastImg.addEventListener('click', handleLastClick);
}

function renderChart() {
  let photoNames = [];
  let photoLikes = [];
  let photoViews = [];


  for (let i = 0; i < AssortedImage.allPhotos.length; i++) {
    const currentPhoto = AssortedImage.allPhotos[i];
    const photoName = currentPhoto.name;
    const photoLikesCount = currentPhoto.clicks
    const photoViewsCount = currentPhoto.views;

    photoNames.push(photoName);
    photoLikes.push(photoLikesCount);
    photoViews.push(photoViewsCount);
  }

  /* refer to Chart.js > Chart Types > Bar Chart:
   https://www.chartjs.org/docs/latest/charts/bar.html
   and refer to Chart.js > Getting Started > Getting Started:
   https://www.chartjs.org/docs/latest/getting-started/ */
  const data = {
    labels: photoNames,
    datasets: [{
      label: 'Likes',
      data: photoLikes,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: photoViews,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}



function renderResults() {
  const resultsContainer = document.querySelector('ul');
  for (let currentPhoto of AssortedImage.allPhotos) {
    let result = `${currentPhoto.name} had ${currentPhoto.views} views and was clicked ${currentPhoto.clicks} times.`;
    const liElement = document.createElement('li');
    resultsContainer.appendChild(liElement);
    liElement.textContent = result;

  }
}

function startApp() {
  initPhotos();
  initEventListener();
  renderPhotos();


}

startApp();

