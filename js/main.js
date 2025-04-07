'use strict';

let money, time; //Объявляем глобальные переменные для работы с функцией start

/* Принимаем поля вывода */
let startBtn = document.getElementById('start'), // Получаем ID от кнопки начать расчет
    budgetValue = document.getElementsByClassName('budget-value')[0], //Получаем класс поля "Доход"
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0], //Получаем класс поля "Доход на 1 день"
    levelValue = document.getElementsByClassName('level-value')[0], //Получаем класс поля "Уровень дохода"
    expensesValue = document.getElementsByClassName('expenses-value')[0], //Получаем класс поля "Обязательные расходы"
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0], //Получаем класс поля "Возможные траты"
    incomeValue = document.getElementsByClassName('income-value')[0], //Получаем класс поля "Дополнительный доход"
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0], //Получаем класс поля "Накоплений за 1 месяц"
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0]; //Получаем класс поля "Накопления за 1 год"

/* Принимаем поля ввода */
let expensesItem = document.getElementsByClassName('expenses-item'), //* Получаем поля(input) c обязательными расходами через класс. (class=”expenses-item”) */
    expensesItemBtn = document.getElementsByTagName('button')[0], //Получаем по тэгу верхнюю кнопку "утвердить"
    optionalExpensesBtn = document.getElementsByTagName('button')[1], //Получаем по тэгу ниюнюю кнопку "утвердить"
    countBtn = document.getElementsByTagName('button')[2], //Получаем по тэгу кнопку "Рассчитать"
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'), //Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
    chooseIncome = document.querySelector('.choose-income'), // Поле статьи возможного дохода
    checkbox = document.querySelector('#savings'), // Чекбокс (есть ли накопления)
    sumValue = document.querySelector('.choose-sum'), //Поле сумма
    percentValue = document.querySelector('.choose-percent'), // Поле процент
    yearValue = document.querySelector('.year-value'), // Поле год
    monthValue = document.querySelector('.month-value'), // Поле месяц
    dayValue = document.querySelector('.day-value'); // Поле день

/* Отключаем все кнопки, кроме "начать расчет" */
expensesItemBtn.setAttribute('disabled', true);
optionalExpensesBtn.setAttribute('disabled', true);
countBtn.setAttribute('disabled', true);

/* запуск по кнопке начать расчет */
startBtn.addEventListener('click', function () {

    /* Активируем все кнопки */
    expensesItemBtn.removeAttribute("disabled");
    optionalExpensesBtn.removeAttribute("disabled");
    countBtn.removeAttribute("disabled");


    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");
    // ставим + перед promt для того, чтобы введенные данные имели тип number



    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});


/* обязательные расходы */
let sumExpenses = 0; //Переменная содержит в себе общую сумму обязательных расходов(дальше возвращаем ее из функции в мир)

expensesItemBtn.addEventListener('click', function () {

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value, //получаем наименование
            b = expensesItem[++i].value; // сумма расхода

        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
            sumExpenses += +b;

        } else {
            alert('Вы допустили ошибку, попробуйте еще раз');
            i = i - 1;
        }
    }
    expensesValue.textContent = sumExpenses;
    return sumExpenses;
});

/* необязательные расходы */
optionalExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let nonMandatoryExpenses = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = nonMandatoryExpenses;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

/* Расчет дневного бюджета */
countBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {

        appData.moneyPerDay = ((appData.budget - sumExpenses) / 30).toFixed(); // Складываем общий бюджет с суммой обязательных расходов и делим на 30 дней
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 13000) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 13000 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 30000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка!';
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка!';
    }

});

/* статьи возможного дохода через запятую */
chooseIncome.addEventListener('input', function () {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});

/* Проверка на наличие накоплений */
checkbox.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

/* расчет на год и на месяц */
sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * +percent;
        appData.yearIncome = sum / 100 * +percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * +percent;
        appData.yearIncome = sum / 100 * +percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


/* Создаем объект */
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

// for (let key in appData) {
//     alert("Наша программа включает в себя данные: " + key + " " + appData[key]);
//  }