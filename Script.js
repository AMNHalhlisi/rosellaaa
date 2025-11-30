/* ================================
   CART SYSTEM
================================ */

// قراءة السلة
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// حفظ السلة
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


/* ================================
   ADD TO CART + REDIRECT TO CONFIRM
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".add-cart");

    buttons.forEach(btn => {
        btn.addEventListener("click", function () {

            let name = this.getAttribute("data-name");
            let price = Number(this.getAttribute("data-price"));

            let cart = getCart();

            // إذا المنتج موجود نزيد الكمية بـ 1
            let item = cart.find(i => i.name === name);
            if (item) {
                if (item.qty < 10) item.qty += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    qty: 1
                });
            }

            saveCart(cart);

            // نقل لصفحة تأكيد الطلب
            window.location.href = "conf.html";
        });
    });

});


/* ================================
   SHOW + UPDATE + DELETE IN CONFIRM PAGE
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const cartDiv = document.getElementById("cart-items");
    const totalDiv = document.getElementById("total-price");

    if (cartDiv && totalDiv) {

        let cart = getCart();

        function renderCart() {
            cartDiv.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {

                total += item.price * item.qty;

                cartDiv.innerHTML += `
                    <div class="cart-row">
                        <p><strong>${item.name}</strong> - ${item.price} SAR</p>

                        <label>Qty:</label>
                        <select class="qty-select" data-index="${index}">
                            ${Array.from({length: 10}, (_, i) => `
                                <option value="${i+1}" ${item.qty === (i+1) ? "selected" : ""}>${i+1}</option>
                            `).join('')}
                        </select>

                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                    <hr>
                `;
            });

            totalDiv.textContent = "Total: " + total + " SAR";
        }

        renderCart();

        // تغيير الكمية
        cartDiv.addEventListener("change", function(e) {
            if (e.target.classList.contains("qty-select")) {
                let index = e.target.getAttribute("data-index");
                cart[index].qty = Number(e.target.value);
                saveCart(cart);
                renderCart();
            }
        });

        // حذف منتج
        cartDiv.addEventListener("click", function(e) {
            if (e.target.classList.contains("remove-btn")) {
                let index = e.target.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart(cart);
                renderCart();
            }
        });
    }

});

