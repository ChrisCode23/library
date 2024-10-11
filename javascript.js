// Stores all books as objects
const myLibrary = [
    { title: "Darkly Dreaming Dexter", author: "Jeff Lindsay", pages: 133 },
    { title: "The Jordan Rules", author: "Sam Smith", pages: 378 }
];


const dialog = document.querySelector("dialog");

const newBookBtn = document.querySelector("#new-book-btn");
const submitBtn = document.querySelector("#submit-btn");

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");

const libraryTable = document.querySelector("#library");
const tableBody = libraryTable.querySelector("tbody");


// Constructor for books
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}


// Loops through all books in "myLibrary" and displays them as table rows
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


// Opens a <dialog> modally when pressing "NEW BOOK" button
newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});


// Prevents data to be sent to a server by default when pressing "SUBMIT" button
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close(`${bookTitle.value} ${bookAuthor.value} ${bookPages.value} `); // Sends data up to dialog as "returnValue"
})


// New book added by user is inserted in the table
function addBookToLibrary() {
    let bookChunks = dialog.returnValue.split(" "); // The "returnValue" is split into an array of input elements

    let bookObj = new Book(bookChunks[0], bookChunks[1], bookChunks[2]); // Each book chunk represents a book property

    myLibrary.push(bookObj);

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
}


// The book is added to the table upon closing dialog window
dialog.addEventListener("close", addBookToLibrary);


getAllBooks();


