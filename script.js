function main() {
    let rootelm = document.querySelector(".list");
    let insert = document.querySelector(".display");
    let all = document.querySelector(".all");
    let active = document.querySelector(".active");
    let completed = document.querySelector(".completed");
    let clearcomplete = document.querySelector(".clearcompleted");
    let buttons = [all, active, completed, clearcomplete];

    let datalist = JSON.parse(localStorage.getItem('todos')) || [];

    function handleinput(event) {
        if (event.keyCode === 13 && event.target.value !== "") {
            let todo = {
                name: event.target.value,
                marked: event.target.checked,
            };
            datalist.push(todo);
            event.target.value = "";
            localStorage.setItem("todos", JSON.stringify(datalist));
            createUI();
        }
    }

    function handledelete(event) {
        let id = event.target.dataset.id;
        datalist.splice(id, 1);
        localStorage.setItem("todos", JSON.stringify(datalist));
        createUI();
    }

    function handlemarked(event) {
        let id = event.target.dataset.id;
        datalist[id].marked = !datalist[id].marked;
        localStorage.setItem("todos", JSON.stringify(datalist))
        createUI();
    }

    function createUI(data = datalist) {
        rootelm.innerHTML = ""
        data.forEach((todo, i) => {
            let li = document.createElement("li");
            let input = document.createElement("input");
            input.type = "checkbox";
            input.classList.add("checkbox");
            input.checked = todo.marked;
            input.setAttribute("data-id", i);

            input.addEventListener("input", handlemarked);

            let p = document.createElement("p");
            p.innerText = todo.name;

            let span = document.createElement("span");
            span.classList.add("clear");
            span.innerText = "X";
            span.setAttribute("data-id", i);

            span.addEventListener("click", handledelete);

            li.append(input, p, span);
            rootelm.append(li);
        });
    }
    insert.addEventListener("keyup", handleinput);

    all.addEventListener("click", () => {
        setActiveButton(all);
        createUI();
    });

    active.addEventListener("click", () => {
        setActiveButton(active);
        let notdone = datalist.filter((item) => !item.marked);
        createUI(notdone);
    });

    completed.addEventListener("click", () => {
        setActiveButton(completed);
        let done = datalist.filter((item) => item.marked);
        createUI(done);
    });

    clearcomplete.addEventListener("click", () => {
        setActiveButton(clearcomplete);
        datalist = datalist.filter((item) => !item.marked);
        localStorage.setItem("todos", JSON.stringify(datalist));
        createUI();
    });

    function setActiveButton(clickedButton) {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        clickedButton.classList.add('active');
    }

    setActiveButton(all);
    createUI();
}
main();