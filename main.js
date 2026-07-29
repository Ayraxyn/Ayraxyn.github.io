//const vars (theres a lot)
//filters
let amountOfHiddenImages = 6; // change this variable w/ more hiddenimage etxt

const shadowFilter = document.querySelector("#shadowFilter");
// navBar
const homeBtn = document.querySelector("#homeBtn");
const feltBtn = document.querySelector("#feltBtn");
const guideBtn = document.querySelector("#guideBtn");
const miniBtn = document.querySelector("#miniBtn");
const allPages = document.querySelectorAll(".isPage");
const allNavBar = document.querySelectorAll("#navBar span");
const playArea = document.querySelector("#playingArea");
const footer = document.querySelector("#foobar");
let lastTopScroll = 0;

const spritePlay = document.querySelector("#playBtn");
const brightMode = document.querySelector("#brightMode");
const darkMode = document.querySelector("#darkMode");
const darkWarning = document.querySelector("#darkModeWarning");
const warningTrans = document.querySelector("#warningTransform");
const scoreBox = document.querySelector("#scoreBox");
const finishButton = document.querySelector("#finishButton");
const gameInstruct = document.querySelector("#gameInstructions");
const cursorClick = document.querySelector("#stupidRedCircle");
const Timer = document.querySelector("#Timer");
const playMusic = new Audio("audio/gameTheme.mp3"); //credit to v/s
const ruffleSound = new Audio("audio/ruffle.mp3");
const clickSound = new Audio("audio/clickPop.mp3");
const woolGrab = new Audio("audio/woolGrab.mp3");
const quizBtn = document.querySelector("#quizButton");
const quizScore = document.querySelector("#quizScore");
playMusic.volume = 0.7;
playMusic.loop = true;
clickSound.volume = 0.5;
woolGrab.volume = 0.5;
const feltPages = document.querySelectorAll(".iAmFelt");
const feltImages = document.querySelectorAll(".iAmFeltIMG");
const needlePage = document.querySelector("#feltNeedle");
const woolPage = document.querySelector("#feltBoard");
const boardPage = document.querySelector("#feltFelt");
const needleImage = document.querySelector("#needleImage");
const boardImage = document.querySelector("#boardImage");
const feltImage = document.querySelector("#feltImage");
let currentWoolGrabbed = 0; // 0 - 123
let feltPageOn = 1; // 123, defaults 1
let submittedEmail = false;
let hasDoneQuiz = false;
let scoreofQuiz = 0;
//animation1 in home image
const images = [ // put homeImage1, homeImage2 etc all here
document.querySelector("#imageA"),
document.querySelector("#imageB"),
document.querySelector("#imageC"),
document.querySelector("#imageD"),
document.querySelector("#imageE"),
document.querySelector("#imageF")
];
const divImage = [ // put hImage1, hImage2 etc all here
document.querySelector("#image1"),
document.querySelector("#image2"),
document.querySelector("#image3"),
document.querySelector("#image4"),
document.querySelector("#image5"),
document.querySelector("#image6"),
];
const hiddenText = [ // put hiddenText1, hiddenText2 etc all here
document.querySelector("#hiddenText1"),
document.querySelector("#hiddenText2"),
document.querySelector("#hiddenText3"),
document.querySelector("#hiddenText4"),
document.querySelector("#hiddenText5"),
document.querySelector("#hiddenText6")
];
// const homeImage1 = document.querySelector("#imageA");
// const hImage1 = document.querySelector("#image1");
// const hiddenText1 = document.querySelector("#hiddenText1");
// const homeImage2 = document.querySelector("#imageB");
// const hImage2 = document.querySelector("#image2");
// const hiddenText2 = document.querySelector("#hiddenText2");
// not const vars here

let isAnimationPlaying = false;
let Points = 0;
let storePoint = 0;
let secondsTimer = 0;
let militimer = 0;
let isImagePopUpOpen = false;
let isHoveringOverPage = false;
let hasViewedWarning = false;
let currentMinigameTheme = 0; // 0 = day, 1 = night
let numberOfWarningClicks = 0;
// used to calc distance later, take note of the coords (i added top 0 left 0 from start
// for easier calculation)
let gapWoolCoordX = 850;
let gapWoolCoordY1 = 10;
let gapWoolCoordY2 = 160;
let gapWoolCoordY3 = 310;
let refilledWoolCoordX1 = 0;
let refilledWoolCoordY1 = 0;
let refilledWoolCoordX2 = 0;
let refilledWoolCoordY2 = 0;
let refilledWoolCoordX3 = 0;
let refilledWoolCoordY3 = 0;
let amtOfRounds = 0;
// if doesnt work try outerHeight/outerWidth?
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let gameHasStarted = false;
let elapsedTime = 0;
// initial stuff here
  resetActivePages();
  showPage("#homePage");
