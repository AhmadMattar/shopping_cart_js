/* Wishlist Implementation */

let wishlist = []
let add_to_wishlist_btn = document.querySelector('.add-to-wishlist')
let wishlist_badge = document.querySelector('.wishlist-badge')
let wishlist_header = document.querySelector('.wishlist-header')
let wishlist_items_header = document.querySelector('.wishlist-items')
let wishlist_item_dtails = document.querySelector('.wishlist-items div')
let browse_wishlist_btn = document.querySelector('.go-to-wishlist')

let shop_wishlist = document.querySelector('.wishlist-draw')
let wishlist_total_price = document.querySelector('.wishlist-shopping-total-price')
let wishlist_shopping_content = document.querySelector('.wishlist-shopping-content')
let empty_wishlist = document.querySelector('.empty-wishlist')
let remove_all_wishlist_btn = document.querySelector('.remove-all-wishlist-btn')
let browse_products_wishlist_btn = document.querySelector('.browse-btn')

// to check the cart is empty or not after reload the page
function checkLocalStorage() {
    wishlist = JSON.parse(localStorage.getItem('wishlist'))
    if (wishlist == null) {
        localStorage.setItem('wishlist', JSON.stringify([]))
        wishlist = JSON.parse(localStorage.getItem('wishlist'))
    }
    return wishlist
}

checkLocalStorage()

// Add to cart func
function addToWishlist(id) {
    // get the element
    let res = products.find(e => e.id == id)

    // check data in localStorage
    let tem_arr = wishlist;

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
        drawDataInWishlistDropdown(res)
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
            drawDataInWishlistDropdown(res)
        }
    }

    // show badge
    showWishlistBadge()

    // update the wishlist data in localStorage
    localStorage.setItem('wishlist', JSON.stringify(tem_arr))
}

function drawDataInWishlistDropdown(element) {
    wishlist_item_dtails.innerHTML += `<div class="wishlist-item-details">
                        <p class="wishlist-item-name">${element.name}</p>
                        <p class="wishlist-item-price">$${element.price}</p>
                    </div>`
}

// show number on the badge
function showWishlistBadge() {
    wishlist_badge.style.display = 'inline'
}

wishlist_header.addEventListener('click', (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem('wishlist'))) {
        if (JSON.parse(localStorage.getItem('wishlist')).length == 0) {
            return;
        }
        if (wishlist_items_header.style.display == 'block') {
            wishlist_items_header.style.display = 'none'
        } else {
            cart_items_header.style.display = 'none'
            wishlist_items_header.style.display = 'block'
        }
    }
})


browse_wishlist_btn.onclick = () => {
    setTimeout(() => {
        window.location.href = 'wishlist.html'
    }, 1500)
}

// show the badge when page is load if there any data in the cart
if (JSON.parse(localStorage.getItem('wishlist'))) {
    showWishlistBadge()
    let wishlist_data = JSON.parse(localStorage.getItem('wishlist'))
    wishlist_data.forEach(element => {
        drawDataInWishlistDropdown(element)
    });
}
function wishlistIsEmpty() {
    if(wishlist.length == 0) {
        wishlist_badge.style.display = ' none'
        if (current_page == 'wishlist.html') {
            shop_wishlist.style.display = 'none'
            remove_all_wishlist_btn.style.display = 'none'
            empty_wishlist.style.display = 'block'
        }
    }
}

wishlistIsEmpty()



// draw products in shopping cart
function drawProductsInWishlist() {
    wishlist.forEach((e) => {
        shop_wishlist.innerHTML += `<div class="wishlist-shopping-item" id="wishlist-shopping-item-${e.id}">
                    <div class="wishlist-shopping-details">
                        <div class="wishlist-shopping-image">
                            <img src="assets/${e.image}" alt="${e.name}" >
                        </div>
                        <div>
                            <p class="wishlist-shopping-name">${e.name}</p>
                            <p class="wishlist-shopping-unit-price">$${e.price}</p>
                        </div>
                    </div>
                    
                    <div class="wishlist-shopping-actions" onclick="removeWishlistItem(${e.id})">
                        <i class="fa-solid fa-trash"></i>
                    </div>`
    })
}

if (current_page == 'wishlist.html') {
    drawProductsInWishlist()
    browse_products_wishlist_btn.onclick = () => {
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1000)
    }
    remove_all_wishlist_btn.onclick = () => {
        if (confirm('Are you sure to clear your wishlist ?')) {
            localStorage.removeItem('wishlist')
            localStorage.setItem('wishlist', JSON.stringify([]))
            wishlist = JSON.parse(localStorage.getItem('wishlist'))
            wishlistIsEmpty()                
        }
    }

}

function getSelectedItem(id) {
    let item = wishlist.find((e) => {
        return e.id == id
    })
    return item
}

function removeWishlistItem(id) {
    if (confirm('Are you sure to delete this product ?')) { 
        wishlist = wishlist.filter((e) => {
            return e.id != id
        })
        let itemDiv = document.getElementById('wishlist-shopping-item-'+id)
        itemDiv.remove()
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        if (wishlist.length == 0) {
            wishlistIsEmpty()
        }
    }
}

/*  End of Shopping Cart Implementation */