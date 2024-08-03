let links = document.getElementById('links')
let user_info = document.getElementById('user_info')
let welcome_msg = document.getElementById('welcome_msg')
let getUsername = localStorage.getItem('username')
let logout = document.getElementById('logout')

let current_path = window.location.href;
current_path = current_path.split('/')
let current_page = current_path[current_path.length -1 ]

if (localStorage.getItem('is_login')) {
    links.remove()
    welcome_msg.innerHTML = '<i class="fa-regular fa-user"></i> Welcome, ' + getUsername
    user_info.style.display = 'flex'
}


logout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear()
    setTimeout(() => {
        window.location.href = 'register.html'
    }, 1500)
    console.log('u are logged out');
})

/* Shopping Cart Implementation */

let products_div = document.querySelector('.products')
let products = [
    {
        id: 1,
        image: 'cat-img-2.jpg',
        name: 'product-1',
        price: 14,
    },
    {
        id: 2,
        image: 'cat-img-4.jpg',
        name: 'product-2',
        price: 10,
    },
    {
        id: 3,
        image: 'product-3.jpg',
        name: 'product-3',
        price: 35,
    },
    {
        id: 4,
        image: 'product-5.jpg',
        name: 'product-4',
        price: 20,
    },
    {
        id: 5,
        image: 'product-9.jpg',
        name: 'product-5',
        price: 50,
    },
]

function showProducts() {
    products.forEach((element) => {
        products_div.innerHTML += `
        <div class="product-card">
                <div class="product-image">
                    <img src="assets/${element.image}" alt="product-image"  >
                </div>
                <div class="product-details">
                    <div class="peoduct-det">
                        <h4 class="product-name">${element.name}</h4>
                        <span class="product-price">$${element.price}</span>
                    </div>
                    <p class="product-desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto deserunt Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fugiat, voluptatibus quo minima iusto consectetur enim a ea vel, amet doloribus ratione voluptatum laborum ullam tempore earum mollitia, quidem sunt?
                    Delectus sint consectetur officia voluptatibus dignissimos ipsam pariatur perspiciatis neque voluptas dolore veniam facere incidunt beatae mollitia sunt fugiat recusandae, ad error odit illum. A voluptatibus veniam sunt nulla quia!</p>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${element.id})">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                        <button class="add-to-wishlist">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    })
}
if (current_page == 'index.html') {
    showProducts()
}

/*  End of Shopping Cart Implementation */