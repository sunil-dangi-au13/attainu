const dataBase = document.querySelector("#dataBase-select");
const collection = document.querySelector("#collection-select");

//Updates the collections in the select collection picker
const updateCols = (colecciones) => {
    const collections = document.querySelector("#collection-select");
    collections.innerHTML = "";

    const option = document.createElement("option");
    option.textContent = "--";
    collections.appendChild(option);

    colecciones.forEach((coleccion) => {
        const optionC = document.createElement("option");
        optionC.value = coleccion.name;
        optionC.textContent = coleccion.name;
        collections.appendChild(optionC);
    });
};

//Creates the update form for a register
const updateForm = (registro) => {
    const div = document.getElementById(`${registro["_id"]}`);
    div.innerHTML = "";

    const form = document.createElement("form");
    form.setAttribute(
        "action",
        `${dataBase.value}/${collection.value}/${registro["_id"]}/update`
    );
    form.setAttribute("method", "POST");
    const formTitle = document.createElement("h3");
    formTitle.innerHTML = "Update";
    form.appendChild(formTitle);

    for (let item in registro) {
        if (item !== "_id") {
            const divPeq = document.createElement("div");
            divPeq.classList.add("form-group");
            const label = document.createElement("label");
            label.setAttribute("for", item);
            label.innerHTML = item;

            const input = document.createElement("input");
            input.setAttribute("name", item);
            input.classList.add("form-control");
            input.setAttribute("required", true);
            input.setAttribute("value", registro[item]);

            divPeq.appendChild(label);
            divPeq.appendChild(input);
            form.appendChild(divPeq);
        }
    }
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("type", "submit");
    button.innerHTML = "Update Register";

    form.appendChild(button);
    div.appendChild(form);
};

//gets an id and fetchs the data from the endpoint
const modRegister = (_id) => {
    const url = `${dataBase.value}/${collection.value}/${_id}`;
    fetch(url)
        .then((res) => res.json())
        .then(updateForm);
};

//Creates the create form for a register
const createRegister = (registro) => {
    const create = document.querySelector("#createForm");
    create.innerHTML = "";
    create.setAttribute(
        "action",
        `/${dataBase.value}/${collection.value}/create`
    );
    const divTitle = document.createElement("h1");
    divTitle.innerHTML = "Create";
    create.appendChild(divTitle);
    for (let item in registro) {
        if (item !== "_id") {
            const div = document.createElement("div");
            div.classList.add("form-group");
            const label = document.createElement("label");
            label.setAttribute("for", item);
            label.innerHTML = item;

            const input = document.createElement("input");
            input.setAttribute("name", item);
            input.classList.add("form-control");
            input.setAttribute("required", true);

            div.appendChild(label);
            div.appendChild(input);
            create.appendChild(div);
        }
    }

    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("type", "submit");
    button.innerHTML = "Create";

    create.appendChild(button);
};

//Creates the info view
const updateInfo = (coleccion) => {
    let contador = 1;
    const info = document.querySelector("#info");
    info.innerHTML = "";

    const otroDiv = document.createElement("div");
    otroDiv.classList.add("col-12");
    const title = document.createElement("h1");
    title.textContent = "Info";
    otroDiv.appendChild(title);
    info.appendChild(otroDiv);

    coleccion.forEach((registro) => {
        if (contador === 1) {
            let reg = registro;
            createRegister(registro);
        }
        const div = document.createElement("div");
        div.classList.add("row");
        const div2 = document.createElement("div");
        div2.classList.add("col-4");
        const number = document.createElement("h5");
        number.textContent = contador;
        div2.appendChild(number);
        div.appendChild(div2);

        const div3 = document.createElement("div");
        div3.classList.add("col-8");
        div3.setAttribute("id", registro["_id"]);
        for (let item in registro) {
            const texto = document.createElement("p");
            texto.textContent = `${item}: ${registro[item]}`;
            div3.appendChild(texto);
        }

        const bot1 = document.createElement("button");
        bot1.classList.add("btn");
        bot1.classList.add("btn-info");
        bot1.textContent = "Update";
        bot1.setAttribute("onclick", `modRegister("${registro["_id"]}")`);

        const form2 = document.createElement("form");
        form2.setAttribute("method", "POST");
        form2.setAttribute(
            "action",
            `/${dataBase.value}/${collection.value}/${registro["_id"]}`
        );
        const bot2 = document.createElement("button");
        bot2.classList.add("btn");
        bot2.classList.add("btn-danger");
        bot2.textContent = "Delete";
        bot2.setAttribute("type", "submit");
        form2.appendChild(bot2);

        const ultDiv = document.createElement("div");
        ultDiv.classList.add("col-2");
        div2.appendChild(bot1);
        div2.appendChild(form2);
        div.appendChild(div3);
        //div.appendChild(ultDiv);
        info.appendChild(div);
        contador += 1;
    });
};

//OnChange event for the database picker
const onChange = (evt) => {
    const query = document.querySelector("#dataBase-select").value;
    fetch(`/${query}`)
        .then((res) => res.json())
        .then(updateCols);
    evt.preventDefault();
};

//OnChange event for the collection picker
const onChangeCol = (evt) => {
    const _dbName = document.querySelector("#dataBase-select").value;
    const _colName = document.querySelector("#collection-select").value;
    fetch(`/${_dbName}/${_colName}`)
        .then((res) => res.json())
        .then(updateInfo);
    evt.preventDefault();
};

//Listeners
dataBase.addEventListener("change", onChange);
collection.addEventListener("change", onChangeCol);
