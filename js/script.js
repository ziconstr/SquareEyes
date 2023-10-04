const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";

const getMovieText = document.querySelectorAll(".movieText");

async function getMovies() {
  const response = await fetch(squareEyesAPI);
  const result = await response.json();
  return result;
}



async function displayMovies() {
  const movies = await getMovies();
  const moviesContainer = document.getElementById("movies_container");
  console.log(moviesContainer.outerHTML);

  for (i = 0; i < movies.length; i++) {
    const movie = movies[i];


    if (movie.onSale){
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        const image = document.createElement("img");
        image.srt = movie.image;
        image.alt = movie.description;

        const movieText = document.createElement("p");
        movieText.classList.add("container-movies");
        movieText.innerHTML = `${movie.tittle} <span class="movieSale">${movie.price} </span>  $${movie.discountedPrice}`;

        const button = document.createElement("a");
        button.href = "#";
        button.classList.add("button");
        button.textContent = "Add to bag";

        moviesContainer.appendChild(image);
        moviesContainer.appendChild(movieText);
        moviesContainer.appendChild(button);
        

    }
  }
}


displayMovies ();


  // for (let i = 0; i < result.length; i++) {
  //   console.log(result[i]);
  // }

  // for (let i = 0; i < getMovieText.length; i++) {
  //   let moviesOnSale = result[i].onSale;

  //   getMovieText[i].innerHTML = ` ${result[i].tittle} $${result[i].price}`;

  //   if (moviesOnSale === true) {
  //     result[i].price = getMovieText[
  //       i
  //     ].innerHTML = `${result[i].tittle} <span class="moviesale">${result[i].price} </span> $${result}
  //   } 
  // }