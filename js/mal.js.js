function showLoadingIndicator() {
  const itemList = document.getElementById("jackets-container");
  itemList.innerHTML = "<li>Loading...</li>";
}

const loading = document.querySelector(".loader");

setTimeout(function(){
  loading.classList.remove("loading-indicator");
}, 1000);


jacketContainer.innerHTML = `<div class="loading-animation">
<div class="loader"></div>
</div>`;


if (jacket.onSale) {
  const jacketPrice = document.createElement("p");
  jacketPrice.classList.add("product-text2", "product-text3", "grid-pr-3");
  jacketPrice.innerHTML = `<span class="discount product-text2 product-text3 grid-pr-3"> ${jacket.price} </span> | ${jacket.discountedPrice}`;
  jacketText.appendChild(jacketPrice);          
} else {
  const jacketPrice = document.createElement("p");
  jacketPrice.classList.add("product-text2", "product-text3", "grid-pr-3");
  jacketPrice.innerHTML = `${jacket.price}`;
  jacketText.appendChild(jacketPrice); 
}


