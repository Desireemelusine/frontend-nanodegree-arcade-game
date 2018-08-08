//////////// Enemies
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.canvasrow = 101;
    this.limit = this.canvasrow * 7;
    this.speed = Math.floor(Math.random() * 300);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

Enemy.prototype.start = function(){
    this.canvasrow = 101;
    this.limit = this.canvasrow * 7;
    this.speed = Math.floor(Math.random() * 325);
};

Enemy.prototype.update = function(dt) {
  this.start();
  if(this.x < this.limit){
    this.x += this.speed * dt;
  } else {
    this.x = -5;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//////////// Player
var Player = function(x, y) {
  this.canvasrow = 101;
  this.canvascol = 83;
  this.x = this.canvasrow * 3;
  this.y = (this.canvascol * 4) + 55;
  this.win = false;
  this.score = 0;
  this.lives = 3;
  this.gameOver = false;   // new initially set to false
  this.sprite = 'images/char-princess-girl.png';
  $("#livescount").text(this.lives);
  $("#scoreBar").text(this.score);
};

Player.prototype.start = function(){
  this.x = 303;
  this.y = 387;
  this.lives = 3;
  this.score = 0;
  $("#livescount").text(this.lives);
  $("#scoreBar").text(this.score);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (){
  if( this.y === -28 && this.x === 101){
    this.win = true;
    this.score += 10;
    $("#scoreBar").text(this.score);
    console.log("win!");
    this.gameOver = false;
    this.x = 202;
    this.y = 387;
    if(this.score >= 150){
      $("#winModal").modal("show");
      this.gameOver = true;
      this.start();
    }
  }
};

Player.prototype.checkCollisions = function (enemies){
  for( var enemy of allEnemies){
    if(this.y === enemy.y && (
      enemy.x < this.x + this.canvasrow / 2 &&
      enemy.x + enemy.canvasrow / 2 > this.x)){
      this.reset();
      console.log("collide!");
      this.score -= 5;
      this.lives -= 1;
      $("#livescount").text(this.lives);
      $("#scoreBar").text(this.score);
      if(this.lives === 0){
        $("#gameoverModal").modal("show");
        this.gameOver = true;
        this.start();
      }
    } else {
      this.update();
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
      if(this.x < this.canvasrow * 6){
        this.x += this.canvasrow;
        }
      break;
    case "up":
    if(this.y > 0){
      this.y -= this.canvascol;
      }
      break;
    case "down":
      if(this.y < this.canvascol * 4){
        this.y += this.canvascol;
        }
      break;
  }
};

Player.prototype.reset = function (){
  this.x = this.canvasrow * 3;
  this.y = (this.canvascol * 4) + 55;
};


///////////////////////GEMS
var Gems = function(x, y, sprite) {
    this.x = Math.floor(Math.random() * x);
    this.y = y;
    this.canvascol = 83;
    this.canvasrow = 101;
    this.limit = this.canvasrow * 7;
    this.speed = Math.floor(Math.random() * 150);
    this.sprite = sprite;
};

Gems.prototype.start = function(){
    this.canvasrow = 101;
    this.limit = this.canvasrow * 7;
    this.speed = Math.floor(Math.random() * 250);
};

Gems.prototype.update = function(dt) {
  this.start();
  if(this.x < this.limit){
    this.x += this.speed * dt;
  } else {
    this.x = -500;
  }
};

Gems.prototype.checkGems = function (Player) {
  //for( var gem of allGems){
    if(this.y === player.y && (
      player.x < this.x + this.canvasrow / 2 &&
      player.x + player.canvasrow / 2 > this.x
    )){
      //console.log("same row!");----- test
      if(this.sprite === 'images/Gem Blue.png'){
        this.x = 900;
        player.score += 20;
        $("#scoreBar").text(player.score);
      } else if(this.sprite === 'images/Gem Green.png'){
        this.x = 900;
        player.score += 30;
        $("#scoreBar").text(player.score);
      } else if(this.sprite === 'images/Gem Orange.png'){
        this.x = 900;
        player.score += 40;
        $("#scoreBar").text(player.score);
      } else if(this.sprite === 'images/Rock.png'){
        this.x = 900;
        player.score -= 50;
        player.reset();
        $("#scoreBar").text(player.score);
       }
     }
     // TEST console.log(this.y, player.y)
  // }
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

// Now instantiate your objects.
// Enemies
var enemy1 = new Enemy(-100, 138);
var enemy2 = new Enemy(0, 221);
var enemy3 = new Enemy(-250, 221);
var enemy4 = new Enemy(-300, 304);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

//Player
var player = new Player(0,0);

//Gems
var gem1 = new Gems(-50, 138, 'images/Gem Blue.png');
var gem2 = new Gems(-200, 221, 'images/Gem Green.png');
var gem3 = new Gems(-350, 304, 'images/Gem Orange.png');
var gem4 = new Gems(0, 55, 'images/Rock.png');
var allGems = [gem1, gem2, gem3, gem4];

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
