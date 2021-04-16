let customers = localStorage.allCustomers ? JSON.parse(localStorage.allCustomers) : [];

function register() {

	if (fName.value == '' || lName.value == '' || phone.value == '' || email.value == '' || pin.Value == '') {
		alert('Please fill the form')
	} 
	else {
	    let newCustomer = {
	        firstName : fName.value,
	        lastName : lName.value,
	        phoneNumber : phone.value,
	        email : email.value,
	        Upin : pin.value,
	        accNo : genAccNo(),
	        amount : 10000,
	        log : []
	    };
	    for (let i = 0; i < customers.length; i++) {
	        if (customers[i].accNo) {
	            newCustomer.accNo = genAccNo();
	        }
	    }
	    alert('Sign Up successful, Your account number is ' + newCustomer.accNo + ' and your pin is ' + newCustomer.Upin);
	    localStorage.online = JSON.stringify(newCustomer.accNo)
	    customers.push(newCustomer);
	    localStorage.allCustomers = JSON.stringify(customers);
	    window.location = 'personalPortal.html'
	}
}

function genAccNo() {
    return Math.floor(Math.random()*10000000000)
}

