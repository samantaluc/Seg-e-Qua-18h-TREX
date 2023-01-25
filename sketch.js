var ground, groundImage; //variavel para o chão 28/12
var invisibleGround; //variavel para o chão invisivel 02/01
var trex ,trex_running; //variaveis para o trex 28/12
var cloud, cloudImage; //variavel para a nuvem 04/01
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6; 
//variavel para carregar as imagens dos obstaculos 09/01
var score; //variavel para a pontuação 11/01
var PLAY = 1; //variavel do jogo no estado de Jogar com valor para troca (switch) 11/01
var END = 0; //variavel do jogo no estado de Final com valor para troca (switch) 11/01
var gamestate = PLAY; //variavel de Estado de Jogo, sendo a inicial de Jogar 11/01

var clouds; //variavel para grupo de nuvens 16/01
var obstacles; //variavel para o grupo de obstáculos 16/01

var gameOver, gameOverImage; //variavel para o fim de jogo 16/01

var trex_collided; //variavel para o trex assustado 18/01

var restart, restartImg; //variavel para reiniciar 23/01

var jumpSound , checkPointSound, dieSound; //variaveis para os Sons do jogo 23/01

function preload(){ //função que vai carregar os arquivos (jpg, png, mp3...) pro nosso jogo 28/12
  //carrega a animação para o trex correndo com os arquivos
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  //carrega a animação do trex assustado 18/01
  trex_collided = loadAnimation("trex_collided.png","trex_collided.png");
  //carrega a imagem do chão
  groundImage = loadImage("ground2.png");
  //carrega a imagem da nuvem 04/01
  cloudImage = loadImage("cloud.png");
   //imagens para os obstáculos 09/01
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  //imagem para o fim de jogo 16/01
  gameOverImage = loadImage("gameOver.png");
  //imagem para reiniciar o jogo 23/01
  restartImg = loadImage("restart.png");
  // carregar som 23/01
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkpoint.mp3");
}

function setup(){ //função que vai configurar o que fazemos nos sprites 28/12
  createCanvas(600,200);
  //crie um sprite de trex
  trex = createSprite(50, 180, 20, 50);
  //adicionar a animação do trex_running pro nosso sprite
  trex.addAnimation("running",trex_running);
  //adicionar a animação do trex_collided 18/10
  trex.addAnimation("collide", trex_collided);
  //mudar a escala da imagem
  trex.scale = 0.5;
  //definir a posição inicial no eixo horizontal 28/12
  trex.x = 50;
   //criar o chão (ground) 28/12
  ground = createSprite(200,180,400,20);
  //adiciona a imagem ao chão 28/12
  ground.addImage("ground",groundImage);
  //a posição x do chão vai ser igual a metade da largura dele, ou seja, 400/2 . 28/12
  ground.x = ground.width /2;
  //a velocidade que o chão se move no eixo x 28/12
  ground.velocityX = -4;
  //criar o chão invisivel 02/01
  invisibleGround = createSprite(200,190,400,20);
  //sprite.visible escolhe a visibilidade. True = aparece. False = desaparece 02/01
  invisibleGround.visible = false;
  //pontuação inicia em 0 11/01
  score = 0;
  //define os grupos para os objetos 16/01
  clouds = new Group();
  obstacles = new Group();
  //cria o sprite de Fim de Jogo 16/01
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
 
  //define o tamanho e o tipo do colisor do trex 18/01
  trex.setCollider("circle", 0, 0, 40);
  //define se o colisor irá ser visivel. True = Sim, False = Não 18/01
  trex.debug = false;

  //cria o sprite de Reiniciar 23/01
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.5;
}
 
function draw(){ //função que vai desenhar na nossa tela 28/12
  background("white");
  //adiciona o texto da pontuação 11/01
  text("Pontuação: " + score, 500,50);
  //adição dos estados de jogo 11/01
  if (gamestate === PLAY){
  //calcula a pontuação usando o total de quadros gerados 11/01
    score = score+ Math.round(frameCount/60);
  //pular quando a tecla espaço for pressionada 28/12 e somente quando estiver entre 100 e 200 02/01
    if(keyDown("space") && trex.y >= 100) {
     trex.velocityY = -10;
     jumpSound.play(); // adiciona o som quando pula 23/01
    }
  //ter uma gravidade puxando ele ao chão 28/12
    trex.velocityY = trex.velocityY + 0.8
  //chama a função de gerar nuvens 04/01
    spawnClouds(); 
  //chama a função de gerar obstáculos 09/01
   spawnObstacles();
  //define a visibilidade do sprite 16/01
   gameOver.visible = false;
   restart.visible = false; // 23/01
  //condição para trocar para o modo do estado de Jogo FIM/END 11/01
   if(obstacles.isTouching(trex)){
    gamestate = END;
    dieSound.play(); // toca o som quando encosta no obstaculo 23/01
   }
  //se a pontuação for maior que 0 e for divisivel por 100 (100, 200, 300...) 23/01
    if(score>0 && score%100 === 0){
      checkPointSound.play(); //toca o som a cada 100 pts
    }
  } else if (gamestate === END){
  //troca a animação 18/10
    trex.changeAnimation("collide", trex_collided);
  //define a visibilidade do sprite 16/01
    gameOver.visible = true;
    restart.visible = true; // 23/01
  //define a vida dos sprites para não serem apagados 18/10
    obstacles.setLifetimeEach(-1);
    clouds.setLifetimeEach(-1);
  //define a velocidade no eixo X dos grupos em zero 16/01
    obstacles.setVelocityXEach(0);
    clouds.setVelocityXEach(0);
  }
  
 //impedir que o trex caia 28/12 e colida no chão invisivel 02/01
  trex.collide(invisibleGround);
  drawSprites();

}
//função para gerar nuvens 04/01
function spawnClouds(){
  if(frameCount % 60 === 0){ //gera nuvens nos intervalos 0, 60, 120, 180,...
    //simbolo de % e === indicam o que sobra da divisão
      cloud = createSprite(600,100,40,10);
      cloud.velocityX =-3; 
      cloud.addImage(cloudImage); //adiciona a imagem ao sprite
      cloud.scale = 0.4; 
      cloud.y = Math.round(random(10,60)); 
      //Math.round arredonda os valores
      //random vai gerar em intervalos aleatorios (a,b) 
      //a = intervalo inicial
      //b = intervalo final
      //adiciona o tempo de vida das nuvens 09/01
      cloud.lifetime = 300;
      //define o grupo na função de gerar 16/01
      clouds.add(cloud);
  }
} 

//função de gerar obstáculos 09/01
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    //movimenta os obstaculos no eixo x de forma mais rapida de acordo com a pontuação 23/01
    obstacle.velocityX = -(6 + score/100);
     //gerar obstáculos aleatórios
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;//reinicia a escolha
       case 2: obstacle.addImage(obstacle2);
               break;//reinicia a escolha
       case 3: obstacle.addImage(obstacle3);
               break;//reinicia a escolha
       case 4: obstacle.addImage(obstacle4);
               break;//reinicia a escolha
       case 5: obstacle.addImage(obstacle5);
               break;//reinicia a escolha
       case 6: obstacle.addImage(obstacle6);
               break;//reinicia a escolha
       default: break;
     }
     //define o grupo na função de gerar 16/01
     obstacles.add(obstacle);
     //atribua dimensão e tempo de vida aos obstáculos              
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
  }
 }
