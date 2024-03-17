"use strict";

document.addEventListener("DOMContentLoaded", function () {
    //nav icon
    const navBtn = document.querySelector(".nav-icon-btn");
    const navIcon = document.querySelector(".nav-icon");
    const nav = document.querySelector(".header__top-row");
    const navList = document.querySelectorAll(".nav__list a");
    const contactsLink = document.querySelector(".nav__list li:nth-child(4) a");
    const contactsModal = document.getElementById("contactsModal");

    // Открываем модальное окно при клике на Контакты
    contactsLink.addEventListener("click", function (event) {
        event.preventDefault(); // Отменяем стандартное действие ссылки
        contactsModal.style.display = "block"; // Отображаем модальное окно
    });

    // Закрываем модальное окно при клике на любое место за его пределами
    window.addEventListener("click", function (event) {
        if (event.target == contactsModal) {
            contactsModal.style.display = "none"; // Скрываем модальное окно
        }
    });

    // Закрываем модальное окно при клике пальцем на любое место за его пределами
    window.addEventListener("touchstart", function (event) {
        if (event.target === contactsModal) {
            contactsModal.style.display = "none"; // Скрываем модальное окно
        }
    })

    //бургер меню
    function activeBtn() {
        navIcon.classList.toggle("nav-icon--active");
        nav.classList.toggle("header__top-row--mobile");
        document.body.classList.toggle("no-scroll");

        navList.forEach((link) => {
            link.addEventListener("click", () => {
                //скрываем бургер-меню
                navIcon.classList.remove("nav-icon--active");
                nav.classList.remove("header__top-row--mobile");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    navBtn.addEventListener("click", activeBtn);

    //phone mask библиотека
    mask("[data-tel-input]");

    //Удаляем '+' если больше ничего не введено, чтобы показать placeholder
    const phoneInputs = document.querySelectorAll("[data-tel-input]");
    phoneInputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (input.value == "+") {
                input.value = "";
            }
        });
        input.addEventListener("blur", () => {
            if (input.value == "+") {
                input.value = "";
            }
        });
    });
});
