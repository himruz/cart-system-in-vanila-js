let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");
let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

let cartAmount = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cartProducts
    .map((p) => p.quantity)
    .reduce((x, y) => x + y, 0);
};

cartAmount();

let generateCartItems = () => {
  ShoppingCart.innerHTML = "";
  if (cartProducts.length !== 0) {
    return (ShoppingCart.innerHTML += cartProducts.map((product) => {
      let { id, quantity } = product;
      let searchedProduct =
        shopItemsData.find((product) => product.id === id) || [];
      return ` <div class="cart-item">
                <img width="100" src=${searchedProduct.img} alt="" />
                  <div class="details">
          
                   <div class="title-price-x">
                         <h4 class="title-price">
                          <p>${searchedProduct.name}</p>
                           <p class="cart-item-price">$ ${
                             searchedProduct.price
                           }</p>
                          </h4>
                         <i onclick="removeProduct('${id}')" class="bi bi-x-lg"></i>
                    </div>
          
                    <div class="buttons">
                        <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
                         <div id="${id}" class="quantity">${quantity}</div>
                         <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                    </div>
          
                   <h3>$ ${quantity * searchedProduct.price}</h3>
                    </div>
                 </div>`;
    }));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedProduct = id;
  let isProductExist = cartProducts.find(
    (product) => product.id === selectedProduct
  );

  if (isProductExist === undefined) {
    cartProducts.push({
      id: selectedProduct,
      quantity: 1,
    });
  } else {
    isProductExist.quantity += 1;
  }
  generateCartItems();

  update(id);
  localStorage.setItem("cart", JSON.stringify(cartProducts));
};

let decrement = (id) => {
  let selectedProduct = id;
  let isProductExist = cartProducts.find(
    (product) => product.id === selectedProduct
  );

  if (isProductExist === undefined) return;
  else if (isProductExist.quantity === 0) return;
  else {
    isProductExist.quantity -= 1;
  }
  update(id);

  cartProducts = cartProducts.filter((product) => product.quantity !== 0);
  localStorage.setItem("cart", JSON.stringify(cartProducts));

  generateCartItems();
};

let update = (id) => {
  console.log(id);
  let selectedProduct = cartProducts.find((product) => product.id === id) || [];
  console.log(selectedProduct);
  let quantity = selectedProduct.quantity;

  let quantityField = document.getElementById(id);

  quantityField.innerHTML = quantity;
  cartAmount();
  totalAmount();
};

let removeProduct = (id) => {
  console.log(id);
  const arr = cartProducts.find((product) => product.id === id);
  const index = cartProducts.indexOf(arr);

  cartProducts.splice(index, 1);
  update(id);
  generateCartItems();
  localStorage.setItem("cart", JSON.stringify(cartProducts));
};

let totalAmount = () => {
  if (cartProducts.length !== 0) {
    let totalAmount = cartProducts
      .map((product) => {
        let { id, quantity } = product;
        let filerProduct = shopItemsData.find((product) => product.id === id);
        return filerProduct.price * quantity;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `<h2>Total Bill : $ ${totalAmount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
  } else return;
};

totalAmount();

let clearCart = () => {
  cartProducts = [];
  generateCartItems();
  cartAmount();
  totalAmount();
  localStorage.setItem("cart", JSON.stringify(cartProducts));
};
