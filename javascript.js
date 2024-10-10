const myLibrary = [
    {title: "Darkly Dreaming Dexter", author: "Jeff Lindsay", pages: 133}, 
    {title: "The Jordan Rules", author: "Sam Smith", pages: 378} 
];

const libraryTable = document.querySelector("#library");
const tableBody = libraryTable.querySelector("tbody");


function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function getAllBooks() {
    myLibrary.forEach(bookObj => {
        const book = document.createElement("tr");

        const bookTitle = document.createElement("td");
        bookTitle.textContent = bookObj.title;

        const bookAuthor = document.createElement("td");
        bookAuthor.textContent = bookObj.author;

        const bookPages = document.createElement("td");
        bookPages.textContent = bookObj.pages;

        tableBody.appendChild(book);
        book.appendChild(bookTitle);
        book.appendChild(bookAuthor);
        book.appendChild(bookPages);
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

getAllBooks();


