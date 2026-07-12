// 1. DATA MASTER 16 PRODUK UTAMA
let products = [
     { id: 1, name: "Puffy Cloud Mint Bag", price: 135000, category: "shoulder bag", rating: 5.0, image: "images/tas1.jpg", desc: "Tas bahu besar model puffy empuk bertekstur kotak gelembung awan dengan warna hijau mint pastel cerah dan kantong depan ganda." },
     { id: 2, name: "Soft Pink Quilted Shoulder Bag", price: 145000, category: "shoulder bag", rating: 4.9, image: "images/tas2.jpg", desc: "Tas jinjing nilon puffy merah muda soft yang manis dilengkapi gantungan boneka kecil menggemaskan bergaya coquette." },
     { id: 3, name: "Matcha Checkered Knit Bag", price: 125000, category: "shoulder bag", rating: 4.8, image: "images/tas3.jpg", desc: "Tas rajutan tenun wol motif bunga daisy putih cantik di atas warna hijau matcha yang estetik abis." },
     { id: 4, name: "Peach Tulip Canvas Bag", price: 95000, category: "tote bag", rating: 4.7, image: "images/tas4.jpg", desc: "Tote bag bahan kanvas kokoh berwarna krem pastel dengan sablon ilustrasi bunga tulip pink minimalis yang anggun." },
     { id: 5, name: "Lilac Sweet Ribbon Puffy Bag", price: 138000, category: "sling bag", rating: 4.9, image: "images/tas5.jpg", desc: "Slingbag mini puffy kerut berbalut warna ungu lilac lembut dengan aksen ikat simpul tali panjang yang lucu." },
     { id: 6, name: "Strawberry Cream Woven Sling", price: 110000, category: "sling bag", rating: 5.0, image: "images/tas6.jpg", desc: "Pouch mini serut rajutan berbentuk buah strawberry merah segar dengan penutup daun hijau yang sangat unik." },
     { id: 7, name: "Sage Everyday Canvas Pouch", price: 99000, category: "pouch", rating: 4.6, image: "images/tas7.jpg", desc: "Pouch kotak penyimpanan tebal berbahan canvas polos warna hijau sage pastel minimalis untuk tempat kosmetik atau mukena." },
     { id: 8, name: "Milk Caramel Bear Drawstring", price: 140000, category: "sling bag", rating: 4.9, image: "images/tas8.jpg", desc: "Tas bentuk unik siluet kelopak kuncup bunga berwarna cokelat karamel susu dengan tali pegangan kerut scrunchie yang modis." },
     { id: 9, name: "Teddy Tote Bag", price: 105000, category: "tote bag", rating: 4.8, image: "images/tas9.jpg", desc: "Tote bag bahan beludru kokoh berwarna krem pastel dengan gambar boneka beruang berwarna coklat yang lucu." },
     { id: 10, name: "Pink Ribbon Bag", price: 100000, category: "sling bag", rating: 4.9, image: "images/tas10.jpg", desc: "Tas model Vegan Leather empuk bertekstur bergambar pita dengan pita pink serta nuansa pink pastel." },
     { id: 11, name: "Cute Cherry Bag", price: 142000, category: "hand bag", rating: 5.0, image: "images/tas11.jpg", desc: "Tas dengan model velvet empuk bertekstur lembut bulu dengan warna pink pastel dan krem serta gantungan cherry di bagian resleting." },
     { id: 12, name: "Brown Cat BackPack", price: 130000, category: "backpack", rating: 5.0, image: "images/tas12.jpg", desc: "Ransel model velvet empuk bertekstur lembut bulu dengan warna coklat muda dan putih serta hiasan headphone pink." },
     { id: 13, name: "Pink Teddy bag charm", price: 50000, category: "bag charm", rating: 4.5, image: "images/bagcharm1.jpg", desc: "Gantungan tas model beruang berwarna pink pastel." },
     { id: 14, name: "Pink Rabbit bag charm", price: 45000, category: "bag charm", rating: 4.6, image: "images/bagcharm2.jpg", desc: "Gantungan tas model kelinci berwarna pink pastel." },
     { id: 15, name: "Croissant bag charm", price: 65000, category: "bag charm", rating: 5.0, image: "images/bagcharm3.jpg", desc: "Gantungan tas model croissant berwarna coklat." },
     { id: 16, name: "Capybara bag charm", price: 70000, category: "bag charm", rating: 4.9, image: "images/bagcharm4.jpg", desc: "Gantungan tas model capybara berwarna coklat dengan hiasan kepala strawberry." }
];

