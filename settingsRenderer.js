// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const remote = require('electron').remote;
const { ipcRenderer } = require('electron');
const win = remote.getCurrentWindow();
const parent = win.getParentWindow();

function Close() {
    ipcRenderer.send("Settings", "Close");
    win.close();
}

//Quick close
window.addEventListener('keydown', e => {
    if (e.key === "Escape") {
        Close();
    }
});

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
        parent.webContents.send("Settings", "getSettings");
    }
}

function handleWindowControls() {
    document.getElementById('close-button').addEventListener("click", event => {
        Close();
    });
}

const bgListElement = document.getElementById("bgList");
bgListElement.addEventListener("change", setCurrentBG);
function setCurrentBG() {
    parent.webContents.send("setBackground", bgListElement.value);
}

ipcRenderer.on('CurrentBG', (e, arg) => {
    for (let i = 0; i < bgListElement.options.length; i++) {
        if (bgListElement.options[i].value === arg) {
            bgListElement.selectedIndex = i;
            break;
        }
    }
});

const noviceWishSettingElement = document.getElementById("noviceWishSetting");
noviceWishSettingElement.addEventListener("change", setNovice);

function setNovice() {
    parent.webContents.send("setNovice", noviceWishSettingElement.checked);
}

ipcRenderer.on("CurrentHideNovice", (e, arg) => {
    noviceWishSettingElement.checked = arg;
});