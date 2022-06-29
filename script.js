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
    const check = document.querySelector("input[name='check']")
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
        form.reset();
    }
}

const clicks = () => {
    document.addEventListener("click", e => {
        const { target } = e;
        if(target.id === "add-book") {
            validateForm(e);
        }
    })
}

clicks();