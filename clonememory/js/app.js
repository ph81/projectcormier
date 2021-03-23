
// Image array for our memory game

const cardsArray = [{
    'name': 'alison',
    'img': 'img/alison.jpg',
  },
  {
    'name': 'beth',
    'img': 'img/beth.jpg',
  },
  {
    'name': 'camila',
    'img': 'img/camila.jpg',
  },
  {
    'name': 'cosima',
    'img': 'img/cosima.jpg',
  },
  {
    'name': 'delphine',
    'img': 'img/delphine.jpg',
  },
  {
    'name': 'helena',
    'img': 'img/helena.jpg',
  },
  {
    'name': 'katja',
    'img': 'img/katja.jpg',
  },
  {
    'name': 'krystal',
    'img': 'img/krystal.jpg',
  },
  {
    'name': 'mk',
    'img': 'img/mk.jpg',
  },
  {
    'name': 'rachel',
    'img': 'img/rachel.jpg',
  },
  {
    'name': 'sarah',
    'img': 'img/sarah.jpg',
  },
  {
    'name': 'tony',
    'img': 'img/tony.jpg',
  },
];

//Duplicating array to create a match for each card
const gameGrid = cardsArray.concat(cardsArray);

 //Randomize grid on each load
 gameGrid.sort(() => 0.7 - Math.random());


 let firstOp = '';
 let secondOp = '';
 let count = 0;
 let previousTarget = null;

 // Moves
 const movesCounter = document.getElementById('moves');

 let moveCount = 0;
 movesCounter.innerHTML = moveCount;

 //Initializing timer
 let timer = document.getElementById('timer'),
     seconds = 0, minutes = 0, hours = 0,
     t;

 //WIN
 let win = 0;

 //Card functionality

 //adding delay: so the user can see what their selection was before the card is hidden again
 let delay = 1200;

// Grab the div with an id of root
const game = document.getElementById('game');

// Create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

// Append the grid section to the game div
game.appendChild(grid);

// For each item in the gameGrid (24 elements array)...
gameGrid.forEach(item => {
    const { name, img } = item;
    // Create card element with the name dataset
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
  
    // Create front of card
    const front = document.createElement('div');
    front.classList.add('front');
  
    // Create back of card 
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;
  
    // Append card to grid, and front and back to each card
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });

  // It's a match!

 const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

//Reset matches 
const resetMatches = () => {
 firstOp = '';
 secondOp = '';
 count = 0;
 previousTarget = null;

 var selected = document.querySelectorAll('.selected');
 selected.forEach(card => {
   card.classList.remove('selected');
 });

};

 //Every time a card is clicked, we add a border

 grid.addEventListener('click', event => {
   const clicked = event.target;

    //selecting only the divs inside the grid
 if (clicked.nodeName === 'section' || 
     clicked === previousTarget || 
     clicked.parentNode.classList.contains('selected') || 
     clicked.parentNode.classList.contains('match')
    ) { 
      return;
 }

 //Add selected class to the two cards selected at the time
  if (count < 2) {
    count++;
    if (count === 1) {
      //First Card
      // (parentNode == inner divs)
      firstOp = clicked.parentNode.dataset.name;
      console.log(firstOp);
      clicked.parentNode.classList.add('selected');
      moves();
    }
    else {
      //Second card
      secondOp = clicked.parentNode.dataset.name;
      console.log(secondOp);
      clicked.parentNode.classList.add('selected');
      moves();
    }
    // if both cards are selected
    if (firstOp !== '' && secondOp !== '') {
      //and both cards match
      if (firstOp === secondOp) {
        setTimeout(match, delay);
        //checking winning
        win++;
      }
      setTimeout(resetMatches, delay);
      
 
    }

    //WIN alert
    if (win === 12) {
      setTimeout(stopTimer, delay);
      //stopTimer();
      setTimeout(toggleModal, delay);
      //alert('You won!');
    }

    // set previous target
    previousTarget = clicked;
    
  }

 });

//Moves counter
 const moves = () => {
  moveCount++;
  console.log(moveCount);
  movesCounter.innerHTML = moveCount;

 };

//Timer 

const startTimer = () => {
  t = setTimeout(addSeconds, 1000);
};

const addSeconds = () => {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
          minutes = 0;
          hours++;
      }
  }
  
  timer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

  startTimer();
};

// Stop timer 
const stopTimer = () => {
  
  clearTimeout(t);
};

//Loading timer
window.onload = startTimer;

//Restart game

const restartGame = () => {
  window.location.reload(true);
};

//Reload game

let restart = document.getElementById('restart');

restart.addEventListener('click', restartGame);


//Modal

let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close-btn');
let totalTime = document.getElementById('totalTime');
let totalMoves = document.getElementById('totalMoves');
let playAgain = document.querySelector('.play-again');


const toggleModal = () => {
  modal.classList.toggle('show-modal');
  //display stats
  totalTime.textContent = timer.textContent;
  totalMoves.textContent = moveCount;
};


if (closeModal) {
  closeModal.addEventListener('click', toggleModal);
}

if (playAgain) {
  playAgain.addEventListener('click', () => {
    window.location.reload(true);
  });
}






