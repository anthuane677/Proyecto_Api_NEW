$(document).ready(function() {
    // Obtener el parámetro "title" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    if (movieTitle) {
        fetchMovieDetails(movieTitle);
    }

    function fetchMovieDetails(title) {
        const apiKey = '906b5c9d'; // Reemplaza con tu clave de la API de OMDb
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

        $.ajax({
            url: url,
            method: 'GET',
            success: function(data) {
                if (data.Response === "True") {
                    renderMovieDetails(data);
                } else {
                    $('#moviesInfos').html('<p>Película no encontrada.</p>');
                }
            },
            error: function() {
                $('#moviesInfos').html('<p>Error al buscar la película.</p>');
            }
        });
    }

    function renderMovieDetails(movie) {
        $('#moviesInfos').html(`
          <img src="${movie.Poster}" alt="Poster de ${movie.Title}">
          <div class="movie-details">
            <h2>${movie.Title}</h2>
            <p><span>Año:</span> ${movie.Year}</p>
            <p><span>Género:</span> ${movie.Genre}</p>
            <p><span>Director:</span> ${movie.Director}</p>
            <p><span>Plot:</span> ${movie.Plot}</p>
           
          </div>
        `);
      }
      
});

console.log(movie)