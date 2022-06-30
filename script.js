let myLibrary = [];

// Book constructor
function Books(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// Add constructor to library array   RETURN TO THIS FUNCTION!!!
function addBookToLibrary(title, author, pages, status) {
    let books = new Books(title, author, pages, status);
    myLibrary.push(books);
    displayBooks();
}

// Show library info
function libraryInfo() {
    const readInfo = document.querySelector("#read-info");
    const unreadInfo = document.querySelector("#unread-info");
    const totalInfo = document.querySelector("#total-info");

    let readCount = 0;
    let unreadCount = 0;
    readInfo.textContent = 0;
    unreadInfo.textContent = 0;
    myLibrary.forEach((info) => {
        if(info.status === true) {
            readCount++;
            readInfo.textContent = readCount;
        } else {
            unreadCount++;
            unreadInfo.textContent = unreadCount;
        }
    })
    totalInfo.textContent = myLibrary.length;
}

// Show book cards
function displayBooks() {
    libraryInfo();
    const cardDisplay = document.querySelector(".card-display");

    // Remove extra card
    const removeDivs = document.querySelectorAll(".card") 
    removeDivs.forEach((divs) => {
        divs.remove();
    })

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        const title = document.createElement("p")
        const author = document.createElement("p");
        const pages = document.createElement("p")
        const btnContainer= document.createElement("div");
        const readBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        card.classList.add("card");
        btnContainer.classList.add("btn-container");
        readBtn.classList.add("btn");
        deleteBtn.classList.add("delete-btn");

        title.textContent = `"${book.title}"`;
        author.textContent = `${book.author}`;
        pages.textContent = `${book.pages} pages`;
        deleteBtn.textContent = "Remove";

        if(book.status) {
            readBtn.textContent = "Read"
            readBtn.classList.add("btn-green");
        } else {
            readBtn.textContent = "Not Read";
            readBtn.classList.add("btn-red");
        }

        cardDisplay.appendChild(card);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(btnContainer);
        btnContainer.appendChild(readBtn);
        btnContainer.appendChild(deleteBtn);
    })
}

// Form Validation 
const validateForm = (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const titleInput = document.querySelector("#title");
    const titleErr = document.querySelector(".title");
    const authorInput = document.querySelector("#author");
    const authorErr = document.querySelector(".author");
    const pagesInput = document.querySelector("#pages");
    const pagesErr = document.querySelector(".pages");
    const checkbox = document.querySelector("input[name='check']")
    if(titleInput.value === "") {
        titleErr.style.display = "block";
    } else {
        titleErr.style.display = "none"
    }
    if(authorInput.value === "") {
        authorErr.style.display = "block";
    } else {
        authorErr.style.display = "none";
    }
    if(pagesInput.value === "" || pagesInput.value.match(/[^1-9]/) || pagesInput.value <= 0) {
        pagesErr.style.display = "block";
    } else {
        pagesErr.style.display = "none"
    }
    if(titleInput.value !== "" && authorInput.value !== "" && pagesInput.value !== "" && pagesInput.value > 0) { 
        if(checkbox.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, true)
        } else {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, false)
        }
        form.reset();
    }
}

const clicks = () => {
    document.addEventListener("click", e => {
        const { target } = e;
        if(target.id === "add-book") {
            validateForm(e);
        }
        // else if(target.classList.contains("delete-btn")) {
        //     myLibrary.splice()
        // }
    })
}

clicks();