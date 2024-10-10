const myLibrary = [
    {title: "Darkly Dreaming Dexter", author: "Jeff Lindsay", pages: 133}
];
const container = document.querySelector(".container");

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function getAllBooks() {
    myLibrary.forEach(bookObj => {
        const book = document.createElement("div");
        book.classList.add("book");
        book.textContent = `${bookObj.title} by ${bookObj.author}, ${bookObj.pages} pages`;

        container.appendChild(book);
    });
}

function addBookToLibrary() {
    let book = new Book(
        prompt("Enter book title", ""),
        prompt("Enter book author", ""),
        prompt("Enter number of pages", "")
    )
    myLibrary.push(book);
}

addBookToLibrary();
getAllBooks();


