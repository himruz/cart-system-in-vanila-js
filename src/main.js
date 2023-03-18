let shop = document.getElementById("shop");


let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

console.log(cartProducts);

let generateShop = () => {
  shopItemsData.map((shopData) => {
    let { id, name, price, desc, img } = shopData;
    let productQuantity =
      cartProducts.find((product) => product.id === id) || [];
    console.log(productQuantity);
    return (shop.innerHTML += `<div id=product-id-${id} class="item">
                            <img width="220" src='${img}' alt="">
                            <div class="details">
                              <h3>${name}</h3>
                              <p>${desc}</p>
                              <div class="price-quantity">
                                <h2>$ ${price}</h2>
                                <div class="buttons">
                                  <i onclick="decrement('${id}')"  class="bi bi-dash-lg"></i>
                                  <div id="${id}" class="quantity">${
      productQuantity.quantity === undefined ? 0 : productQuantity.quantity
    }</div>
                                  <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                                </div>
                              </div>
                            </div>
                        </div>`);
  });
};
generateShop();

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

  update(id);
  localStorage.setItem("cart", JSON.stringify(cartProducts));
  console.log(cartProducts);
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
  console.log(cartProducts);
};

let update = (id) => {
  let selectedProduct = cartProducts.find((product) => product.id === id);

  let quantity = selectedProduct.quantity;

  let quantityField = document.getElementById(id);

  quantityField.innerHTML = quantity;
  cartAmount();
};

let cartAmount = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cartProducts.map((p)=> p.quantity).reduce((x, y)=> x+y, 0)
  
};

cartAmount()