homeBtn.style.color="#835db9";
createInitialMiniGameUI();
brightMode.classList.add("picked");
resetFeltingIconState();
resetFeltingPageState();
showFeltPage(needlePage, needleImage, 1);
// funcs here

function toggleBlackCover() {
let e = document.querySelector("#DarkFilter");
e.classList.toggle("hiddenDarkFilter");
}
function resetDayNightButtons() {
    brightMode.classList.remove("picked");
    darkMode.classList.remove("picked");
}
function startGame() {
    gameHasStarted = true;
    toggleBlackCover();
    brightMode.style.display = "none";
    darkMode.style.display = "none";
    spritePlay.style.display = "none"
    scoreBox.style.display = "block";
    finishButton.style.display = "block";
    Timer.style.display = "block";
    refillColoredWools();
    playMusic.play();
    for (let i = 0; i < 4; i++) {
document.querySelector("#woolCreate" + i).style.display = "none";
}
   // create wool sockets
for (let i = 0; i < 3; i++) {
createWoolSocket(i);
    let transY = 10 + 150 * i;
// x all 850 from 0, y1 = 10, y2 = 160, y3 = 310
document.querySelector("#darkwoolCreate" +i).style.top = transY + "px";
document.querySelector("#whitewoolCreate" +i).style.top = transY + "px";
if (windowWidth > 800) {
document.querySelector("#darkwoolCreate" +i).style.left = "850px";
document.querySelector("#whitewoolCreate" +i).style.left = "850px";
} else {
    document.querySelector("#darkwoolCreate" +i).style.left = "250px";
document.querySelector("#whitewoolCreate" +i).style.left = "250px";
}
}
   // create random wools

}

function createInitialMiniGameUI() {
    // creation of wools at the 4 corners of the game view
    for (let i = 0; i < 4; i++) {
let woolID = "woolCreate" +i;
createAWool(null, true, 0, woolID);
let selectedWool = document.querySelector("#" + woolID);
switch (i) {
    case 0:
selectedWool.style.top = "0";
selectedWool.style.left = "0";
break;
case 1:
selectedWool.style.top = "0";
selectedWool.style.right = "0";
break;
case 2:
selectedWool.style.bottom = "0";
selectedWool.style.left = "0";
break; 
case 3:
selectedWool.style.bottom = "0";
selectedWool.style.right = "0";
break;
    }
}
}
function createAWool(color, isRainbow, isOutline, id) { //when calling the func if you want random color do color = null or smth
let newWool = document.createElement('img');
newWool.src = "images/wool.png";
newWool.alt = "Wool";
newWool.title = "Wool";
newWool.classList.add("isWool");
newWool.id = id;
    if ((color === null) && (isOutline == 0)) {
color = Math.floor(Math.random() * 360);
    }
 let hueShift = "hue-rotate("+color+"deg)";
  newWool.style.filter = hueShift;
  if (isRainbow === true) {
newWool.classList.add("isRainbowWool");
  } 
  if (isOutline == 1) {
hueShift = "brightness(166%) hue-rotate("+color+"deg)";
  newWool.style.filter = hueShift;
newWool.classList.add("isWhiteOutlineWool");
  } 
  if (isOutline == 2) {
newWool.classList.add("isBlackOutlineWool");
  }
playArea.appendChild(newWool);
}
function changeBackgroundTheme() {

}

