let gifs = document.querySelectorAll(".clap");
gifs = Array.from(gifs);


function random(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

///////////////////////////


const NUMBEROF = 23;

let gifsLength = gifs.length;
let deleteNo = gifsLength - NUMBEROF;

let toDelete = [];


for (let i = 0; i < deleteNo; i++) {

    let rand = random(gifs.length-1, 0);



    while (toDelete.indexOf(rand) > -1) {

        rand = random(gifs.length-1, 0);
    }

    gifs.splice(rand, 1);
    toDelete.push(rand);
}

// console.log(toDelete);


function grid() {


    const xnum = 6;
    const ynum = 4;

    let screenHeigth = window.innerHeight;
    let screenWidth = window.innerWidth;

    let maxWidth = screenWidth / xnum;
    let maxHeight = screenHeigth / ynum;

    let xpos = [];
    let ypos = [];



    for (let i = 0, it = 0; it < xnum; i += maxWidth, it++) {
        xpos.push(i);
    }

    for (let i = 0, it = 0; it < ynum; i += maxHeight, it++) {
        ypos.push(i);
    }

    xpos = xpos.map(val => { // change 0 to something nicer
        if (val === 0) {
            return val = random(5, 15);
        }
        return val;
    })

    ypos = ypos.map(val => { // change 0 to something nicer
        if (val === 0) {
            return val = random(5, 15);
        }
        return val;
    })


    let combinations = [];
    let usedCombinations = [];


    for (x = 0; x < xnum; x++) {
        for (y = 0; y < ynum; y++) {
            combinations.push([xpos[x], ypos[y]])
        }
    }




    gifs.forEach(gif => {

        let index = random(0, combinations.length);

        while (usedCombinations.indexOf(index) > -1) { // check if it doubles
            index = random(0, combinations.length);
        }

        usedCombinations.push(index)


        gif.style.maxWidth = maxWidth - 15 + "px";
        gif.style.maxHeight = maxHeight - 15 + "px";

        gif.style.left = combinations[index][0] + random(-25, 35) + "px";
        gif.style.top = combinations[index][1] + random(-35, 20) + "px";



    });

}

//////////////////////////////////////////////////////////////////////



function show(gifs) {

    let int = 200;
    let i = int;

    gifs.forEach(gif => {
        setTimeout(function() {
            gif.style.display = "block";
        }, i);
        i += int;
    });
}


function hide(gifs) {

    let int = 200;
    let i = int;

    gifs.forEach(gif => {
        setTimeout(function() {
            gif.style.display = "none";
        }, i);
        i += int;
    });
}
