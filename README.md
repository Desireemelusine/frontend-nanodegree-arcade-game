frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

Welcome to "Sweet Crazy Ladybugs Game"

Introduction
This game was developed based on the frontend-nanodegree-arcade-game project.
The purpose of the project is to work with Object-oriented (class functions or class prototype functions) and the correct use of "this".

Explanation of the files
js/resources.js | Provided by Udacity nanodegree and not modified
js/engine.js | Provided by Udacity nanodegree and modified (added):
    canvas was modified
    line 86 87 88
    line 104 105 106
    render numCols modified
    line 149
    line 174 176 177
    resources.load extra images

js/engine.js | Provided by Udacity nanodegree but just the Enemy with few itens and prototype update and render
and line 244. The rest of the coding was developed by me with the help and collaboration of my mentor, udacity forum frontend group and a lot of research based on developer.mozilla.org, w3schools.com and bootstrap.
The Gems was an additional option that  I decided to do it to make it the game more fun and to pratice more the Object-oriented.

index.html |  Provided by Udacity nanodegree with the minimum requirement so the game could work.
              I modified (added): modal and some extra lines

css/style.css | Provided by Udacity nanodegree with nothing and modified (added)

The game
General Rules: Little Princess starts with 3 lives and 0 scores.
To win little princess has to make more at least 150p, cross the area where the Ladybugs are passing without touching them and reach the star at the end.
If she touches the Ladybug, she will lose 1 live and if she touches the stone, she will lose 50p.
To gain points little princess needs to touch:
  Blue Diamond: 20p
  Green Diamond: 30p
  Yellow Diamond: 40p
  Star: 5 p

  Are you ready?
  Let's play and have fun!







If she touches the lose 1 live
