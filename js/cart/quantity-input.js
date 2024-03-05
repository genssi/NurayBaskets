"use strict";

//кнопки для увелечения - уменьшения кол-во товаров.
function quantity() {
    const product = document.querySelectorAll(".product");

    product.forEach((product) => {
        const quantityInput = product.querySelector('input[type="number"]'); //находим инпут с типом number.
        const minusInput = product.querySelector('button[id^="minus"]'); //находим все кнопки с классом minus.
        const plusInput = product.querySelector('button[id^="plus"]'); //находим все кнопки с классом plus.

        function minus() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        }

        function plus() {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        }

        minusInput.addEventListener("click", minus);
        plusInput.addEventListener("click", plus);
    });
}

quantity();