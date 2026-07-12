// STATE: WISHLIST
let wishlist = [];

// WISHLIST MANAGEMENT
function toggleWishlist(id) {
    let idx = wishlist.indexOf(id);

    if (idx > -1) {
        wishlist.splice(idx, 1);
    } else {
        wishlist.push(id);
    }

    document.getElementById('wishlist-count').innerText = wishlist.length;

    applyCatalogFilters();
    renderFeaturedProducts();

    // Kalau halaman wishlist sedang dibuka, langsung update
    if (document.getElementById("wishlist-grid")) {
        renderWishlist();
    }
}

// MENAMPILKAN HALAMAN WISHLIST
function renderWishlist() {

    let grid = document.getElementById("wishlist-grid");

    if (!grid) return;

    grid.innerHTML = "";

    let wishlistProducts = products.filter(p => wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
        grid.innerHTML = `
            <h3 style="text-align:center;padding:40px;color:#888;">
                ❤️ Wishlist masih kosong
            </h3>
        `;
        return;
    }

    wishlistProducts.forEach(product => {
        grid.innerHTML += createProductCardHtml(product);
    });
}