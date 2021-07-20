$('[data-toggle="popover"]').popover();
function initializeCart(cartObj) {
    let cartElement = document.getElementById("cart");

    if (cartElement) {
        cartElement.innerHTML = "Cart(" + Object.keys(cartObj).length + ")";

        if (Object.keys(cartObj).length > 0) {
            loadCartDetails(cartObj);
        } else {
            cartElement.setAttribute("data-content", "No Products added yet");
        }
    }
}
if(!cart){
    var cart = {};

    if (localStorage.getItem("cart") != null) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
}
initializeCart(cart);

$(document).on("click", "#cart", function () {
    if (Object.keys(cart).length > 0) {
        loadCartDetails(cart);
    }
});

$(document).on("click", ".atc", function () {
    console.log("that is working fine ya abdo");
    var item_id = this.id.toString();
    console.log(item_id);
    if (cart[item_id] !== undefined) {
        quantity = cart[item_id][0] + 1;
        cart[item_id][0] = quantity;
        cart[item_id][2] =
            cart[item_id][2] +
            parseFloat(document.getElementById("price" + item_id).innerHTML);
    } else {
        quantity = 1;
        price = parseFloat(
            document.getElementById("price" + item_id).innerHTML
        );
        name = document.getElementById("nm" + item_id).innerHTML;
        cart[item_id] = [quantity, name, price];
    }
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart").innerHTML =
        "Cart(" + Object.keys(cart).length + ")";
    loadCartDetails(cart);
});

function loadCartDetails(cart) {
    //cart = JSON.parse(localStorage.getItem("cart"));
    var cartString = "";
    cartString += "<h5>This is your cart</h5>";
    var cartIndex = 1;
    for (var x in cart) {
        cartString += cartIndex;
        cartString += cart[x][1] + "Qty:" + cart[x][0] + "</br>";
        cartIndex += 1;
    }
    cartString +=
        "<a href='/checkout'><button class='btn btn-warning' id='checkout'>Checkout</button></a></div>";

    if (Object.keys(cart).length > 0) {
        document
            .getElementById("cart")
            .setAttribute("data-content", cartString);
        $(".popover-body").html(cartString);
    } else {
        let cartElement = document.getElementById("cart");
        cartElement.setAttribute("data-content", "No Products added yet");
        $(".popover-body").html("No Products added yet");
    }
}
