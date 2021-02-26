'use strict';

var imgs = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
  'chair.jpg'
];


var imgOne = document.getElementById('img-one');
var imgTwo = document.getElementById('img-two');
var imgThree = document.getElementById('img-three');
var imgContainer = document.getElementById('imgContainer');
let totalClicks = 0;
let checkArr = [];


function Bus(name) {
  this.name = name.split('.')[0];
  this.path = `./img/${name}`;
  this.view = 0;
  this.vote = 0;
  Bus.all.push(this);
}

Bus.all=[];

for (let i = 0; i < imgs.length; i++) {
 new Bus(imgs[i]);
}

function render() {

  let imgOneArr = Bus.all[randomNumber(0, Bus.all.length - 1)];
  let imgTwoArr = Bus.all[randomNumber(0, Bus.all.length - 1)];
  let imgThreeArr = Bus.all[randomNumber(0, Bus.all.length - 1)];
console.log(imgOneArr);
  while (imgOneArr.name === imgTwoArr.name || imgTwoArr.name === imgThreeArr.name || imgThreeArr.name === imgOneArr.name || checkArr.includes(imgOneArr) ||
  checkArr.includes(imgTwoArr) || checkArr.includes(imgThreeArr)) {

   imgOneArr = Bus.all[randomNumber(0, Bus.all.length - 1)];
   imgTwoArr = Bus.all[randomNumber(0, Bus.all.length - 1)];
   imgThreeArr = Bus.all[randomNumber(0, Bus.all.length - 1)];
  }
  checkArr=[];
  checkArr.push(imgOneArr);
  checkArr.push(imgTwoArr);
  checkArr.push(imgThreeArr);

  imgOne.src=imgOneArr.path;
  imgTwo.src=imgTwoArr.path;
  imgThree.src=imgThreeArr.path;

  imgOne.alt=imgOneArr.name;
  imgTwo.alt=imgTwoArr.name;
  imgThree.alt=imgThreeArr.name;

  imgOne.title=imgOneArr.name;
  imgTwo.title=imgTwoArr.name;
  imgThree.title=imgThreeArr.name;

  imgOneArr.view++;
  imgTwoArr.view++;
  imgThreeArr.view++;

}


render();




imgContainer.addEventListener('click', handleClick);


function handleClick(event) {

  if (event.target.id !== imgContainer) {
    for (let i = 0; i < Bus.all.length; i++) {
        if(Bus.all[i].name === event.target.title){
            Bus.all[i].vote++;
            totalClicks++;   
    }
    }
    render();
    
  } 
  if (totalClicks == 25) {

    for (let i = 0; i < Bus.all.length; i++) {
        var container = document.getElementById('resultList');
        var result = document.createElement('li');
        container.appendChild(result);
        result.textContent=`Votes are ${Bus.all[i].vote}, and Views are ${Bus.all[i].view}`;
    }
 
    imgContainer.removeEventListener('click', handleClick);


  }
  }


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
