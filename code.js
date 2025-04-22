let startPicNum = 1;
let dealPicNum = 1;
let adultsNum = 0;
let kidsNum = 0;
let bFlex = false;
let tripTypes = [false,false,false,false,false,false,false];
let resultNum = 5;
let bAllInclusive = false;
let bBreakfast = false;
let favorits = [false,false,false,false,false];
let favNum = 0;
let bFavorits = false;
let bDateSelected = false;
let bPeopleSelected = false;
const MAXNUM = 10;
var elem = document.querySelector("html");
/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => { 
    document.querySelector("#caruselRight").addEventListener("click", ()=>{
        if(startPicNum === MAXNUM){
            startPicNum = 1;
            document.querySelector("#startPicNum").innerHTML = startPicNum;
        } else {
            startPicNum++;
            document.querySelector("#startPicNum").innerHTML = startPicNum;;
        }
    });
    document.querySelector("#caruselLeft").addEventListener("click", ()=>{
        if(startPicNum > 1){
            startPicNum--;
            document.querySelector("#startPicNum").innerHTML = startPicNum;
        } else {
            startPicNum = MAXNUM;
            document.querySelector("#startPicNum").innerHTML = startPicNum;
        }
    });
    document.querySelector("#liftOff").addEventListener("click", startApp);
    document.querySelector("#liftOff").addEventListener("click", openFullscreen);
});
function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullscreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    } 
}

const startApp =() => {
    document.querySelector("#data1").classList.remove("hidden");
    document.querySelector("#start").classList.add("hidden");
    document.querySelector("#adultsPlus").addEventListener("click", ()=>{
        bPeopleSelected = true;
        checkForNextPage()
        adultsNum++;
        document.querySelector("#adultsNum").innerHTML = adultsNum;
    });
    document.querySelector("#adultsMin").addEventListener("click", ()=>{
        if(adultsNum > 0){
            adultsNum--;
            document.querySelector("#adultsNum").innerHTML = adultsNum;
        }
    });
    document.querySelector("#kidsPlus").addEventListener("click", ()=>{
        bPeopleSelected = true;
        checkForNextPage()
        kidsNum++;
        document.querySelector("#kidsNum").innerHTML = kidsNum;
    });
    document.querySelector("#kidsMin").addEventListener("click", ()=>{
        if(kidsNum > 0){
            kidsNum--;
            document.querySelector("#kidsNum").innerHTML = kidsNum;
        }
    });
    document.querySelector("#dates").addEventListener("click", datesSlider);
    document.querySelector("#flex").addEventListener("click", isFlex);
}

const datesSlider = () => {
    document.querySelector(".darkScreen").classList.remove("hidden");
    document.querySelector(`#dateSlider`).style.animation = "slideIn 1s forwards";
    document.querySelector("#startDate").addEventListener("click", backDate);
}

const backDate = () => {
    document.querySelector("#datePage1").classList.add("hidden");
    document.querySelector("#datePage2").classList.remove("hidden");
    document.querySelector("#goDate").classList.add("selected");
    
    document.querySelector("#backDate").addEventListener("click", ()=> {
        document.querySelector("#backDate").classList.add("selected");
        document.querySelector("#selectDate2").classList.remove("disabeled");
        document.querySelector("#selectDate2").classList.add("enabled");
        document.querySelector("#selectDate2").addEventListener("click", closeSlider);

    });
    document.querySelector("#clear").addEventListener("click", ()=> {
        document.querySelector("#datePage1").classList.remove("hidden");
        document.querySelector("#datePage2").classList.add("hidden");
        document.querySelector("#backDate").classList.remove("selected");
        document.querySelector("#selectDate2").classList.add("disabeled");
        document.querySelector("#selectDate2").classList.remove("enabled");
        document.querySelector("#selectDate2").removeEventListener("click", closeSlider);
    });
}

const closeSlider = ()=> {
    document.querySelector(".darkScreen").classList.add("hidden");
    document.querySelector("#dateSlider").style.animation = "slideOut 1s forwards";
    bDateSelected = true;
    checkForNextPage()
}

const isFlex =()=> {
    if (bFlex) {
        bFlex = false;
        document.querySelector("#flex").classList.remove("selected");
    } else {
        bFlex = true;
        document.querySelector("#flex").classList.add("selected");
    }
}

const checkForNextPage = ()=> {
    if (bPeopleSelected & bDateSelected) {
        document.querySelector("#next1").classList.remove("disabeled");
        document.querySelector("#next1").classList.add("enabled");
        document.querySelector("#next1").addEventListener("click", setData2);
    }
}

const setData2 =()=> {
    document.querySelector("#data1").classList.add("hidden");
    document.querySelector("#data2").classList.remove("hidden");
    document.querySelector("#backToData1").addEventListener("click", ()=> {
        document.querySelector("#data1").classList.remove("hidden");
        document.querySelector("#data2").classList.add("hidden");
    });
    for (let index = 0; index < tripTypes.length; index++) {
        document.querySelector(`#tripType${index}`).addEventListener("click",()=> {
            if (tripTypes[index]) {
                tripTypes[index] = false
                document.querySelector(`#tripType${index}`).classList.remove("selectedPic");
                checkForNextPage2();
            } else {
                tripTypes[index] = true
                document.querySelector(`#tripType${index}`).classList.add("selectedPic");
                checkForNextPage2();
            }
        })
    }
}

