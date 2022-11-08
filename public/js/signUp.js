const signupForm = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value;
    const password = document.querySelector('#password-signup').value;
    const email = document.querySelector('#email-signup').value;

    console.log(username, password, email)
    const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, password, email }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(res.statusText);
    }

};

document.querySelector('#signup-form').addEventListener('submit', signupForm);