function createWoolSocket(idnumber) {
let darkwoolID = "darkwoolCreate" + idnumber;
createAWool(null, false, 2, darkwoolID);
let hueType = specificHueRandomizer();
let whitewoolID = "whitewoolCreate" + idnumber;
createAWool(hueType, false, 1, whitewoolID);
switch (hueType) {
case 0:
document.querySelector("#" + whitewoolID).classList.add("isYellowWool");
break;
case 45:
document.querySelector("#" + whitewoolID).classList.add("isGreenWool");
break;
case 135:
document.querySelector("#" + whitewoolID).classList.add("isBlueWool");
break;
case 200:
document.querySelector("#" + whitewoolID).classList.add("isPurpleWool");
break;
case 250:
document.querySelector("#" + whitewoolID).classList.add("isPinkWool");
break;
case 295:
document.querySelector("#" + whitewoolID).classList.add("isRedWool");
break;
}
document.querySelector("#" + whitewoolID).addEventListener("click", function () { // click off
socketCursorCheck(hueType, whitewoolID); // whiteWoolCreate0 etc
})
}
function socketCursorCheck(hue, socketID) {
    if (window.getComputedStyle(Timer).display === "block") { // if stupid red dot is visible means a wool ahs been checked
        let usingY = 0; // X for sockets is always 850
        switch (socketID) {
            case "whitewoolCreate0":
usingY = gapWoolCoordY1;
break;
            case "whitewoolCreate1":
usingY = gapWoolCoordY2;
break;
            case "whitewoolCreate2":
 usingY = gapWoolCoordY3;
 break;
        }
// brings ALL wools of the same type to the socket and grants +1 stored point for each correct
animateToSocket(currentWoolGrabbed, socketID, usingY); // socketID = 0,1,2
switch (true) {
case cursorClick.classList.contains("isYellowWool"):
   if (document.querySelector("#refillWoolCreate" + (currentWoolGrabbed - 1)).classList.contains("isYellowWool")) {
    if (document.querySelector("#" +socketID).classList.contains("isYellowWool")) {
++storePoint
    }
   }
break;
case cursorClick.classList.contains("isGreenWool"):
     if (document.querySelector("#refillWoolCreate" + (currentWoolGrabbed - 1)).classList.contains("isGreenWool")) {
       if (document.querySelector("#" +socketID).classList.contains("isGreenWool")) {
++storePoint
    }
   }
break;
case cursorClick.classList.contains("isBlueWool"):
     if (document.querySelector("#refillWoolCreate" + (currentWoolGrabbed - 1)).classList.contains("isBlueWool")) {
       if (document.querySelector("#" +socketID).classList.contains("isBlueWool")) {
++storePoint
    }
   }
break;
case cursorClick.classList.contains("isPurpleWool"):
     if (document.querySelector("#refillWoolCreate" + (currentWoolGrabbed - 1)).classList.contains("isPurpleWool")) {
       if (document.querySelector("#" +socketID).classList.contains("isPurpleWool")) {
++storePoint
    }
   }
break;
case cursorClick.classList.contains("isPinkWool"):
     if (document.querySelector("#refillWoolCreate" + (currentWoolGrabbed - 1)).classList.contains("isPinkWool")) {
       if (document.querySelector("#" +socketID).classList.contains("isPinkWool")) {
++storePoint
    }
   }
break;
case cursorClick.classList.contains("isRedWool"):
     if (document.querySelector("#refillWoolCreate" + (currentWoolGrabbed - 1)).classList.contains("isRedWool")) {
       if (document.querySelector("#" +socketID).classList.contains("isRedWool")) {
++storePoint
    }
   }
break;
}
}
}

function deleteWoolSockets() {
     for (let i=0; i < 3; i++) {
    document.getElementById("darkwoolCreate" + i).remove();
     document.getElementById("whitewoolCreate" + i).remove();
    }
}
function specificHueRandomizer() {
    // 0 = yellow, 45 = green, 135 = blue, 200 = purple, 250 = pink, 295 = red
let number = Math.floor(Math.random() * 6) // 0, 1, 2, 3, 4, 5
let hueRandom = 0;
switch (number) {
case 0:
hueRandom = 0;
break;
case 1:
hueRandom = 45;
break;
case 2:
hueRandom = 135;
break;
case 3:
hueRandom = 200;
break;
case 4:
hueRandom = 250;
break;
case 5:
hueRandom = 295;
break;
}
return hueRandom;
}


