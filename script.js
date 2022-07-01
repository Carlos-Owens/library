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

    // Remove extra displayed card
    const removeDivs = document.querySelectorAll(".card") 
    removeDivs.forEach((divs) => {
        divs.remove();
    })
    
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        const title = document.createElement("p")
        const author = document.createElement("p");
        const pages = document.createElement("p")
        const btnContainer= document.createElement("div");
        const readBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        card.classList.add("card");
        btnContainer.classList.add("btn-container");
        readBtn.classList.add("read-btn");
        deleteBtn.classList.add("delete-btn");

        // Remove card from array
        deleteBtn.dataset.linkedArray = index;

        deleteBtn.addEventListener("click", removeCard);
        function removeCard() {
            let retrievedBook = deleteBtn.dataset.linkedArray;
            myLibrary.splice(parseInt(retrievedBook), 1);
            card.remove();
            displayBooks();
        }

        // Change status
        readBtn.dataset.linkedArray = index;
        readBtn.addEventListener("click", changeStatus);
        function changeStatus() {
            let retrievedStatus = readBtn.dataset.linkedArray;
            if(myLibrary[parseInt(retrievedStatus)].status === true) {
                myLibrary[parseInt(retrievedStatus)].status = !myLibrary[
                    parseInt(retrievedStatus)].status;
                readBtn.classList.remove("btn-green")
                readBtn.classList.add("btn-red");
                readBtn.textContent = "Not Read";
                libraryInfo()
            } else {
                myLibrary[parseInt(retrievedStatus)].status = !myLibrary[
                    parseInt(retrievedStatus)].status;
                    readBtn.classList.remove("btn-red")
                    readBtn.classList.add("btn-green");
                    readBtn.textContent = "Read";
                    libraryInfo()
            }
        }

        title.textContent = `"${book.title}"`;
        author.textContent = `${book.author}`;
        pages.textContent = `${book.pages} pages`;
        deleteBtn.textContent = "Remove";

        if(book.status === true) {
            readBtn.classList.add("btn-green");
            readBtn.textContent = "Read"
        } else {
            readBtn.classList.add("btn-red");
            readBtn.textContent = "Not Read";
        }

        cardDisplay.appendChild(card);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(btnContainer);
        btnContainer.appendChild(readBtn);
        btnContainer.appendChild(deleteBtn);
    });
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

function deleteAll() {
    myLibrary = [];
}

const clicks = () => {
    document.addEventListener("click", e => {
        const { target } = e;
        // const tr = target.parentNode.parentNode.index;
        if(target.id === "add-book") {
            validateForm(e);
        }
        else if(target.id === "delete") {
            deleteAll();
            displayBooks()
        }
    });
}
clicks();