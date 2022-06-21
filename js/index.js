const cardContent = document.querySelector('#cardContent');
window.addEventListener('DOMContentLoaded', loadCard('All'));

function loadCard(category) {
    let products = []
    category == 'All' ? products = getLS('products') : products = getLS('products').filter(prod => prod.category == category);
    menuCategories.classList.remove("hidden-menu");
    cardContent.innerHTML = '';
    products.forEach(prod => {
        const { id, img, product, category, price, description } = prod;
        cardContent.innerHTML +=
            `
        <div class="card--product">
            <img src="${img}" alt="${img}">
            <hr>
            <h2>${product}</h2>
            <h5>${category}</h5>
            <p>${description}</p>
            <h4>$ ${price}</h4>
            <button class="btn btn-success btn-agregar" data-idcomprar=${id}>Agregar</button>
            <i class="fa-solid fa-star" data-idfav=${id}></i>
        </div>
        `
    });
}

// const menuCategories = document.querySelector('#menuCategories');
(function loadCategories() {
    menuCategories.innerHTML = '';
    categories.forEach(cat => menuCategories.innerHTML += `<li><a class="btnCategory" href="#">${cat}</a></li>`);
    menuCategories.innerHTML += `<li><a class="btnCategory" href="#">All</a></li>`
})()

const filtroCategory = (e) => (e.target.classList.contains('btnCategory')) && loadCard(e.target.innerText);

menuCategories.addEventListener('click', filtroCategory);

let cart = [];
let total;
let totalItem;

let numCarrito = document.querySelector('.navbar-count');
cardContent.addEventListener('click', clickCard)

const cantProdct = () => cart.reduce((acum, item) => acum + item.cant, 0)
const precioTotal = () => cart.reduce((acum, item) => acum + item.cant * item.price, 0)

function clickCard(e) {
    addCart(e);
    addFav(e);
}

function addCart(e) {
    let idAdd = e.target.dataset['idcomprar']
    if (idAdd) {
        if (!getSS('user')) return alert('Debes registrarte para comprar');
        let productAdd = getLS('products').find(prod => (prod.id == idAdd))
        let prodRep = cart.find(prod => (prod.id == productAdd.id))
        if (prodRep) {
            prodRep.cant++;
        } else {
            productAdd.cant++;
            cart.push(productAdd);
        }
        numCarrito.innerHTML = cantProdct();
    }
}

function addFav(e) {
    let idAddFav = e.target.dataset['idfav']
    if (idAddFav) {
        if (!getSS('user')) return alert('Debes registrarte ');
        let userSS = getSS('user'); // traer el usuario de session
        let usersLS = getLS('users'); // traer todos los usuarios de local storage
        let indexUser = usersLS.findIndex(user => user.id == userSS.id); // buscamos el indice del user actual
        let userActual = usersLS[indexUser]; // recuperamos el user actual para modificarlo
        userActual.idfav.push(parseInt(idAddFav)); // editar el user actual
        userActual.idfav = [...new Set(userActual.idfav)]; // quitamos los duplicados
        setLS('users', usersLS); // volvemos a guardarlo en el local storage
    }
}

const cardContentFav = document.querySelector('#cardContentFav');

function renderFav() {
    let products = getLS('products');
    let user = getFindIdLS('users', getSS('user').id)
    cardContentFav.innerHTML = "";
    if (user.idfav.length == 0) cardContentFav.innerHTML = `<h2>No tienes productos favoritos</h2>`;
    products.forEach(prod => {
        if (user.idfav.includes(prod.id)) {
            const { id, img, product, price } = prod
            cardContentFav.innerHTML +=
                `
                <div class="card--product card-fav">
                    <img src="${img}" alt="producto1">
                    <hr>
                    <p>${id} - ${product}</p>
                    <p>${price}</p>
                    <i class="fa-solid fa-trash-can btn-delete-fav" data-idfavdelete=${id}></i>
                </div>
               `
        }
    })
}

cardContentFav.addEventListener('click', deleteFav)

