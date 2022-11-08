const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (username && password) {
        await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            document.location.replace('/dashboard');
        }).catch((err) => {
            alert(err);
        })
    }
};

document.querySelector('#login-submit').addEventListener('click', loginForm);
