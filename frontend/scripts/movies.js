const fetchMovies = async () => {
    try {
        const response = await fetch(`${API_URL}/movies`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies.');
        }
        const movies = await response.json();

        const moviesTable = document.querySelector('#movies-table tbody');
        moviesTable.innerHTML = ''; // Clear the table

        movies.forEach(movie => {
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
    } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Failed to load movies. Please try again.');
    }
};

const addMovie = async () => {
    const title = prompt('Enter movie title:');
    const genre = prompt('Enter movie genre:');
    const director = prompt('Enter movie director:');
    const releaseYear = parseInt(prompt('Enter release year:'), 10);
    const description = prompt('Enter movie description:');

    if (!title || !genre || !director || isNaN(releaseYear)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/movies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, genre, director, releaseYear, description }),
        });

        if (response.ok) {
            alert('Movie added successfully!');
            fetchMovies();
        } else {
            throw new Error('Failed to add movie.');
        }
    } catch (error) {
        console.error('Error adding movie:', error);
        alert('Failed to add the movie. Please try again.');
    }
};

const editMovie = async (movieId) => {
    const title = prompt('Enter new title:');
    const genre = prompt('Enter new genre:');
    const director = prompt('Enter new director:');
    const releaseYear = parseInt(prompt('Enter new release year:'), 10);
    const description = prompt('Enter new description:');

    if (!title || !genre || !director || isNaN(releaseYear)) {
        alert('Please fill in all fields correctly.');
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
            fetchMovies();
        } else {
            throw new Error('Failed to update movie.');
        }
    } catch (error) {
        console.error('Error updating movie:', error);
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
    document.querySelector('#add-movie-btn').addEventListener('click', addMovie);
});