// 5. RENDER DINAMIS PRODUK KATALOG
function renderFeaturedProducts() {
    let grid = document.getElementById('featured-products-grid');
    grid.innerHTML = "";
    products.slice(0, 4).forEach(p => {
        grid.innerHTML += createProductCardHtml(p);
    });
}

function renderCatalogProducts(dataArray = products) {
    let grid = document.getElementById('main-catalog-grid');
    grid.innerHTML = "";
    dataArray.forEach(p => {
        grid.innerHTML += createProductCardHtml(p);
    });
    // Update tabel manajemen admin juga sekalian
    renderAdminProductTable();
}

function createProductCardHtml(p) {
    let isWish = wishlist.includes(p.id) ? 'active' : '';
    let labelWA = currentLang === 'id' ? 'Tanya' : 'Ask';

    return `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${p.image}" alt="${p.name}" onclick="openDetailModal(${p.id})">
                <button class="heart-wish ${isWish}" onclick="toggleWishlist(${p.id})">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>

            <div class="product-info" onclick="openDetailModal(${p.id})">
                <h3>${p.name}</h3>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    <span>${p.rating}</span>
                </div>
                <div class="product-price">${formatMoney(p.price)}</div>
            </div>

            <div class="product-actions">
                <button class="btn-add-cart" onclick="addToCart(${p.id})">
                    🛒 + Keranjang
                </button>

                <button class="btn-wa-ask" onclick="redirectToWhatsAppAsk('${p.name}')">
                    <i class="fa-brands fa-whatsapp"></i> ${labelWA}
                </button>
            </div>
        </div>
    `;
}

// INTERAKSI CHAT CHAT WHATSAPP OTOMATIS
function redirectToWhatsAppAsk(prodName) {
    let phone = "628123456789"; 
    let msg = encodeURIComponent(`Halo TuTu Bags! Saya ingin bertanya mengenai ketersediaan stok untuk produk terimut ini: *${prodName}*. Apakah ready sis? 😊`);
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${msg}`, '_blank');
}

// 6. CONTROL FILTER DAN PENCARIAN KATALOG
function applyCatalogFilters() {
    let searchVal = document.getElementById('search-input').value.toLowerCase();
    let catVal = document.getElementById('category-filter').value;
    let priceVal = document.getElementById('price-filter').value;

    let filtered = products.filter(p => {
        let matchSearch = p.name.toLowerCase().includes(searchVal);
        let matchCat = (catVal === 'all') || (p.category === catVal);
        let matchPrice = true;

        if (priceVal === 'under-100') matchPrice = p.price < 100000;
        if (priceVal === 'above-100') matchPrice = p.price >= 100000;

        return matchSearch && matchCat && matchPrice;
    });

    renderCatalogProducts(filtered);
}

function resetFilters() {
    document.getElementById('search-input').value = "";
    document.getElementById('category-filter').value = "all";
    document.getElementById('price-filter').value = "all";
    renderCatalogProducts(products);
}

// 14. ADMIN PANEL: MANAGEMENT RUBAH HARGA KATALOG UTAMA
function renderAdminProductTable() {
    let tbody = document.getElementById('admin-product-table-body');
    tbody.innerHTML = "";
    products.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td><input type="number" class="price-edit-input" value="${p.price}" onchange="updateProductPrice(${p.id}, this.value)"></td>
                <td><button onclick="alert('Harga Berhasil Disinkronisasi!')" style="padding:2px 8px; font-size:11px; cursor:pointer;">Simpan</button></td>
            </tr>
        `;
    });
}

function updateProductPrice(id, newPrice) {
    let p = products.find(prod => prod.id === id);
    if(p) {
        p.price = parseInt(newPrice);
        renderFeaturedProducts();
        updateCartUI();
    }
}

// 16. MODAL POPUP DETAIL DETAIL PRODUK
function openDetailModal(id) {
    let p = products.find(prod => prod.id === id);
    let modal = document.getElementById('product-detail-modal');
    let body = document.getElementById('modal-popup-body');

    body.innerHTML = `
        <div style="text-align:center;">
            <img src="${p.image}" style="max-width:100%; height:200px; object-fit:contain; border-radius:10px;">
            <h3 style="margin-top:15px; font-family:'Fredoka';">${p.name}</h3>
            <p style="font-size:13px; color:var(--text-light); margin:10px 0;">
                ${p.desc}
            </p>
            <h4 style="color:#E07A8A; font-size:20px; margin-bottom:15px;">
                ${formatMoney(p.price)}
            </h4>
            <button class="btn-submit" onclick="addToCart(${p.id}); closeModalPopup();">
                🛍️ Tambah ke Keranjang
            </button>
        </div>
    `;

    modal.style.display = "flex";
}

function closeModalPopup() {
    document.getElementById("product-detail-modal").style.display = "none";
}