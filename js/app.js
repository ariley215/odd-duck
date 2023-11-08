'use strict';
const leftImg = document.querySelector('section img:first-child');
const middleImg = document.querySelector('section img:nth-child(2)');
const lastImg = document.querySelector('section img:nth-child(3)');
const showResultsButton = document.querySelector('button');
const resultsContainer = document.querySelector('ul');
let workingPhotos = [];
let leftProduct = null;
let middleProduct = null;
let lastProduct = null;
let clickCtr = 0;
let maxClicks = 25;


function AssortedImage(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

let bag = new AssortedImage('bag', 'img/assets lab 11/bag.jpg');
let banana = new AssortedImage('banana', 'img/assets lab 11/banana.jpg');
let bathroom = new AssortedImage('bathroom', 'img/assets lab 11/bathroom.jpg');
let boots = new AssortedImage('boots', 'img/assets lab 11/boots.jpg');
let breakfast = new AssortedImage('breakfast', 'img/assets lab 11/breakfast.jpg');
let bubblegum = new AssortedImage('bubblegum', 'img/assets lab 11/bubblegum.jpg');
let chair = new AssortedImage('chair', 'img/assets lab 11/chair.jpg');
let cthulhu = new AssortedImage('cthulhu', 'img/assets lab 11/cthulhu.jpg');
let dogduck = new AssortedImage('dogduck', 'img/assets lab 11/dog-duck.jpg');
let dragon = new AssortedImage('dragon', 'img/assets lab 11/dragon.jpg');
let pen = new AssortedImage('pen', 'img/assets lab 11/pen.jpg');
let petsweep = new AssortedImage('petsweep', 'img/assets lab 11/pet-sweep.jpg');
let scissors = new AssortedImage('scissors', 'img/assets lab 11/scissors.jpg');
let shark = new AssortedImage('shark', 'img/assets lab 11/shark.jpg');
let sweep = new AssortedImage('sweep', 'img/assets lab 11/sweep.png');
let tauntaun = new AssortedImage('tauntaun', 'img/assets lab 11/tauntaun.jpg');
let unicorn = new AssortedImage('unicorn', 'img/assets lab 11/unicorn.jpg');
let watercan = new AssortedImage('watercan', 'img/assets lab 11/water-can.jpg');
let wineglass = new AssortedImage('wineglass', 'img/assets lab 11/wine-glass.jpg');

const photos = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass];

shuffleArray(photos);


// first image on the left
// second image in the middle
// third image on the right 
function renderPhotos() {
  // checkif clicks  has reached the max
  console.log(clickCtr);
  if (clickCtr == maxClicks) {
    showResultsButton.style.display = 'block'
  


    // disable the images
    leftImg.removeEventListener('click', handleLeftClick);
    middleImg.removeEventListener('click', handleMiddleClick);
    lastImg.removeEventListener('click', handleLastClick);
  }

  showResultsButton.addEventListener('click', handleViewResultsClick);

  if (workingPhotos.length <= 1) {
    workingPhotos = photos.slice();
    shuffleArray(workingPhotos);
  }

  // retrieves and removes the last item

  leftProduct = workingPhotos.pop();
  leftImg.setAttribute('src', leftProduct.src);

  middleProduct = workingPhotos.pop();
  middleImg.setAttribute('src', middleProduct.src);

  lastProduct = workingPhotos.pop();
  lastImg.setAttribute('src', lastProduct.src);


  leftProduct.views += 1;
  middleProduct.views += 1;
  lastProduct.views += 1;

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
  console.log(photos);
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
  renderResults();
  showResultsButton.style.display = 'none';
}


leftImg.addEventListener('click', handleLeftClick);
middleImg.addEventListener('click', handleMiddleClick);
lastImg.addEventListener('click', handleLastClick);

renderPhotos();


function renderResults() {
  for (let i = 0; i < photos.length; i++) {
    const currentPhoto = photos[i];
    let result = `${currentPhoto.name} had ${currentPhoto.views} views and was clicked ${currentPhoto.clicks} times.`;
    console.log(result);
    const liElement = document.createElement('li');
    resultsContainer.appendChild(liElement);
    liElement.textContent = result;

  }
}

