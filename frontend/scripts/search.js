document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('search-bar').value.trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const url = `${API_URL}/movies/search?query=${encodeURIComponent(query)}`;
    console.log('Fetching from:', url);

    try {
        const response = await fetch(url);
        const results = await response.json();

        console.log('Response from backend:', results);

        if (response.ok) {
            // Verwerk de resultaten
        } else {
            alert(results.error || 'No movies found.');
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        alert('Failed to fetch search results. Please try again.');
    }
});