const checkForNextPage2= ()=> {
    if (tripTypes.includes(true)) {
        document.querySelector("#ready").classList.remove("disabeled");
        document.querySelector("#ready").classList.add("enabled");
        document.querySelector("#ready").addEventListener("click", setTripOptions);
    } else {
        document.querySelector("#ready").classList.add("disabeled");
        document.querySelector("#ready").classList.remove("enabled");
        document.querySelector("#ready").removeEventListener("click", setTripOptions);
    }
}

const setTripOptions = () => {
    document.querySelector("#tripOptions").classList.remove("hidden");
    document.querySelector("#data2").classList.add("hidden");
    tripScroll();
    document.querySelector("#updateButton").addEventListener("click", setUpdatePage);
    document.querySelector("#favoritsButton").addEventListener("click", setfavoritsPage);
    document.querySelector("#modButton").addEventListener("click", setModPage);
}

const tripScroll =()=> {
    document.querySelector(`#tripOptionScroll`).innerHTML = "";
    for(let index = 1; index <= resultNum; index++){
        app = El("div",  {attributes: {class: `tripOption`, id: `tripOption${index}`}},
            El("div", {attributes: {class: `tripOptionButton`, id: `tripOptionButton${index}`}, listeners: {"click":tripInfo}},
            ),
            El("div", {attributes: {class: `tripNum`}},
                index
            ),
            El("div", {attributes: {class: `tripFav`, id: `tripFav${index}`}, listeners: {"click":isfavorit}}),
        );
        document.querySelector(`#tripOptionScroll`).append(app);
    };
}

const isfavorit = ()=> {  
    let index = event.target.id.slice(7)
    if (favorits[index - 1]) {
        favorits[index - 1] = false;
        favNum--;
        document.querySelector(`#tripFav${index}`).classList.remove("selected");
    } else {
        favorits[index - 1] = true;
        favNum++;
        document.querySelector(`#tripFav${index}`).classList.add("selected");
    }
    
    if (favorits.includes(true)) {
        bFavorits = true;
    } else {
        bFavorits = false;
    }
}

const setUpdatePage = ()=> {
    document.querySelector("#updatePage").classList.remove("hidden");
    document.querySelector("#tripOptions").classList.add("hidden");
    document.querySelector("#updateToTripType").addEventListener("click", ()=>{
        document.querySelector("#updatePage").classList.add("hidden");
        document.querySelector("#tripOptions").classList.remove("hidden");
    });
    document.querySelector("#adultsNumUpdate").innerHTML = adultsNum;
    document.querySelector("#kidsNumUpdate").innerHTML = kidsNum;
    document.querySelector("#adultsPlusUpdate").addEventListener("click", ()=>{
        checkForNextPage()
        adultsNum++;
        document.querySelector("#adultsNumUpdate").innerHTML = adultsNum;
    });
    document.querySelector("#adultsMinUpdate").addEventListener("click", ()=>{
        if(adultsNum > 0){
            adultsNum--;
            document.querySelector("#adultsNumUpdate").innerHTML = adultsNum;
        }
    });
    document.querySelector("#kidsPlusUpdate").addEventListener("click", ()=>{
        checkForNextPage()
        kidsNum++;
        document.querySelector("#kidsNumUpdate").innerHTML = kidsNum;
    });
    document.querySelector("#kidsMinUpdate").addEventListener("click", ()=>{
        if(kidsNum > 0){
            kidsNum--;
            document.querySelector("#kidsNumUpdate").innerHTML = kidsNum;
        }
    });
    document.querySelector("#updateDates").addEventListener("click", datesSlider);
    if (bFlex) {
        document.querySelector("#updateFlex").classList.add("selected");
    }
    document.querySelector("#updateFlex").addEventListener("click", isFlexUpdate);
    for (let index = 0; index < tripTypes.length; index++) {
        if (tripTypes[index]) {
            document.querySelector(`#tripSelect${index}`).classList.add("selectedPic");
        }
        document.querySelector(`#tripSelect${index}`).addEventListener("click",()=> {
            if (tripTypes[index]) {
                tripTypes[index] = false
                document.querySelector(`#tripSelect${index}`).classList.remove("selectedPic");
            } else {
                tripTypes[index] = true
                document.querySelector(`#tripSelect${index}`).classList.add("selectedPic");
            }
        })
    }
    document.querySelector("#resultNum").innerHTML = resultNum;
    document.querySelector("#showResult").addEventListener("click", ()=> {
        document.querySelector("#updatePage").classList.add("hidden");
        document.querySelector("#tripOptions").classList.remove("hidden");
    });
}

const isFlexUpdate =()=> {
    if (bFlex) {
        bFlex = false;
        document.querySelector("#updateFlex").classList.remove("selected");
    } else {
        bFlex = true;
        document.querySelector("#updateFlex").classList.add("selected");
    }
}

