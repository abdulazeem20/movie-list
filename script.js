let movies = await $.get("/movies.json", null, null, "json");
function tableRow({ title, genre, stock, rate, id }) {
	let row = $(`
        <tr class="movie-row" data-genre="${genre}">
            <td>${title}</td>
            <td>${genre}</td>
            <td class="right">${stock}</td>
            <td class="right">${rate}</td>
            <td class="like center"></td>
            <td class="action center"></td>
        </tr>
    `);
	row.find(".like").append(heartButton({ id }));
	row.find(".action").append(deleteButton());
	return row;
}

function deleteButton() {
	let button = $(`
        <button type="button" class="delete">Delete</button>
    `);
	button.on("click", function () {
		let qunatity = $(".quantity").text();
		$(".quantity").text(--qunatity);
		$(this).parents("tr").remove();
		[...$(".movie-row")] == 0 && $("table").remove();
	});
	return button;
}
function heartButton({ id }) {
	let className = id % 2 != 0 ? "far" : "fa";
	function handleLike() {
		$(this).toggleClass("liked", !$(this).hasClass("liked"));
		let className = $(this).hasClass("liked") ? "far" : "fa";
		let icon = (className) => `<i class="${className} fa-heart icon"></i>`;
		$(this).html(icon(className));
	}
	let button = $(`
        <button type="button" class="heart ${id % 2 != 0 && "liked"}">
            <i class="${className} fa-heart icon"></i> 
        </button>
    `);
	button.on("click", handleLike);
	return button;
}

movies.forEach((movie, id) =>
	$("tbody").append(tableRow({ ...movie, id: ++id }))
);
movies.forEach((movie, id) =>
	$("tbody").append(tableRow({ ...movie, id: ++id }))
);

$(".quantity").text(movies.length * 2);
let allGenres = [];
movies.forEach((movie) => {
	if (!allGenres.includes(movie.genre)) allGenres.push(movie.genre);
});
$(".genres").append(
	allGenres
		.map(
			(genre) =>
				`<li class="genre"> 
                    <button type="button" data-genre="${genre}" class="genre-btn">
                        ${genre}
                    </button> 
                </li>`
		)
		.join("")
);

$(".genre-btn").on("click", function () {
	let genre = $(this).data("genre");
	let movieRow = [...$(".movie-row")];
	let parentSiblings = $(this).parent().siblings();
	if (genre == "all") {
		movieRow.forEach((row) => $(row).removeClass("close"));
		$(".quantity").text(movieRow.length);
	} else {
		let selectedRow = movieRow.filter(
			(row) => $(row).data("genre") === genre
		);
		movieRow.forEach((row) =>
			$(row).toggleClass("close", !selectedRow.includes(row))
		);
		$(".quantity").text(selectedRow.length);
	}
	$(this).addClass("active");
	parentSiblings.find(".genre-btn").removeClass("active");
});
