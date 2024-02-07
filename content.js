document.addEventListener("DOMContentLoaded", onPageLoaded());

function onPageLoaded () {
  setInterval(hideGames, 1000);
}

//* Hide games which are added to user's wishlist.
function hideGames () {
  var gamelist = document.getElementsByClassName("catalog")[0];
  Array.from(gamelist.children).forEach(e => {
    var gameDataContainer = e.children[1];
    var priceContainer = gameDataContainer.children[1];
    var addToCartContainer = priceContainer.children[1].children[0];
    var starButton = addToCartContainer.children[1];
    if (starButton.dataset.action == "delete_item") {
      gamelist.removeChild(e);
    }
  });
}