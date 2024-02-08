document.addEventListener('DOMContentLoaded', onPageLoaded());

var blacklistStorageName = 'Blacklist';
var showblacklistGamesStorageName = 'ShowBlacklistdGames';

var blacklistMap;

var checkboxClassName = 'checkboxImg';

var headerBottomContainerId = 'showBlacklistGameCheckboxContainerId';

var showBlacklistGameCheckboxContainerId = 'showBlacklistGameCheckboxContainer';
var showBlacklistGameCheckboxContainerClassName = 'flexbox flexboxItem';

var showBlacklistGameCheckboxImg;

var showBlacklistGameCheckboxImgId = 'showBlacklistGameCheckboxImg';

var showBlaclistGameCheckboxTextId = 'showBlaclistGameCheckboxText';
var showBlaclistGameCheckboxTextInnerText = 'Also show in-blacklist games';

var actionCheckboxEnabled = 'checkbox_enabled';
var actionCheckboxDisabled = 'checkbox_disabled';

var srcCheckboxEnabled = 'image/checkbox_across_enabled.png';
var srcCheckboxDisabled = 'image/checkbox_across_disabled.png';

var actionShowBlacklistGameCheckboxEnabled = 'actionShowBlacklistGameCheckboxEnabled';
var actionShowBlacklistGameCheckboxDisabled = 'actionShowBlacklistGameCheckboxDisabled';

var srcShowBlacklistGameCheckboxEnabled = 'image/checkbox_tick_enabled.png';
var srcShowBlacklistGameCheckboxDisabled = 'image/checkbox_tick_disabled.png';

var downloadLocalStorageAsJsonButtonId = 'downloadLocalStorageAsJsonButton';
var downloadLocalStorageAsJsonButtonClassName = 'flexboxItem';
var downloadLocalStorageAsJsonButtonTextContent = 'Download local stoage data as JSON';

var uploadLocalStorageFromJsonInputId = 'uploadLocalStorageFromJsonInput';

var uploadLocalStorageFromJsonLabelId = 'uploadLocalStorageFromJsonLabel';
var uploadLocalStorageFromJsonLabelClassName = 'flexboxItem';
var uploadLocalStorageFromJsonLabelTextContent = 'Upload JSON to overwrite local storage data';

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
    handleGameInMainItem();
    handleGamesInRecommendedItems();
    handleGamesInPageItems();
    setTimeout(main, 500);
}

function handleGameInMainItem () {
    var mainItemContainer = document.getElementById('product-main-information');
    if (!mainItemContainer) {
        return;
    }
    var gameTitle = mainItemContainer.getElementsByClassName('product-name')[0].innerHTML;
    var imageContainer = mainItemContainer.getElementsByClassName('catalog-image-container')[0];
    var checkboxImg = imageContainer.getElementsByClassName(checkboxClassName)[0];
    if (!checkboxImg) {
        checkboxImg = createCheckbox(imageContainer);
        var inBlacklist = getGameStatus(gameTitle);
        if (inBlacklist) {
            setCheckboxEnabled(checkboxImg);
        }
        checkboxImg.onclick = () => {
            if (checkboxImg.dataset.action == actionCheckboxDisabled) {
                setCheckboxEnabled(checkboxImg);
                addGameToBlacklist(gameTitle);
            } else {
                setCheckboxDisabled(checkboxImg);
                removeGameFromBlacklist(gameTitle);
            }
        }
    }
}

