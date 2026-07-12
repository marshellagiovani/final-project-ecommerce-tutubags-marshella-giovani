// 2. STATE MANAJEMEN APLIKASI (UMUM)
let currentRole = "guest"; // guest, customer, admin
let currentLang = "id";
let currentCurrency = "IDR";
let conversionRate = 16000; // 1 USD = 16000 IDR
let currentSlide = 0;

// MULTI-LANGUAGE DICTIONARY OBJECT
let dict = {
    id: {
        home: "Beranda", about: "Tentang & Visi", catalog: "Katalog", track: "Pelacakan", profile: "Profil Saya", admin: "Panel Admin", login: "Masuk",
        search_p: "Cari nama produk...", reset_b: "Reset", all_cat: "Semua Kategori", subtotal_lbl: "Subtotal", btn_co_lbl: "Lanjutkan ke Pembayaran",
        ask_wa: "Tanya"
    },
    en: {
        home: "Home", about: "About & Vision", catalog: "Catalog", track: "Tracking", profile: "My Profile", admin: "Admin Panel", login: "Login",
        search_p: "Search item name...", reset_b: "Reset", all_cat: "All Categories", subtotal_lbl: "Subtotal", btn_co_lbl: "Proceed to Checkout",
        ask_wa: "Ask"
    }
};

// 3. INISIALISASI AWAL APLIKASI
window.onload = function() {
    renderFeaturedProducts();
    renderCatalogProducts();
    updateFooterUI();
    setupAutoSlider();
};

// HERO AUTOMATIC SLIDER SYSTEM
function setupAutoSlider() {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % 3;
        document.getElementById('slider-container').style.transform = `translateX(-${currentSlide * 33.333}%)`;
    }, 4500);
}

// NAVIGATION SPA APPLICATION CONTROLLER
function showPage(pageId) {
    document.querySelectorAll('.page-route').forEach(p => p.classList.add('hidden-section'));
    document.getElementById(pageId).classList.remove('hidden-section');
    
    // Atur Navigasi Aktif
    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
    if(pageId === 'home-view') document.getElementById('nav-home').classList.add('active');
    if(pageId === 'about-view') document.getElementById('nav-about').classList.add('active');
    if(pageId === 'catalog-view') document.getElementById('nav-catalog').classList.add('active');
    if(pageId === 'tracking-view') document.getElementById('nav-track').classList.add('active');
    if(pageId === 'profile-view') document.getElementById('nav-profile').classList.add('active');
    if(pageId === 'admin-view') document.getElementById('nav-admin').classList.add('active');

    // Sembunyikan banner kecuali di halaman Beranda
    if(pageId === 'home-view') {
        document.getElementById('hero-slider-section').style.display = 'block';
    } else {
        document.getElementById('hero-slider-section').style.display = 'none';
    }

    if(pageId === "wishlist-view"){
    renderWishlist();
    }
    
    window.scrollTo(0,0);
}

// 4. FORMAT MATA UANG PENDUKUNG
function formatMoney(amount) {
    if (currentCurrency === "USD") {
        return "$" + (amount / conversionRate).toFixed(2);
    }
    return "Rp " + amount.toLocaleString('id-ID');
}

// 12. SWITCH MANAGEMENT LOGIN INTERFACE (TABS)
function switchLoginTab(role) {
    document.getElementById('tab-cust').classList.remove('active');
    document.getElementById('tab-admin').classList.remove('active');
    document.getElementById('login-err-msg').style.display = 'none';

    if(role === 'customer') {
        document.getElementById('tab-cust').classList.add('active');
        document.getElementById('login-username').value = "pelanggan imut";
        document.getElementById('login-password').value = "rahasia123";
    } else {
        document.getElementById('tab-admin').classList.add('active');
        document.getElementById('login-username').value = "admin_tutu";
        document.getElementById('login-password').value = "adminboss77";
    }
}

function processLogin() {
    let u = document.getElementById('login-username').value;
    let p = document.getElementById('login-password').value;

    if (document.getElementById('tab-cust').classList.contains('active')) {
        // Login Customer
        if (u === "pelanggan imut" && p === "rahasia123") {
            currentRole = "customer";
            document.querySelectorAll('.user-logged-in').forEach(el => el.classList.remove('hidden-section'));
            document.querySelectorAll('.admin-logged-in').forEach(el => el.classList.add('hidden-section'));
            document.getElementById('nav-login-btn').innerHTML = `<i class="fa-solid fa-user-check"></i> Pelanggan`;
            updateFooterUI();
            showPage('home-view');
        } else {
            document.getElementById('login-err-msg').style.display = 'block';
        }
    } else {
        // Login Admin Dashboard
        if (u === "admin_tutu" && p === "adminboss77") {
            currentRole = "admin";
            document.querySelectorAll('.admin-logged-in').forEach(el => el.classList.remove('hidden-section'));
            document.querySelectorAll('.user-logged-in').forEach(el => el.classList.add('hidden-section'));
            document.getElementById('nav-login-btn').innerHTML = `<i class="fa-solid fa-user-gear"></i> Admin`;
            updateFooterUI();
            showPage('admin-view');
        } else {
            document.getElementById('login-err-msg').style.display = 'block';
        }
    }
}

function logout() {
    currentRole = "guest";
    document.querySelectorAll('.user-logged-in, .admin-logged-in').forEach(el => el.classList.add('hidden-section'));
    document.getElementById('nav-login-btn').innerHTML = `<i class="fa-solid fa-user"></i> Masuk`;
    updateFooterUI();
    showPage('home-view');
}

