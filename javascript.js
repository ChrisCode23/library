// Stores all books as objects
const myLibrary = [
    { title: "Darkly Dreaming Dexter", author: "Jeff Lindsay", pages: 133 },
    { title: "The Jordan Rules", author: "Sam Smith", pages: 378 }
];


const dialog = document.querySelector("dialog");

const newBookBtn = document.querySelector("#new-book-btn");
const submitBtn = document.querySelector("#submit-btn");

// Selects book inputs for DOM manipulation
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");

const libraryTable = document.querySelector("#library");
const tableBody = libraryTable.querySelector("tbody");

// These store the data input by user in the form and change every time new data is submitted
let inputBookTitle;
let inputBookAuthor;
let inputBookPages;


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
        /* Assigns data attribute based on the index position of that book in "myLibrary" array,
        thus allowing to reference that book object in array when deleting it */
        book.setAttribute("data-index", myLibrary.indexOf(bookObj));

        const bookTitle = document.createElement("td");
        bookTitle.textContent = bookObj.title;

        const bookAuthor = document.createElement("td");
        bookAuthor.textContent = bookObj.author;

        const bookPages = document.createElement("td");
        bookPages.textContent = bookObj.pages;

        const actionBtn = document.createElement("td");
        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.setAttribute("id", "delete-book-btn");
        deleteBookBtn.setAttribute("title", "Remove this book");
        deleteBookBtn.textContent = "DELETE";


        // Deletes book object from array and removes it from the table
        deleteBookBtn.addEventListener("click", () => {
            myLibrary.splice(book.dataset.index, 1);
            book.replaceChildren();
        })

        tableBody.appendChild(book);

        book.appendChild(bookTitle);
        book.appendChild(bookAuthor);
        book.appendChild(bookPages);
        book.appendChild(actionBtn);

        actionBtn.appendChild(deleteBookBtn);
    });
}


// Opens a <dialog> modally when pressing "NEW BOOK" button
newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});



// Prevents data to be sent to a server by default when pressing "SUBMIT" button
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // The "input..." variables store the data written by user in the form
    inputBookTitle = bookTitle.value;
    inputBookAuthor = bookAuthor.value;
    inputBookPages = bookPages.value;

    dialog.close();
})


// New book added by user is inserted in the table
function addBookToLibrary() {
    let bookObj = new Book(inputBookTitle, inputBookAuthor, inputBookPages); // Data input by user is used to create new book object

    // User must enter all form fields, or book isn't added to the table
    for (let key in bookObj) {
        if (!bookObj[key]) {
            return;
        }
    }


    myLibrary.push(bookObj);

    // Adds book and its info as an actual table row
    const book = document.createElement("tr");
    book.setAttribute("data-index", myLibrary.indexOf(bookObj));

    const bookTitle = document.createElement("td");
    bookTitle.textContent = bookObj.title;

    const bookAuthor = document.createElement("td");
    bookAuthor.textContent = bookObj.author;

    const bookPages = document.createElement("td");
    bookPages.textContent = bookObj.pages;

    const actionBtn = document.createElement("td");
    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.setAttribute("id", "delete-book-btn");
    deleteBookBtn.setAttribute("title", "Remove this book");
    deleteBookBtn.textContent = "DELETE";


    // Deletes book object from array and removes it from the table
    deleteBookBtn.addEventListener("click", () => {
        myLibrary.splice(book.dataset.index, 1);
        book.replaceChildren();
    })

    tableBody.appendChild(book);

    book.appendChild(bookTitle);
    book.appendChild(bookAuthor);
    book.appendChild(bookPages);
    book.appendChild(actionBtn);

    actionBtn.appendChild(deleteBookBtn);


}


// The book is added to the table upon closing dialog window
dialog.addEventListener("close", addBookToLibrary);


getAllBooks();


