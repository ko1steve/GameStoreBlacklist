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

var showBlacklistGameCheckboxTextId = 'showBlaclistGameCheckboxText';
var showBlacklistGameCheckboxTextInnerText = 'Also show in-blacklist games ({numberOfGames} games)';

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

var numberOfGames = 0;

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
    handleGamesInSearchItems();
    setTimeout(main, 500);
}

function trimGameName () {
    var jsonContent = localStorage.getItem(blacklistStorageName);
    if (!jsonContent) {
        return;
    } else {
        var blacklistMap = new Map(Object.entries(JSON.parse(jsonContent)));
        blacklistMap.forEach((gameArr, k) => {
            gameArr.forEach((gameTitle, i) => {
                gameArr[i] = gameTitle.trim();
            });
            blacklistMap.set(k, gameArr);
        });
    }
    localStorage.setItem(blacklistStorageName, JSON.stringify(Object.fromEntries(blacklistMap)));
    return true;
}

function initBlacklist () {
    hasInit = true;
    var jsonContent = localStorage.getItem(blacklistStorageName);
    if (!jsonContent) {
        blacklistMap = new Map([]);
    } else {
        blacklistMap = new Map(Object.entries(JSON.parse(jsonContent)));
    }
    initNumberOfGame();
    var showBlacklistGamesInStorage = localStorage.getItem(showblacklistGamesStorageName);
    if (showBlacklistGamesInStorage == null) {
        showBlacklistGames = true;
        localStorage.setItem(showblacklistGamesStorageName, 'true');
    } else {
        showBlacklistGames = showBlacklistGamesInStorage === 'true';
    }
}

function initNumberOfGame () {
    blacklistMap.forEach(list => {
        numberOfGames += list.length;
    })
}

