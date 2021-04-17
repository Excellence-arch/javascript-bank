withdraw.style.display = 'none';
deposit.style.display = 'none';
bal.style.display = 'none';
// let cust = [];
let onlineCustomer = localStorage.online ? JSON.parse(localStorage.online) : (window.location = 'login.html')
let cust = JSON.parse(localStorage.allCustomers)
let custDets;
let onlineNumber;
for (let i = 0; i < cust.length; i++) {
	if (cust[i].accNo == onlineCustomer) {
		custDets = cust[i];
		onlineNumber = i;
		marq.innerHTML = '<marquee behavior="alternate" bgColor="springgreen" style="font-size:30px;"> Welcome, dear '+ cust[i].firstName + ' ' + cust[i].lastName + '</marquee>'
	} 
}

function callwithdraw() {
	deposit.style.display = 'none';
	withdraw.style.display = 'block';
	// console.log(custDets)
}

function callDeposit() {
	withdraw.style.display = 'none';
	deposit.style.display = 'block';
}

function withdraws(e) {
	e.preventDefault();
	bal.style.display = 'block';
	if (custDets.amount > drawAmount.value) {
		custDets.amount = eval(custDets.amount - drawAmount.value);
		bal.innerHTML = 'Your new balance is ' + custDets.amount;
		drawAmount.value = '';
		custDets['log'].push('You made a withdrawal of ' + drawAmount.value)
		if (cust.length == 1) {
			cust = [custDets];
			localStorage.allCustomers = JSON.stringify(cust);
		} else {
			cust.splice(onlineNumber, 1, custDets);
			localStorage.allCustomers = JSON.stringify(cust);
		}
	}
	else {
		warning.innerHTML = 'Insufficient fund!'
	}
}

function deposits(e) {
	e.preventDefault();
	bal.style.display = 'block';
	custDets.amount = eval(Number(custDets.amount) + Number(depositAmount.value));
	bal.innerHTML = 'Your new balance is ' + custDets.amount;
	depositAmount.vlaue = '';
	custDets['log'].push('You made a deposit of ' + depositAmount.value);
	if (cust.length == 1) {
		cust = [custDets];
		localStorage.allCustomers = JSON.stringify(cust);
	} else {
		cust.splice(onlineNumber, 1, custDets);
		localStorage.allCustomers = JSON.stringify(cust);
	}
}


function transfer() {
	
}


function checkBalance() {
	withdraw.style.display = 'none';
	deposit.style.display = 'none';
	bal.style.display = 'block';
	bal.innerHTML = '<center>Your account balance is ' + custDets.amount + '</center>';
}


function logOut() {
	localStorage.online = null;
	window.location.href = 'index.html';
}