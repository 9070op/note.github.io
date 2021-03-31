console.log("this is note normal");
showdata();

let tittle = document.getElementById("title");
let enter = document.getElementById("enter");




let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    console.log(enter)
    console.log(tittle)

    let notes = localStorage.getItem("notes");
    let notesobj = "";
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    let mystr = {
        tittle: tittle.value,
        enter: enter.value,
    }
    notesobj.push(mystr);

    localStorage.setItem("notes", JSON.stringify(notesobj));
    tittle.value = "";
    enter.value = "";
    showdata();
    window.location.reload();

})


function showdata() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    let html = "";
    notesobj.forEach(function(element, index) {
        html += `<div class="notes-card col-sm-5 my-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${element.tittle}</h5>
                <p class="card-text">${element.enter}</p>
                <button id=${index} onclick="deletedata(this.id)" class="btn btn-primary">delete</button>
                <button  class="edit btn btn-primary mx-2">Edit</button>

            </div>
        </div>
    </div>`;
    })
    let boom = document.getElementById("boom");
    if (notesobj.length != 0) {
        boom.innerHTML = html;
    } else {
        boom.innerHTML = `notes is empty input something`;
    }
}

showdata();

function deletedata(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showdata();
    window.location.reload();

}

const search = document.getElementById("search");
search.addEventListener("input", () => {
    let input = search.value;
    let moon = document.getElementsByClassName("notes-card");
    Array.from(moon).forEach((element) => {
        let cardbody = element.getElementsByTagName("p")[0].innerText;
        if (cardbody.includes(input)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})


let edit = document.getElementsByClassName("edit");
Array.from(edit).forEach((element, index) => {
    element.addEventListener("click", () => {
        let frist = element.parentElement.children[0];
        let second = element.parentElement.children[1];
        console.log(second);
        console.log(frist);

        tittle.value = frist.innerHTML;
        enter.innerHTML = second.textContent;
        console.log(tittle.textContent);
        frist.innerHTML = tittle.value;
        second.innerHTML = enter.value;
        console.log(index);
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesobj = [];
        } else {
            notesobj = JSON.parse(notes);
        }
        notesobj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesobj));

    })
})