import flowerImage from "./assets/img/flower.svg";
import leafImage from "./assets/img/leaf.svg";

let weatherStorm = function () {
    let plantMax;
    let plantVariety =[
                        ["mirror"], 
                        ["shuffleL", "shuffleR", "slideL", "slideR"], 
                        ["jump", "fly", "dig", "tunnel"], 
                        ["tipsy", "boozy", "drunk", "confused", "disoriented", "lost"], 
                        ["wisp", "ghost", "ghoul"], 
                        ["fairy", "dwarf", "giant", "goliath"]
                    ];

    if ( window.innerWidth <= 800 ) {
        plantMax = 15;
    } else {
        plantMax = 30;
    }

    for (let n = 0; n < plantMax; n++) {
        let body = document.querySelector("body");
        let allContent = document.querySelector("#allContent");

        let plant = document.createElement("img");
        plant.src = Math.random() > 0.49 ? flowerImage : leafImage;
        plant.classList.add("plant");

        function planting() {
            let maxX = window.innerWidth <= 800 ? (allContent.getBoundingClientRect().width) * 0.90 : allContent.getBoundingClientRect().width;
            let maxY = body.scrollHeight * 0.91;
            let x = Math.random() * maxX;
            let y = Math.random() * maxY;

            plant.style = `left: ${x}px; top: ${y}px;`;
            body.appendChild(plant)
        }

        let categorySelect;
        let chance = Math.random();
        let selectVariant = function() {
            categorySelect = plantVariety[Math.floor(Math.random() * plantVariety.length)];
            return categorySelect[Math.floor(Math.random() * categorySelect.length)];
        }

        let currentPick = selectVariant();

        let duplicatePrevent = function() {
            let currTrait = [];
            let newTrait = [];

            while (newTrait.length < 2 && currTrait.length < 2 ) {

                for ( let i = 0; i < plantVariety.length; i++ ) {
                    for ( let j = 0; j < plantVariety[i].length; j++ ) {
                        if ( plantVariety[i][j] === plant.classList[1] ) {
                            currTrait = [i, j];
                        }

                        if ( plantVariety[i][j] === `${currentPick}` ) {
                            newTrait = [i, j];
                        }
                    }
            }

                if ( newTrait.length === 2 && currTrait.length === 2 ) {
                    
                    if ( newTrait.toString() === currTrait.toString() || newTrait[0] === currTrait[0] ) {
                        currTrait.length = 0;
                        newTrait.length = 0;
                        currentPick = selectVariant();
                        duplicatePrevent();
                    } else {
                        plant.classList.add(`${currentPick}`);
                    }
                }
            }
        }   
        
        if ( chance > 0.4) {
            plant.classList.add(currentPick);
        }

        if ( chance > 0.7) {
            duplicatePrevent();
        } 

        planting();
    } 
}

export { weatherStorm };