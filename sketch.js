var ground, groundImage; //variavel para o chão 28/12
var invisibleGround; //variavel para o chão invisivel 02/01
var trex ,trex_running; //variaveis para o trex 28/12
var cloud, cloudImage; //variavel para a nuvem 04/01

function preload(){ //função que vai carregar os arquivos (jpg, png, mp3...) pro nosso jogo 28/12
  //carrega a animação para o trex correndo com os arquivos
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  //carrega a imagem do chão
  groundImage = loadImage("ground2.png");
  //carrega a imagem da nuvem 04/01
  cloudImage = loadImage("cloud.png");
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
}
 
function draw(){ //função que vai desenhar na nossa tela 28/12
  background("white");
  //pular quando a tecla espaço for pressionada 28/12 e somente quando estiver entre 100 e 200 02/01
  if(keyDown("space") && trex.y >= 100) {
    trex.velocityY = -10;
  }
  //ter uma gravidade puxando ele ao chão 28/12
  trex.velocityY = trex.velocityY + 0.8
 //impedir que o trex caia 28/12 e colida no chão invisivel 02/01
  trex.collide(invisibleGround);
  //chama a função de gerar nuvens 04/01
  spawnClouds(); 
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
  }
}