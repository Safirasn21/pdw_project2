// Function to add movie or booking to the list
function addItem(item, listId) {
    const list = document.getElementById(listId);
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    if (listId === 'movieList') {
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <span>${item.title} - Jadwal: ${item.schedule}</span>`;
    } else if (listId === 'ticketList') {
        itemDiv.innerHTML = `
            <span>Film: ${item.movie}</span>
            <span>Nama: ${item.name}</span>
            <span>Jumlah Tiket: ${item.tickets}</span>`;
    }
    list.appendChild(itemDiv);
}

// Fungsi untuk menambahkan data film ke daftar film dan select dropdown
function addMovie(movie) {
    const movieList = document.getElementById('movieList');
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <span>${movie.title} - Jadwal: ${movie.schedule}</span>`;
    movieList.appendChild(movieDiv);

    // Menambahkan opsi film ke dalam elemen select
    const selectMovie = document.getElementById('movie');
    const option = document.createElement('option');
    option.value = movie.title;
    option.textContent = movie.title;
    selectMovie.appendChild(option);
}

// Load movies from localStorage and populate the movie list and select dropdown on page load
window.addEventListener('load', function() {
    const movies = JSON.parse(localStorage.getItem('uploadedMovies')) || [];
    movies.forEach(movie => addMovie(movie));
});

// Function to handle ticket form submission
document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const movie = document.getElementById('movie').value;
    const name = document.getElementById('name').value;
    const tickets = document.getElementById('tickets').value;

    if (movie && name && tickets) {
        const booking = { movie, name, tickets };
        addItem(booking, 'ticketList');
        alert('Pemesanan tiket berhasil.');
        this.reset();
    } else {
        alert('Silakan lengkapi semua field.');
    }
});

// Function to search movies
function searchMovies() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const movies = document.querySelectorAll(".movie");
    movies.forEach(movie => {
        const title = movie.querySelector("span").textContent.toLowerCase();
        if (title.includes(searchValue)) {
            movie.style.display = "block"; // Show movie if title matches search
        } else {
            movie.style.display = "none"; // Hide movie if title doesn't match search
        }
    });
}

// Function to cancel search
function cancelSearch() {
    document.getElementById("search").value = ""; // Clear search input
    // Call the function to display all movies again
    displayAllMovies();
}

// Function to display all movies
function displayAllMovies() {
    const movies = document.querySelectorAll(".movie");
    movies.forEach(movie => {
        movie.style.display = "block"; // Show all movies
    });
}

// Function to delete all bookings
function deleteBookings() {
    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = ''; // Clear all bookings
    alert('Semua pemesanan telah dihapus.');
}
