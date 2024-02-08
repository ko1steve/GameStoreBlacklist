document.addEventListener('DOMContentLoaded', onPageLoaded());

var blacklistStorageName = 'Blacklist';
var showblacklistGamesStorageName = 'ShowBlacklistdGames';

var blacklistMap;

var checkboxClassName = 'checkboxImg';

var headerBottomContainerId = 'showBlacklistGameCheckboxContainerId';

var showBlacklistGameCheckboxContainerId = 'showBlacklistGameCheckboxContainer';
var showBlacklistGameCheckboxContainerClassName = 'flexbox flexboxItem';

var showBlacklistGameCheckboxClassName = 'showBlacklistGameCheckbox';
var showBlaclistGameTextClassName = 'showBlaclistGameText';
var showBlaclistGameTextInnerText = 'Also show in-blacklist games';

var actionCheckboxEnabled = 'checkbox_enabled';
var actionCheckboxDisabled = 'checkbox_disabled';

var srcCheckboxEnabled = 'image/checkbox_across_enabled.png';
var srcCheckboxDisabled = 'image/checkbox_across_disabled.png';

var actionShowBlacklistGameCheckboxEnabled = 'actionShowBlacklistGameCheckboxEnabled';
var actionShowBlacklistGameCheckboxDisabled = 'actionShowBlacklistGameCheckboxDisabled';

var srcShowBlacklistGameCheckboxEnabled = 'image/checkbox_tick_enabled.png';
var srcShowBlacklistGameCheckboxDisabled = 'image/checkbox_tick_disabled.png';

var downloadLocalStorageAsJsonButtonClassName = 'downloadLocalStorageAsJsonButton flexboxItem';
var downloadLocalStorageAsJsonButtonTextContent = 'Download local stoage data as JSON';

var uploadLocalStorageFromJsonInputId = 'uploadLocalStorageFromJsonInput';
var uploadLocalStorageFromJsonButtonClassName = 'downloadLocalStorageAsJsonButton flexboxItem';
var uploadLocalStorageFromJsonButtonTextContent = 'Upload local storage data from JSON';

var showBlacklistGames = true;
var hasInit = false;

//* Hide games per 500 mileseconds due to Yuplay.com is a one-page website.
function onPageLoaded () {
    setTimeout(main, 500);
}

//* Hide games which are added to user's wishlist.
function main () {
    if (!hasInit) {
        initBlacklist();
        createHeaderBottomContainer();
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

function createHeaderBottomContainer () {
    var header = document.getElementById('navbar-main');
    header.className += ' flexbox';

    var headerBottomContainer = document.createElement('div');
    headerBottomContainer.id = headerBottomContainerId;
    headerBottomContainer.className = 'flexbox';
    header.appendChild(headerBottomContainer);

    createShowBlacklistGameCheckbox(headerBottomContainer);
    createDownloadButton(headerBottomContainer);
    createUploadButton(headerBottomContainer);
}

function createShowBlacklistGameCheckbox (parent) {
    var showBlacklistGameCheckboxContainer = document.createElement('div');
    showBlacklistGameCheckboxContainer.id = showBlacklistGameCheckboxContainerId;
    showBlacklistGameCheckboxContainer.className = showBlacklistGameCheckboxContainerClassName;
    parent.appendChild(showBlacklistGameCheckboxContainer);

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
    showBlacklistGameCheckboxContainer.appendChild(showBlacklistGameCheckboxImg);

    var showBlaclistGameText = document.createElement('text');
    showBlaclistGameText.className = showBlaclistGameTextClassName;
    showBlaclistGameText.innerText = showBlaclistGameTextInnerText;
    showBlacklistGameCheckboxContainer.appendChild(showBlaclistGameText);
}

function createDownloadButton (parent) {
    var downloadLocalStorageAsJsonButton = document.createElement('button');
    downloadLocalStorageAsJsonButton.className = downloadLocalStorageAsJsonButtonClassName;
    downloadLocalStorageAsJsonButton.textContent = downloadLocalStorageAsJsonButtonTextContent;
    downloadLocalStorageAsJsonButton.onclick = () => {
        downloadLocalStorageDataAsJson();
    }
    parent.appendChild(downloadLocalStorageAsJsonButton);
}

function downloadLocalStorageDataAsJson () {
    var blacklistContent = localStorage.getItem(blacklistStorageName);
    const blob = new Blob([blacklistContent], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'blacklist.json';
    a.click();
}

function createUploadButton (parent) {
    var uploadLocalStorageFromJsonInput = document.createElement('input');
    uploadLocalStorageFromJsonInput.type = 'file';
    uploadLocalStorageFromJsonInput.id = uploadLocalStorageFromJsonInputId;
    uploadLocalStorageFromJsonInput.accept = '.json';
    parent.appendChild(uploadLocalStorageFromJsonInput);

    var uploadLocalStorageFromJsonButton = document.createElement('button');
    uploadLocalStorageFromJsonButton.className = uploadLocalStorageFromJsonButtonClassName;
    uploadLocalStorageFromJsonButton.textContent = uploadLocalStorageFromJsonButtonTextContent;
    uploadLocalStorageFromJsonButton.onclick = () => uploadLocalStorageFromJson();
    parent.appendChild(uploadLocalStorageFromJsonButton);
}

function uploadLocalStorageFromJson () {
    const fileInput = document.getElementById(uploadLocalStorageFromJsonInputId);

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.onload = function (event) {
            const jsonContent = event.target.result;
            localStorage.setItem(blacklistStorageName, jsonContent);
            alert('Finished.');
            showLog('Data : ' + localStorage.getItem(blacklistStorageName));
        };

        reader.readAsText(file);
    } else {
        alert('Please select a JSON file to upload.');
    }
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