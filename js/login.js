let allCustomers = localStorage.allCustomers ? JSON.parse(localStorage.allCustomers) : [];
let found;
function login() {
	for (let i = 0; i < allCustomers.length; i++) {
		if (acctNo.value == allCustomers[i].accNo && pin.value == allCustomers[i].Upin) {
			window.location = 'personalPortal.html';
			found = true;
			break;
		}
	}
	if (!found) {
		wrong.innerHTML = 'Incorrect account number or pin please try again';
	}
}