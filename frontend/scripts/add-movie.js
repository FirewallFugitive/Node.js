const addMovie = async () => {
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
    const movie = {
        title: document.getElementById('title').value.trim(),
        genre: document.getElementById('genre').value.trim(),
        director: document.getElementById('director').value.trim(),
        releaseYear: parseInt(document.getElementById('releaseYear').value.trim(), 10),
        description: document.getElementById('description').value.trim(),
    };

    if (!movie.title || !movie.genre || !movie.director || isNaN(movie.releaseYear)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    if (!validGenres.includes(movie.genre)) {
        alert(`Invalid genre. Please enter one of the following genres: ${validGenres.join(", ")}`);
        return;
    }

    if (movie.releaseYear < 1878 || movie.releaseYear > currentYear) {
        alert(`Release year must be between 1878 and ${currentYear}.`);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/movies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie),
        });
        
        const responseData = await response.json(); 
        console.log('Server response:', responseData);
        
        if (!response.ok) {
            console.error('Server error:', responseData);
            throw new Error('Failed to add the movie.');
        }
        
        alert('Movie added successfully!');
    } catch (error) {
        console.error('Error adding movie:', error.message);
        alert('Failed to add the movie. Please try again.');
    }
};

document.getElementById('add-movie-form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    addMovie();
});