function handleGamesInRecommendedItems () {
    var gameListContainer = document.getElementsByClassName('catalog')[0];
    if (!gameListContainer || gameListContainer.dataset.catalog_id != 'recommended-catalog') {
        return;
    }
    Array.from(gameListContainer.getElementsByClassName('catalog-item')).forEach(e => {
        e.dataset.hasInit = "true";
        var imageContainer = e.children[0];
        var gameTitle = imageContainer.getElementsByClassName('catalog-image-ratio-container')[0].title;
        var checkboxImg = imageContainer.getElementsByClassName(checkboxClassName)[0];
        if (!checkboxImg) {
            checkboxImg = createCheckbox(imageContainer);
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
}

function handleGamesInPageItems () {
    var gameListContainer = document.getElementsByClassName('catalog')[0];
    if (!gameListContainer || gameListContainer.dataset.catalog_id != 'page-products-catalog') {
        return;
    }
    if (gameListContainer.children[0].dataset && gameListContainer.children[0].dataset.hasInit === "true") {
        return;
    }
    Array.from(gameListContainer.children).forEach(e => {
        e.dataset.hasInit = "true";
        var imageContainer = e.children[0];
        var gameTitle = imageContainer.getElementsByClassName('catalog-image-ratio-container')[0].title;
        var checkboxImg = imageContainer.getElementsByClassName(checkboxClassName)[0];
        if (!checkboxImg) {
            checkboxImg = createCheckbox(imageContainer);
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
}

function initBlacklist () {
    hasInit = true;
    var jsonContent = localStorage.getItem(blacklistStorageName);
    if (!jsonContent) {
        blacklistMap = new Map([]);
    } else {
        blacklistMap = new Map(Object.entries(JSON.parse(jsonContent)));
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

    var container = document.createElement('div');
    container.id = headerBottomContainerId;
    container.className = 'flexbox';
    header.appendChild(container);

    createShowBlacklistGameCheckbox(container);
    createDownloadButton(container);
    createUploadButton(container);
}

function createShowBlacklistGameCheckbox (parent) {
    var container = document.createElement('div');
    container.id = showBlacklistGameCheckboxContainerId;
    container.className = showBlacklistGameCheckboxContainerClassName;
    parent.appendChild(container);

    showBlacklistGameCheckboxImg = document.createElement('img');
    showBlacklistGameCheckboxImg.id = showBlacklistGameCheckboxImgId;
    if (showBlacklistGames) {
        setShowBlacklistGameCheckboxEnabled();
    } else {
        setShowBlacklistGameCheckboxDisabled();
    }
    showBlacklistGameCheckboxImg.onclick = () => {
        if (showBlacklistGameCheckboxImg.dataset.action == actionShowBlacklistGameCheckboxDisabled) {
            setShowBlacklistGameCheckboxEnabled();
            localStorage.setItem(showblacklistGamesStorageName, 'true');
        } else {
            setShowBlacklistGameCheckboxDisabled();
            localStorage.setItem(showblacklistGamesStorageName, 'false');
        }
        location.reload();
    }
    container.appendChild(showBlacklistGameCheckboxImg);

    var text = document.createElement('text');
    text.id = showBlaclistGameCheckboxTextId;
    text.innerText = showBlaclistGameCheckboxTextInnerText;
    container.appendChild(text);
}

function createDownloadButton (parent) {
    var button = document.createElement('button');
    button.id = downloadLocalStorageAsJsonButtonId;
    button.className = downloadLocalStorageAsJsonButtonClassName;
    button.textContent = downloadLocalStorageAsJsonButtonTextContent;
    button.onclick = () => {
        downloadLocalStorageDataAsJson();
    }
    parent.appendChild(button);
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
    var label = document.createElement('label');
    label.htmlFor = uploadLocalStorageFromJsonInputId;
    label.id = uploadLocalStorageFromJsonLabelId;
    label.className = uploadLocalStorageFromJsonLabelClassName;
    label.textContent = uploadLocalStorageFromJsonLabelTextContent;
    parent.appendChild(label);

    var input = document.createElement('input');
    input.type = 'file';
    input.id = uploadLocalStorageFromJsonInputId;
    input.accept = '.json';
    input.onchange = () => {
        if (confirm('Are you sure to upload the JSON ?')) {
            uploadLocalStorageDataFromJson();
        } else {
            input.files = null;
            input.value = null;
        }
    };
    parent.appendChild(input);
}

function uploadLocalStorageDataFromJson () {
    const fileInput = document.getElementById(uploadLocalStorageFromJsonInputId);

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.onload = function (event) {
            const jsonContent = event.target.result;
            localStorage.setItem(blacklistStorageName, jsonContent);
            alert('Finished.');
            location.reload();
        };

        reader.readAsText(file);
    } else {
        alert('Please select a JSON file to upload.');
    }
}

function createCheckbox (parent) {
    var conainer = document.createElement('div');
    checkboxImg = document.createElement('img');
    checkboxImg.className = checkboxClassName;
    setCheckboxDisabled(checkboxImg);
    conainer.appendChild(checkboxImg);
    parent.appendChild(conainer);
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

function setShowBlacklistGameCheckboxEnabled () {
    showBlacklistGameCheckboxImg.dataset.action = actionShowBlacklistGameCheckboxEnabled;
    showBlacklistGameCheckboxImg.src = chrome.runtime.getURL(srcShowBlacklistGameCheckboxEnabled);
}

function setShowBlacklistGameCheckboxDisabled () {
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
    if (!blacklistMap.has(key)) {
        return false;
    }
    return blacklistMap.get(key).includes(gameTitle);
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