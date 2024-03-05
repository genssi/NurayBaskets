"use strict";

document.addEventListener("DOMContentLoaded", function () {
    //модальное окно корзины
    function modal() {
        const openModalBtn = document.querySelectorAll(".openCart");
        const modal = document.getElementById("myModal");
        const closeModalBtn = document.querySelectorAll(".close");
        const cartItemsContainer = document.querySelector("#cart-items");
        const addCartBtn = document.querySelectorAll(".add-to-cart");
        const totalPriceElement = document.querySelector("#total-price");

        function openModal() {
            modal.style.display = "block";
            updateTotalPrice(); // При открытии модального окна обновляем общую цену
        }

        function closeModal() {
            modal.style.display = "none";
        }

        openModalBtn.forEach((btn) => {
            btn.addEventListener("click", openModal);
        });

        closeModalBtn.forEach((btn) => {
            btn.addEventListener("click", closeModal);
        });

        //Функция для добавления товара в корзину и отображения его в модальном окне.
        function addToCart(itemName, itemPrice, quantity) {
            let existingItem = Array.from(cartItemsContainer.children).find(
                (item) => {
                    return (
                        item.dataset.itemName === itemName &&
                        item.dataset.itemPrice === itemPrice
                    );
                }
            );

            if (existingItem) {
                // Если товар уже есть в корзине, увеличиваем его количество
                const quantityElement =
                    existingItem.querySelector(".item-quantity");
                const newQuantity =
                    parseInt(quantityElement.textContent) + quantity;
                quantityElement.textContent = newQuantity;
                updateTotalPrice();
                updateCartItemCount();

                // Обновляем общую цену за товар
                const totalPriceElement =
                    existingItem.querySelector(".item-total-price");
                const totalPrice = newQuantity * parseFloat(itemPrice);
                totalPriceElement.textContent = totalPrice + " сом";
            } else {
                // Если товара нет в корзине, добавляем новый элемент
                const itemUl = document.createElement("ul");
                itemUl.classList.add("item-uls");

                const itemNameLi = document.createElement("li");
                itemNameLi.textContent = itemName;
                itemNameLi.setAttribute("data-item-name", itemName); // Устанавливаем атрибут с именем товара
                itemUl.appendChild(itemNameLi);

                const itemQuantityLi = document.createElement("li");
                itemQuantityLi.textContent = quantity;
                itemQuantityLi.classList.add("item-quantity"); // Добавляем класс для удобства поиска количества товара
                itemUl.appendChild(itemQuantityLi);

                const totalPrice = itemPrice * quantity;
                const itemTotalPriceLi = document.createElement("li");
                itemTotalPriceLi.classList.add("item-total-price");
                itemTotalPriceLi.textContent = totalPrice + " сом"; // Отображаем общую цену за товар
                itemUl.appendChild(itemTotalPriceLi);

                // Кнопка удаления товара
                const deleteItem = document.createElement("li");
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-from-cart");
                deleteButton.addEventListener("click", function () {
                    itemUl.remove();
                    updateTotalPrice();
                    updateCartItemCount(); // Обновляем количество товаров на кнопке "Корзина"
                    updateCartButtonVisibility(); //скрываем кол-во на кнопке "Корзина"
                });
                deleteItem.appendChild(deleteButton);
                itemUl.appendChild(deleteItem);

                // Сохраняем информацию о товаре в элементах корзины
                itemUl.dataset.itemName = itemName;
                itemUl.dataset.itemPrice = itemPrice;
                itemUl.dataset.itemQuantity = quantity;
                itemUl.dataset.itemTotalPrice = totalPrice;

                cartItemsContainer.appendChild(itemUl);

                updateCartButtonVisibility(); //скрываем кол-во на кнопке "Корзина"
                // Обновляем количество товаров на кнопке "Корзина" сразу после добавления товара
                updateCartItemCount();
            }
        }

        // Функция для обновления общего количества товаров в корзине
        function updateCartItemCount() {
            const cartItemCountElement =
                document.getElementById("cartItemCount");
            const cartItems = document.querySelectorAll(".item-uls");
            let totalCount = 0;
            cartItems.forEach((item) => {
                const quantity = parseInt(item.dataset.itemQuantity);
                totalCount += quantity;
            });
            cartItemCountElement.textContent = totalCount;
        }

        // Функция для обновления общей цены
        function updateTotalPrice() {
            let totalPrice = 0;

            const items = document.querySelectorAll(".item-total-price");
            items.forEach((item) => {
                totalPrice += parseFloat(item.textContent);
            });

            totalPriceElement.textContent = totalPrice + " сом";
        }

        addCartBtn.forEach((btn) => {
            btn.addEventListener("click", function () {
                const itemName = this.dataset.itemName; // Получаем имя товара из атрибута data-item-name.
                const itemPrice = this.dataset.itemPrice; // Получаем цену товара из атрибута data-item-price.
                const quantityInput =
                    this.closest(".info-product").querySelector(
                        ".quantity-input"
                    ); // Находим ближайший инпут количества товара
                const quantity = parseInt(quantityInput.value); // Получаем количество из инпута
                addToCart(itemName, itemPrice, quantity); // Добавляем товар в корзину с учетом указанного количества
                updateTotalPrice(); // Обновляем общую цену
                showMsg(); // Показываем сообщение о добавлении товара
            });
        });

        // Функция для отображения уведомления.
        function showMsg() {
            const successMessage = document.querySelector(".notification");
            successMessage.style.display = "block";

            setTimeout(function () {
                successMessage.style.display = "none";
            }, 3000); // Уведомление исчезнет через 3 секунды
        }

        // Функция для обновления видимости количества товаров на кнопке "Корзина"
        function updateCartButtonVisibility() {
            const cartItemCount = document.getElementById("cartItemCount");
            const cartItems = document.querySelectorAll(".item-uls");

            if (cartItems.length > 0) {
                cartItemCount.style.display = "inline"; // Показываем элемент, если есть товары
            } else {
                cartItemCount.style.display = "none"; // Скрываем элемент, если корзина пуста
            }
        }

        //Отправка данных в телеграм.
        function submitForm() {
            const form = document.getElementById("tg");
            const TOKEN = "5998877765:AAE-P66pxlcCf9VBU9V3JJFsPgYEsYN3Pg8";
            const CHAT_ID = "-1002050953592";
            const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
            const alertMessage = document.getElementById("alert-message");

            form.addEventListener("submit", function (e) {
                e.preventDefault();

                const name = this.name.value;
                const phone = this.phone.value;

                // Получаем все элементы корзины
                const cartItems = document.querySelectorAll(".item-uls");

                // Инициализируем переменные для хранения общей суммы и сообщения
                let totalPrice = 0;
                let message = `<b>Заказ с сайта!</b>\n`;
                message += `\nИмя: ${name}\n`;
                message += `Телефон: ${phone}\n`;

                // Обходим каждый элемент корзины
                cartItems.forEach((cartItem, index) => {
                    // Получаем информацию о товаре из элемента корзины
                    const itemName = cartItem.dataset.itemName;
                    const itemQuantity = cartItem.dataset.itemQuantity;
                    const itemTotalPrice = parseFloat(
                        cartItem.dataset.itemTotalPrice
                    );

                    // Добавляем информацию о товаре к сообщению
                    message += `\n`;
                    message += `Товар ${index + 1}:\n`;
                    message += `Название товара: ${itemName}\n`;
                    message += `Количество: ${itemQuantity}\n`;
                    message += `сумма: ${itemTotalPrice} сом\n`;

                    // Увеличиваем общую сумму
                    totalPrice += itemTotalPrice;
                });

                // Добавляем общую сумму к сообщению
                message += `\n<b>Общая сумма заказа: ${totalPrice} сом</b>\n`;

                // Создаем запрос к API Telegram для отправки сообщения
                const xhr = new XMLHttpRequest();
                xhr.open("POST", URL_API, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            console.log(
                                "Сообщение успешно отправлено в Telegram:",
                                xhr.responseText
                            );
                            // Удаляем все товары из корзины
                            cartItemsContainer.innerHTML = "";
                            // Очищаем форму
                            form.reset();
                            alertMessage.style.display = "block";
                            setTimeout(function () {
                                alertMessage.style.display = "none";
                            }, 4000); // Уведомление исчезнет через 4 секунды

                            // сброс кол-во на кнопке корзина
                            document.getElementById(
                                "cartItemCount"
                            ).textContent = "0";
                        } else {
                            console.error(
                                "Ошибка при отправке сообщения в Telegram:",
                                xhr.statusText
                            );
                            // Добавьте здесь код для обработки ошибки при отправке сообщения
                        }
                    }
                };
                xhr.send(
                    JSON.stringify({
                        chat_id: CHAT_ID,
                        parse_mode: "html",
                        text: message,
                    })
                );
            });
        }

        submitForm();
    }

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

    modal();
});
