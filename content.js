document.addEventListener('DOMContentLoaded', onPageLoaded());

var blacklistStorageName = 'Blacklist';
var showblacklistGamesStorageName = 'ShowBlacklistdGames';

var hasInit = false;

var blacklistMap;

var checkboxClassName = 'checkboxImg';
var showBlacklistGameCheckboxContainerId = 'showBlacklistGameCheckboxContainerId';
var showBlacklistGameCheckboxClassName = 'showBlacklistGameCheckbox';
var showBlaclistGameTextClassName = 'showBlaclistGameText';
var showBlaclistGameTextInnerText = 'Also show in-blacklist games';

var actionCheckboxEnabled = 'checkbox_enabled';
var actionCheckboxDisabled = 'checkbox_disabled';

var srcCheckboxEnabled = 'image/checkbox_across_enabled.png';
var srcCheckboxDisabled = 'image/checkbox_across_disabled.png';

var actionShowBlacklistGameCheckboxEnabled = 'show_blacklist_game_checkbox_enabled';
var actionShowBlacklistGameCheckboxDisabled = 'show_blacklist_game_checkbox_disabled';

var srcShowBlacklistGameCheckboxEnabled = 'image/checkbox_tick_enabled.png';
var srcShowBlacklistGameCheckboxDisabled = 'image/checkbox_tick_disabled.png';

var showBlacklistGames = true;

//* Hide games per second due to Yuplay is a one-page website.
function onPageLoaded () {
    setTimeout(main, 500);
}

//* Hide games which are added to user's wishlist.
function main () {
    if (!hasInit) {
        initBlacklist();
        addShowBlacklistGameCheckbox();
        hasInit = true;
    }
    var gameListContainer = document.getElementsByClassName('catalog')[0];

    Array.from(gameListContainer.children).forEach(e => {
        var catalogImageContainer = e.children[0];
        var gameTitle = catalogImageContainer.getElementsByClassName('catalog-image-ratio-container')[0].title;
        var checkboxImg = catalogImageContainer.getElementsByClassName(checkboxClassName)[0];
        if (!checkboxImg) {
            checkboxImg = createCheckbox(catalogImageContainer);
            var inBlacklist = getGameStatus(gameTitle);
            if (inBlacklist) {
                setCheckboxEnabled(checkboxImg);
                hideGame(gameListContainer, e);
            }
            checkboxImg.gameContainer = e;
            checkboxImg.onclick = () => {
                if (checkboxImg.dataset.action == actionCheckboxDisabled) {
                    setCheckboxEnabled(checkboxImg);
                    addGameToBlacklist(gameTitle);
                    hideGame(gameListContainer, checkboxImg.gameContainer);
                } else {
                    setCheckboxDisabled(checkboxImg);
                    removeGameFromBlacklist(gameTitle);
                }
            }
        }
    });
    setTimeout(main, 500);
}

function initBlacklist () {
    hasInit = true;
    var blacklistEntriesJson = localStorage.getItem(blacklistStorageName);
    if (!blacklistEntriesJson) {
        blacklistMap = new Map([]);
    } else {
        blacklistMap = new Map(Object.entries(JSON.parse(blacklistEntriesJson)));
    }

    var showBlacklistGamesInStorage = localStorage.getItem(showblacklistGamesStorageName);
    if (showBlacklistGamesInStorage == null) {
        showBlacklistGames = true;
        localStorage.setItem(showblacklistGamesStorageName, 'true');
    } else {
        showBlacklistGames = showBlacklistGamesInStorage === 'true';
    }
}

function addShowBlacklistGameCheckbox () {
    var header = document.getElementById('navbar-main');
    header.className += ' flexbox';

    var showBlacklistContainer = document.createElement('div');
    showBlacklistContainer.id = showBlacklistGameCheckboxContainerId;
    showBlacklistContainer.className = 'flexbox';
    header.appendChild(showBlacklistContainer);

    var showBlacklistGameCheckboxImg = document.createElement('img');
    showBlacklistGameCheckboxImg.className = showBlacklistGameCheckboxClassName;
    if (showBlacklistGames) {
        setShowBlacklistGameCheckboxEnabled(showBlacklistGameCheckboxImg);
    } else {
        setShowBlacklistGameCheckboxDisabled(showBlacklistGameCheckboxImg);
    }
    showBlacklistGameCheckboxImg.onclick = () => {
        if (showBlacklistGameCheckboxImg.dataset.action == actionShowBlacklistGameCheckboxDisabled) {
            setShowBlacklistGameCheckboxEnabled(showBlacklistGameCheckboxImg);
            localStorage.setItem(showblacklistGamesStorageName, 'true');
        } else {
            setShowBlacklistGameCheckboxDisabled(showBlacklistGameCheckboxImg);
            localStorage.setItem(showblacklistGamesStorageName, 'false');
        }
        location.reload();
    }
    showBlacklistContainer.appendChild(showBlacklistGameCheckboxImg);

    var showBlaclistGameText = document.createElement('text');
    showBlaclistGameText.className = showBlaclistGameTextClassName;
    showBlaclistGameText.innerText = showBlaclistGameTextInnerText;
    showBlacklistContainer.appendChild(showBlaclistGameText);
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
    checkboxImg.src = chrome.runtime.getURL(srcCheckboxEnabled);
}

function setCheckboxDisabled (checkboxImg) {
    checkboxImg.dataset.action = actionCheckboxDisabled;
    checkboxImg.src = chrome.runtime.getURL(srcCheckboxDisabled);
}

function setShowBlacklistGameCheckboxEnabled (showBlacklistGameCheckboxImg) {
    showBlacklistGameCheckboxImg.dataset.action = actionShowBlacklistGameCheckboxEnabled;
    showBlacklistGameCheckboxImg.src = chrome.runtime.getURL(srcShowBlacklistGameCheckboxEnabled);
}

function setShowBlacklistGameCheckboxDisabled (showBlacklistGameCheckboxImg) {
    showBlacklistGameCheckboxImg.dataset.action = actionShowBlacklistGameCheckboxDisabled;
    showBlacklistGameCheckboxImg.src = chrome.runtime.getURL(srcShowBlacklistGameCheckboxDisabled);
}

function hideGame (gameListContainer, gameContainer) {
    if (!showBlacklistGames) {
        gameListContainer.removeChild(gameContainer)
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
    localStorage.setItem(blacklistStorageName, JSON.stringify(Object.fromEntries(blacklistMap)));
    showLog('Add "' + gameTitle + '" to blacklist. ');
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
    localStorage.setItem(blacklistStorageName, JSON.stringify(Object.fromEntries(blacklistMap)));
    showLog('Removed "' + gameTitle + '" from blacklist. ');
}

function showLog (msg) {
    console.log('%c[extension] ' + msg, 'color: green; font-weight: bold;');
}