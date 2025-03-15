// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const polarBearImg = new Image();
const icebergImg = new Image();

// Game constants
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const GROUND_Y = canvas.height - 60;

// Game state
let isGameOver = false;
let score = 0;
let imagesLoaded = 0;

// Player object
const player = {
    x: 100,
    y: GROUND_Y,
    width: 48,
    height: 48,
    velocityY: 0,
    isJumping: false
};

// Array to store obstacles
let obstacles = [];

// Load handler
function handleImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        // Start game once both images are loaded
        gameLoop();
    }
}

// Set up image loading
polarBearImg.onload = handleImageLoad;
icebergImg.onload = handleImageLoad;

// Load the images
polarBearImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIyMCIgeT0iMTIiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTYiIHk9IjE2IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJibGFjayIvPjwvc3ZnPg==';
icebergImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBvbHlnb24gcG9pbnRzPSIxNiw4IDI0LDI0IDgsMjQiIGZpbGw9IndoaXRlIi8+PC9zdmc+';

// Game functions
function drawPlayer() {
    ctx.drawImage(polarBearImg, player.x, player.y, player.width, player.height);
}

function updatePlayer() {
    // Apply gravity
    player.velocityY += GRAVITY;
    player.y += player.velocityY;

    // Ground collision
    if (player.y > GROUND_Y) {
        player.y = GROUND_Y;
        player.velocityY = 0;
        player.isJumping = false;
    }
}

function jump() {
    if (!player.isJumping) {
        player.isJumping = true;
        player.velocityY = JUMP_FORCE;
    }
}

function spawnObstacle() {
    obstacles.push({
        x: canvas.width,
        y: GROUND_Y + 10,
        width: 32,
        height: 32,
        speed: 5
    });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacles[i].speed;

        // Remove obstacles that are off screen
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
            continue;
        }

        // Check for collision
        if (checkCollision(player, obstacles[i])) {
            isGameOver = true;
        }
    }
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.drawImage(icebergImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function checkCollision(player, obstacle) {
    // Add some padding to make collision detection more forgiving
    const padding = 8;
    return player.x + padding < obstacle.x + obstacle.width &&
           player.x + player.width - padding > obstacle.x &&
           player.y + padding < obstacle.y + obstacle.height &&
           player.y + player.height - padding > obstacle.y;
}

function drawGround() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, GROUND_Y + 40, canvas.width, 2);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px "Press Start 2P"';
    ctx.fillText(`Score: ${score}`, 20, 40);
}

function drawGameOver() {
    ctx.fillStyle = 'white';
    ctx.font = '48px "Press Start 2P"';
    ctx.fillText('Game Over!', canvas.width/2 - 200, canvas.height/2);
    ctx.font = '24px "Press Start 2P"';
    ctx.fillText('Press Space to Restart', canvas.width/2 - 200, canvas.height/2 + 40);
}

function resetGame() {
    player.y = GROUND_Y;
    player.velocityY = 0;
    player.isJumping = false;
    obstacles = [];
    score = 0;
    isGameOver = false;
    gameLoop();
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameOver) {
        drawGameOver();
        return;
    }

    // Update game objects
    updatePlayer();
    updateObstacles();

    // Spawn obstacles
    if (Math.random() < 0.02) {
        spawnObstacle();
    }

    // Draw everything
    drawGround();
    drawPlayer();
    drawObstacles();
    drawScore();

    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        if (isGameOver) {
            resetGame();
        } else {
            jump();
        }
    }
});
