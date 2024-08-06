let selected_product_id = localStorage.getItem('selected_product')
let product_div = document.querySelector('.product')

function getSelectedProduct() {
    return products.find(e => e.id == selected_product_id)
}

let selected_product = getSelectedProduct()
drawProductDetails(selected_product)
function drawProductDetails(element) {
    product_div.innerHTML = `<div class="left-side">
                <img src="../assets/${element.image}" alt="${element.image}" class="product-image">
                <h3 class="product-name">${element.name}</h3>
                <p class="product-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita porro
                    fugiat numquam consequuntur excepturi? Quos placeat eius dolorum temporibus, saepe consequuntur
                    molestias facere doloribus. Amet nemo quia quisquam id eum!</p>
            </div>
            <div class="right-side">
                <p class="product-price">$${element.price}</p>
                <div class="actions">
                    <button class="add-to-cart" onclick="addToCart(${element.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button class="add-to-wishlist" onclick="addToWishlist(${element.id})">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>`    
}