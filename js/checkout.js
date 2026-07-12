// STATE: VOUCHER
let voucherApplied = false;

// 9. BLOKIR INTEGRASI CHECKOUT JIKA BELUM LOGIN PELANGGAN
function proceedToCheckoutView() {
    toggleCart(false);
    if (currentRole !== 'customer') {
        alert("Peringatan Keamanan: Anda harus masuk/login sebagai Pelanggan terlebih dahulu sebelum dapat melanjutkan transaksi pembayaran formulir checkout!");
        showPage('login-view');
        switchLoginTab('customer');
        return;
    }
    if (cart.length === 0) {
        alert("Keranjang anda masih kosong melompong comel!");
        return;
    }
    // Populate Data Profil Default ke Form
    document.getElementById('pay-name').value = document.getElementById('prof-name').value;
    document.getElementById('pay-phone').value = document.getElementById('prof-phone').value;
    
    // Open view
    showPage('payment-view');
    recalculateTotals();
}

// 10. RE-KALKULASI FORMULIR PEMBAYARAN HALAMAN PENH
function recalculateTotals() {
    let subtotal = 0;
    let listContainer = document.getElementById('checkout-items-list');
    listContainer.innerHTML = "";

    cart.forEach(item => {
        subtotal += (item.price * item.qty);
        listContainer.innerHTML += `<p style="font-size:13px; margin-bottom:4px;">🌸 ${item.name} (x${item.qty}) - <b>${formatMoney(item.price * item.qty)}</b></p>`;
    });

    // Ongkos Kirim Dinamis
    let courier = document.getElementById('pay-shipping-courier').value;
    let shipCost = 15000;
    if (courier === 'JNT') shipCost = 12000;
    if (courier === 'SICEPAT') shipCost = 10000;

    // Diskon Voucher
    let discount = 0;
    if (voucherApplied) {
        discount = Math.floor(subtotal * 0.15); // Diskon 15%
        document.getElementById('voucher-row-div').style.display = 'flex';
    } else {
        document.getElementById('voucher-row-div').style.display = 'none';
    }

    let grandTotal = subtotal + shipCost - discount;

    document.getElementById('checkout-subtotal').innerText = formatMoney(subtotal);
    document.getElementById('checkout-shipping-cost').innerText = formatMoney(shipCost);
    document.getElementById('checkout-discount-amount').innerText = "- " + formatMoney(discount);
    document.getElementById('checkout-grand-total').innerText = formatMoney(grandTotal);
}

function applyVoucher() {
    let code = document.getElementById('voucher-code').value.trim().toUpperCase();
    if (code === "TUTUHELO") {
        voucherApplied = true;
        document.getElementById('voucher-success-msg').style.display = 'block';
        recalculateTotals();
    } else {
        alert("Kode Voucher tidak valid atau kadaluwarsa!");
        voucherApplied = false;
        recalculateTotals();
    }
}

// 11. EKSEKUSI CHECKOUT + ANIMASI LOADING + GENERATOR ID TRANSAKSI
function executeCheckoutFinal() {
    // Validasi Input Wajib Kosong
    let name = document.getElementById('pay-name').value;
    let phone = document.getElementById('pay-phone').value;
    let email = document.getElementById('pay-email').value;
    let address = document.getElementById('pay-address-detail').value;
    
    if(!name || !phone || !email || !address) {
        alert("Mohon lengkapi seluruh formulir data pengiriman wajib bertanda bintang (*)");
        return;
    }

    // Tampilkan Loading Transaksi Animasi
    document.getElementById('checkout-spinner-overlay').classList.remove('hidden-section');

    setTimeout(() => {
        // Selesai Loading, Sembunyikan kembali
        document.getElementById('checkout-spinner-overlay').classList.add('hidden-section');
        
        // Generator ID Transaksi Unik Acak
        let randomId = "TTB-" + Math.floor(100000 + Math.random() * 900000);
        let method = document.getElementById('pay-method-choice').value;
        let finalTotal = document.getElementById('checkout-grand-total').innerText;

        alert(`MIDTRANS GATEWAY SANDBOX SECURE RESPONSE\n\nID Transaksi: ${randomId}\nNama Penerima: ${name}\nTotal Pembayaran: ${finalTotal}\nMetode: ${method}\n\nTerima kasih atas orderannya kak! Status pengiriman dapat anda pantau sekarang di halaman pelacakan.`);
        
        // Set Data Pelacakan Real-time
        document.getElementById('track-status-text').innerHTML = `📦 <b>ID Pesanan: ${randomId}</b><br>Status: <span style="color:orange; font-weight:600;">Sedang Dikemas Oleh Admin</span><br>Estimasi Kurir Pick-up malam ini via Jasa Kirim pilihan anda.`;
        
        // Bersihkan Keranjang Belanja
        cart = [];
        voucherApplied = false;
        document.getElementById('voucher-code').value = "";
        document.getElementById('voucher-success-msg').style.display = 'none';
        updateCartUI();
        showPage('tracking-view');

    }, 3000); // Durasi Loading Animasi 3 Detik
}