function deleteFav(e) {
    let idfavdelete = e.target.dataset['idfavdelete']
    if (idfavdelete) {
        let userSS = getSS('user'); // traer el usuario de session
        let usersLS = getLS('users'); // traer todos los usuarios de local storage
        let indexUser = usersLS.findIndex(user => user.id == userSS.id); // buscamos el indice del user actual
        let userActualFav = usersLS[indexUser].idfav; // recuperamos el user actual para modificarlo
        userActualFav.splice(userActualFav.indexOf(parseInt(idfavdelete)), 1) // buscamoe le indice del idprod y eliminamois
        setLS('users', usersLS); // volvemos a guardarlo en el local storage
        renderFav()
    }
}




document.querySelector('.navbar-content-shop').addEventListener('click', renderCart)
let tbodyTableCarrito = document.querySelector('#tbodyTableCarrito');

function renderCart() {
    const msgCarritoVacio = document.querySelector('.msgCarritoVacio')
    const tablaCarrito = document.querySelector('.tablaCarrito')
    const tablaCarritobtn = document.querySelector('.tablaCarritobtn')

    tbodyTableCarrito.innerHTML = '';
    if (cart.length == 0) {
        msgCarritoVacio.classList.remove('d-none');
        tablaCarrito.classList.add('d-none');
        tablaCarritobtn.classList.add('d-none');
        return;
    }

    msgCarritoVacio.classList.add('d-none');
    tablaCarrito.classList.remove('d-none');
    tablaCarritobtn.classList.remove('d-none');
    cart.forEach(elem => {
        const { id, img, product, price, cant } = elem;
        tbodyTableCarrito.innerHTML +=
            `   <tr>
                <th scope="row"> ${id}</th>
                <td><img src="${img}" width="20" height="20" alt="${product}"></td>
                <td> ${product}</td>
                <td> $ ${price}</td>
                <td> ${cant}</td>
                <td> $ ${cant * price}</td>
                <td><i class="fa-solid fa-x" data-iddeletecarrito=${id}></i></td>
            </tr>
      `
    });
    document.querySelector('#celdaCantProducto').innerHTML = cantProdct() + " Unid."
    document.querySelector('#totalPrecio').innerHTML = "$ " + precioTotal()
}

tbodyTableCarrito.addEventListener('click', deleteCarrito)

function deleteCarrito(e) {
    let idfavdelete = e.target.dataset['iddeletecarrito']
    if (idfavdelete) {
        console.log('desde x')
            // quede acacaa
    }
}


// register
document.querySelector('#formRegister').addEventListener('submit', register)

function register(e) {
    e.preventDefault()
    let newUser = {
        id: newId(),
        name: document.querySelector('#nameRegistro').value,
        email: document.querySelector('#emailRegistro').value,
        password: '123',
        // password: document.querySelector('#inputPasswordRegistro').value,
        isadmin: false,
        idfav: []
    }
    let existe = getLS('users').some(user => user.email == newUser.email)
    if (existe) return alert(newUser.email + ' Se encuentra registrado')
    getPushSetLS('users', newUser);
    bootstrap.Modal.getInstance(document.getElementById('modalRegistro')).hide();
    document.querySelector('#formRegister').reset();
}

// login
document.querySelector('#formLogin').addEventListener('submit', login);

function login(e) {
    e.preventDefault();
    cart = [];
    let usersLogin = getLS('users');
    inputEmail = document.querySelector('#EmailInicio').value;
    InputPassword = document.querySelector('#inputPasswordInicio').value;
    let existe = usersLogin.find(user => user.email == inputEmail && user.password == InputPassword);
    if (!existe) return alert('email o password no coinciden');
    setSS('user', existe)
    if (existe && existe.isadmin) window.location = "admin.html"
    bootstrap.Modal.getInstance(document.getElementById('modalInicioSession')).hide();
    profileHidden();
}

function vaciarCarrito() {
    cart = [];
    numCarrito.innerHTML = cantProdct();
}

function cerrarSesion() {
    vaciarCarrito();
    sessionStorage.clear();
    profileHidden();
}

function graciasCompra() {
    alert('Gracias por su compra');
    vaciarCarrito();
    bootstrap.Modal.getInstance(document.getElementById('modalCarrito')).hide();
}

function verPerfil() {
    let { id, name, email, isadmin } = getSS('user');
    let rol = isadmin ? 'Admin, comprador' : 'Comprador';
    document.querySelector('#modalPerfilLabel').innerHTML = id;
    document.querySelector('#namePerfil').innerHTML = name;
    document.querySelector('#emailPerfil').innerHTML = email;
    document.querySelector('#rolPerfil').innerHTML = rol;
}