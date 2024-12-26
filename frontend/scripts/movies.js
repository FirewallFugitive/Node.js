let currentPage = 1;
const pageSize = 1; // 1 movie per page

const fetchMovies = async () => {
  try {
    const offset = (currentPage - 1) * pageSize;

    // Fetch paginated movies
    const response = await fetch(`${API_URL}/movies?limit=${pageSize}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }

    const data = await response.json();

    // Ensure `movies` exists and is an array
    if (!data.movies || !Array.isArray(data.movies)) {
      throw new Error('Invalid response: movies is undefined or not an array.');
    }

    const moviesTable = document.querySelector('#movies-table tbody');
    moviesTable.innerHTML = ''; // Clear the table before populating

    // Populate the table with movies
    if (data.movies.length === 0) {
      moviesTable.innerHTML = '<tr><td colspan="6">No movies available.</td></tr>';
    } else {
      data.movies.forEach((movie) => {
        const row = `
          <tr>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.director}</td>
            <td>${movie.releaseYear}</td>
            <td>${movie.description}</td>
            <td>
              <button onclick="editMovie(${movie.id})">Edit</button>
              <button onclick="deleteMovie(${movie.id})">Delete</button>
            </td>
          </tr>
        `;
        moviesTable.innerHTML += row;
      });
    }

    // Update pagination controls
    updatePaginationControls(data.currentPage, data.totalPages);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    alert('Failed to load movies. Please try again.');
  }
};


const updatePaginationControls = (current, total) => {
  document.querySelector('#current-page').textContent = `Page ${current} of ${total}`;
  document.querySelector('#prev-page').disabled = current === 1;
  document.querySelector('#next-page').disabled = current === total;
};

// Pagination button handlers
document.querySelector('#prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies();
  }
});

document.querySelector('#next-page').addEventListener('click', () => {
  currentPage++;
  fetchMovies();
});

// Initialize the movies table once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchMovies();
  document.querySelector('#add-movie-btn').addEventListener('click', () => {
    addMovie();
  });
});
