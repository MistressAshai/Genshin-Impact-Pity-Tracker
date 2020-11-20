const fs = require('fs')

let user = {
    wish: {
        permanent: {
            rolls: 0,
            pity4: 10,
            pity5: 90
        },
        character: {
            rolls: 0,
            pity4: 10,
            pity5: 90
        },
        novice: {
            rolls: 0,
            pity4: 10,
            pity5: 90
        },
        weapon: {
            rolls: 0,
            pity4: 10,
            pity5: 90
        }
    },
    banner: "permanent",
    hidenovice: true,
    art: "paimon"
};

function setRolls() {
    const wish = user.wish[user.banner];
    wish.rolls = rolls;
    wish.pity4 = pity4;
    wish.pity5 = pity5;
}

function getRolls() {
    const wish = user.wish[user.banner];
    rolls = wish.rolls;
    pity4 = wish.pity4;
    pity5 = wish.pity5;
}

function read() {
    fs.readFile('user.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            update();
            return;
        }
        try {
            user = JSON.parse(jsonString)
            for (let i = 0; i < wishListElement.options.length; i++) {
                if (wishListElement.options[i].value === user.banner) {
                    wishListElement.selectedIndex = i;
                    break;
                }
            }
            getRolls();
            hideNovice();
            setBackground();
            update();
        }
        catch(err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}

function write() {
    setRolls();
    let jsonString = JSON.stringify(user, null, 2);
    fs.writeFileSync('user.json', jsonString, err => {
        if (err) {
            console.log("Error writing file", err);
        }
        else {
            console.log("Successfully wrote file");
        }
    });
}

const wishListElement = document.getElementById("wishList");
wishListElement.addEventListener("change", setWishType);
function setWishType() {
    setRolls();
    user.banner = wishListElement.value;
    getRolls();
    update();
}

let settingsWindow = null;
document.getElementById("settingsBtn").addEventListener("click", settings);
function settings() {
    //implement settings window here lol
    const parentWindow = remote.getCurrentWindow();

    const BrowserWindow = remote.BrowserWindow;
    settingsWindow = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        resizable: false,
        show: false,
        parent: parentWindow,
        modal: true,
        backgroundColor: '#1C1C22',
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      });

    settingsWindow.loadFile('settings.html');

    settingsWindow.once('ready-to-show', () => {
        settingsWindow.show();
      });
}

let currentart = user.art;
function setBackground() {
    let body = document.body;

    body.classList.remove(currentart);
    body.classList.add(user.art);
    write();
}

ipcRenderer.on('setBackground', (event, arg) => {
    if (arg == user.art) {
        return;
    }
    currentart = user.art;
    user.art = arg;
    setBackground();
});

ipcRenderer.on("setNovice", (e, arg) => {
    user.hidenovice = arg;
    hideNovice();
});

ipcRenderer.on('Settings', (event, arg) => {
    if (arg == "getSettings") {
        settingsWindow.webContents.send("CurrentBG", user.art);
        settingsWindow.webContents.send("CurrentHideNovice", user.hidenovice);
    }
});

read();