$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get("categoria"); // 'barbie', 'harry+potter', etc.
  let peliculasOriginales = []; // Variable para almacenar las películas originales

  if (categoria) {
    $("#titulo-categoria").text(`Películas de ${categoria.replace("+", " ")}`);

    const apikey = "906b5c9d";
    const query = encodeURIComponent(categoria);
    const apiUrl = `https://www.omdbapi.com/?apikey=${apikey}&s=${query}`;

    $.ajax({
      type: "GET",
      url: apiUrl,
      dataType: "json",
      success: function (data) {
        console.log("Datos de la API:", data);
        if (data.Search) {
          peliculasOriginales = data.Search; // Almacenamos las películas
          mostrarPeliculas(peliculasOriginales);
        } else {
          console.log("No se encontraron películas");
        }
      },
      error: function (error) {
        console.log("Error en la solicitud", error);
      },
    });
  } else {
    console.log("No se proporcionó una categoría.");
  }

  // Mostrar las películas en el contenedor
  function mostrarPeliculas(peliculas) {
    const moviesContainer = $("#movies-container");
    moviesContainer.empty();

    peliculas.forEach(function (pelicula) {
      const poster =
        pelicula.Poster !== "N/A"
          ? pelicula.Poster
          : "https://via.placeholder.com/300x450";
      const movieTitle = pelicula.Title;
      const movieYear = pelicula.Year;

      const movieDiv = `
                <div class="movie">
                    <img src="${poster}" alt="${movieTitle}">
                    <div class="movie-title">
                        <a href="movie-details.html?title=${encodeURIComponent(
                          movieTitle
                        )}" target="_blank">${movieTitle} (${movieYear})</a>
                    </div>
                </div>
            `;
      moviesContainer.append(movieDiv);
    });
  }

  // Aplicar los filtros y ordenar al hacer clic en el botón
  $("#aplicarFiltros").click(function () {
    let peliculasFiltradas = [...peliculasOriginales]; // Creamos una copia de las películas originales

    const filtroAnio = $("#filtroAnio").val(); // Año a partir del cual filtrar
    const ordenSeleccionado = $("#ordenar").val(); // Opción de orden seleccionada

    // Filtrar por año si se ingresó un valor
    if (filtroAnio) {
      peliculasFiltradas = peliculasFiltradas.filter(
        (pelicula) => parseInt(pelicula.Year) > parseInt(filtroAnio)
      );
    }

    // Ordenar según la opción seleccionada
    switch (ordenSeleccionado) {
      case "tituloAZ":
        peliculasFiltradas.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case "tituloZA":
        peliculasFiltradas.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case "anio-asc":
        peliculasFiltradas.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        break;
      case "anio-desc":
        peliculasFiltradas.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        break;
    }

    // Mostrar las películas filtradas y ordenadas
    mostrarPeliculas(peliculasFiltradas);
  });
});