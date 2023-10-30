function save(key, value) {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
}

function load(key) {
  const jsonValue = localStorage.getItem(key);
  return JSON.parse(jsonValue);
}

function renderCart() {
  let getCart = localStorage.getItem("cart");
  let parseCart = JSON.parse(getCart);

  for (let item of parseCart) {
    const getCartContainer = document.querySelector(".cartContainer");
    getCartContainer.innerHTML += `
                                 <div class="movieId" data-id="${item.id}">  
                                   <div class="item_info">
                                     <p>${item.discount} kr</p>
                                     <div class="counterContainer">
                                       <div class="decrement">
                                         <button class="dec" id="${item.id}">-</button>
                                       </div>
                                       <div class="quantity">
                                         <input class="quant" type="text" value="${item.qty}" aria-label="Quantity">
                                       </div>
                                       <div class="increment">
                                         <button class="inc" id="${item.id}">+</button>
                                      </div>
                                     </div>
                                     <p class="totalSinglemovie"></p>
                                     <p><i class="fa-solid fa-trash fa-lg" id="${item.id}"></i></p>
                                   </div>
                                   <div class="sb_movie">
                                     <img src="${item.image}" alt="${item.title}" class="product_error_img">
                                     <div>
                                       <p><a href="product_info.html?id=${item.id}">${item.title}</a></p>
                                     </div>
                                   </div>
                                 </div>`;
  }
}

const cart = load("cart");

function calculateTotal() {
  return cart.reduce((total, currentItem) => {
    let parsedNumber = parseFloat(currentItem.discount).toFixed(2);
    return total + currentItem.discount * currentItem.qty;
  }, 0);
}

// function calculateTotalPlusShipping() {
//   return cart.reduce((total, currentItem) => {
//     let parsedNumber = parseFloat(currentItem.discount).toFixed(2);
//     return total + 50 + parsedNumber * currentItem.qty;
//   }, 0);
// }

function calculateTotalSinglemovie() {
  for (let i = 0; i < cart.length; i++) {
    const getSumSinglemovieContainer =
      document.querySelectorAll(".totalSinglemovie");

    for (let i = 0; i < getSumSinglemovieContainer.length; i++) {
      let a = parseFloat(cart[i].discount).toFixed(2);
      let b = cart[i].qty;
      let calculate = a * b;
      getSumSinglemovieContainer[i].innerHTML = `${parseFloat(calculate)} kr`;
    }
  }
}

const getSumContainer = document.querySelector(".sumContainer");
getSumContainer.innerHTML = `${parseFloat(calculateTotal())} kr`;

const getSumPlusShippingContainer = document.querySelector(".plusShipping");
getSumPlusShippingContainer.innerHTML = `${calculateTotal() + 50} kr`;
renderCart();

function remove() {
  const getTrashIcons = document.querySelectorAll(".fa-trash");
  for (let icon of getTrashIcons) {
    icon.addEventListener("click", () => {
      const getIdContainer = document.querySelectorAll(".movieId[data-id]");

      for (let container of getIdContainer) {
        if (icon.id === container.dataset.id) {
          container.remove();
        }
      }

      let movie = cart.findIndex((movie) => icon.id === movie.id);

      cart.splice(movie, 1);

      save("cart", cart);
    });
  }
}

calculateTotalSinglemovie();

remove();
