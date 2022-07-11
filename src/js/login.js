const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
    e.preventDefault();

    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value


    user = new Usuario("", email, "", password)
    return await Api.loginUser(user);

}


