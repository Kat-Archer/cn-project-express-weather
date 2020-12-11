console.log("Inside JavaScript front-end");


const instructionEl = document.getElementById("instruction");instruction
const placeEl = document.getElementById("place");
const tempEl = document.getElementById("temp");
const feelsEl = document.getElementById("feels");
const typeEl = document.getElementById("type");
const picEl = document.getElementById("pic");
const temp = tempEl.textContent;
console.log(temp)

if (temp === "°c") {
    console.log("true");
    placeEl.style.visibility = "hidden";
    tempEl.style.visibility = "hidden";
    feelsEl.style.visibility = "hidden";
    typeEl.style.visibility = "hidden";
    picEl.style.visibility = "hidden";
} else {
    console.log("false");
    placeEl.style.visibility = "visible";
    tempEl.style.visibility = "visible";
    feelsEl.style.visibility = "visible";
    typeEl.style.visibility = "visible";
    picEl.style.visibility = "visible";
}