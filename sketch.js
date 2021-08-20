var petStandingImg, pet
var db
var feedingTime
var feedButton, feedButtonImg
var bg
function preload() {
  petStandingImg = loadImage("images/Image 1.png");
  feedButtonImg = loadImage("images/FeedButtonImage.png");
  bg = loadImage("images/BackgroundImage.jpg")

}
function setup() {
  db = firebase.database()
  createCanvas(displayWidth, displayHeight);
  pet = createSprite(width / 2 - 150, height / 2 - 150, 50, 50);
  pet.addImage("petStand", petStandingImg);
  db.ref("feedingtime").on("value", function (data) {
    feedingTime = data.val()
  })
  feedButton = createSprite(950, 620, 50, 50);
  feedButton.addImage("FeedBt", feedButtonImg);
  feedButton.scale = 0.3
}

function draw() {
  background(bg);
  drawSprites();
  textSize(26)
  text("Current Time - " + hour() % 12 + " : " + minute(), 26, 80);
  if (feedingTime)
    text("Feeding Time - " + feedingTime.hour % 12 + " : " + feedingTime.minute, 725, 100);
  console.log(feedingTime)
  if (mousePressedOver(feedButton)) {
    db.ref("feedingtime").update({
      hour: hour(),
      minute: minute()
    })

  }
}