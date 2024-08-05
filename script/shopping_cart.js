/* Shopping Cart Implementation */

let shopping_cart = []
let add_to_cart_btn = document.querySelector('.add-to-cart')
let badge = document.querySelector('.badge')

let cart_header = document.querySelector('.cart-header')
let cart_items_header = document.querySelector('.cart-items')
let cart_item_dtails = document.querySelector('.cart-items div')
let browse_cart_btn = document.querySelector('.go-to-cart')

let shop_cart = document.querySelector('.cart-draw')
let cart_total_price = document.querySelector('.cart-shopping-total-price')
let cart_shopping_content = document.querySelector('.cart-shopping-content')
let cart_footer = document.querySelector('.cart-shopping-footer')
let empty_cart = document.querySelector('.empty-cart')
let remove_all_btn = document.querySelector('.remove-all')
let browse_products_btn = document.querySelector('.browse-btn')

// to check the cart is empty or not after reload the page
function checkLocalStorage() {
    shopping_cart = JSON.parse(localStorage.getItem('shopping_cart'))
    if (shopping_cart == null) {
        localStorage.setItem('shopping_cart', JSON.stringify([]))
        shopping_cart = JSON.parse(localStorage.getItem('shopping_cart'))
    }
    if (shopping_cart.length == 0 && current_page == 'shopping_cart.html') {
        shop_cart.style.display = 'none'
        cart_footer.style.display = 'none'
        empty_cart.style.display = 'block'
    }
    return shopping_cart
}

checkLocalStorage()

// Add to cart func
function addToCart(id) {
    // get the element
    let res = products.find(e => e.id == id)

    // check data in localStorage
    let tem_arr = shopping_cart;

    // add product to cart
    if (tem_arr.length == 0) {
        // add first element
        tem_arr.push({
            id: id,
            name: res.name,
            image: res.image,
            price: res.price,
            quantity: 1
        })
        // draw first element
        drawDataInDropdown(res)
    } else {
        // check element exists before or not
        let el = tem_arr.find(e => e.id == id)
        if (el) {
            el.quantity = ++el.quantity
        } else {
            // add for the first time
            tem_arr.push({
                id: id,
                name: res.name,
                image: res.image,
                price: res.price,
                quantity: 1
            })

            // draw elment in dropdown for first time
            drawDataInDropdown(res)
        }
    }
    // show number in the badge
    showBadge(tem_arr.length)

    // update the cart data in localStorage
    localStorage.setItem('shopping_cart', JSON.stringify(tem_arr))
}

function drawDataInDropdown(element) {
    cart_item_dtails.innerHTML += `<div class="cart-item-details">
                        <p class="cart-item-name">${element.name}</p>
                        <p class="cart-item-price">$${element.price}</p>
                    </div>`
}

// show number on the badge
function showBadge(num) {
    badge.style.display = 'inline'
    badge.innerHTML = num
}

// show the badge when page is load if there any data in the cart
if (JSON.parse(localStorage.getItem('shopping_cart'))) {
    showBadge(JSON.parse(localStorage.getItem('shopping_cart')).length)
    let cart_data = JSON.parse(localStorage.getItem('shopping_cart'))
    cart_data.forEach(element => {
        drawDataInDropdown(element)
    });
}

cart_header.addEventListener('click', (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem('shopping_cart'))) {
        if (JSON.parse(localStorage.getItem('shopping_cart')).length == 0) {
            return;
        }
        if (cart_items_header.style.display == 'block') {
            cart_items_header.style.display = 'none'
        } else {
            wishlist_items_header.style.display = 'none'
            cart_items_header.style.display = 'block'
        }
    }
})

browse_cart_btn.onclick = () => {
    setTimeout(() => {
        window.location.href = 'shopping_cart.html'
    }, 1500)
}

function cartIsEmpty() {
    if(shopping_cart.length == 0) {
        badge.style.display = ' none'
        if (current_page == 'shopping_cart.html') {
            shop_cart.style.display = 'none'
            cart_footer.style.display = 'none'
            remove_all_btn.style.display = 'none'
            empty_cart.style.display = 'block'
        }
    }
}