// 13. PROFIL MANAJEMEN FOTO PROFIL (LOCAL FILE FILEREADER)
function handleAvatarUpload(event) {
    let reader = new FileReader();
    reader.onload = function() {
        let output = document.getElementById('user-display-avatar');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function saveProfileChanges() {
    let nameVal = document.getElementById('prof-name').value;
    document.getElementById('profile-display-name').innerText = nameVal;
    alert("Berhasil memperbarui data informasi profil akun anda!");
}

// 15. ALIH BAHASA DAN MATA UANG DINAMIS
function changeLanguage() {
    let sel = document.getElementById('lang-selector').value;
    currentLang = sel;
    
    document.getElementById('nav-home').innerText = dict[sel].home;
    document.getElementById('nav-about').innerText = dict[sel].about;
    document.getElementById('nav-catalog').innerText = dict[sel].catalog;
    document.getElementById('nav-track').innerText = dict[sel].track;
    document.getElementById('nav-profile').innerText = dict[sel].profile;
    document.getElementById('nav-admin').innerText = dict[sel].admin;
    
    document.getElementById('search-input').placeholder = dict[sel].search_p;
    document.getElementById('cart-sidebar-title').innerText = currentLang === 'id' ? 'Keranjang Belanja' : 'Shopping Cart';
    document.getElementById('btn-sidebar-co').innerText = dict[sel].btn_co_lbl;
    
    applyCatalogFilters();
}

function changeCurrency() {
    currentCurrency = document.getElementById('curr-selector').value;
    applyCatalogFilters();
    renderFeaturedProducts();
    updateCartUI();
}

// 17. STRUKTUR FOOTER DINAMIS (SEBELUM / SESUDAH LOGIN)
function updateFooterUI() {
    let container = document.getElementById('footer-dynamic-content');
    container.innerHTML = "";

    if (currentRole === 'customer') {
        // FOOTER SESUDAH LOGIN AKUN PELANGGAN
        container.innerHTML = `
            <div class="footer-col">
                <h4>Follow Us</h4>
                <div class="footer-socials">
                    <a href="https://instagram.com" target="_blank" style="text-decoration: none; color: var(--text-dark); font-size: 14px; display: flex; align-items: center; gap: 8px; transition: color 0.3s;">
                    <i class="fa-brands fa-instagram" style="color: #E07A8A; font-size: 18px;"></i> @TuTuBags 
                    <a href="https://tiktok.com/@TuTuBags" target="_blank" style="text-decoration: none; color: var(--text-dark); font-size: 14px; display: flex; align-items: center; gap: 8px; transition: color 0.3s;">
                    <i class="fa-brands fa-tiktok" style="color: #E07A8A; font-size: 18px;"></i> @TuTuBags
                    </a>
                    <a href="https://wa.me/6283212345678" target="_blank" style="text-decoration: none; color: var(--text-dark); font-size: 14px; display: flex; align-items: center; gap: 8px; transition: color 0.3s;">
                    <i class="fa-brands fa-whatsapp" style="color: #E07A8A; font-size: 18px;"></i> 083212345678
                    </a>
                    <a href="mailto:TuTuBags123@gmail.com" style="text-decoration: none; color: var(--text-dark); font-size: 14px; display: flex; align-items: center; gap: 8px; transition: color 0.3s;">
                    <i class="fa-regular fa-envelope" style="color: #E07A8A; font-size: 18px;"></i> TuTuBags123@gmail.com
                </div>
            </div>
            <div class="footer-col">
                <h4>Alamat Toko</h4>
                <p style="font-size:13px; color:var(--text-dark); line-height:1.5;">Kawasan Wisata Lembang, Kabupaten Bandung Barat, Jawa Barat, Indonesia</p>
            </div>
            <div class="footer-col">
                <h4>Navigasi</h4>
                <ul>
                    <li><a onclick="showPage('home-view')">Beranda</a></li>
                    <li><a onclick="showPage('about-view')">Tentang Kami</a></li>
                    <li><a onclick="showPage('catalog-view')">Katalog Produk</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Legalitas</h4>
                <ul>
                    <li><a onclick="alert('Kebijakan Privasi TuTu Bags: Kami melindungi data privasi konsumen sepenuhnya.')">Kebijakan Privasi</a></li>
                </ul>
            </div>
        `;
    } else {
        // FOOTER SEBELUM LOGIN AKUN (GUEST / ADMIN)
        container.innerHTML = `
            <div class="footer-col">
                <h4>Perusahaan</h4>
                <ul>
                    <li><a onclick="showPage('about-view')">Tentang Kami</a></li>
                    <li><a onclick="alert('Kebijakan Privasi: Seluruh data transaksi dienkripsi aman.')">Kebijakan Privasi</a></li>
                    <li><a onclick="alert('Syarat & Ketentuan: Pembelian bersifat retail final.')">Syarat & Ketentuan</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Dukungan Pelanggan</h4>
                <ul>
                    <li><a onclick="alert('FAQ:\n1. Apakah produk ready? Semua katalog tampil ready.\n2. Berapa lama kirim? Maksimal 1 hari kerja.')">Pertanyaan Sering Diajukan (FAQ)</a></li>
                    <li><a onclick="showPage('login-view')">Pelacakan Pesanan</a></li>
                    <li><a onclick="showPage('login-view')">Informasi Pengiriman</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>TuTu Bags Info</h4>
                <p style="font-size:13px; color:var(--text-light);">Butuh bantuan cepat sista? Masuk ke akun anda untuk membuka jalur komunikasi premium bersama CS kami.</p>
            </div>
        `;
    }
}