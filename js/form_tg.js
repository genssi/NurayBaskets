"use strict";

const formAlert = document.querySelector(".form-alert");
const formValidate = document.querySelector(".form-validate");

function sendTelegramMessage(form) {
    const name = form.querySelector('input[name="name"]').value;
    const phone = form.querySelector('input[name="phone"]').value;

    // Валидация формы
    if (!name.trim() || !phone.trim()) {
        formValidate.style.display = "block";

        setTimeout(function () {
            formValidate.style.display = "none";
        }, 3000);

        return;
    }

    // Токен вашего бота Telegram и ID чата, куда вы хотите отправлять сообщения
    const TOKEN = "5998877765:AAE-P66pxlcCf9VBU9V3JJFsPgYEsYN3Pg8";
    const CHAT_ID = "-1002050953592";

    // Создаем сообщение для отправки в телеграм
    const message = `Новый заказ!\nИмя: ${name}\nТелефон: ${phone}`;

    // Отправляем запрос к API Telegram для отправки сообщения
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.ok) {
                formAlert.style.display = "block";
                setTimeout(function () {
                    formAlert.style.display = "none";
                }, 4000);
                // Очищаем поля формы после успешной отправки
                form.reset();
            } else {
                alert("Произошла ошибка пожалуйста повторите позже");
            }
        })
        .catch((error) => {
            console.error("Ошибка при отправке сообщения в Telegram:", error);
            alert("Произошла ошибка при отправке сообщения в Telegram");
        });
}

const tg1 = document.getElementById("tg1");
tg1.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    sendTelegramMessage(tg1);
});

const tg2 = document.getElementById("tg2");
tg2.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    sendTelegramMessage(tg2);
});
