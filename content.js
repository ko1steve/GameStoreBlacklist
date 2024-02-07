document.addEventListener('DOMContentLoaded', onPageLoaded());

var blacklistName = 'YuplayBlocklist';

var blacklistMap;

var checkboxClassName = 'checkboxImg';

var actionCheckboxEnabled = 'checkbox_enabled';
var actionCheckboxDisabled = 'checkbox_disabled';

var srcCheckboxEnabled = 'https://i.imgur.com/vJpSnV6.png';
var srcCheckboxDisabled = 'https://i.imgur.com/oFoZXJ6.png';

var showBlacklistdGame = true;

//* Hide games per second due to Yuplay is a one-page website.
function onPageLoaded () {
    setTimeout(hideGames, 500);
}

//* Hide games which are added to user's wishlist.
function hideGames () {
    var blocklistEntries = Object.entries(JSON.parse(localStorage.getItem(blacklistName)));
    if (!blocklistEntries) {
        blocklistEntries = [];
    }
    blacklistMap = new Map(blocklistEntries);

    var gameList = document.getElementsByClassName('catalog')[0];

    Array.from(gameList.children).forEach(e => {
        var catalogImageContainer = e.children[0];
        var gameTitle = catalogImageContainer.getElementsByClassName('catalog-image-ratio-container')[0].title;
        var checkboxImg = catalogImageContainer.getElementsByClassName(checkboxClassName)[0];
        if (!checkboxImg) {
            checkboxImg = createCheckbox(catalogImageContainer);
            var isBlock = getGameStatus(gameTitle);
            if (isBlock) {
                showLog('Game "' + gameTitle + '" is in blacklist at starting. ');
                setCheckboxEnabled(checkboxImg);
                hideGame(gameList);
            }
            checkboxImg.onclick = () => {
                if (checkboxImg.dataset.action == actionCheckboxDisabled) {
                    setCheckboxEnabled(checkboxImg);
                    addGameToBlacklist(gameTitle);
                    hideGame(gameList);
                } else {
                    setCheckboxDisabled(checkboxImg);
                    removeGameFromBlacklist(gameTitle);
                }
            }
        }
    });
    setTimeout(hideGames, 500);
}

function createCheckbox (parent) {
    var checkboxConainer = document.createElement('div');
    checkboxImg = document.createElement('img');
    checkboxImg.className = checkboxClassName;
    setCheckboxDisabled(checkboxImg);
    checkboxConainer.appendChild(checkboxImg);
    parent.appendChild(checkboxConainer);
    return checkboxImg;
}

function setCheckboxEnabled (checkboxImg) {
    checkboxImg.dataset.action = actionCheckboxEnabled;
    checkboxImg.src = srcCheckboxEnabled;
}

function setCheckboxDisabled (checkboxImg) {
    checkboxImg.dataset.action = actionCheckboxDisabled;
    checkboxImg.src = srcCheckboxDisabled;
}

function hideGame (gameList) {
    if (!showBlacklistdGame) {
        gameList.removeChild(e);
    }
}

function getGameStatus (gameTitle) {
    let key = gameTitle[0];
    if (!blacklistMap.has(key) || !blacklistMap.get(key).includes(gameTitle)) {
        return false;
    }
    return true;
}

function addGameToBlacklist (gameTitle) {
    let key = gameTitle[0];
    if (!blacklistMap.has(key)) {
        blacklistMap.set(key, [gameTitle]);
    } else {
        var list = blacklistMap.get(key);
        list.push(gameTitle);
        blacklistMap.set(key, list);
    }
    localStorage.setItem(blacklistName, JSON.stringify(Object.fromEntries(blacklistMap)));
    showLog('Add "' + gameTitle + '" to blacklist now. ');
}

function removeGameFromBlacklist (gameTitle) {
    let key = gameTitle[0];
    if (!blacklistMap.has(key)) {
        return;
    }
    var list = blacklistMap.get(key);
    var index = list.findIndex(e => e == gameTitle);
    if (index < 0) {
        return;
    }
    list.splice(index, 1);
    blacklistMap.set(key, list);
    localStorage.setItem(blacklistName, JSON.stringify(Object.fromEntries(blacklistMap)));
    showLog('Removed "' + gameTitle + '" from blacklist now. ');
}

function showLog (msg) {
    console.log('%c' + msg, 'color: green; font-weight: bold;');
}