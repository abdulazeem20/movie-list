let getMovie = async function () {
	try {
		let results = await $.get("./movies.json");
		return results;
	} catch (error) {
		$("body").empty().append(error.responseText);
	}
};

let movies = await getMovie();

movies.forEach((movie) => {
	let row = $(`
        <tr data-genre="${movie.genre}">
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.stock}</td>
            <td>${movie.rate}</td>
            <td>
                <button class="btn">Delete</button>
            </td>
        </tr>
    `);
	$("tbody").append(row);
});
movies.forEach((movie) => {
	let row = $(`
        <tr data-genre="${movie.genre}">
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${movie.stock}</td>
            <td>${movie.rate}</td>
            <td>
                <button class="btn">Delete</button>
            </td>
        </tr>
    `);
	$("tbody").append(row);
});

$(".count").text($("tbody tr").length);

$(".btn[data-genre]").on("click", function () {
	let genre = $(this).data("genre");
	let movieRows = [...$("tbody tr")];

	if (genre == "all") {
		$("tbody tr").removeClass("close");
		$(".count").text($("tbody tr").length);
		return;
	}

	let filteredMovie = movieRows.filter((row) => {
		let rowGenre = $(row).data("genre");
		if (genre.toLowerCase() === rowGenre.toLowerCase()) {
			return row;
		}
	});

	movieRows.forEach((movie) => {
		if (!filteredMovie.includes(movie)) {
			$(movie).addClass("close");
		} else {
			$(movie).removeClass("close");
		}
	});
	$(".count").text(filteredMovie.length);
});

let handleDelete = function () {
	let row = $(this).parents("tr");
	row.remove();
	let previousCount = $(".count").text();
	$(".count").text(--previousCount);
};

$("tbody .btn").on("click", handleDelete);
