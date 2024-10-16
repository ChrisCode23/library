// Stores all books as objects
const myLibrary = [];


const dialog = document.querySelector("dialog");

const newBookBtn = document.querySelector("#newBookBtn");
const submitBtn = document.querySelector("#submitBtn");

// Selects book inputs for DOM manipulation
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const bookStatusYes = document.querySelector("#bookStatusYes");
const bookStatusNo = document.querySelector("#bookStatusNo");

const libraryTable = document.querySelector("#library");
const tableBody = libraryTable.querySelector("tbody");

// These store the data input by user in the form and change every time new data is submitted
let inputBookTitle;
let inputBookAuthor;
let inputBookPages;
let inputBookStatus;


// Constructor for books
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// Sets default value if no user input has occurred
Book.prototype.setReadStatus = function(inputReadStatus) {
    inputReadStatus == "Yes" ? this.readStatus = "Read"
    : this.readStatus = "Not read";
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

        // "setReadStatus" sets each book to "not read yet" by default
        const bookStatus = document.createElement("td");
        bookObj.setReadStatus();
        bookStatus.textContent = bookObj.readStatus;

        const actionBtn = document.createElement("td");

        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.setAttribute("id", "deleteBookBtn");
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
        book.appendChild(bookStatus);
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

    // The "input..." variables store the data written by user in the form fields
    inputBookTitle = bookTitle.value;
    inputBookAuthor = bookAuthor.value;
    inputBookPages = bookPages.value;
    
    // Picks the radio option selected by the user
    if (bookStatusYes.checked) {
        inputBookStatus = bookStatusYes.value;
    }
    if (bookStatusNo.checked) {
        inputBookStatus = bookStatusNo.value;

    }

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

    const bookStatus = document.createElement("td");
    bookObj.setReadStatus(inputBookStatus);  // Passes the radio option as parameter to the "Book" prototypal method
    bookStatus.textContent = bookObj.readStatus;

    const actionBtn = document.createElement("td");
    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.setAttribute("id", "deleteBookBtn");
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
    book.appendChild(bookStatus);
    book.appendChild(actionBtn);

    actionBtn.appendChild(deleteBookBtn);


}


// The book is added to the table upon closing dialog window
dialog.addEventListener("close", addBookToLibrary);


const book1 = new Book("Darkly Dreaming Dexter", "Jeff Lindsay", 133);
const book2 = new Book("The Jordan Rules", "Sam Smith", 378);

myLibrary.push(book1, book2);

getAllBooks();


