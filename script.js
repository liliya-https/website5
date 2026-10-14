document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var form = document.getElementById("calculatorForm");
    var product = document.getElementById("product");
    var quantity = document.getElementById("quantity");
    var result = document.getElementById("result");
    var totalPrice = document.getElementById("totalPrice");
    var resultMessage = document.getElementById("resultMessage");

    if (!form || !product || !quantity || !result ||
        !totalPrice || !resultMessage) {
        console.error(
            "Калькулятор: не найдены необходимые элементы HTML."
        );
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var quantityText = quantity.value.trim();
        var price = Number(product.value);

        result.classList.remove("result-error");

        if (!/^[1-9]\d*$/.test(quantityText)) {
            showError(
                "Введите целое число больше нуля, например 3."
            );
            quantity.focus();
            return;
        }

        var count = Number(quantityText);

        if (!Number.isSafeInteger(count)) {
            showError(
                "Количество слишком большое. Введите меньшее число."
            );
            quantity.focus();
            return;
        }

        if (!Number.isFinite(price) || price <= 0) {
            showError(
                "Не удалось определить цену выбранного товара."
            );
            return;
        }

        var total = price * count;

        if (!Number.isSafeInteger(total)) {
            showError(
                "Итоговая сумма слишком большая. Уменьшите количество."
            );
            quantity.focus();
            return;
        }

        totalPrice.textContent =
            total.toLocaleString("ru-RU") + " ₽";

        resultMessage.textContent =
            price.toLocaleString("ru-RU") + " ₽ × " +
            count.toLocaleString("ru-RU") + " шт. = " +
            total.toLocaleString("ru-RU") + " ₽";

        result.classList.remove("result-error");
    });

    function showError(message) {
        totalPrice.textContent = "—";
        resultMessage.textContent = message;
        result.classList.add("result-error");
    }
});