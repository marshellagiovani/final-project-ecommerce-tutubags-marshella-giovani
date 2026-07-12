// STATE: KERANJANG BELANJA
let cart = [];

// 8. KERANJANG BELANJA (CART SYSTEM WITH DELETE ACTION)
function toggleCart(open) {
    let sidebar = document.getElementById('cart-sidebar-id');
    if(open) sidebar.classList.add('active');
    else sidebar.classList.remove('active');
}

function addToCart(id) {
    let prod = products.find(p => p.id === id);
    let exist = cart.find(item => item.id === id);
    if(exist) {
        exist.qty++;
    } else {
        cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

function removeCartItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function changeCartQty(id, num) {
    let item = cart.find(i => i.id === id);
    if(item) {
        item.qty = parseInt(num);
        if(item.qty <= 0) removeCartItem(id);
    }
    updateCartUI();
}

function updateCartUI() {
    let container = document.getElementById('cart-items-container');
    container.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += (item.price * item.qty);
        count += item.qty;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h5 style="font-size:12px;">${item.name}</h5>
                    <span style="font-size:12px; color:#E07A8A;">${formatMoney(item.price)}</span>
                    <div style="margin-top:5px; display:flex; align-items:center; gap:10px;">
                        <input type="number" value="${item.qty}" min="1" style="width:40px; text-align:center;" onchange="changeCartQty(${item.id}, this.value)">
                        <button class="btn-del-item" onclick="removeCartItem(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total-text').innerText = formatMoney(total);
}