function refillColoredWools(){
    if (windowWidth > 800) {
refilledWoolCoordX1 = Math.floor(Math.random() * 700); // X 0 - 800
refilledWoolCoordY1 = Math.floor(Math.random() * 300);
refilledWoolCoordX2 = Math.floor(Math.random() * 700);
refilledWoolCoordY2 = Math.floor(Math.random() * 300);
refilledWoolCoordX3 = Math.floor(Math.random() * 700);
refilledWoolCoordY3 = Math.floor(Math.random() * 300);
    } else {
refilledWoolCoordX1 = Math.floor(Math.random() * 200); // X 0 - 800
refilledWoolCoordY1 = Math.floor(Math.random() * 300);
refilledWoolCoordX2 = Math.floor(Math.random() * 200);
refilledWoolCoordY2 = Math.floor(Math.random() * 300);
refilledWoolCoordX3 = Math.floor(Math.random() * 200);
refilledWoolCoordY3 = Math.floor(Math.random() * 300);
    }
for (let i=0; i < 3; i++) {
    let hueType = specificHueRandomizer();
    refillableWoolID = "refillWoolCreate" + i;
    createAWool(hueType, false, 0, refillableWoolID);
// add a class corresponding to each hue type so i ahve an identifier for them
switch (hueType) {
case 0:
document.querySelector("#" + refillableWoolID).classList.add("isYellowWool");
break;
case 45:
document.querySelector("#" + refillableWoolID).classList.add("isGreenWool");
break;
case 135:
document.querySelector("#" + refillableWoolID).classList.add("isBlueWool");
break;
case 200:
document.querySelector("#" + refillableWoolID).classList.add("isPurpleWool");
break;
case 250:
document.querySelector("#" + refillableWoolID).classList.add("isPinkWool");
break;
case 295:
document.querySelector("#" + refillableWoolID).classList.add("isRedWool");
break;
}
document.querySelector("#" + refillableWoolID).addEventListener("click", 
function() {
    woolGrab.play();
    currentWoolGrabbed = i + 1;
    showCursor(i, hueType); // tells showcursor which wool coord it is
}
);

}
document.querySelector("#refillWoolCreate0").style.left = refilledWoolCoordX1 + "px";
document.querySelector("#refillWoolCreate0").style.top = refilledWoolCoordY1 + "px";
document.querySelector("#refillWoolCreate1").style.left = refilledWoolCoordX2 + "px";
document.querySelector("#refillWoolCreate1").style.top = refilledWoolCoordY2 + "px";
document.querySelector("#refillWoolCreate2").style.left = refilledWoolCoordX3 + "px";
document.querySelector("#refillWoolCreate2").style.top = refilledWoolCoordY3 + "px";
}

function showCursor(clickedWoolid, clickedWoolHue) {
    cursorClick.style.display = "block"
switch (clickedWoolid) {
    case 0:
cursorClick.style.left = refilledWoolCoordX1 + "px";
cursorClick.style.top = refilledWoolCoordY1 + "px";
break;
    case 1:
cursorClick.style.left = refilledWoolCoordX2 + "px";
cursorClick.style.top = refilledWoolCoordY2 + "px";
break;
    case 2:
cursorClick.style.left = refilledWoolCoordX3 + "px";
cursorClick.style.top = refilledWoolCoordY3 + "px";
break;
} // used to identify what wool color im even clicking
resetWoolColorTags();
switch (clickedWoolHue) {
case 0:
cursorClick.classList.add("isYellowWool");
break;
case 45:
cursorClick.classList.add("isGreenWool");
break;
case 135:
cursorClick.classList.add("isBlueWool");
break;
case 200:
cursorClick.classList.add("isPurpleWool");
break;
case 250:
cursorClick.classList.add("isPinkWool");
break;
case 295:
cursorClick.classList.add("isRedWool");
break;
}
}

function resetWoolColorTags() { //maybe add parameters instead if you need to reuse this
cursorClick.classList.remove("isYellowWool");
cursorClick.classList.remove("isGreenWool");
cursorClick.classList.remove("isBlueWool");
cursorClick.classList.remove("isPurpleWool");
cursorClick.classList.remove("isPinkWool");
cursorClick.classList.remove("isRedWool");
}


function deleteColoredWools() {
    for (let i=0; i < 3; i++) {
    document.getElementById("refillWoolCreate" + i).remove();
    }
}

