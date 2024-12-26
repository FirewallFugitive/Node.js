
let currentSearchResults = [];
let sortAscending = true;

function displaySearchResults(movies) {
  const resultsList = document.querySelector('#results-list');
  resultsList.innerHTML = '';

  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${movie.title}</strong> (${movie.releaseYear}) - ${movie.genre}
      <br>
      <em>${movie.description}</em>
    `;
    resultsList.appendChild(li);
  });
}


const searchMovies = async () => {
  try {
    const searchTerm = document.querySelector('#search-input').value.trim();
    if (!searchTerm) {
      alert('Please enter a search term.');
      return;
    }

    const response = await fetch(`${API_URL}/movies/search?q=${encodeURIComponent(searchTerm)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        alert('No movies found for that search.');
        return;
      }
      throw new Error('Failed to search movies.');
    }

    const movies = await response.json();
    console.log('Search results:', movies);

    currentSearchResults = movies;

    displaySearchResults(currentSearchResults);

    document.getElementById('search-results').classList.remove('hidden');

    document.getElementById('sort-year-btn').classList.remove('hidden');

    sortAscending = true;
    document.getElementById('sort-year-btn').textContent = 'Sort by Year (ASC)';

  } catch (error) {
    console.error('Error searching movies:', error.message);
    alert('Failed to search movies. Please try again.');
  }
};


function toggleSortByYear() {
  if (!currentSearchResults || currentSearchResults.length === 0) {
    alert('No search results to sort!');
    return;
  }

  if (sortAscending) {
    currentSearchResults.sort((a, b) => a.releaseYear - b.releaseYear);
    sortAscending = false;
    document.getElementById('sort-year-btn').textContent = 'Sort by Year (ASC)';
  } else {
    currentSearchResults.sort((a, b) => b.releaseYear - a.releaseYear);
    sortAscending = true;
    document.getElementById('sort-year-btn').textContent = 'Sort by Year (DESC)';
  }

  displaySearchResults(currentSearchResults);
}

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      searchMovies();
    });
  }

  const sortYearBtn = document.getElementById('sort-year-btn');
  if (sortYearBtn) {
    sortYearBtn.addEventListener('click', toggleSortByYear);
  }
});
