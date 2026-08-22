import { db, ref, push, set } from './firebase-config.js';

// Menu Items Data
const menuData = [
  { category: "Burgers", items: [{ name: "Veg Burger", price: 60 }, { name: "Cheese Burger", price: 80 }] },
  { category: "Pizzas", items: [{ name: "Margherita Pizza", price: 120 }, { name: "Cheese Burst Pizza", price: 180 }] },
  { category: "Snacks", items: [{ name: "French Fries", price: 50 }, { name: "Peri Peri Fries", price: 70 }] }
];

let cart = {};

// Render Menu
function renderMenu() {
  const container = document.getElementById('menuContainer');
  container.innerHTML = "";

  menuData.forEach(cat => {
    const title = document.createElement('div');
    title.className = "category-title";
    title.innerText = cat.category;
    container.appendChild(title);

    cat.items.forEach(item => {
      const card = document.createElement('div');
      card.className = "item-card";
      const qty = cart[item.name] ? cart[item.name].qty : 0;

      card.innerHTML = `
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-price">₹${item.price}</div>
        </div>
        <div>
          ${qty === 0 
            ? `<button class="add-btn" onclick="updateCart('${item.name}', ${item.price}, 1)">ADD</button>`
            : `<div class="qty-controls">
                <button class="qty-btn" onclick="updateCart('${item.name}', ${item.price}, -1)">-</button>
                <span><b>${qty}</b></span>
                <button class="qty-btn" onclick="updateCart('${item.name}', ${item.price}, 1)">+</button>
               </div>`
          }
        </div>
      `;
      container.appendChild(card);
    });
  });
}

window.updateCart = function(name, price, change) {
  if (!cart[name]) cart[name] = { price, qty: 0 };
  cart[name].qty += change;
  if (cart[name].qty <= 0) delete cart[name];

  renderMenu();
  updateStickyCart();
};

function updateStickyCart() {
  let count = 0, total = 0;
  Object.values(cart).forEach(i => { count += i.qty; total += i.qty * i.price; });

  const sticky = document.getElementById('stickyCart');
  if (count > 0) {
    sticky.style.display = "flex";
    document.getElementById('cartCount').innerText = `${count} Items`;
    document.getElementById('cartTotal').innerText = `₹${total}`;
  } else {
    sticky.style.display = "none";
  }
}

window.openCart = function() {
  document.getElementById('cartModal').style.display = "block";
  renderCartModal();
};

window.closeCart = function() {
  document.getElementById('cartModal').style.display = "none";
};

function renderCartModal() {
  const list = document.getElementById('cartItemsList');
  list.innerHTML = "";
  let subtotal = 0;

  Object.keys(cart).forEach(name => {
    const i = cart[name];
    subtotal += i.qty * i.price;
    list.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span>${name} x ${i.qty}</span>
      <span>₹${i.qty * i.price}</span>
    </div>`;
  });

  document.getElementById('subTotal').innerText = subtotal;
  calculateTotal();
}

window.togglePayment = function() {
  const isCod = document.querySelector('input[name="payment"]:checked').value === "COD";
  document.getElementById('onlineInfo').style.display = isCod ? "none" : "block";
  document.getElementById('codRow').style.display = isCod ? "block" : "none";
  calculateTotal();
};

function calculateTotal() {
  const subtotal = parseInt(document.getElementById('subTotal').innerText) || 0;
  const delivery = 15;
  const isCod = document.querySelector('input[name="payment"]:checked').value === "COD";
  const codCharge = isCod ? 20 : 0;

  document.getElementById('finalTotal').innerText = subtotal + delivery + codCharge;
}

window.placeOrder = function() {
  const name = document.getElementById('cName').value.trim();
  const mobile = document.getElementById('cMobile').value.trim();
  const village = document.getElementById('cVillage').value;
  const address = document.getElementById('cAddress').value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const utr = document.getElementById('cUtr').value.trim();

  if (!name || mobile.length !== 10 || !village || !address) {
    alert("Please fill all details correctly!");
    return;
  }

  let itemsSummary = "";
  Object.keys(cart).forEach(k => { itemsSummary += `${k} x ${cart[k].qty}\n`; });

  const subtotal = parseInt(document.getElementById('subTotal').innerText);
  const delivery = 15;
  const codCharge = paymentMethod === "COD" ? 20 : 0;
  const finalTotal = subtotal + delivery + codCharge;

  const orderData = {
    orderId: Math.floor(1000 + Math.random() * 9000),
    name, mobile, village, address, paymentMethod, utr,
    items: itemsSummary,
    subtotal, shipping: delivery, codCharge, finalTotal,
    status: "🆕 New Order",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  const newOrderRef = push(ref(db, 'orders'));
  set(newOrderRef, orderData).then(() => {
    alert("Order Placed Successfully!");
    cart = {};
    closeCart();
    renderMenu();
    updateStickyCart();
  }).catch(err => alert("Error: " + err.message));
};

renderMenu();
