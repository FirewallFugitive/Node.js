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

    attachActionListeners();
    // Update pagination controls
    updatePaginationControls(data.currentPage, data.totalPages);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    alert('Failed to load movies. Please try again.');
  }
};
const attachActionListeners = () => {
  // Attach event listeners for Edit buttons
  document.querySelectorAll('.edit-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const movieId = button.dataset.id;
      editMovie(movieId);
    });
  });

  // Attach event listeners for Delete buttons
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const movieId = button.dataset.id;
      deleteMovie(movieId);
    });
  });
};

const editMovie = async (movieId) => {
  const currentYear = new Date().getFullYear();
  const validGenres = [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Horror",
      "Science Fiction",
      "Sci-Fi",
      "Fantasy",
      "Romance",
      "Thriller",
      "Mystery",
      "Crime",
      "Documentary",
      "Animated",
      "Animation",
      "Musical",
      "Historical",
      "Period",
      "War",
      "Western",
      "Biography",
      "Biopic"
  ];

  const title = prompt('Enter new title:');
  const genre = prompt('Enter new genre:');
  const director = prompt('Enter new director:');
  const releaseYear = parseInt(prompt('Enter new release year:'), 10);
  const description = prompt('Enter new description:');

  // Validate fields
  if (!title || !genre || !director || isNaN(releaseYear)) {
      alert('Please fill in all fields correctly.');
      return;
  }

  if (!validGenres.includes(genre)) {
      alert(`Invalid genre. Please enter one of the following genres: ${validGenres.join(", ")}`);
      return;
  }

  if (releaseYear < 1878 || releaseYear > currentYear) {
      alert(`Release year must be between 1878 and ${currentYear}.`);
      return;
  }

  try {
      const response = await fetch(`${API_URL}/movies/${movieId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, genre, director, releaseYear, description }),
      });

      if (response.ok) {
          alert('Movie updated successfully!');
          fetchMovies(); // Refresh the table
      } else {
          const responseData = await response.json();
          console.error('Server error:', responseData);
          throw new Error('Failed to update movie.');
      }
  } catch (error) {
      console.error('Error updating movie:', error.message);
      alert('Failed to update the movie. Please try again.');
  }
};

const deleteMovie = async (movieId) => {
  if (!confirm('Are you sure you want to delete this movie?')) return;
  try {
      const response = await fetch(`${API_URL}/movies/${movieId}`, {
          method: 'DELETE',
      });
      if (response.ok) {
          alert('Movie deleted successfully!');
          fetchMovies();
      } else {
          throw new Error('Failed to delete movie.');
      }
  } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete the movie. Please try again.');
  }
};


const updatePaginationControls = (current, total) => {
  document.querySelector('#current-page').textContent = `Page ${current} of ${total}`;
  document.querySelector('#prev-page').disabled = current === 1;
  document.querySelector('#next-page').disabled = current === total;
};

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

document.addEventListener('DOMContentLoaded', () => {
  fetchMovies();
  const addMovieButton = document.getElementById('add-movie-btn');
  if (addMovieButton) {
      addMovieButton.addEventListener('click', () => {
          window.location.href = 'add-movie.html';
      });
  }
});
