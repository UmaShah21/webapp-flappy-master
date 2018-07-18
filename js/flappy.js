// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
var rainbows = [];
var collectedRainbows = new Array(11).fill(0)

function preload() {
  game.load.image("playerImg", "../assets/unicorn.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.audio("music", "../assets/Happy Background Music 1 NO COPYRIGHT.ogg");
  game.load.image("pipeBlock","../assets/rainbowPipe.png");
  game.load.image("rainbow","../assets/rainbowImage.png");
  game.load.image("playerImg2","../assets/unicorn2.png");
}

function create() {
  game.stage.setBackgroundColor("#80E5FF");
  game.add.text(550, 20, "Good Luck!!", {font: "30px Chalkduster", fill: "#FFFFFF"});

  game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(spaceHandler);

  labelScore = game.add.text(130,20,'0', {font: "30px Chalkduster", fill: "#FFFFFF"});
  scoreText = game.add.text(20,20,'Score:', {font: "30px Chalkduster", fill: "#FFFFFF"});
  player = game.add.sprite(100, 200, "playerImg");


  game.physics.arcade.enable(player);
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
                     .onDown.add(moveRight);
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
                     .onDown.add(moveLeft);
  game.input.keyboard.addKey(Phaser.Keyboard.UP)
                     .onDown.add(moveUp);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
                    .onDown.add(moveDown);
  generatePipe();

  player.body.velocity.x = 0;
  player.body.gravity.y = 200;

  game.input.keyboard
      .addKey(Phaser.Keyboard.SPACEBAR)
      .onDown
      .add(playerJump);

  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
      pipeInterval,
      generatePipe
  );

  var rainbowInterval = 3.5;
  game.time.events
  .loop(rainbowInterval * Phaser.Timer.SECOND,
  generateRainbows);
}





function update() {
  game.physics.arcade.overlap(
    player,
              pipes,
              gameOver);

  if (player.y < 0 || player.y > 400) {
    gameOver();
  }


  for (var i = 0; i < rainbows.length; i++) {
          if(game.physics.arcade.overlap(player,rainbows[i])){
                updateScore();
            collectedRainbows[i] = 1;
            rainbows[i].destroy();
            rainbows.splice(i,1);
            //rainbowsPosition.splice(i,1)
          }
}

  if (score == 5) {
    changeBackground();
    player.body.velocity.x = 30;

  }

  if (score == 10) {
    changeBackgroundAgain();
    player.body.velocity.x = 60;

  }



}



function gameOver(){
  registerScore(score);
  game.state.restart();
  score = 0;
}

function clickHandler(event) {
  game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
  game.sound.play("score");
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}

function moveRight() {
  player.x += 10;
}

function moveLeft() {
  player.x -= 10;
}

function moveUp() {
  player.y -= 10;
}

function moveDown() {
  player.y += 10;
}

function generatePipe() {
  var gap = game.rnd.integerInRange(1 ,5);
  for (var count = 0; count < 8; count++) {
    if (count != gap && count != gap+1) {
      addPipeBlock(750, count * 50);
    }
  }
  changeScore();
}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -150;
}

function playerJump() {
  player.body.velocity.y = -100;
}

function generateRainbows() {
  var rainbow = game.add.sprite(750,20,"rainbow");
  rainbow.scale.y = 1;  rainbow.scale.x = 1;
  rainbows.push(rainbow);
  game.physics.arcade.enable(rainbow);
  rainbow.body.velocity.x = -80;
  rainbow.body.velocity.y = 20;
}

function updateScore() {
changeScore();
changeScore();
}

function changeBackground() {
  game.stage.setBackgroundColor("#FF99FF");
}

function changeBackgroundAgain() {
  game.stage.setBackgroundColor("#CCFFE6");
}
