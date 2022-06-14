const btnMenu = document.querySelector("#btnMenu");
const menuList = document.querySelector("#menuList");
btnMenu.addEventListener('click', () => menuList.classList.toggle("hidden-menu"));

const btnDropDownUser = document.querySelector(".btnDropDownUser");
const dropdownUser = document.querySelector(".dropdown-user");

btnDropDownUser.addEventListener('click', () => dropdownUser.classList.toggle("dropdown-user--show"));
