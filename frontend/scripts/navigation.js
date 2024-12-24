const sections = {
  home: document.getElementById('start-screen'),
  movies: document.getElementById('movies-section'),
  reviews: document.getElementById('reviews-section'),
};

document.querySelector('#view-home').addEventListener('click', () => {
  Object.values(sections).forEach(section => section.classList.add('hidden'));
  sections.home.classList.remove('hidden');
});

document.querySelector('#view-movies').addEventListener('click', () => {
  Object.values(sections).forEach(section => section.classList.add('hidden'));
  sections.movies.classList.remove('hidden');
  fetchMovies(); // Ensure this function exists in your movies.js file
});

document.querySelector('#view-reviews').addEventListener('click', () => {
  Object.values(sections).forEach(section => section.classList.add('hidden'));
  sections.reviews.classList.remove('hidden');
  fetchReviews(); // Ensure this function exists in your reviews.js file
});
