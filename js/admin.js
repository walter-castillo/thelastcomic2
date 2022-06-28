const formCreateProduct = document.querySelector('#formCreateProduct');
formCreateProduct.addEventListener('submit', createNewProduct)

function createNewProduct(e) {
    e.preventDefault()
    let newProduct = {
        id: newId(),
        product: document.querySelector('#createProducto').value,
        description: document.querySelector('#createDescripcion').value,
        price: document.querySelector('#createPrecio').value,
        category: document.querySelector('#createCategorias').value,
        cant: 0,
        img: document.querySelector('#createUrl').value
    }
    getPushSetLS('products', newProduct)
    document.querySelector('#formCreateProduct').reset();
    bootstrap.Modal.getInstance(document.getElementById('createModal')).hide();

    loadTableAdmin();
}



const selectLoad = document.querySelector('#createCategorias');
categories.forEach(item => selectLoad.innerHTML += `<option value="${item}">${item}</option>`);

// cargar productos admin
let tableProducts = document.querySelector('#tableProducts');
window.addEventListener('DOMContentLoaded', loadTableAdmin());

function loadTableAdmin() {
    let products = getLS('products');
    tableProducts.innerHTML = '';
    products.forEach(prod => {
        const { id, img, product, category, price } = prod
        tableProducts.innerHTML +=
            `
            <tr>
                <th scope="row">${id}</th>
                <td><img src="${img}" width="20" height="20" alt="${product}"> </td>
                <td>${product} </td>
                <td>${category} </td>
                <td><span>$</span> ${price}</td>
                <td class="p-1">
                    <div class="btn-group float-end" role="group" aria-label="Basic mixed styles example">
                        <button type="button"  data-id="${id}" class="btn btn-danger btn-sm btnDelete">Eliminar</button>
                        <button type="button"  data-id="${id}" class="btn btn-editar btn-warning btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#editModal">Editar</button>
                        <button type="button"  data-id="${id}" class="btn btn-ver btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#verModal">Ver</button>
                    </div>
                </td>
            </tr>
        `
    });
}

// eliminar  con confirmacion

tableProducts.addEventListener('click', (e) => {
    if (e.target.matches(".btn-danger")) {
        const confirmDelete = confirm('Desea eliminar el producto?');
        if (confirmDelete) {
            getDeleteSetLS('products', e.target.dataset.id)
            e.target.parentElement.parentElement.parentElement.remove();
        }
    }
});


// show  modal product
let modalShowAdmin = document.querySelector('#modalShowAdmin');

tableProducts.addEventListener('click', (e) => {
    if (e.target.matches(".btn-ver")) {
        modalShowAdmin.innerHTML = '';
        const { id, img, product, category, price, description } = getFindIdLS('products', e.target.dataset.id);
        modalShowAdmin.innerHTML +=
            `
            <div class="modal-header">
                <h5 class="modal-title" id="verModalLabel">Producto ID: ${id}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body  d-flex justify-content-center">
                <div class="card" style="width: 18rem;">
                    <img  src="${img}" class="card-img-top" alt="${product}">
                    <div class="card-body text-center">
                        <h3 class="card-title">${product}</h3>
                        <h5 class="card-title">${category}</h5>
                        <h5 class="card-title">$ ${price}</h5>
                        <p class="card-text">${description}</p>

                    </div>
                </div>
            </div>
            `
    }
});


// edit product modal
const formEditProduct = document.querySelector('#formEditProduct');
tableProducts.addEventListener('click', (e) => {
    if (e.target.matches(".btn-editar")) {

        formEditProduct.innerHTML = '';
        const { id, img, product, category, price, description } = getFindIdLS('products', e.target.dataset.id);
        formEditProduct.innerHTML +=
            `
          <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Editar Producto ID: ${id}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="producto" class="col-form-label">Producto:</label>
                    <input type="text"    data-id=${id} class="form-control" id="editProducto" value="${product}" required maxlength="30">
                </div>
                <div class="mb-3">
                    <label for="url" class="col-form-label">url imagen:</label>
                    <input type="text" class="form-control" id=editUrl" value="${img}" required maxlength="50" >
                </div>
                <div class="mb-3">
                    <label for="categoria" class="col-form-label">Categoría:</label>
                    <select class="form-select" aria-label="Seleccione una categoria" id="editCategorias" required>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="precio" class="col-form-label">Precio:</label>
                    <input type="number" class="form-control" id="editPrecio" value="${price}" required min="1">
                </div>
                <div class="mb-3 ">
                    <label for="descripcion" class="col-form-label ">descripcion:</label>
                    <textarea class="form-control " id="editDescripcion" required maxlength="200">${description}</textarea>
                </div>
            </div>
            <div class="modal-footer ">
                <button type="submit" id="btnEditModal" data-id=${id} class="btn btn-success">Guardar</button>
            </div>
            `
        const editCategorias = document.querySelector('#editCategorias');
        categories.forEach(item => editCategorias.innerHTML += `<option value=${item} ${item == category ? "selected" : "" }>${item}</option>`);
    }
})


// edit guardar editado

formEditProduct.addEventListener('submit', editProduct)

function editProduct(e) {
    e.preventDefault()
    let productos = getLS('products');
    productos.forEach(editProduct => {
        if (editProduct.id == document.querySelector('#editProducto').dataset.id) {
            editProduct.product = document.querySelector('#editProducto').value;
            editProduct.description = document.querySelector('#editDescripcion').value;
            editProduct.price = document.querySelector('#editPrecio').value;
            editProduct.category = document.querySelector('#editCategorias').value;
            // editProduct.img = 'https://picsum.photos/200';
            editProduct.img = document.querySelector('#editUrl').value
        }
    });
    setLS('products', productos)

    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    loadTableAdmin();
}