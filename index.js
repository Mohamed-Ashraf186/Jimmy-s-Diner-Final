import { menuArray } from "./data.js";

const menuElem = document.querySelector(".menu");
const checkOut = document.querySelector(".pre-checkout");
const allItems = document.querySelector(".all-items");
const totalPrice = document.querySelector(".total-price-insert");
const orderBtnContainer = document.querySelector(".order-btn-container");
const modal = document.querySelector(".modal");
const form = document.querySelector(".modal-container");
const nameInput = document.getElementById("name");

let menuTargetObjs = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!modal.classList.contains("hidden")) modal.classList.add("hidden");
  if (!checkOut.classList.contains("hidden")) {
    checkOut.classList.add("hidden");
  }
  renderNotif(nameInput.value);
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    menuTargetObjs.push(
      menuArray.filter((item) => item.id.toString() === e.target.dataset.id)[0]
    );
  }

  if (e.target.dataset.id) {
    handleAddClick(menuTargetObjs[menuTargetObjs.length - 1], [
      menuTargetObjs.length - 1,
    ]);
  }

  if (e.target.classList.contains("remove")) {
    handleDeleteClick(e.target);
  }

  if (e.target.classList.contains("order-btn")) {
    handleOrderClick();
  }
});

function renderMenu() {
  let menuHtml = ``;
  menuArray.forEach((item) => {
    menuHtml += `
    <div class="menu-item-container flex">
    <div class="menu-item flex">
    <div class="menu-item-img">
    <img src="assets/${item.name}-graphic.png" alt="${item.name}-graphic" />
        </div>

        <div class="menu-item-desc">
          <h3>${item.name}</h3>
          <p class="ingredients">${item.ingredients.join(",")}</p>
          <p class="price">$${item.price}</p>
        </div> 
      </div>
      
      <div class="add-btn">
        <i class="fa-solid fa-plus" data-id="${item.id}"></i>
      </div>
      </div>
      <div class="br-line"></div>
      `;
  });
  menuElem.innerHTML = menuHtml;
}

function handleAddClick(menuTargetObj, num) {
  if (checkOut.classList.contains("hidden")) {
    checkOut.classList.remove("hidden");
  }
  let orderHtml = `<div class="checkout-item-container flex" id ="${num}">
    <div class="checkout-item flex">
      <div class="food-item">${menuTargetObj.name}</div>
      <div class="remove-btn ${num} remove">remove</div>
    </div>
    <div class="checkout-item-price">$${menuTargetObj.price}</div>
  </div>`;

  allItems.insertAdjacentHTML("beforeend", orderHtml);
  renderTotalPrice();
  renderOrderBtn();
}

function handleDeleteClick(target) {
  menuTargetObjs.splice(target.id, 1);
  target.parentElement.parentElement.remove();
  renderTotalPrice();
  if (!allItems.innerHTML) checkOut.classList.add("hidden");
}

function renderTotalPrice() {
  const totalPriceHtml = `<div class="total-price-line"></div>
  <div class="total-price-container flex">
    <h4>Total price:</h4>
    <div class="total-price">$${menuTargetObjs.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0)}</div>
  </div>`;
  totalPrice.innerHTML = totalPriceHtml;
}

function renderOrderBtn() {
  orderBtnContainer.innerHTML = `<button class="order-btn">Complete order</button>`;
}

function handleOrderClick() {
  if (modal.classList.contains("hidden")) modal.classList.remove("hidden");
}

function renderNotif(name) {
  document.querySelector(
    ".order-confirm"
  ).innerHTML = `<h3>Thanks, ${name}! Your order is on its way!</h3>`;
}

renderMenu();
