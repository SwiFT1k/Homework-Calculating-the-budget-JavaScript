'use strict';

let open = document.getElementById('start'),

    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),

    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByClassName('button')[2],

    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkbox = document.querySelector('#savings'),
    sum = document.querySelector('.choose-sum'),
    percent = document.querySelector('.choose-percent'),
    year = document.querySelector('.year-value'),
    month = document.querySelector('.month-value'),
    day = document.querySelector('.day-value');

let money, time;

    function start() {
            money = +prompt("Ваш бюджет на месяц?", "");
            // ставим + перед promt для того, чтобы введенные данные имели тип number
            time = prompt("Введите дату в формате YYYY-MM-DD", "");
           
       
        while(isNaN(money) || money == "" || money == null) {
            money = +prompt("Ваш бюджет на месяц?", "");
        }   
    
    }
    
    start();
    
let appData = {
        moneyData: money,
        timeData: time,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: true,
        chooseExspenses: function() {
            for (let i = 0; i < 2; i++){
                let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
                    b = prompt('Во сколько обойдется?', '');
                
                if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) { 
                       console.log('done');
                    appData.expenses[a] = b;
            
                }  else {
                    alert('Вы допустили ошибку, попробуйте еще раз');
                      i = i - 1;
                }
            }
        },
        detectDayBudget: function() {
            appData.moneyPerDay = (appData.moneyData / 30).toFixed();
    
            alert("Ежедневный бюджет: " + appData.moneyPerDay);
        },
        detectLevel: function() {
            if (appData.moneyPerDay <100) {
                console.log('Минимальный уровень достатка');
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                console.log('Средний уровень достатка');
            } else if (appData.moneyPerDay < 2000) {
                console.log('Высокий уровень достатка');
            } else {
                console.log('Произошла ошибка!')
            }
        },
        checkSavings: function() {
            if (appData.savings == true){
                let save = +prompt("Какова сумма накоплений?"),
                    percent = +prompt("Под какой процент?");
            
                    appData.monthIncome = save/100/12*percent;
                    alert("Доход в месяц с вашего депозита: " + appData.monthIncome.toFixed());
               }
        },
        chooseOptExpenses: function() {
            for (let i = 1; i < 4; i++){
                let nonMandatoryExpenses = prompt('Статья необязательных расходов?', '');
        
                if ( (typeof(nonMandatoryExpenses)) === 'string' && (typeof(nonMandatoryExpenses)) != null && nonMandatoryExpenses != '' && nonMandatoryExpenses.length < 50) { 
                       console.log('doness');
                       
                    appData.optionalExpenses[i] = nonMandatoryExpenses;
            
                }  else {
                    alert('Вы допустили ошибку, попробуйте еще раз');
                      i = i - 1;
                }
            }
        },
        chooseIncome: function() {
            for (let i = 1; i < 2; i++){
            let items = prompt("Что принесет дополнительный доход? (Перечислете через запятую!)", "");
            if ( (typeof(items)) === 'string' && (typeof(items)) != null && items != '' && items.length < 50) { 
                appData.income[i] = items;
            } else {
                alert('Вы допустили ошибку, попробуйте еще раз');
                  i = i - 1;
            }
            appData.income = items.split(", ");
            appData.income.push(prompt("Может что-то еще?"));
            appData.income.sort();
    
            appData.income.forEach(function(item, i, income) {
                let n = i + 1;
                console.log(n + ". Способы доп. заработка: " + item);
                });
            
          }
               
    
        }
    };
    
    
        console.log(appData);
    
    for (let key in appData) {
        alert("Наша программа включает в себя данные: " + key + " " + appData[key]);
     }
    