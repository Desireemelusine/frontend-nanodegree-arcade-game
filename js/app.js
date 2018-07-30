// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.canvasrow = 101;
    //this.speed = speed;
    //this.width = 75;
    //this.height = 75;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if(this.x < this.canvasrow * 5){
    this.x += 200 * dt;
  }
  else {
    this.x = 0;
  }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy1 = new Enemy(0, 83, 150)
var enemy2 = new Enemy(-100, 166, 100)
var enemy3 = new Enemy(-300, 249, 75)
var allEnemies = [enemy1, enemy2, enemy3];


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
  //handle(){}
  //reset(){}
}*/
//this.x = x * 2;
//this.y = y * 5;

var Player = function(x, y) {
  this.canvasrow = 101;
  this.canvascol = 83;
  this.x = this.canvasrow * 2;
  this.y = (this.canvascol * 4);
  this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (){
  for( var enemy of allEnemies){
    /*if (enemy.x < this.x + this.canvasrow &&
      enemy.x + enemy.canvasrow > this.x &&
      enemy.y < this.y + this.canvasrol &&
      enemy.canvasrol + enemy.y > this.y) {
       //this.x = 0; //&& this.y = 0
       console.log("collide!");
   }*/
    if(this.y === enemy.y && (
      enemy.x < this.x + this.canvasrow / 2 &&
      enemy.x + enemy.canvasrow / 4 > this.x /*&&
      enemy.y < this.y + this.canvasrol &&
      enemy.canvasrol + enemy.y > this.y*/)){
      this.reset();
      console.log("collide!");
    }
    if( this.y === 0){
      console.log("win!");
      //alert("win!");
      //this.reset();
    }
    console.log(this.y, enemy.y);
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
this.y = this.canvascol * 4;
};

var player = new Player(0,0);
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



/*Player.prototype.handleInput= function (){

}*/

// Now instantiate your objects.
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