cartIsEmpty()



// draw products in shopping cart
function drawProductsInShoppingCart() {
    let total = 0;
    // let i = 0
    shopping_cart.forEach((e) => {
        shop_cart.innerHTML += `<div class="cart-shopping-item" id="cart-shopping-item-${e.id}">
                    <div class="cart-shopping-details">
                        <div class="cart-shopping-image">
                            <img src="assets/${e.image}" alt="${e.name}" >
                        </div>
                        <div>
                            <p class="cart-shopping-name">${e.name}</p>
                            <p class="cart-shopping-unit-price">$${e.price}</p>
                        </div>
                    </div>
                    <div class="cart-shopping-quantity">
                        <button class="minus" aria-label="Decrease" onclick="decreaseQuantity(${e.id})"><i class="fa-solid fa-minus"></i></button>
                        <span id="product-quantity-${e.id}">${e.quantity}</span>
                        <button class="plus" aria-label="Increase" onclick="increaseQuantity(${e.id})"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="cart-shopping-total" id="price-of-product-${e.id}">$${e.price * e.quantity}</div>
                    <div class="cart-shopping-actions" onclick="removeItem(${e.id})">
                        <i class="fa-solid fa-trash"></i>
                    </div>`
        total += e.price * e.quantity
        // i++;
    })
    cart_total_price.innerHTML = `<p>Total: <span>$${total}</span></p>`
}

if (current_page == 'shopping_cart.html') {
    drawProductsInShoppingCart()
    browse_products_btn.onclick = () => {
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1000)
    }
    remove_all_btn.onclick = () => {
        if (confirm('Are you sure to clear your cart ?')) {
            localStorage.removeItem('shopping_cart')
            localStorage.setItem('shopping_cart', JSON.stringify([]))
            shopping_cart = JSON.parse(localStorage.getItem('shopping_cart'))
            cartIsEmpty()                
        }
    }

}

function getSelectedItem(id) {
    let item = shopping_cart.find((e) => {
        return e.id == id
    })
    return item
}

function increaseQuantity(id) {
    let tem_arr = shopping_cart;
    let item = tem_arr.find(e => e.id == id);
    item.quantity = ++item.quantity;
    localStorage.setItem('shopping_cart', JSON.stringify(tem_arr));
    let product_quantity = document.getElementById('product-quantity-'+id)
    let new_product_price = document.getElementById('price-of-product-'+id)
    product_quantity.innerHTML = item.quantity;
    new_product_price.innerHTML = '$'+item.price * item.quantity;

    cart_total_price.innerHTML = '<p>Total: <span>$'+calculateTotal()+'</span></p>'

}

function decreaseQuantity(id) {
    let tem_arr = shopping_cart;
    let item = tem_arr.find(e => e.id == id);
    if (item.quantity <= 1) {
        return;
    }
    item.quantity = --item.quantity;
    localStorage.setItem('shopping_cart', JSON.stringify(tem_arr));
    let product_quantity = document.getElementById('product-quantity-'+id)
    let new_product_price = document.getElementById('price-of-product-'+id)
    product_quantity.innerHTML = item.quantity;
    new_product_price.innerHTML = '$'+item.price * item.quantity;
    cart_total_price.innerHTML = '<p>Total: <span>$'+calculateTotal()+'</span></p>'

}

function removeItem(id) {
    if (confirm('Are you sure to delete this product ?')) { 

        shopping_cart = shopping_cart.filter((e) => {
            return e.id != id
        })
        let itemDiv = document.getElementById('cart-shopping-item-'+id)
        itemDiv.remove()
        showBadge(shopping_cart.length)
        localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
        if (shopping_cart.length == 0) {
            cartIsEmpty()
        }
        cart_total_price.innerHTML = '<p>Total: <span>$'+calculateTotal()+'</span></p>'
    }
}

function calculateTotal() {
    let sum = 0;
    shopping_cart.forEach((e) => {
        sum += e.price * e.quantity
    })
    return sum;
}
/*  End of Shopping Cart Implementation */