function createHeaderBottomContainer () {
    var header = document.getElementsByClassName('main-container row no-gutters')[0];
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
    text.id = showBlacklistGameCheckboxTextId;
    var textContent = showBlacklistGameCheckboxTextInnerText.replace('{numberOfGames}', numberOfGames);
    text.innerText = textContent;
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

function handleGamesInSearchItems () {
    var gameListContainer = document.getElementsByClassName('search-results__tiles ng-star-inserted')[0];
    if (!gameListContainer || !gameListContainer.children[0] || !gameListContainer.children[0].children[0]) {
        return;
    }
    if (gameListContainer.children[0] && gameListContainer.children[0].dataset && gameListContainer.children[0].dataset.hasInit === "true") {
        return;
    }
    Array.from(gameListContainer.children).forEach(oldElement => {
        if (oldElement.dataset.hasInit) {
            gameListContainer.removeChild(oldElement);
            return;
        }
        var newElement = getNewProductElement(oldElement);
        if (!newElement) { return; }
        gameListContainer.removeChild(oldElement);
        gameListContainer.appendChild(newElement);

        newElement.dataset.hasInit = "true";

        var productTitleContainer = newElement.getElementsByClassName('product-tile')[0];

        var productImageContainer = productTitleContainer.getElementsByClassName('product-tile__image ng-star-inserted')[0];
        if (!productImageContainer) { return; }

        var imageLinkContainer = productImageContainer.getElementsByTagName('div')[0];

        var gameTitle = newElement.children[0].children[1].children[0].children[0].innerText;
        gameTitle = getTitleWithoutExcludeWords(gameTitle);

        var checkboxImg = imageLinkContainer.getElementsByClassName(checkboxClassName)[0];
        if (!checkboxImg) {
            checkboxImg = createCheckbox(imageLinkContainer);
            var inBlacklist = getGameStatus(gameTitle);
            if (inBlacklist) {
                console.log('[extension] In Blacklist : ' + gameTitle);
                setCheckboxEnabled(checkboxImg);
                hideGame(gameListContainer, newElement);
            }
            checkboxImg.gameContainer = newElement;
            checkboxImg.onclick = () => {
                if (checkboxImg.dataset.action == actionCheckboxDisabled) {
                    setCheckboxEnabled(checkboxImg);
                    addGameToBlacklist(gameTitle);
                    updateNumberOfGameOnAddGame();
                    hideGame(gameListContainer, checkboxImg.gameContainer);
                    alert('"' + gameTitle + '" has been blacklisted.')
                } else {
                    setCheckboxDisabled(checkboxImg);
                    removeGameFromBlacklist(gameTitle);
                    updateNumberOfGameOnRemoveGame();
                }
            }
        }
    });
}

function getNewProductElement (producElement) {
    var nProducElement = document.createElement('div');
    nProducElement.dataset.hasInit = 'true';
    nProducElement.className = producElement.className;

    var productTitleContainer = producElement.getElementsByClassName('product-tile')[0];
    if (!productTitleContainer) { return null; }
    var nProductTitleContainer = document.createElement('div');
    nProductTitleContainer.className = productTitleContainer.className;
    nProducElement.appendChild(nProductTitleContainer);

    var productImageContainer = productTitleContainer.getElementsByClassName('product-tile__image ng-star-inserted')[0];
    if (!productImageContainer) { return null; }
    var nProductImageContainer = document.createElement('div');
    nProductImageContainer.className = productImageContainer.className;
    nProductTitleContainer.appendChild(nProductImageContainer);

    var imageLinkContainer = productImageContainer.getElementsByClassName('ng-star-inserted')[0];
    if (!imageLinkContainer) { return null; }
    var nImageLinkContainer = document.createElement('div');
    nImageLinkContainer.className = imageLinkContainer.className;
    nProductImageContainer.appendChild(nImageLinkContainer);

    var nAhrefImageContainer = document.createElement('div');
    nImageLinkContainer.appendChild(nAhrefImageContainer);

    var nAppImageContainer = document.createElement('div');
    nAhrefImageContainer.appendChild(nAppImageContainer);

    var figureContainer = imageLinkContainer.getElementsByTagName('figure')[0];
    if (!figureContainer) { return null; }
    var nFigureContainer = document.createElement('div');
    nFigureContainer.className = figureContainer.className;
    nAppImageContainer.appendChild(nFigureContainer);

    var imageElement = imageLinkContainer.getElementsByTagName('img')[0];
    if (!imageElement) { return null; }
    var nImageElement = document.createElement('img');
    nImageElement.className = imageElement.className;
    nImageElement.alt = imageElement.alt;
    nImageElement.src = imageElement.src;
    nImageElement.width = imageElement.width;
    nImageElement.height = imageElement.height;
    nFigureContainer.appendChild(nImageElement);

    var descriptionContainer = productTitleContainer.getElementsByClassName('product-tile__description ng-star-inserted')[0];
    if (!descriptionContainer) { return null; }
    var nDescriptionContainer = document.createElement('div');
    nDescriptionContainer.className = descriptionContainer.className;
    nProductTitleContainer.appendChild(nDescriptionContainer);

    var producTitleNameContainer = descriptionContainer.getElementsByClassName('product-tile__name')[0];
    if (!producTitleNameContainer) { return null; }
    var nProducTitleNameContainer = document.createElement('div');
    nProducTitleNameContainer.className = producTitleNameContainer.className;
    nDescriptionContainer.appendChild(nProducTitleNameContainer);

    var producTitleNameAhrefElement = producTitleNameContainer.getElementsByTagName('a')[0];
    var nProducTitleNameAhrefElement = document.createElement('a');
    nProducTitleNameAhrefElement.className = producTitleNameAhrefElement.className;
    nProducTitleNameAhrefElement.href = producTitleNameAhrefElement.href;
    nProducTitleNameContainer.appendChild(nProducTitleNameAhrefElement);

    var producTitleNameElement = producTitleNameAhrefElement.getElementsByTagName('span')[0];
    var nProducTitleNameElement = document.createElement('span');
    nProducTitleNameElement.className = producTitleNameElement.className;
    nProducTitleNameElement.innerText = producTitleNameElement.innerText;
    nProducTitleNameAhrefElement.appendChild(nProducTitleNameElement);

    var priceInfoContainer = descriptionContainer.getElementsByClassName('product-tile__price')[0];
    var nPriceInfoContainer = document.createElement('div');
    nPriceInfoContainer.className = priceInfoContainer.className;
    nDescriptionContainer.appendChild(nPriceInfoContainer);

    var oldAndNewPriceElement = priceInfoContainer.getElementsByTagName('span')[0];
    var nOldAndNewPriceElement = document.createElement('span');
    nOldAndNewPriceElement.className = oldAndNewPriceElement.className;
    nPriceInfoContainer.appendChild(nOldAndNewPriceElement);

    var currentPriceElement = oldAndNewPriceElement.getElementsByTagName('span')[0];
    var nCurrentPriceElement = document.createElement('span');
    nCurrentPriceElement.className = currentPriceElement.className;
    nCurrentPriceElement.innerText = currentPriceElement.innerText;
    nOldAndNewPriceElement.appendChild(nCurrentPriceElement);

    return nProducElement;
}

const cutToEndWords = [
    ' EN/', ' EU/', ' DE/', ' FR/', ' IT/', ' ZH/', ' JA/', ' ES/', ' RU/', ' PL/', ' CS/', 'ROW/',
    ' EN ', ' EU ', ' DE ', ' FR ', ' IT ', ' ZH ', ' JA ', ' ES ', ' RU ', ' PL ', ' CS ', ' ROW ',
    ' Steam Account'
];
const excludeTitleWords = ['Steam Gift', 'Global Steam Gift', 'Global Steam', 'Asia Steam'];
const endWords = [
    ' EN', ' EU', ' DE', ' FR', ' IT', ' ZH', ' JA', ' ES', ' RU', ' PL', ' CS', ' ROW',
];

function getTitleWithoutExcludeWords (gameTitle) {
    cutToEndWords.forEach(e => {
        var cutIndex = gameTitle.indexOf(e);
        if (cutIndex >= 0) {
            gameTitle = gameTitle.substring(0, cutIndex);
        }
    });
    excludeTitleWords.forEach(e => { gameTitle = gameTitle.replace(e, '') });
    endWords.forEach(e => {
        if (gameTitle.endsWith(e)) {
            var cutIndex = gameTitle.lastIndexOf(e);
            gameTitle = gameTitle.substring(0, cutIndex);
        }
    });
    gameTitle = gameTitle.trim();
    return gameTitle;
}

function createCheckbox (parent) {
    var conainer = document.createElement('div');
    conainer.className = 'checkboxContainer';
    checkboxImg = document.createElement('img');
    checkboxImg.className = checkboxClassName;
    setCheckboxDisabled(checkboxImg);
    conainer.appendChild(checkboxImg);
    parent.style.position = 'relative';
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

function updateNumberOfGameOnAddGame () {
    numberOfGames++;
    updateTextOfNumberOfGame();
}

function updateNumberOfGameOnRemoveGame () {
    numberOfGames--;
    updateTextOfNumberOfGame();
}

function updateTextOfNumberOfGame () {
    var text = document.getElementById(showBlacklistGameCheckboxTextId);
    var textContent = showBlacklistGameCheckboxTextInnerText.replace('{numberOfGames}', numberOfGames);
    text.innerText = textContent;
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