function animateToSocket(woolGrabbed, socketc, usedY) { //use currentWoolGrabbed, socketc checks from socketID, usedY from usingY
let starPosX = 0;
let starPosY = 0;
let endPosY = usedY;
let endPosX = 0;
if (windowWidth > 800) {
endPosX = 850;
} else {
endPosX = 250;
}
let grabbingThisWool = null;
switch (woolGrabbed) {
case 1:
starPosX = refilledWoolCoordX1;
starPosY = refilledWoolCoordY1;
grabbingThisWool = document.querySelector("#refillWoolCreate0");
break;
case 2:
starPosX = refilledWoolCoordX2;
starPosY = refilledWoolCoordY2;
grabbingThisWool = document.querySelector("#refillWoolCreate1");
break;
case 3:
starPosX = refilledWoolCoordX3;
starPosY = refilledWoolCoordY3;
grabbingThisWool = document.querySelector("#refillWoolCreate2");
break;
}

let intervalFrame = setInterval(realAnims, 1);
function realAnims() { //putting the func in here because i want to use startPosX and startPosY
// first calculate the distance
let distanceX = -starPosX + endPosX;
let distanceY = -starPosY + endPosY;
if ((Math.abs(distanceX) < 1) && (Math.abs(distanceY) < 1)) { // distanceX updates every time, 
    // using float point when it gets to dpx and dpy so instead i stop it like this instead
isAnimationPlaying = false;
elapsedFrames = 0;
clearInterval(intervalFrame);
ruffleSound.play();
} else {
isAnimationPlaying = true;
//lets say i want the anim to be maximum, 1 second long thats 100 frames
// SO + OX -StarPosX + endPosX; -StarPosY + endPosY
let distancePerX = 0;
let distancePerY = 0;
// check to see how to normalize the vectors by taking the bigger one
if (distanceX > distanceY) {
// etc if dX = 500 and dY = 250, divide both values by 500
distancePerX = distanceX/distanceX;
distancePerY = distanceY/distanceX;
} else {
distancePerX = distanceX/distanceY;
distancePerY = distanceY/distanceY;
}
 starPosX = starPosX + distancePerX;
 starPosY = starPosY+ distancePerY;
grabbingThisWool.style.top = starPosY + "px";
grabbingThisWool.style.left = starPosX + "px";
//if (starPosX < endPosX) { starPosX++;}
//if (starPosX > endPosX) {starPosX--;}

//if (starPosY < endPosY) {starPosY++;}
//if (starPosY > endPosY) {starPosY--;}
//grabbingThisWool.style.top = starPosY + "px";
//grabbingThisWool.style.left = starPosX + "px";
}
}
}



setInterval(function() {//interval function for timer 
if (gameHasStarted === true) {
    if (Points < 100) {
    elapsedTime = elapsedTime + 1 // 00:00:00 means 10 milliseconds, pressing finish resets timer
    secondNumber = Math.floor(elapsedTime / 6000); 
    secondsTimer = (elapsedTime / 100) % 60;
    forthNumber = Math.floor(secondsTimer);
    militimer = elapsedTime % 100;
sixthNumber = Math.floor(militimer);
Timer.innerHTML = secondNumber +":"+ forthNumber +":"+ sixthNumber;
}}
}, 10); 



setInterval(function() {
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
}, 100); 
//interval failsafe to clean all current ongoing rules
setInterval(function() {
if (windowWidth < 800) {
    for (let i = 0; i < amountOfHiddenImages; i++ ) {
imageCloseOnClick(hiddenText[i]);
images[i].classList.remove("grow");
imageUnHover(divImage[i], images[i]);
hiddenText[i].style.display = "block";
}
} else {
    if (isImagePopUpOpen == false) {
        for (let i = 0; i < amountOfHiddenImages; i++ ) {
imageCloseOnClick(hiddenText[i]);
}
    }
}
}, 100); 
//navbar
function resetActivePages() {
    for(let part of allPages){ 
part.style.display="none"; 
}
}
function resetNavBarState() {
    for(let part of allNavBar){ 
part.style.color="#ffedfd"
}
}
function resetFeltingPageState() {
for(let part of feltPages){ 
part.style.display="none"; 
}
}
function resetFeltingIconState() {
    for(let part of feltImages){ 
part.classList.remove("clicked");
}
}
function showFeltPage(selectedPage, selectedImage, o) {
selectedPage.style.display="block";
selectedImage.classList.add("clicked");
feltPageOn = o;
}


