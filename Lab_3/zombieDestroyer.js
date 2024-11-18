const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const background = new Image();
background.src = 'images/board-bg.jpg';

const aim = new Image();
aim.src = 'images/aim.png';
let mouseX = 0;
let mouseY = 0;

background.onload = () => {
    drawBackground();
};

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousemove', (event) => {
   mouseX = event.clientX;
   mouseY = event.clientY; 
});

function drawAim() {
    ctx.drawImage(aim, mouseX - 90, mouseY - 90, 180, 180);
}

let lives = 3;
let score = 0;
let isGameActive = true;
let difficulty = 1;

const heartImage = new Image();
heartImage.src = 'images/full_heart.png';

const emptyHeartImage = new Image();
emptyHeartImage.src = 'images/empty_heart.png';

const zombieImage = new Image();
zombieImage.src = 'images/walkingdead.png';

let zombies = [];

class Zombie {
    constructor() {
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 312);
        this.scale = Math.random() * 0.5 + 0.5;
        this.width = 200 * this.scale;
        this.height = 312 * this.scale;
        this.speed = (Math.random() * 4 + 1) * difficulty;
        this.frameX = 0;
        this.frameCounter = 0;
    }
    draw() {
        ctx.drawImage(
            zombieImage,
            this.frameX * 200,
            0,
            200,
            312,
            this.x,
            this.y,
            this.width,
            this.height
        );

        this.animate();
    }

    animate() {
        this.frameCounter++;
        if (this.frameCounter%10 === 0) {
            this.frameX = (this.frameX +1) % 6;
        }
    }

    move() {
        this.x -= this.speed;
    }
}

let zombieSpawnInterval = 1500;
let spawnInterval = setInterval(() => {
    zombies.push(new Zombie());
}, zombieSpawnInterval);

function updateZombies() {
    for (let i=zombies.length-1; i>=0; i--) {
        const zombie = zombies[i];
        zombie.move();
        zombie.draw();

        if(zombie.x + zombie.width <0) {
            zombies.splice(i, 1);
            lives--;
            if(lives <= 0) {
                gameOver();
            }
        }
    }
}

canvas.addEventListener('click', (event) => {
    if(!isGameActive) return;

    const clickX = event.clientX;
    const clickY = event.clientY;

    let hit = false;

    for(let i=zombies.length-1; i>=0; i--) {
        const zombie = zombies[i];

        if  (clickX >= zombie.x &&
            clickX <= zombie.x + zombie.width &&
            clickY >= zombie.y &&
            clickY <= zombie.y + zombie.height
        ) {
            zombies.splice(i, 1);
            score += 20;
            hit = true;
            break;
        }
    }

    if(!hit) {
        score -= 5;
    }
})

function gameOver() {
    isGameActive = false;

    const popup = document.getElementById('gameOver');
    popup.style.display = 'block';

    const yourScore = document.getElementById('yourScore');
    yourScore.textContent = `Twój wynik: ${score.toString()}`;

    const sadMusic = document.getElementById('sadMusic');
    sadMusic.play();

    cancelAnimationFrame(animationId);

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        location.reload();
    });
}

function drawScoreboard() {
    ctx.font= '50px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';

    const formatedScore = String(score).padStart(10, '0');
    ctx.fillText(formatedScore, canvas.width-40, 60);

    for(let i=0; i<3; i++) {
        if (i<lives) {
            ctx.drawImage(heartImage, 20+i*50, 20, 40, 40);
        }
        else {
            ctx.drawImage(emptyHeartImage, 20+i*50, 20, 40, 40);
        }
        
    }
}

function increaseDifficulty() {
    difficulty += 0.1;

    clearInterval(spawnInterval);
    zombieSpawnInterval = Math.max(500, zombieSpawnInterval-100);
    spawnInterval = setInterval(() => {
        zombies.push(new Zombie());
    }, zombieSpawnInterval)
}

setInterval(increaseDifficulty, 10000);

let animationId;

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    updateZombies();
    drawScoreboard();
    drawAim();

    animationId = requestAnimationFrame(game);
}

game();