// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.canvasrow = 101;
    this.limit = this.canvasrow * 5;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
Enemy.prototype.update = function(dt) {
  if(this.x < this.limit){
    this.x += this.speed * dt;
  }
  else {
    this.x = 0;
  }
};
// new reset button
Enemy.prototype.reset = function (){
  this.speed = Math.floor(Math.random() * 200);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Abaixo apresento uma outra opção de OOP
/*class Player {
  constructor(){
    this.x = 0;
    this.y = 0;
    //this.width = 75;
    //this.height = 75;
    this.sprite = 'images/char-boy.png';
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}*/


var Player = function(x, y) {
  this.canvasrow = 101;
  this.canvascol = 83;
  this.x = this.canvasrow * 2;
  this.y = (this.canvascol * 4) + 55;
  this.win = false;
  this.score = 0; //new
  this.lives = 3; //new
  this.gameOver = false;   // new initially set to false
  this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (){
  if( this.y === -28 && this.x === 101){
    this.win = true;
    this.score += 10;
    console.log("win!");
  }
};

Player.prototype.checkCollisions = function (){
  for( var enemy of allEnemies){
    if(this.y === enemy.y && (
      enemy.x < this.x + this.canvasrow / 2 &&
      enemy.x + enemy.canvasrow / 2 > this.x /*&&
      enemy.y < this.y + this.canvasrol &&
      enemy.canvasrol + enemy.y > this.y*/)){
      this.reset();
      console.log("collide!");
      player.lives -= 1;
    }
  }
};

Player.prototype.handleInput = function (input){
  switch (input) {
    case "left":
      if(this.x > 0){
        this.x -= this.canvasrow;
        }
      break;
    case "right":
      if(this.x < this.canvasrow * 4){
        this.x += this.canvasrow;
        }
      break;
    case "up":
    if(this.y > 0){
      this.y -= this.canvascol;
      }
      break;
    case "down":
      if(this.y < this.canvascol * 5){
        this.y += this.canvascol;
        }
      break;
  }
};

Player.prototype.reset = function (){
  this.x = this.canvasrow * 2;
  this.y = (this.canvascol * 4) + 55;
  this.score = 0; //new
  this.lives = 3; //new
  this.gameOver = false;   // new initially set to false
};

/*
/////// scores and lives
var score = "Score: %data%";
var scoredata = document.getElementById("score");
var scoredata.textContext = score.replace("%data%", this.score);
var lives = "Lives: %data%";
var livesdata = document.getElementById("lives");
var livesdata.textContext = score.replace("%data%", this.lives);

///// Win the game
if(this.score >=10 && !=this.gameOver){
  //$("#winModal").modal("show");
  console.log("You Won!")
  this.gameOver = true;
}

//////lost game
if(player.lives <= 0 && !=this.gameOver){
  //$("#lostModal").modal("show");
  console.log("You Lost!");
  this.gameOver = true;
}
*/

////////////////////////////////////////////////////////////////////////////////////////

var Gems = function(x, y, sprite) {
  //var gemSprite = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
  //this.sprite = gemSprite[Math.floor(Math.random()* gemSprite.length)];
    this.x = x;
    this.y = y;
    this.canvasrow = 20;
    this.canvascol =  25;
    this.sprite = sprite;
    //this.x = Math.floor(Math.random() * (450));
    //this.y = Math.floor(Math.random() * (350));
};

Gems.prototype.checkGems = function() {
  for( var gem of allGems){
    if(this.y === player.y && (
      player.x < this.x + this.canvasrow / 2 &&
      player.x + player.canvasrow / 2 > this.x //&&
      //enemy.y < this.y + this.canvasrol &&
      //enemy.canvasrol + enemy.y > this.y
    )){
      //this.reset();
      console.log("gem!");
      if(this.sprite === 'images/Gem Blue.png'){
        player.score += 20;
      }
      else if(this.sprite === 'images/Gem Green.png'){
        player.score += 30;
      }
      else if(this.sprite === 'images/Gem Orange.png'){
        player.score += 40;
      }

      /*
          player.score += 40;
        }
        this.reset();*/
     }
   }
  };

Gems.prototype.update = function() {
    this.checkGems();
  };


// Draw the enemy on the screen, required method for game
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};





Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* explicação:no update é quando inserimos o collision porque será exatamente a função
que  terá que fazer a cada vez que se encontram.
do if (){} fórmula montada que foi substituida e que basicamente marca as extremidades
e os as dimensões de cada retângulo e o que fazer ao se encontrarem.
O ponto mais importante aqui é o enemy.x = eu não poderia colocar Enemy.x porque estaria
fora do escopo, ou seja qualquer atualização do fora do Player.prototype.update , não seria
dentro dele. Sendo assim, o  function () é como a porta de conexão com o mundo externo e o mundo interno
lá eu coloco um parametro , neste caso o enemy que eu Désirée determinei que irá se chamar dessa forma
e que se refere ao Enemy.x . Ou seja qualquer modifacação fora do Player.prototype.update, será atualizado
automaticamente. Agora a pergunta é: Como avisar ao programa que enemy é na verdade Enemy?
para fazer a ligação eu vou no engine.js( arquivo já criado pela Udacity) e na linha 94 function updateEntities
eu encontro a relação e é onde ele chama o update function é o player.update() que colocamos o parametro
enemy. o player.update(enemy) está dentro do allEnemies.  All enemies por sua vez está no app.js e linka
com Enemy. Voilà! Tudo conectado.
 */
/*Player.prototype.update = function(enemy){
  if (enemy.x < this.x + this.canvasrow &&
    enemy.x + enemy.canvasrow > this.x &&
    enemy.y < this.y + this.canvasrol &&
    enemy.canvasrol + enemy.y > this.y) {
     this.x = 0; //&& this.y = 0
     console.log("You lost!");
 }*/

// Now instantiate your objects.
// Enemies
var enemy1 = new Enemy(-100, 138, 120);
var enemy2 = new Enemy(0, 221, 90);
var enemy3 = new Enemy(-250, 221, 90);
var enemy4 = new Enemy(-300, 304, 65);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

//Player
var player = new Player(0,0);

//Gems
var gem1 = new Gems(0, 304, 'images/Gem Blue.png');
var gem2 = new Gems(0, 221, 'images/Gem Green.png');
var gem3 = new Gems(0, 138, 'images/Gem Orange.png');
var allGems = [gem1, gem2, gem3];



// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
