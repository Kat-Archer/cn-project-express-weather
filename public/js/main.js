console.log("Inside JavaScript front-end");

let code = document.getElementById("date");
console.log(code);
code *= 1000;
console.log(code);
let date = new Date();
console.log(date);
date.toLocaleString();
console.log(date);


// const instruction = document.getElementById("instruction");instruction
// const place = document.getElementById("place");
// const temp = document.getElementById("temp");
// const feels = document.getElementById("feels");
// const type = document.getElementById("type");
// const pic = document.getElementById("pic");

// if (type === undefined) {
//     instruction.style.visibility = "visible";
//     place.style.visibility = "hidden";
//     temp.style.visibility = "hidden";
//     feels.style.visibility = "hidden";
//     type.style.visibility = "hidden";
//     pic.style.visibility = "hidden";
// } else {
//     instruction.style.visibility = "hidden";
//     place.style.visibility = "visible";
//     temp.style.visibility = "visible";
//     feels.style.visibility = "visible";
//     type.style.visibility = "visible";
//     pic.style.visibility = "visible";
// }