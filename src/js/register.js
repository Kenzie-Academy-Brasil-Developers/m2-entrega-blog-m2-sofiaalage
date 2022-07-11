const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
    e.preventDefault();

    let userName = document.querySelector('#username').value
    let email = document.querySelector('#email').value
    let avatarUrl = document.querySelector('#avatarUrl').value
    let password = document.querySelector('#password').value


    user = new Usuario(userName, email, avatarUrl, password)
    return await Api.registerUser(user);

}