const setfavoritsPage = ()=> {
    document.querySelector("#tripOptions").classList.add("hidden");
    if (bFavorits) {
        document.querySelector("#favoritsSelected").classList.remove("hidden");
        creatfavs();
        document.querySelector("#backFromFav").addEventListener("click", ()=> {
            document.querySelector("#favoritsSelected").classList.add("hidden");
            document.querySelector("#tripOptions").classList.remove("hidden");
        })
    } else {
        document.querySelector("#favoritsNull").classList.remove("hidden");
        document.querySelector("#backFromFavNull").addEventListener("click", ()=> {
            document.querySelector("#favoritsNull").classList.add("hidden");
            document.querySelector("#tripOptions").classList.remove("hidden");
        })
    }
}

const creatfavs = ()=> {
    document.querySelector(`#favoritsScroll`).innerHTML = "";
    for (let index = 1; index <= favNum; index++) {
        app = El("div",  {attributes: {class: `favOption`, id: `farOption${index}`}},
            El("div", {attributes: {class: `favOptionButton`, id: `favOptionButton${index}`}, listeners: {"click":tripInfo}},
            ),
            El("div", {attributes: {class: `favNum`}},
                index
            ),
            El("div", {attributes: {class: `favTrip selected`, id: `favTrip${index}`}, listeners: {"click":isfavorit}}),
        );
        document.querySelector(`#favoritsScroll`).append(app);
    }
}

const setModPage = ()=> {
    document.querySelector("#tripOptions").classList.add("hidden");
    document.querySelector("#modPage").classList.remove("hidden");
    document.querySelector("#showResultMod").addEventListener("click", ()=> {
        document.querySelector("#tripOptions").classList.remove("hidden");
        document.querySelector("#modPage").classList.add("hidden");
    });
    document.querySelector("#allInclusive").addEventListener("click", isAllInclusive);
    document.querySelector("#breakfast").addEventListener("click", ()=> {
        if (bBreakfast) {
            bBreakfast = false;
            document.querySelector("#breakfast").classList.remove("selected");
        } else {
            bBreakfast = true;
            document.querySelector("#breakfast").classList.add("selected");
        }
    });
}

const isAllInclusive =()=> {
    if (bAllInclusive) {
        bAllInclusive = false;
        document.querySelector("#allInclusive").classList.remove("selected");
        resultNum = 5;
        tripScroll();
        document.querySelector("#resultNumMod").innerHTML = resultNum;
    } else {
        bAllInclusive = true;
        document.querySelector("#allInclusive").classList.add("selected");
        resultNum = 3;
        tripScroll();
        document.querySelector("#resultNumMod").innerHTML = resultNum;
    }
}

const tripInfo =()=> {
    if (event.target.id.includes("fav")) {
        document.querySelector("#favoritsSelected").classList.add("hidden");
    } else {
        document.querySelector("#tripOptions").classList.add("hidden");
    }
    document.querySelector("#dealPage").classList.remove("hidden");
    document.querySelector("#backFromDeal").addEventListener("click", ()=> {
        document.querySelector("#tripOptions").classList.remove("hidden");
        document.querySelector("#dealPage").classList.add("hidden");
        document.querySelector("#dealCaruselLeft").removeEventListener("click", changePicLeft);
        document.querySelector("#dealCaruselRight").removeEventListener("click", changePicRight);
        dealPicNum = 1;
    });
    document.querySelector("#dealCaruselLeft").addEventListener("click", changePicLeft);
    document.querySelector("#dealCaruselRight").addEventListener("click", changePicRight);
    document.querySelector("#order").addEventListener("click", ()=>{
        window.close();
    });
}

const changePicRight = ()=> {
    if(dealPicNum > 1){
        dealPicNum--;
        document.querySelector("#dealPicNum").innerHTML = dealPicNum;
    } else {
        dealPicNum = MAXNUM;
        document.querySelector("#dealPicNum").innerHTML = dealPicNum;
    }
}

const changePicLeft = ()=> {
    if(dealPicNum === MAXNUM){
        dealPicNum = 1;
        document.querySelector("#dealPicNum").innerHTML = dealPicNum;
    } else {
        dealPicNum++;
        document.querySelector("#dealPicNum").innerHTML = dealPicNum;
    }
 
}

/* El
--------------------------------------------------------------
Description: create html elements */
function El(tagName, options = {}, ...children) {
    let el = Object.assign(document.createElement(tagName), options.fields || {});
    if (options.classes && options.classes.length) el.classList.add(...options.classes);
    else if (options.cls) el.classList.add(options.cls);
    if (options.id) el.id = options.id;
    el.append(...children.filter(el => el));
    for (let listenerName of Object.keys(options.listeners || {}))
        if (options.listeners[listenerName]) el.addEventListener(listenerName, options.listeners[listenerName], false);
    for (let attributeName of Object.keys(options.attributes || {})) {
        if (options.attributes[attributeName] !== undefined) el.setAttribute(attributeName, options.attributes[attributeName]);
    }
    return el;
}
