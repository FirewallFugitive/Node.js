// scripts/navigation.js

// Gather references to your sections
const sections = {
  home: document.getElementById('start-screen'),
  movies: document.getElementById('movies-section'),
  reviews: document.getElementById('reviews-section'),
};

// A helper function to hide all sections
function hideAllSections() {
  Object.values(sections).forEach(section => section.classList.add('hidden'));
}

document.querySelector('#view-home').addEventListener('click', (event) => {
  event.preventDefault();
  hideAllSections();
  sections.home.classList.remove('hidden');

  const searchResults = document.getElementById('search-results');
  const resultsList = document.getElementById('results-list');
  if (searchResults) {
    searchResults.classList.add('hidden');  
  }
  if (resultsList) {
    resultsList.innerHTML = '';           
  }
});

// MOVIES navigation
document.querySelector('#view-movies').addEventListener('click', (event) => {
  event.preventDefault();
  hideAllSections();
  sections.movies.classList.remove('hidden');

  if (typeof fetchMovies === 'function') {
    fetchMovies();
  }
});

// REVIEWS navigation
document.querySelector('#view-reviews').addEventListener('click', (event) => {
  event.preventDefault();
  hideAllSections();
  sections.reviews.classList.remove('hidden');

  if (typeof fetchReviews === 'function') {
    fetchReviews();
  }
});
