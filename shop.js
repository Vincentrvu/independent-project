if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("remove-item")
  console.log(removeCartItemButtons)
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName("item-quantity")
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button")
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener("click", addToCartClicked)
  }

  document.getElementsByClassName("checkout-button")[0].addEventListener("click", checkoutClicked)
}

function checkoutClicked() {
  alert("Thank you for your pruchase")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartSubtotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateCartSubtotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
  }
  updateCartSubtotal()
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
  var price = 0
  if (title == "Standard") {
    price = 10
  } else if (title == "Deluxe") {
    price = 20
  }
  console.log(price, title)
  addItemToCart(title, price)
  updateCartSubtotal()
}

function addItemToCart(title, price) {
  var cartRow = document.createElement("div")
  cartRow.classList.add("cart-item-row")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart")
      return
    }
  }

  var cartRowContents = `
    <div class="cart-item-info">
      <h4 class="cart-item-title">${title}</h4>
      <div class="cart-item-detailed">
        <input class="item-quantity" type="number" value="1">
        <span class="item-price">$${price}</span>
      </div>
    </div>
    <button class="remove-item">X</button>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName("remove-item")[0].addEventListener("click", removeCartItem)
  cartRow.getElementsByClassName("item-quantity")[0].addEventListener("change", quantityChanged)
}

function updateCartSubtotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0]
  var cartRows = cartItemContainer.getElementsByClassName("cart-item-row")
  var subtotal = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var quantityElement = cartRow.getElementsByClassName("item-quantity")[0]
    var priceElement = cartRow.getElementsByClassName("item-price")[0]
    var price = parseFloat(priceElement.innerText.replace("$", ""))
    var quantity = quantityElement.value
    subtotal = subtotal + (price * quantity)
  }
  subtotal = Math.round(subtotal*100) / 100
  document.getElementsByClassName("cart-subtotal")[0].innerText = "$" + subtotal
}
