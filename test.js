const enableTestButton = false;
const testButtonElement = document.getElementById("test");
testButtonElement.addEventListener("click", testButton);

if (enableTestButton == false) {
    testButtonElement.remove();
}

function testButton() {
    settingsWindow.loadFile('settings.html');
}

function testBg() {
    if (user.art == "paimon2") {
        user.art = "mona";
    } else {
        user.art = "paimon2";
    }
    setBackground()
}

function toggleHideNovice() {
    user.hidenovice = !user.hidenovice;
    hideNovice();
    write();
}