const fetchReviews = async () => {
    try {
        const response = await fetch(`${API_URL}/reviews`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews.');
        }
        const reviews = await response.json();

        const moviesResponse = await fetch(`${API_URL}/movies`);
        if (!moviesResponse.ok) {
            throw new Error('Failed to fetch movies.');
        }
        const movies = await moviesResponse.json();

        const reviewsTable = document.querySelector('#reviews-table tbody');
        reviewsTable.innerHTML = ''; // Clear the table

        reviews.forEach(review => {
            const movie = movies.find(movie => movie.id === review.fk_movieId);
            const movieTitle = movie ? movie.title : 'Unknown';

            const row = `
                <tr>
                    <td>${review.username}</td>
                    <td>${review.rating}</td>
                    <td>${review.review}</td>
                    <td>${movieTitle}</td>
                    <td>
                        <button onclick="editReview(${review.id})">Edit</button>
                        <button onclick="deleteReview(${review.id})">Delete</button>
                    </td>
                </tr>
            `;
            reviewsTable.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        alert('Failed to load reviews. Please try again.');
    }
};

const addReview = async () => {
    const username = prompt('Enter username:');
    const rating = parseInt(prompt('Enter rating (1-5):'), 10);
    const review = prompt('Enter review:');

    const moviesResponse = await fetch(`${API_URL}/movies`);
    if (!moviesResponse.ok) {
        alert('Failed to fetch movies. Please try again.');
        return;
    }
    const movies = await moviesResponse.json();
    const movieOptions = movies.map(movie => `${movie.id}: ${movie.title}`).join('\n');
    const movieSelection = prompt(`Enter the movie ID for the review:\n${movieOptions}`);
    const fk_movieId = parseInt(movieSelection, 10);

    if (!username || isNaN(rating) || !review || isNaN(fk_movieId)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, rating, review, fk_movieId }),
        });

        if (response.ok) {
            alert('Review added successfully!');
            fetchReviews();
        } else {
            throw new Error('Failed to add review.');
        }
    } catch (error) {
        console.error('Error adding review:', error);
        alert('Failed to add the review. Please try again.');
    }
};

const editReview = async (reviewId) => {
    const username = prompt('Enter new username:');
    const rating = parseInt(prompt('Enter new rating (1-5):'), 10);
    const review = prompt('Enter new review:');

    const moviesResponse = await fetch(`${API_URL}/movies`);
    if (!moviesResponse.ok) {
        alert('Failed to fetch movies. Please try again.');
        return;
    }
    const movies = await moviesResponse.json();
    const movieOptions = movies.map(movie => `${movie.id}: ${movie.title}`).join('\n');
    const movieSelection = prompt(`Enter the new movie ID for the review:\n${movieOptions}`);
    const fk_movieId = parseInt(movieSelection, 10);

    if (!username || isNaN(rating) || !review || isNaN(fk_movieId)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, rating, review, fk_movieId }),
        });

        if (response.ok) {
            alert('Review updated successfully!');
            fetchReviews();
        } else {
            throw new Error('Failed to update review.');
        }
    } catch (error) {
        console.error('Error updating review:', error);
        alert('Failed to update the review. Please try again.');
    }
};

const deleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Review deleted successfully!');
            fetchReviews();
        } else {
            throw new Error('Failed to delete review.');
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete the review. Please try again.');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchReviews();
    document.querySelector('#add-review-btn').addEventListener('click', addReview);
});
