'use strict';
// 1
let money = +prompt("Ваш бюджет на месяц?", "");
// ставим + перед promt для того, чтобы введенные данные имели тип number
console.log(money);

let time = prompt("Введите дату в формате YYYY-MM-DD", "");
console.log(time);
// 2
let appData = {
    moneyData: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};
console.log(appData);
// 3
let questionExpenses = prompt('Введите обязательную статью расходов в этом месяце', '');
let questionAmount = +prompt('Во сколько обойдется?', '');
let questionExpenses2 = prompt('Введите обязательную статью расходов в этом месяце', '');
let questionAmount2 = +prompt('Во сколько обойдется?', ''); 
// 4
appData.expenses.amount = `${questionExpenses} : ${questionAmount}`;
appData.expenses.amount2 = `${questionExpenses2} : ${questionAmount2}`;
// 5
alert(`Ваш бюджет на месяц =  ${appData.moneyData / 30}`);