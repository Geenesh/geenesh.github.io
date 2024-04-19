function subscribeEmail() {
    var emailInput = document.getElementById('email-input');
    var email = emailInput.value;
    if (email.includes('@') && email.includes('.')) {
        document.getElementById('notification').innerText = 'Thank you for subscribing!';
        document.getElementById('notification').style.color = 'green';
    } else {
        document.getElementById('notification').innerText = 'Please enter a valid email address.';
        document.getElementById('notification').style.color = 'red';
    }
}
