//const vars (theres a lot)
//filters
const shadowFilter = document.querySelector("#shadowFilter");
// navBar
const homeBtn = document.querySelector("#homeBtn");
const feltBtn = document.querySelector("#feltBtn");
const guideBtn = document.querySelector("#guideBtn");
const miniBtn = document.querySelector("#miniBtn");
const allPages = document.querySelectorAll(".isPage");
const allNavBar = document.querySelectorAll("#navBar span");
//animation1 in home image
const homeImage1 = document.querySelector("#imageA");
const hImage1 = document.querySelector("#image1");
const hiddenText1 = document.querySelector("#hiddenText1");
const homeImage2 = document.querySelector("#imageB");
const hImage2 = document.querySelector("#image2");
const hiddenText2 = document.querySelector("#hiddenText2");
// not const vars here
let isImagePopUpOpen = false;
let isHoveringOverPage = false;
// if doesnt work try outerHeight/outerWidth?
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
// initial stuff here
  resetActivePages();
  showPage("#homePage");
homeBtn.style.color="#835db9";

// funcs here

//interval timer for checking window size
setInterval(function() {
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
}, 100); 
//interval failsafe to clean all current ongoing rules
setInterval(function() {
if (windowWidth < 800) {
imageCloseOnClick(hiddenText1);
homeImage1.style.left="0";
homeImage1.classList.remove("grow");
imageUnHover(hImage1, homeImage1);
hiddenText1.style.display = "block";
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

//image popup listeners, might want to make it a func inside a func
// zindex layers: 0: base, 1: shadow filter, 2: elements, 3: images
// note to self: convert to funcs in the afternoon ya
//optimize eventlisteners since its very much repeated
homeImage1.addEventListener("mouseover", function () {
if (windowWidth > 800) {
 imageGrowOnHover(hImage1, homeImage1);
homeImage1.classList.add("grow");
}
}) 
homeImage1.addEventListener("mouseout", function () {
if ((isHoveringOverPage === true) && (isImagePopUpOpen === false)) {
    // this is to check if user clicks off when in a image page or not
    imageUnHover(hImage1, homeImage1);
homeImage1.classList.remove("grow");
}
}) 
homeImage1.addEventListener("click", function () {
    if (windowWidth > 800) {
    imageOpenOnClick(hiddenText1);
homeImage1.classList.remove("grow");
    }
})
hiddenText1.addEventListener("click", function () { // click off
imageCloseOnClick(hiddenText1);
homeImage1.classList.remove("grow");
imageUnHover(hImage1, homeImage1);
})
//
homeImage2.addEventListener("mouseover", function () {
if (windowWidth > 800) {
 imageGrowOnHover(hImage2, homeImage2);
homeImage2.classList.add("grow");
}
}) 
homeImage2.addEventListener("mouseout", function () {
if ((isHoveringOverPage === true) && (isImagePopUpOpen === false)) {
    imageUnHover(hImage2, homeImage2);
homeImage2.classList.remove("grow");
}
}) 
homeImage2.addEventListener("click", function () {
    if (windowWidth > 800) {
    imageOpenOnClick(hiddenText2);
homeImage2.classList.remove("grow");
    }
})
hiddenText2.addEventListener("click", function () { // click off
imageCloseOnClick(hiddenText2);
homeImage2.classList.remove("grow");
imageUnHover(hImage2, homeImage2);
})

