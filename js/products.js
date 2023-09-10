import { baseApiUrl, endpointApiUrl } from "./variables.js";
import { getData } from "./variables.js";
import { createMessage } from "./errorMessage.js";

const productImageContainer = document.querySelector(".product-card-image");
const productContent = document.querySelector(".product-content-container");
const errorMessage = createMessage("error");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const json = await getData(`${baseApiUrl}${endpointApiUrl}/${id}`);

async function fetchproductImage() {
  try {
    productImageContainer.innerHTML = "";

    const productImage = document.createElement("img");
    productImage.setAttribute("alt", `Filmcover of ${json.name}`);
    productImage.src = json.images[0].src;
    productImage.className = "filmcover-large";
    productImageContainer.appendChild(productImage);
  } catch (error) {
    console.log("An error occured", error);
    productImageContainer.innerHTML = errorMessage;
    throw new Error(error);
  }
}

fetchproductImage();

async function fetchProductContent() {
  try {
    productContent.innerHTML = "";

    document.title = `SquareEyes | ${json.name}`;

    const productTitle = document.createElement("h1");
    productTitle.setAttribute("id", "title-change");
    productTitle.className = "film-title-product-desktop";
    productTitle.innerText = json.name;
    productContent.appendChild(productTitle);

    const productCategoryAndReleased = document.createElement("p");
    productCategoryAndReleased.classList = "film-category";
    productCategoryAndReleased.innerText = json.categories[0].name + ", " + json.attributes[0].terms[0].name;
    productContent.appendChild(productCategoryAndReleased);

    const productDescription = document.createElement("p");
    productDescription.innerText = json.description;
    const modifiedDescription = productDescription.innerText.replace(/<p class="p1">|<\/p>/g, "");
    productDescription.innerText = modifiedDescription;
    productContent.appendChild(productDescription);

    const productPriceContainer = document.createElement("div");
    productPriceContainer.classList = "price-cta-container";
    productContent.appendChild(productPriceContainer);

    const productPrice = document.createElement("p");
    productPrice.classList = "price-product";
    productPrice.innerText = "€ " + json.prices.regular_price / 100;
    productPriceContainer.appendChild(productPrice);

    const addToCartCta = document.createElement("a");
    addToCartCta.href = "checkout.html";
    addToCartCta.classList = "cta add-to-cart";
    addToCartCta.innerText = "Add to cart";
    productPriceContainer.appendChild(addToCartCta);
  } catch (error) {
    console.log("An error occured", error);
    productContent.innerHTML = errorMessage;
    throw new Error(error);
  }
}

fetchProductContent();

const mediaQuery = window.matchMedia("(max-width: 799px)");
const productTitleChange = document.getElementById("title-change");

function titleChange(mediaQuery) {
  if (mediaQuery.matches) {
    productTitleChange.classList.add("film-title-product-mobile");
    productTitleChange.classList.remove("film-title-product-desktop");
  } else {
    productTitleChange.classList.remove("film-title-product-mobile");
    productTitleChange.classList.add("film-title-product-desktop");
  }
}

mediaQuery.addListener(titleChange);
titleChange(mediaQuery);