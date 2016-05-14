var player;
var sconces = [];
var enemies = [];
var sconces_found = 0;
var isInvincible = false;
var isGameOver;
var isWon = false;

function preload() {
    playerImage = loadImage("egg.png");
    sconceImage = loadImage("sconce.png");
    enemyImage = loadImage("torch1.png");
    litSconceImage = loadImage("torch1.png");
    empoweredPlayerImage = loadImage("empoweredPlayer.png");
}

function setup() {
    createCanvas(500, 500);
    player = createSprite(width/2, height/2, 25, 25);
    for (var i=0;i<8;i++) {
        sconce = createSprite(random(50, 450), random(50, 450), 25, 25);
        sconce.addImage(sconceImage);
        sconces.push(sconce);
    }
    player.addImage(playerImage);
}

function draw() {
     if (isGameOver) {
        gameOver()
    }   else {
        background(0, 255, 120);
        
        if (keyDown(RIGHT_ARROW) && player.position.x < width - player.width/2) {
            player.position.x += 3;
        }
        
        if (keyDown(LEFT_ARROW) && player.position.x > 0 + player.width/2) {
            player.position.x -= 3;
        }
        
        if (keyDown(UP_ARROW) && player.position.y > 0 + player.height/2) {
            player.position.y -= 3;
        }
        
        if (keyDown(DOWN_ARROW) && player.position.y < height - player.height/2) {
            player.position.y += 3;
        }
        
        for (var i=0;i<8;i++) {
            if (sconces[i].overlap(player)) {
                if (i == 0 || i ==1) {
                    sconces[i].addImage(litSconceImage);
                    sconces_found ++;
                }
                else {
                    spawn_enemy(sconces[i].position.x, sconces[i].position.y)
                    isInvincible = true
                    setTimeout(notInvincible, 750)
                }
                removeSprite(sconces[i]);
            }
        }
        
        for (var i=0;i<enemies.length;i++) {
            enemies[i].position.x += random(-2,2);
            enemies[i].position.y += random(-2,2);
        }
        for (var i=0;i<enemies.length;i++) {
            if (enemies[i].overlap(player) && isInvincible == false) {
                isGameOver = true;
                console.log("Collide")
            }
        }
        
        if (sconces_found == 2) {
            isWon = true;
            player.scale += 0.05;
            for (var i=0;i<enemies.length;i++) {
                removeSprite(enemies[i]);
            }
        }
        
        if (sconces_found == 2) {
            player.addImage(empoweredPlayerImage);
        }
        drawSprites()
    }
}

function spawn_enemy(x, y) {
    enemy = createSprite(x, y, 25, 25);
    enemies.push(enemy);
}

function notInvincible() {
    isInvincible = false
    console.log("No longer invincible")
}

function gameOver() {
    background(0);
    textAlign(CENTER);
    fill("white");
    text("Game Over!", width/2, height/2);
}