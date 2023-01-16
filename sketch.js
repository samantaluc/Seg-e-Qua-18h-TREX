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

function preload(){ //função que vai carregar os arquivos (jpg, png, mp3...) pro nosso jogo 28/12
  //carrega a animação para o trex correndo com os arquivos
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
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
}

function setup(){ //função que vai configurar o que fazemos nos sprites 28/12
  createCanvas(600,200);
  //crie um sprite de trex
  trex = createSprite(50, 180, 20, 50);
  //adicionar a animação do trex_running pro nosso sprite
  trex.addAnimation("running",trex_running);
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
    }
  //ter uma gravidade puxando ele ao chão 28/12
    trex.velocityY = trex.velocityY + 0.8
  //chama a função de gerar nuvens 04/01
    spawnClouds(); 
  //chama a função de gerar obstáculos 09/01
   spawnObstacles();
  //condição para trocar para o modo do estado de Jogo FIM/END 11/01
   if(trex.isTouching(obstacle)){
    gamestate = END;
   }

  } else (gamestate === END){

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
  }

} 

//função de gerar obstáculos 09/01
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
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
     //atribua dimensão e tempo de vida aos obstáculos              
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
  }
 }