function showPage(selectedPage) {
let part =document.querySelector(selectedPage);
part.style.display="block"; // change block to smth else if you need to
}
//grow on hover is now just opacity lower bc it looked better 
function imageGrowOnHover(imagecontainerid, imageid) {
imagecontainerid.style.zIndex="3";
imageid.style.zIndex="3";
imageid.style.position="relative";
isHoveringOverPage = true;
}
function imageUnHover(imagecontainerid, imageid) {
imageid.style.zIndex="0";
imagecontainerid.style.zIndex="0";
isHoveringOverPage = false;
imageid.style.position="relative";
}
function imageOpenOnClick(imagetextid) {
imagetextid.style.display="block";
shadowFilter.style.display="block";
imagetextid.style.textAlign="right";
isImagePopUpOpen = true;
}
function imageCloseOnClick(imagetextid) {
imagetextid.style.display="none";
imagetextid.style.textAlign="right";
shadowFilter.style.display="none";
isImagePopUpOpen = false;
}

// event listeners here

//navBar event listeners
homeBtn.addEventListener("click", function () {
    resetActivePages();
        resetNavBarState();
showPage("#homePage"); // type page name here
homeBtn.style.color="#835db9";
})
feltBtn.addEventListener("click", function () {
      resetActivePages();
          resetNavBarState();
showPage("#feltingPage"); // type page name here
feltBtn.style.color="#835db9";
})
guideBtn.addEventListener("click", function () {
      resetActivePages();
          resetNavBarState();
showPage("#guidePage"); // type page name here
guideBtn.style.color="#835db9";
})
miniBtn.addEventListener("click", function () {
      resetActivePages();
      resetNavBarState();
showPage("#minigamePage"); // type page name here
miniBtn.style.color="#835db9";
})

let qn = new Array(5); // makes a...new empty array of 5.
quizBtn.addEventListener("click", function () {
if (hasDoneQuiz == false) {
for (let i=0; i < 5; i++) {
    let addi = i+1;
    let queryString = "input[name= 'q"+addi+"']:checked";
qn[i]=document.querySelector(queryString).value;
if(qn[i]=="true")scoreofQuiz++
}
quizScore.innerHTML = "SCORE:" +scoreofQuiz;
hasDoneQuiz = true;
}
})
for (let i = 0; i < 3; i++) {
let selector = null;
let imgSelector = null;
switch (i) {
case 0:
selector = needlePage;
imgSelector = needleImage;
break;
case 1:
selector = boardPage;
imgSelector = boardImage
break;
case 2:
selector = woolPage;
imgSelector = feltImage;
break;
}
imgSelector.addEventListener("click", function () {
resetFeltingIconState();
resetFeltingPageState();
showFeltPage(selector, imgSelector, i+1);
})
}

needleImage.addEventListener("mouseover", function () {
if (feltPageOn !== 1) {
needleImage.classList.add("hovered");
}
}) 
needleImage.addEventListener("mouseout", function () {
needleImage.classList.remove("hovered");
})

boardImage.addEventListener("mouseover", function () {
if (feltPageOn !== 2) {
boardImage.classList.add("hovered");
}
}) 
boardImage.addEventListener("mouseout", function () {
boardImage.classList.remove("hovered");
})

feltImage.addEventListener("mouseover", function () {
if (feltPageOn !== 3) {
feltImage.classList.add("hovered");
}
}) 
feltImage.addEventListener("mouseout", function () {
feltImage.classList.remove("hovered");
})
//image popup listeners, might want to make it a func inside a func
// zindex layers: 0: base, 1: shadow filter, 2: elements, 3: images
// note to self: convert to funcs in the afternoon ya
//optimize eventlisteners since its very much repeated
for (let i = 0; i < (amountOfHiddenImages); i++) { //starts from 1
images[i].addEventListener("mouseover", function () {
if ((windowWidth > 800) && (isImagePopUpOpen === false)) {
 imageGrowOnHover(divImage[i], images[i]);
images[i].classList.add("grow");
}
}) 

images[i].addEventListener("mouseout", function () {
if ((isHoveringOverPage === true) && (isImagePopUpOpen === false)) {
    // this is to check if user clicks off when in a image page or not
    imageUnHover(divImage[i], images[i]);
images[i].classList.remove("grow");
}
}) 

images[i].addEventListener("click", function () {
    if (windowWidth > 800) {
    imageOpenOnClick(hiddenText[i]);
    images[i].style.display = "absolute";
images[i].classList.remove("grow");
    }
})

hiddenText[i].addEventListener("click", function () { // click off
imageCloseOnClick(hiddenText[i]);
images[i].classList.remove("grow");
imageUnHover(divImage[i], images[i]);
})

}

