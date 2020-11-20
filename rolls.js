let rolls = 0;
let pity4 = 10;
let pity5 = 90;

const rollBtnElement = document.getElementById("rollBtn");
rollBtnElement.addEventListener("click", roll);
function roll() {
    rolls++;
    pity4--;
    pity5--;
    update();
}

const roll10BtnElement = document.getElementById("roll10Btn");
roll10BtnElement.addEventListener("click", roll10);
function roll10() {
    for (let i = 0; i < 10; i++) {
        rolls++;
        pity4--;
        pity5--;
        update();
    }
}

const pity4BtnElement = document.getElementById("pity4Btn");
pity4BtnElement.addEventListener("click", resetPity4);
function resetPity4() {
    pity4 = 10;
    update();
}

const pity5BtnElement = document.getElementById("pity5Btn");
pity5BtnElement.addEventListener("click", resetPity5);
function resetPity5() {
    pity5 = 90;
    update();
}

document.getElementById("resetBtn").addEventListener("click", resetAll);
function resetAll() {
    rolls = 0;
    pity4 = 10;
    pity5 = 90;
    update();
}

function getPrimogems(rollamount) {
    return 160 * rollamount;
}

function noviceCanRollCheck() {
    pity4BtnElement.disabled = false;
    pity5BtnElement.disabled = false;
    rollBtnElement.disabled = false;
    roll10BtnElement.disabled = false;
    if (user.banner == "novice") {
        roll10BtnElement.disabled = (rolls >= 11);
        if (rolls >= 20) {
            pity4BtnElement.disabled = true;
            pity5BtnElement.disabled = true;
            rollBtnElement.disabled = true;
        }
    }
}

let noviceSelectOptionElement = document.getElementById("novice");
function hideNovice() {
    if (user.banner != "novice" && user.hidenovice == true) {
        noviceSelectOptionElement.disabled = true;
        noviceSelectOptionElement.style.display = "none";
    } else {
        noviceSelectOptionElement.disabled = false;
        noviceSelectOptionElement.style.display = "revert";
    }
}

const currentElement = document.getElementById("current");
const pity4Element = document.getElementById("pity4");
const pity5Element = document.getElementById("pity5");
const pity4primogemElement = document.getElementById("pity4primogems");
const pity5primogemElement = document.getElementById("pity5primogems");
function update() {
    if (pity4 <= 0) {
        pity4 = 10;
    }
    if (pity5 <= 0) {
        pity5 = 90;
    }

    noviceCanRollCheck();

    currentElement.innerHTML = rolls;
    pity4Element.innerHTML = pity4;
    pity5Element.innerHTML = pity5;
    pity4primogemElement.innerHTML = getPrimogems(pity4);
    pity5primogemElement.innerHTML = getPrimogems(pity5);
    write();
}