const score = document.querySelector(".score");
const gameArea = document.querySelector(".gameArea");
const startScreen = document.querySelector(".startScreen");

document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);
startScreen.addEventListener("click", start);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function KeyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  console.log(keys);
}

function KeyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  console.log(keys);
  // console.log(e.key)
}

function IsCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  console.log(a,b)


  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function movlines() {
  let Lines = document.querySelectorAll(".lines");

  Lines.forEach(function (item) {
    if (item.y > 800) {
      item.y -= 830;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function endGame() {
  player.start = false
  startScreen.classList.remove("hide");
  startScreen.innerHTML = `Game Over <br> Press Here To Restart`;
  player.speed = 5;

}

function enemyCar(car) {
  let enemy = document.querySelectorAll(".enemy");

  enemy.forEach(function (item) {
    if (IsCollide(car, item)) {
      console.log("hit");
      endGame();

    }
    if (item.y > 800) {
      item.y = -400;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

let player = { speed: 5, carSpeed: 3, Score: 0 };

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();

  if (player.start) {
    movlines();
    enemyCar(car);
    if (keys.ArrowUp && player.y > (road.top = 200)) {
      player.y -= player.carSpeed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 150) {
      player.y += player.carSpeed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.carSpeed;
    }
    if (keys.ArrowRight && player.x < road.width - 70) {
      player.x += player.carSpeed;
    }
    window.requestAnimationFrame(gamePlay);
    // console.log(player.Score++);
    player.Score++;
    score.innerText = "Score " + player.Score;

  }
  car.style.top = player.y + "px";
  car.style.left = player.x + "px";
}

let My_Car = document.createElement("img");

function start() {
  setInterval(() => {
    console.log('asdasda', player.speed)
    player.speed++

  }, 20000)
  // gameArea.classList.remove("hide");
  startScreen.classList.add("hide");
  gameArea.innerHTML = ""
  player.start = true;
  player.Score = 0;
  window.requestAnimationFrame(gamePlay);
  let car = document.createElement("div");
  My_Car.setAttribute("src", "car2.png");
  car.setAttribute("class", "car");
  My_Car.setAttribute("class", "My_car");
  gameArea.appendChild(car);
  for (x = 0; x <= 4; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 162;
    // console.log(roadLine.y);
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }
  car.appendChild(My_Car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  // console.log(player);
  for (x = 0; x <= 3; x++) {
    let enemy = document.createElement("div");
    enemy.setAttribute("class", "enemy");
    enemy.y = (x + 1) * 350 * -1;
    enemy.style.left = Math.floor(Math.random() * 350) + "px";
    let enemyCarImg = document.createElement('img');
    if (Math.round(Math.random() * 4) == 0 || Math.round(Math.random() * 3) == 1) {
      enemyCarImg.removeAttribute('src');
      enemyCarImg.src = "car1.png";
      enemy.appendChild(enemyCarImg);
    }
    else {
      enemyCarImg.removeAttribute('src');
      enemyCarImg.src = "car2.png";
      enemy.appendChild(enemyCarImg);
    }
    if (Math.round(Math.random() * 4) == 2 || Math.round(Math.random() * 3) == 3) {
      enemyCarImg.removeAttribute('src');
      enemyCarImg.src = "car3.png";
      enemy.appendChild(enemyCarImg);
    }
    else {
      enemyCarImg.removeAttribute('src');
      enemyCarImg.src = "car4.png"
      enemy.appendChild(enemyCarImg);
    }
    if (Math.round(Math.random() * 4) == 4) {
      enemyCarImg.removeAttribute('src');
      enemyCarImg.src = "car5.png"
      enemy.appendChild(enemyCarImg);
    }
    enemy.style.top = enemy.y + "px";
    gameArea.appendChild(enemy);
  }
}

// let Conditons = { lvl1: false, lvl2: false, lvl3: false }

let SelectCar = document.querySelector('.selectCar');
SelectCar.style.height = "35px"

function SelectMyCar() {

  if (SelectCar.style.height === "250px") {
    SelectCar.style.height = "35px";
  }
  else {
    SelectCar.style.height = "250px";
  }
}

function GetCar(x) {
  if (x == 1) {
    My_Car.removeAttribute("src")
    My_Car.src = 'car2.png'
  }
  if (x == 2) {
    My_Car.removeAttribute("src")
    My_Car.src = 'car8.png'
  }
}



