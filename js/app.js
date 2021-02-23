'use strict';

const imgs = [
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


const imgOne = document.getElementById('img-one');
const imgTwo = document.getElementById('img-two');
const imgThree = document.getElementById('img-three');
const imgContainer = document.getElementById('imgContainer');
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


function retrieve ()
{
  console.log(Bus.all);
  if(localStorage.length >0)
  {
    Bus.all = JSON.parse(localStorage.getItem("votes"));
    render();
  }
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
        const container = document.getElementById('resultList');
        const result = document.createElement('li');
        container.appendChild(result);
        result.textContent=`Votes are ${Bus.all[i].vote}, and Views are ${Bus.all[i].view}`;
    }
 
    imgContainer.removeEventListener('click', handleClick);
    chart();


  }
  }


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function chart(){
  const votes=[];
  const names=[];
  const views=[];

  var ctx = document.getElementById("myChart").getContext('2d');
  for (let i = 0; i < Bus.all.length; i++) {
  votes.push(Bus.all[i].vote);
  names.push(Bus.all[i].name);
  views.push(Bus.all[i].view);    
  }
  var chart= new Chart(ctx, {
    type:'bar',
    data: {
      labels: names,
      datasets: [{
        label:'Votes',
        background:'DarkCyan',
        borderColor: 'white',
        data:votes}, 
        {
          label:'Views',
        background:'rgb(134, 49, 49)',
        borderColor: 'white',
        data:views
        }

      ]
    },
  });
}