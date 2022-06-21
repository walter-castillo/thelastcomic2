// generar id
const newId = () => Math.floor(Math.random() * 500);
// cargar select crear
const categories = ['Parodia', 'Humor', 'Infantil']
const randonCategory = () => categories[Math.floor(Math.random() * categories.length)];

let products = [{
            id: newId(),
            product: "producto 1",
            description: "descripcion 1",
            price: 10,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200"
        },
        {
            id: newId(),
            product: "producto 2",
            description: "descripcion 2",
            price: 20,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200?random=7"
        },
        {
            id: newId(),
            product: "producto 3",
            description: "descripcion 2",
            price: 20,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200?random=6"
        },
        {
            id: newId(),
            product: "producto 4",
            description: "descripcion 2",
            price: 20,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200?random=1"
        },
        {
            id: newId(),
            product: "producto 5",
            description: "descripcion 2",
            price: 20,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200?random=2"
        },
        {
            id: newId(),
            product: "producto 6",
            description: "descripcion 2",
            price: 20,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200?random=3"
        },
        {
            id: newId(),
            product: "producto 7",
            description: "descripcion 2",
            price: 20,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200?random=4"
        },
        {
            id: newId(),
            product: "producto 8",
            description: "descripcion 3",
            price: 30,
            category: randonCategory(),
            cant: 0,
            img: "https://picsum.photos/200?random=5"
        }
    ]
    // cargar select crear
let users = [{
    id: newId(),
    name: "nombre 1",
    email: "nombre@email",
    password: "123",
    isadmin: true,
    idfav: []
}]

const getLS = (clave) => JSON.parse(localStorage.getItem(clave));
const setLS = (clave, addItem) => localStorage.setItem(clave, JSON.stringify(addItem));

const getSS = (clave) => JSON.parse(sessionStorage.getItem(clave));
const setSS = (clave, addItem) => sessionStorage.setItem(clave, JSON.stringify(addItem));
window.addEventListener('DOMContentLoaded', loadPage());

function loadPage() {
    if (!localStorage['products']) localStorage.setItem('products', JSON.stringify(products));
    if (!localStorage['users']) localStorage.setItem('users', JSON.stringify(users));
    profileHidden()
}

function profileHidden() {
    const sinInicio = document.querySelector('#sinInicio');
    const conInicio = document.querySelector('#conInicio');
    const nameLogged = document.querySelector('#nameLogged');
    let userLogueado = getSS('user')
    if (userLogueado == null) {
        console.log('no hay logueado');
        conInicio.classList.add('hide')
        sinInicio.classList.remove('hide')
    } else {
        console.log('logueado ok');
        if (sinInicio) {
            conInicio.classList.remove('hide')
            sinInicio.classList.add('hide')
            nameLogged.innerHTML = userLogueado.name
            document.querySelector('#formLogin').reset();
        }
    }

}


const getPushSetLS = (clave, newItem) => {
    let newArray = JSON.parse(localStorage.getItem(clave));
    newArray.push(newItem);
    localStorage.setItem(clave, JSON.stringify(newArray))
}

const getDeleteSetLS = (clave, DeleteIdItem) => {
    let newArray = JSON.parse(localStorage.getItem(clave));
    let itemRemove = newArray.find(item => item.id == DeleteIdItem);
    newArray.splice(newArray.indexOf(itemRemove), 1);
    localStorage.setItem(clave, JSON.stringify(newArray))
}

const getFindIdLS = (clave, showIdItem) => {
    let Array = JSON.parse(localStorage.getItem(clave));
    let item = Array.find(item => item.id == showIdItem);
    return item;
}