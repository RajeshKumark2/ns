// Get necessary elements from the DOM
const count = document.getElementById('count');
const head = document.getElementById('head');
const giftbox = document.getElementById('merrywrap');
const canvasC = document.getElementById('c');

const config = {
  birthdate: 'January 18, 2002',
  name: 'Ganesh',
  wishes: [
    'Happy Birthday, Ganesh!',
    'Wishing you all the joy in the world!',
    'Have a fantastic year ahead!',
  ],
};

function hideEverything() {
  head.style.display = 'none';
  count.style.display = 'none';
  giftbox.style.display = 'none';
  canvasC.style.display = 'none';
}

function setBackgroundGradient() {
  document.body.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
  document.body.style.height = '100vh';
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
}

hideEverything();
setBackgroundGradient();

const confettiSettings = { target: 'confetti' };
const confetti = new window.ConfettiGenerator(confettiSettings);
confetti.render();

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date(`${config.birthdate} 00:00:00`).getTime();
let x = setInterval(function () {
  let now = new Date().getTime(),
    distance = countDown - now;

  document.getElementById('day').innerText = Math.floor(distance / day);
  document.getElementById('hour').innerText = Math.floor(
    (distance % day) / hour
  );
  document.getElementById('minute').innerText = Math.floor(
    (distance % hour) / minute
  );
  document.getElementById('second').innerText = Math.floor(
    (distance % minute) / second
  );

  if (distance > 0) {
    head.style.display = 'initial';
    count.style.display = 'initial';
  } else {
    head.style.display = 'none';
    count.style.display = 'none';
    giftbox.style.display = 'initial';
    clearInterval(x);

    let merrywrap = document.getElementById('merrywrap');
    let box = merrywrap.getElementsByClassName('giftbox')[0];
    let step = 1;
    let stepMinutes = [2000, 2000, 1000, 1000];

    function init() {
      box.addEventListener('click', openBox, false);
      box.addEventListener('click', startSong, false);
      box.addEventListener('click', showfireworks, false);
    }

    function stepClass(step) {
      merrywrap.className = 'merrywrap';
      merrywrap.className = 'merrywrap step-' + step;
    }

    function openBox() {
      if (step === 1) {
        box.removeEventListener('click', openBox, false);
      }
      stepClass(step);
      if (step === 4) {
        return;
      }
      setTimeout(openBox, stepMinutes[step - 1]);
      step++;
    }

    function showfireworks() {
      canvasC.style.display = 'initial';
      setTimeout(anim, 1500);
    }

    function startSong() {
      const audio = new Audio('../files/Happy-Birthday-Instrumental.mp3');
      audio.loop = true;
      audio.play();
    }

    function showDynamicWishes() {
      let wishIndex = 0;
      const wishElement = document.getElementById('dynamicWishes');

      setInterval(() => {
        wishElement.innerText = config.wishes[wishIndex];
        wishIndex = (wishIndex + 1) % config.wishes.length;
      }, 3000);
    }

    showDynamicWishes();
    init();
  }

  if (distance < 0) {
    clearInterval(x);
    console.log('Happy birthday! Ganesh');
  }
}, second);
