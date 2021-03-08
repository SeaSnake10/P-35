//Create variables here
var dog, happyDog, database, foodS, foodStock, dImg;



function preload()
{
	//load images here
  dImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,300,100,10);
  dog.addImage(dImg);
  dog.scale = 0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
}


function draw() {  
  background(46, 139, 87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog);
  }
  drawSprites();

  //add styles here
  textSize(15);
  fill("white");
  text("Food Remaining:" + foodS, 180, 50);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
   
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}