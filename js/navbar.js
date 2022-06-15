const btnMenu = document.querySelector("#btnMenu");
const menuCategories = document.querySelector("#menuCategories");
btnMenu.addEventListener('click', () => menuCategories.classList.toggle("hidden-menu"));

const btnDropDownUser = document.querySelector(".btnDropDownUser");
const dropdownUser = document.querySelector(".dropdown-user");

btnDropDownUser.addEventListener('click', () => dropdownUser.classList.toggle("dropdown-user--show"));