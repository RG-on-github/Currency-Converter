import {countryList} from './codes.js';

let keys_countryList = Object.keys(countryList);
let cc1 = document.querySelector('#cc1');
let cc2 = document.querySelector('#cc2');
for (let i=0;i<keys_countryList.length;i++){
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    option1.value = `${keys_countryList[i]}`;
    option1.innerHTML = `${keys_countryList[i]}`;
    option2.value = `${keys_countryList[i]}`;
    option2.innerHTML = `${keys_countryList[i]}`;
    cc1.appendChild(option1);
    cc2.appendChild(option2);
}

let flag1 = document.querySelector('#country_flag1');
let flag2 = document.querySelector('#country_flag2');

let country_flag1 = new Image();
let country_flag2 = new Image();

let currency_code1 = document.querySelector('#cc1');
let currency_code2 = document.querySelector('#cc2');

country_flag1.style.width = '9vw';
country_flag1.style.height = '7vw';
country_flag2.style.width = '9vw';
country_flag2.style.height = '7vw';

let amount_div = document.querySelector('.container1');
amount_div.style.display = 'none';

let country1,country2,exchange1,exchange2;
let exchange_rate1 = document.querySelector('#exchange_rate1');
let exchange_rate2 = document.querySelector('#exchange_rate2');
const show_currencyExchangeRate = async (country1,country2) => {
    let response1 = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${country1}/${country2}.json`);
    let data1 = response1.json();
    data1.then((res)=>{
        exchange1 = res[country2];
        let c1 = country1.toUpperCase();
        let c2 = country2.toUpperCase();
        exchange_rate1.innerText = `1 ${c1} = ${exchange1.toFixed(3)} ${c2}`;
    });
    

    let response2 = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${country2}/${country1}.json`);
    let data2 = response2.json();
    data2.then((res)=>{
        exchange2 = res[country1];
        let c1 = country1.toUpperCase();
        let c2 = country2.toUpperCase();
        exchange_rate2.innerText = `1 ${c2} = ${exchange2.toFixed(3)} ${c1}`;
    });

    amount_div.style.display = 'flex';

    document.querySelector('#button3').addEventListener('click',currency_calculator);
}

let a = 0, b = 0, calc1, calc2;
function show_flag1(){
    cc1 = currency_code1.value;
    cc1 = cc1.toUpperCase();
    calc1 = cc1;
    let country_code1 = countryList[cc1];
    if (country_code1==undefined){
        window.alert("Enter Appropriate Currency Code");
        return;
    }
    country1 = cc1.toLowerCase();
    if (country1==country2){
        window.alert("You have entered the same currency code for both the input fields");
        return;
    }
    country_flag1.src = `https://flagsapi.com/${country_code1}/shiny/64.png`;
    country_flag1.onload = () => {
        flag1.appendChild(country_flag1);
    }
    a = 1;
    if (a==1 && b==1){
        show_currencyExchangeRate(country1,country2);
    }
}

function show_flag2(){
    cc2 = currency_code2.value;
    cc2 = cc2.toUpperCase();
    calc2 = cc2;
    let country_code2 = countryList[cc2];
    if (country_code2==undefined){
        window.alert("Enter Appropriate Currency Code");
        return;
    }
    country2 = cc2.toLowerCase();
    if (country1==country2){
        window.alert("You have entered the same currency code for both the input fields");
        return;
    }
    country_flag2.src = `https://flagsapi.com/${country_code2}/shiny/64.png`;
    country_flag2.onload = () => {
        flag2.appendChild(country_flag2);
    }
    b = 1;
    if (a==1 && b==1){
        show_currencyExchangeRate(country1,country2);
    }
}

function final_result(statement1,statement2){
    let last_div1 = document.querySelector("#final_result1");
    last_div1.innerText = `${statement1}`;
    let last_div2 = document.querySelector("#final_result2");
    last_div2.innerText = `${statement2}`;
}

let currency_calc = document.querySelector('#currency_calc');
function currency_calculator(){
    let amount = currency_calc.value;
    if(amount==undefined){
        window.alert("Enter a value!");
        return;
    }
    if(amount<=0){
        window.alert("Only a Positive value is allowed!");
        return;
    }
    let statement1 = `${amount} ${calc1} is ${(amount*exchange1).toFixed(3)} ${calc2}`;
    let statement2 = `${amount} ${calc2} is ${(amount*exchange2).toFixed(3)} ${calc2}`;
    final_result(statement1,statement2);
}

document.querySelector('#button1').addEventListener('click',show_flag1);
document.querySelector('#button2').addEventListener('click',show_flag2);