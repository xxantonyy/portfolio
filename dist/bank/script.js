'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2023-02-28T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-10-09T07:43:59.331Z',
    '2023-03-01T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  // currency: 'CAD',
  currency: 'CAD',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatTransactionDate = function (date,locale) {
  
       const getDaysBetween2Dates = (date1, date2) =>
      Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

      const daysPassed = getDaysBetween2Dates(new Date(), date);
  
      // if (daysPassed === 0 ) return 'Сегондя';
      // if (daysPassed === 1 ) return 'Вчера';
      // if (daysPassed <= 5 ) return `${daysPassed} дней назад`;
      // else {
      //   const day = `${date.getDate()}`.padStart(2, '0');
      //   const month =`${date.getMonth()+1}`.padStart(2, '0');
      //   const year = date.getFullYear();

      //   return `${day} / ${month} / ${year}`;
      // };
 
      return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value,locale,currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};


const displayTransactions = function (account, sort = false) {

      containerTransactions.innerHTML = '';

      const transacs = sort ? account.transactions.slice().sort((x,y)=> x-y) : account.transactions ;

      transacs.forEach( function (trans, index) {
      const transType = trans > 0 ? 'deposit' : 'withdrawal';
   
      const date = new Date(account.transactionsDates[index]);
      const transDate = formatTransactionDate(date,account.locale);

      const formattedTrans = formatCurrency(trans,account.locale, account.currency);

      const transactionRow = `
      <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${formattedTrans}</div>
        </div>
      `;

      containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
    })
};



// console.log(containerTransactions.innerHTML);

const createNickame = function (accs){
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
    .toLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('');
  })
};

createNickame(accounts);

// const userName = 'Oliver Avila'; // nickname = 'oa';
// const nickName = userName
// .toLowerCase()
// .split(' ')
// .map(word => word[0])
// .join('');
// console.log(nickName);


const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc,value) => acc + value, 0);
  account.balance = balance;
  labelBalance.textContent = formatCurrency(balance,account.locale, account.currency);

};


const displayTotal = function (account) {
    const depositTotal = account.transactions.filter(trans => trans>0).reduce((acc,trans)=> acc+ trans,0);
    labelSumIn.textContent = formatCurrency(depositTotal,account.locale, account.currency);

    const withdrawalsTotal = account.transactions.filter(trans => trans<0).reduce((acc,trans)=> acc+ trans,0);
    labelSumOut.textContent = formatCurrency(withdrawalsTotal,account.locale, account.currency);

    const interestTotal = account.transactions.filter(trans=> trans > 0).map(dep => (dep * account.interest) / 100).filter((interest,index,arr) => {
      return interest >= 5;
      }).reduce((acc, interest) => acc+interest,0);
    labelSumInterest.textContent = formatCurrency(interestTotal,account.locale, account.currency);
};

const updateUI = function(account) {
     // Display transactions 
     displayTransactions(account);
  
     //Display balance
     displayBalance(account);
 
     // Display total
     displayTotal(account);
};
let currentAccount , currentLogOutTimer;

// Always logged in

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


const startLogoutTimer = function() {
    const logOutTimerCallBack = ()=>{
      const minutes = String(Math.trunc(time / 60)).padStart(2,0);
      const seconds = String(Math.trunc(time % 60)).padStart(2,0);
      // В каждом вызове показывать оставшееся времяв UI
      labelTimer.textContent = `${minutes}:${seconds}`;
     
      // После истечения времени остановить таймер и выйти из приложения

      if (time == 0) {
        clearInterval(logOutTimer);
    
        containerApp.style.opacity = 0;
        labelWelcome.textContent='Войдите в свой аккаунт';
      };
      time--;
  };


  // Установить время выхода чрезе 5 минут
  let time =  300;

  // Вызов таймера каждую секнуду
  logOutTimerCallBack();
  const logOutTimer = setInterval(logOutTimerCallBack, 1000);

  return logOutTimer;
};


btnLogin.addEventListener('click', function(e) {
  e.preventDefault();
  currentAccount = accounts.find(account => account.nickname === inputLoginUsername.value);

  if(currentAccount?.pin && currentAccount.pin === +(inputLoginPin.value)){
    // Displau UI
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Рады что вы снова c нами ${currentAccount.userName.split(' ')[0]} !`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    }
    const locale = navigator.language;
    console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

    // Clear inpur 
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    if(currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
   
    updateUI(currentAccount);
  };

});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const transferAmount = +(inputTransferAmount.value);
  const recipientNickName = (inputTransferTo.value); 
  const recipientAccaunt = accounts.find(account => account.nickname === recipientNickName);

  inputTransferTo.value = '';
  inputTransferAmount.value = ''; 
  if (transferAmount > currentAccount.balance){
    alert('Not have enauth money!!!!');
  }
  if ( transferAmount > 0 && currentAccount.balance >= transferAmount && currentAccount.nickname !== recipientAccaunt?.nickname && recipientAccaunt?.nickname)
  {

      currentAccount.transactions.push(-transferAmount);
      recipientAccaunt.transactions.push(transferAmount);
      // Add transactions date

      currentAccount.transactionsDates.push(new Date().toISOString());
      recipientAccaunt.transactionsDates.push(new Date().toISOString());
      updateUI(currentAccount);

      // Reset The timer 

      clearInterval(currentLogOutTimer);
      currentLogOutTimer = startLogoutTimer();
  };
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  currentAccount = accounts.find(account => account.nickname === inputCloseUsername.value);
  if (inputCloseUsername.value === currentAccount.nickname && currentAccount?.pin && +inputClosePin.value === currentAccount.pin){
    const currentAccountIndex = accounts.findIndex(account => account.nickname === currentAccount.nickname);
    accounts.splice(currentAccountIndex, 1);
    console.log(accounts);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Введите логин и пароль!';
  };
  
    inputCloseUsername.value = '';
    inputClosePin.value = '';
});


btnLoan.addEventListener('click', function(e){
  e.preventDefault();
  const loanAmaunt = Math.floor(inputLoanAmount.value);

  if(loanAmaunt > 0 && currentAccount.transactions.some(trans => trans >= loanAmaunt / 10)){
    setTimeout(() => {
      currentAccount.transactions.push(loanAmaunt);
      currentAccount.transactionsDates.push(new Date().toISOString());
      alert('Ваш займ ОДОБРЕН!');
      updateUI(currentAccount);
      clearInterval(currentLogOutTimer);
      currentLogOutTimer = startLogoutTimer();}
      ,3* 1000);
  }

  else setTimeout(()=> alert('Ваш займ ОТКЛОНЕН!'), 3000);
  inputLoanAmount.value = '';
});

let transactionsSort = false;

btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSort);
  transactionsSort = !transactionsSort;
});

 const logoImage = document.querySelector('.logo');
  logoImage.addEventListener('click', () => {
  const transactionsUI = document.querySelectorAll('.transactions__value');
  const transactionsArr = Array.from(transactionsUI, elem => elem.textContent);
  console.log(transactionsArr);
  
  [...document.querySelectorAll('.transactions__row')].forEach(function(row,index){
    if(index % 2 === 0){
      row.style.backgroundColor = 'grey';
    }
  });
});

