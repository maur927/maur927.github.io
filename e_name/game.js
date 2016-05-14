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
    enemyImage = loadImage("enemy.png");
    litSconceImage = loadImage("torch1.png");
    empoweredPlayerImage = loadImage("empoweredPlayer.png");
}

function setup() {
    createCanvas(500, 500);
    for (var i=0;i<8;i++) {
        sconce = createSprite(random(50, 450), random(50, 450), 25, 25);
        sconce.addImage(sconceImage);
        sconces.push(sconce);
    }
    player = createSprite(width/2, height/2, 25, 25);
    player.addImage(playerImage);
    setupOscillator();

}

function draw() {
     if (isGameOver) {
        gameOver()
    }   else {
        background(0, 255, 120);
        
        if (keyDown(RIGHT_ARROW) && player.position.x < width - player.width/2) {
            player.position.x += 2;
        }
        
        if (keyDown(LEFT_ARROW) && player.position.x > 0 + player.width/2) {
            player.position.x -= 2;
        }
        
        if (keyDown(UP_ARROW) && player.position.y > 0 + player.height/2) {
            player.position.y -= 2;
        }
        
        if (keyDown(DOWN_ARROW) && player.position.y < height - player.height/2) {
            player.position.y += 2;
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
            enemies[i].position.x += random(-3,3);
            enemies[i].position.y += random(-3,3);
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
    playMusic();

}

function spawn_enemy(x, y) {
    enemy = createSprite(x, y, 25, 25);
    enemies.push(enemy);
    enemy.addImage(enemyImage);
    enemy.rotationSpeed = -4.0;
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

//Music
var index = 0;
//thank you bach
var song = [ 
  { note: 64, duration: 200 },  
  { note: 66, duration: 200 },  
  { note: 67, duration: 400 },  
  { note: 66, duration: 200 }, 
  { note: 64, duration: 200 },  
  { note: 63, duration: 400 },  
  { note: 64, duration: 200 },  
  { note: 66, duration: 200 },
  { note: 59, duration: 400 },
  { note: 61, duration: 200 },
  { note: 63, duration: 200 },
  { note: 64, duration: 400 },
  { note: 62, duration: 200 },
  { note: 60, duration: 200 },
  { note: 59, duration: 400 },
  { note: 57, duration: 200 },
  { note: 55, duration: 200 },
  { note: 54, duration: 400 },
  { note: 55, duration: 200 },
  { note: 57, duration: 200 },
  { note: 59, duration: 200 },
  { note: 57, duration: 200 },
  { note: 55, duration: 200 },
  { note: 54, duration: 200 },
  { note: 52, duration: 800 }
];

var trigger = 0;
var autoplay = true;
var osc;


// ADD THIS TO BOTTOM OF FILE

function setupOscillator() {
  // A triangle oscillator
  osc = new p5.TriOsc();
  osc.start();
  osc.amp(0);
}

function playMusic() {
  if (autoplay && millis() > trigger){
    playNote(song[index].note, song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index = (index+1)%song.length;
  }
}

function mouseClicked() {
  autoplay = !autoplay;
}

function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);
  
  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}