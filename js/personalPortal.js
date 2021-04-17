withdraw.style.display = 'none';
deposit.style.display = 'none';
trans.style.display = 'none';
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
		marq.innerHTML = '<marquee behavior="alternate" bgColor="springgreen" style="font-size:30px;"> Welcome, Dear '+ cust[i].firstName + ' ' + cust[i].lastName + '</marquee>'
	} 
}

function callwithdraw() {
	deposit.style.display = 'none';
	withdraw.style.display = 'block';
	bal.style.display = 'none';
	trans.style.display = 'none';
	// console.log(custDets)
}

function callDeposit() {
	withdraw.style.display = 'none';
	bal.style.display = 'none';
	trans.style.display = 'none';
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


function callTransfer() {
	withdraw.style.display = 'none';
	deposit.style.display = 'none';
	bal.style.display = 'none';
	trans.style.display = 'block';
}

function transfer(e) {
	e.preventDefault();
	let aFound;
	let equal;
	if(benAcct.value == custDets.accNo) {
		// warning.style.display = 'block';
		equal = true;
		warning.innerHTML = 'You cannot transfer to your self';
	} else if (!equal && custDets.amount >= transferAmount.value) {
		for (let i =0; i < cust.length; i ++) {
			if (benAcct.value == cust[i].accNo && custDets.Upin == passwrd.value) {
				aFound = true;
				bal.style.display = 'block';
				bal.innerHTML = 'Are yout sure you want to transfer ' + transferAmount.value + ' to ' + cust[i].firstName + ' '+ cust[i].lastName + ' ? <br> <button class="btn btn-new m-4" onclick="yes('+ i +')">Yes</button> <button class="btn btn-new m-4" onclick="no()">No</button>';
			}
		}
	}
	if (!aFound) {
		warning.innerHTML = 'Account Number or pin is incorrect';
	}
}

function yes(index) {
	custDets.amount = eval(custDets.amount - transferAmount.value)
	cust[index].amount = eval(Number(cust[index].amount) + Number(transferAmount.value))
	bal.innerHTML = 'Your new account balance is ' + custDets.amount
	custDets.log.push('You transferred ' + transferAmount.value + ' to ' + cust[index].firstName + ' ' + cust[index].lastName);
	cust[index].log.push(transferAmount.value + ' was transferred to you from ' + custDets.firstName + ' ' + custDets.lastName);
	cust.splice(onlineNumber, 1, custDets);
	cust.splice(index, 1, cust[index]);
	localStorage.allCustomers = JSON.stringify(cust)
	// console.log(cust);
}

function no() {
	callTransfer();
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