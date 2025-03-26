
document.addEventListener("DOMContentLoaded", function () {
    loadBooks(); // Load books on page load

    document.getElementById("searchBtn").addEventListener("click", function () {
        searchBooks();
    });
});

function loadBooks() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../backend/search.php", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let books = JSON.parse(xhr.responseText);
            updateTable(books);
        } else {
            console.error("Error loading books: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Network error occurred");
    };

    xhr.send();
}

function searchBooks() {
    let title = document.getElementById("title").value.trim();
    let author = document.getElementById("author").value.trim();

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `../backend/search.php?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            let books = JSON.parse(xhr.responseText);
            updateTable(books);
        } else {
            console.error("Error fetching search results: " + xhr.status);
        }
    };

    xhr.onerror = function () {
        console.error("Network error occurred");
    };

    xhr.send();
}

function updateTable(books) {
    let bookList = document.getElementById("bookList");
    bookList.replaceChildren(); // Clears previous results efficiently

    books.forEach(book => {
        let row = document.createElement("tr");
        let titleCell = document.createElement("td");
        let authorCell = document.createElement("td");
        let priceCell = document.createElement("td");

        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        priceCell.textContent = book.price;

        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(priceCell);
        bookList.appendChild(row);
    });
}