// for minigame
// event handlers for play button etc
spritePlay.addEventListener("mouseover", function () {
spritePlay.classList.add("picked");
}) 

spritePlay.addEventListener("mouseout", function () {
spritePlay.classList.remove("picked");
}) 
spritePlay.addEventListener("click", function () { // START THE GAME
startGame();
})

brightMode.addEventListener("click", function () { // click off
currentMinigameTheme = 0;
resetDayNightButtons();
brightMode.classList.add("picked");
playArea.style.filter = "none";
})
darkMode.addEventListener("click", function () { // click off
currentMinigameTheme = 1;
resetDayNightButtons();
darkMode.classList.add("picked");
playArea.style.filter = "brightness(48%) contrast(132%) sepia(25%) hue-rotate(199deg)"
if (hasViewedWarning === false) {
darkWarning.style.display = "block";
    hasViewedWarning = true;
    console.log(darkWarning.style.display);
}
})
darkWarning.addEventListener("click", function () { // click off
switch (numberOfWarningClicks) {
    case 0:
        // make this a transition tmmr
    warningTrans.innerHTML = "Night mode causes all objects to be given a subtle tint of blue. This serves as the game's challenge mode, good luck!";
numberOfWarningClicks = 1;
break;
    case 1:
        darkWarning.style.display = "none";
numberOfWarningClicks = 2;
break;
}
}) 

finishButton.addEventListener("mouseover", function () { // click off
finishButton.classList.add("picked");
})
finishButton.addEventListener("mouseout", function () { // click off
finishButton.classList.remove("picked");
})
document.querySelector("#fakeSubmit").addEventListener("click", function () { 
    if (submittedEmail == false) {
document.querySelector("#bField").value = "";
document.querySelector("#aField").value = "";
document.querySelector("#fakeSubmit").style.backgroundColor = "#73AD21";
document.querySelector("#fakeSubmit").innerHTML = "Successful!";
submittedEmail = true;
    }
})
//
finishButton.addEventListener("click", function () { // click off
// reset all current wools, implement score grant later
if (isAnimationPlaying == false) {
if (elapsedTime < 300) {
    console.log(elapsedTime);
    storePoint = storePoint * 4;
} else if (elapsedTime < 500) {
    storePoint = storePoint * 2;
}
deleteColoredWools();
cursorClick.style.display = "none";
refillColoredWools();
deleteWoolSockets();
clickSound.play();
for (let i = 0; i < 3; i++) {
createWoolSocket(i);
    let transY = 10 + 150 * i;
// x all 850 from 0, y1 = 10, y2 = 160, y3 = 310
document.querySelector("#darkwoolCreate" +i).style.top = transY + "px";
document.querySelector("#whitewoolCreate" +i).style.top = transY + "px";
if (windowWidth > 800) {
document.querySelector("#darkwoolCreate" +i).style.left = "850px";
document.querySelector("#whitewoolCreate" +i).style.left = "850px";
} else {
    document.querySelector("#darkwoolCreate" +i).style.left = "250px";
document.querySelector("#whitewoolCreate" +i).style.left = "250px";
}
}
++amtOfRounds;
elapsedTime = 0;
Points = Points + storePoint;
storePoint = 0;
if (Points <= 100) {
scoreBox.innerHTML = Points +"!";
} else {
    console.log(Points);
    scoreBox.innerHTML = "YOU WIN!";
    scoreBox.style.color = "#69ED31";
    Timer.style.color = "#69ED31";
Timer.innerHTML = amtOfRounds + "Taken";
}
}
})

window.addEventListener("scroll", function(){ 
   var difference = window.pageYOffset || document.documentElement.scrollTop; 
   if (difference > lastTopScroll) {
      // downscroll, to remove static
footer.style.position = "static";
   } else if (difference < lastTopScroll) {
      // upscroll
footer.style.position = "sticky";
   } 
   lastTopScroll = Math.max(0, difference); // For Mobile or negative scrolling
}, false);

