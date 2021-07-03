import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get search term
  const searchTerm = searchInput.value;
  //get selected one
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  //get limit term
  const searchLimit = document.getElementById("limit").value;
  //check empty input

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }

  //clear input
  searchInput.value === "";

  //search reddit
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    let output = '<div class="card-columns">';

    //loop through the posts
    results.forEach((post) => {
      //check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : "data:image/jpeg;base64,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rHW0rlGx16j5Lcus9h7fXx7TNJqNo89rBe37nX6BqKaVtUe/6ft9vI4IvNRg6rhNzsTpXq9GN2tw9X+FaN5B9HtXwOJmULyrSWFuvE113pNtdPimsS71s/f0Z0K+U6zHHSIT3i5gPs3TM3/Kf8/H+DVP0Yhnaq//AB/k+DaHlE1tgIqWqgHtUb7jxbh7p5z1KpL8qwZVD0dtYPM25fBfDf4nJ6rVPa5stdrHbmzsWY+JmFNym8yZvKVKFOKjBJLuRGk073WJVUpeyw7qqvMn8B65MKTm8IVasKUHObwke2dFdhLodMtXBrG9O5x8qwjjj1DkPZOhoUVSgoo+b6lfSvK7qPlyS7l/eZuDPc1zPAP0jdjbmp0muUHdvqaiw9gsrOVJ9ZVyPqQyYnjsguIAgCAIAgCAIAgCAIAgCAIAgCAIBMgkmCRAIMkqRAPUP0ftpdVtU0k4Gq09tYHfYhFin+EPLLqUkfozUXVqPhGRVOR6ZUAju4yMZJTw8njfTv8AU+mdn02v04fiW0isbcHnhCgIX6LY9o5TV3Gm59ant4HW6d6QYxTuf/L7/deRwF3S2hfio7HwUTzpabtmb8jIufSKEXilHPi/t/JGj6VV2OqdWylmCg5BGTJq2EYxbi3sRZa+6tWNOcVu8ZRvmbvOJgKDOoSN5sXonrdYRuVGus/PXAomO8Z4t4CZVOznPwNbd6ta2y9aWX3Ld/Ze89T6L9FaNAuV+EuYYe5h6RH7Kj5K+r7czaUbeFJbc+84nUdUrXsvW2iuSX173/UfZtjb2j0S72r1VGnB5C2xVZvorzbwEyDWHnm3vLns2neXS1X6xwODY6iknu3n9L+WCMHlHTzyl6vbFYotqop062C1ErVmsDBSAS7HuY8gIySkcRIJEAQBAEAQBAEAQBAEAQBAEAQBAEAmQSIAkgiCBAPo0Gut09i20WPVamStlbFXUkEHBHLgSPGSnghrJGs1lt7b91tlz8t+12dse1jmG2+ZJRIBOYJydH5OdjnW7V0VG7vKb0ssGMjqq/TfPqIXHjGE+YjJwalF4aP0btLpH0f2Xnfs0VNi/N0IllwP0awWHjiQqcVyWD3q3lxV2nUk/a2cRt3y+0rldDorLDxAs1LCtfbuJkkeIltjHPO9u+VXbWsyDqzp0PzelXqQPrj0/wCaMg4y21nYs7MzMcszEsxPeSecgGEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAsqudN7cZl3lKNusRvIeanHMcBwjIK4AgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgH//Z";
      output += `
            <div class="card">
            <img class="card-img-top" src="${image}" alt="${post.title}">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.selftext}</p>
                <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit : ${post.subreddit}</span>
            <span class="badge badge-secondary">Score : ${post.score}</span>

            </div>
            </div>`;
    });

    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
});

function showMessage(message, className) {
  //create the div
  const div = document.createElement("div");
  //add classes4
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const searchContainer = document.getElementById("search-container");
  const search = document.getElementById("search");
  searchContainer.insertBefore(div, search);

  //timeout alert
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
