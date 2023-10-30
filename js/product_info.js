import { fetchmovie, title } from "./api.js";
import { error } from "./error.js";

async function createmovieHtml() {
  try {
    const movieDetails = await fetchmovie();

    const movieWrapper = document.querySelector(".product_info");
    const titleContainer = document.querySelector("#title");
    const getLoaderDiv = document.querySelector(".loader");
    getLoaderDiv.classList.remove("loader");


    movieWrapper.innerHTML = `
                                <div>
                                  <a href="products.html" class="cta-button">Back</a>
                                </div>
                                <div class="movieImage movie_info_image">
                                  <div class="movie-info_image-container">
                                  <img src="${movieDetails.images[0].src}" alt="${movieDetails.images[0].alt}">
                                  </div>
                                  <i class="fa-regular fa-heart fa-xl"></i>
                                </div>
                                <div class="movieCard">
                                  <div>
                                    <h3>${movieDetails.name} 
                                    <p><span class="sales">${movieDetails.prices.regular_price} kr</span></p>
                                    <span class="hideDiscount discount">${movieDetails.prices.sale_price} kr</span></h3>
                                  </div>
                                  <div class="movie_details">
                                    <p class="movie_description"> ${movieDetails.description}</p>
                                    <p>Colour: ${movieDetails.attributes[0].terms[0].name}</p>
                                  </div>
                                  <div>
                                    <button class="cta-button add_cart" data-id="${movieDetails.id}" data-price="${movieDetails.prices.regular_price}" data-discount="${movieDetails.prices.sale_price}" data-title="${movieDetails.name}" data-onsale="${movieDetails.on_sale}" data-image="${movieDetails.images[0].src}">Add to cart</button>
                                  </div>`;

    if (!movieDetails.on_sale) {
      const hideDiscount = document.querySelector(".hideDiscount");
      hideDiscount.style.display = "none";
    }

    if (movieDetails.on_sale) {
      const getSaleSpan = document.querySelector(".sales");
      getSaleSpan.classList.add("movieSale");
    }
    // }
  } catch (e) {
    console.error(e);
    error();
  }
}

createmovieHtml();
