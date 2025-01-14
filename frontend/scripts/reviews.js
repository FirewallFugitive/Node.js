const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews.');
      }
  
      const reviews = await response.json();
  
      if (!Array.isArray(reviews)) {
        throw new Error('Invalid response: reviews is not an array.');
      }
  
      const reviewsTable = document.querySelector('#reviews-table tbody');
      reviewsTable.innerHTML = ''; // Clear the table
  
      reviews.forEach((review) => {
        const movieTitle = review.Movie ? review.Movie.title : 'Unknown'; // Use movie data from backend
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
      console.error('Error fetching reviews:', error.message);
      alert('Failed to load reviews. Please try again.');
    }
  };
  

  const addReview = async () => {
    const username = prompt('Enter username:');
    const rating = parseInt(prompt('Enter rating (1-5):'), 10);
    const review = prompt('Enter review:');

    try {
        // Fetch movies for the dropdown
        const moviesResponse = await fetch(`${API_URL}/movies`);
        if (!moviesResponse.ok) {
            alert('Failed to fetch movies. Please try again.');
            return;
        }

        const movies = await moviesResponse.json();
        const moviesList = movies.movies || []; // Safely access the array
        if (moviesList.length === 0) {
            alert('No movies available to review.');
            return;
        }

        const movieOptions = moviesList.map(movie => `${movie.id}: ${movie.title}`).join('\n');
        const movieSelection = prompt(`Enter the movie ID for the review:\n${movieOptions}`);
        const fk_movieId = parseInt(movieSelection, 10);

        if (!username || isNaN(rating) || !review || isNaN(fk_movieId)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        // Send POST request to add the review
        const response = await fetch(`${API_URL}/reviews/${fk_movieId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, rating, review, fk_movieId }),
        });

        if (response.ok) {
            alert('Review added successfully!');
            fetchReviews(); // Refresh the reviews table
        } else {
            throw new Error('Failed to add review.');
        }
    } catch (error) {
        console.error('Error adding review:', error.message);
        alert('Failed to add the review. Please try again.');
    }
};

const editReview = async (reviewId) => {
    try {
        const reviewResponse = await fetch(`${API_URL}/reviews/${reviewId}`);
        if (!reviewResponse.ok) {
            alert('Failed to fetch the review details. Please try again.');
            return;
        }
        const reviewDetails = await reviewResponse.json();

        const username = prompt('Enter new username:', reviewDetails.username);
        const rating = parseInt(prompt('Enter new rating (1-5):', reviewDetails.rating), 10);
        const review = prompt('Enter new review:', reviewDetails.review);

        if (!username || isNaN(rating) || !review) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, rating, review }),
        });

        if (response.ok) {
            alert('Review updated successfully!');
            fetchReviews(); 
        } else {
            throw new Error('Failed to update review.');
        }
    } catch (error) {
        console.error('Error updating review:', error.message);
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
            const responseData = await response.json();
            console.error('Server error:', responseData);
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
