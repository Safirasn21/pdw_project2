document.getElementById('addMovieForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const movieTitle = document.getElementById('movieTitle').value;
    const movieSchedule = document.getElementById('movieSchedule').value;
    const moviePoster = document.getElementById('moviePoster').value;

    if (movieTitle && movieSchedule && moviePoster) {
        const movie = {
            title: movieTitle,
            schedule: movieSchedule,
            image: moviePoster
        };
        addMovie(movie);
        alert(`Film ${movieTitle} telah ditambahkan.`);
        this.reset();

        // Menampilkan tombol "Upload" jika ada film yang ditambahkan
        document.getElementById('uploadButton').style.display = 'block';
        
        // Menyimpan data film ke localStorage
        saveMoviesToLocalStorage();
    } else {
        alert('Silakan lengkapi semua field.');
    }
});

// Fungsi untuk menambahkan data film ke daftar film
function addMovie(movie) {
    const movieList = document.getElementById('movieList');
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="movie-item">
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-details">
                <span>${movie.title}</span>
                <span>Jadwal: ${movie.schedule}</span>
            </div>
        </div>`;
    movieList.appendChild(li);
}

// Fungsi untuk menyimpan data film ke localStorage
function saveMoviesToLocalStorage() {
    const movies = Array.from(document.querySelectorAll('#movieList .movie-item')).map(movieItem => {
        return {
            title: movieItem.querySelector('.movie-details span:first-child').textContent,
            schedule: movieItem.querySelector('.movie-details span:nth-child(2)').textContent.replace('Jadwal: ', ''),
            image: movieItem.querySelector('img').getAttribute('src')
        };
    });
    localStorage.setItem('uploadedMovies', JSON.stringify(movies));
}

// Load movies from localStorage on page load
window.addEventListener('load', function() {
    const movies = JSON.parse(localStorage.getItem('uploadedMovies')) || [];
    movies.forEach(movie => addMovie(movie));
});
