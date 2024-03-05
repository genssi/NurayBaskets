<?php

// Проверяем, была ли отправлена форма методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Проверяем, существуют ли необходимые данные в массиве $_POST
    if (isset($_POST['name']) && isset($_POST['phone'])) {
        // Получаем данные из формы
        $name = $_POST['name'];
        $phone = $_POST['phone'];

        // Токен вашего бота Telegram и ID чата, куда вы хотите отправлять сообщения
        $token = '5998877765:AAE-P66pxlcCf9VBU9V3JJFsPgYEsYN3Pg8';
        $chatId = '-1002050953592';

        // Сообщение для отправки в Telegram
        $message = "<b>Заказ с сайта!</b>\n\n";
        $message .= "Имя: $name\n";
        $message .= "Телефон: $phone\n";

        // Создаем URL для отправки запроса к API Telegram
        $url = "https://api.telegram.org/bot{$token}/sendMessage";

        // Параметры запроса
        $params = [
            'chat_id' => $chatId,
            'parse_mode' => 'html',
            'text' => $message
        ];

        // Настройка параметров запроса
        $options = [
            'http' => [
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => http_build_query($params)
            ]
        ];

        // Создание контекста потока
        $context = stream_context_create($options);

        // Отправка запроса к API Telegram
        $result = file_get_contents($url, false, $context);

        // Проверка результата отправки сообщения
        if ($result === FALSE) {
            // Обработка ошибки
            echo 'Ошибка при отправке сообщения в Telegram';
        } else {
            // Вывод сообщения об успешной отправке
            echo 'Сообщение успешно отправлено в Telegram';
        }
    } else {
        // Если не получены данные из формы, выводим сообщение об ошибке
        echo 'Ошибка: данные из формы не получены';
    }
} else {
    // Если форма не отправлена методом POST, выводим сообщение об ошибке
    echo 'Ошибка: форма не отправлена';
}

?>