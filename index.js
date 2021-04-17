const occurenceMap = [
    0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1
];

const colors = [
    "#7b6f83", "#9c4300", "#4fa6eb", "#517d19", "#f0ad00"
];

let rollLabel = document.getElementById("rollLabel");

function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; --i) {
        const swapIdx = Math.floor(Math.random() * i);
        [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
    }
}

function* rollOccurenceGenerator() {
    for (let roll = 0; roll < occurenceMap.length; ++roll) {
        for (let occurence = 0; occurence < occurenceMap[roll]; ++occurence) {
            yield roll;
        }
    }
}

function* rollGenerator() {
    let rolls = [...rollOccurenceGenerator()];
    while (true) {
        shuffle(rolls)
        for (const roll of rolls) {
            yield roll;
        }
    }
}

function* colorGenerator() {
    while (true) {
        for (const color of colors) {
            yield color;
        }
    }
}

const colorSeq = colorGenerator();
const rollSeq = rollGenerator();

function onRoll() {
    rollLabel.style.color = colorSeq.next().value;
    rollLabel.innerHTML = rollSeq.next().value;
}
document.getElementById("roll").onclick = onRoll;