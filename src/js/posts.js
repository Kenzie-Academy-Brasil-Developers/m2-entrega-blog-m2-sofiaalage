const divPosts = document.querySelector(".posts");
const divContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", handleLoad);

async function handleLoad(e) {
    e.preventDefault();
    const endPoint = window.location.pathname.split("/")[1].split(".")[0]
    if (endPoint == "posts") {
        checkIsLogged()
        loadPosts()
        loadUserImg()
        addLogoutListener()
    } else if (endPoint == "sendPost") {
        form = document.querySelector("form");
        let postToEdit = localStorage.getItem("postToEdit");
        form.addEventListener("submit", handleSubmitPost)
    }

}

async function handleSubmitPost(e) {
    e.preventDefault();
    postText = document.querySelector("#postText").value;
    if (postText.split("\n").lenght > 5) {
        sendPost(postText)
    }

}

async function loadPosts(nextPage) {
    divPosts.innerHTML = ""
    let posts = await Api.getPosts(nextPage);
    posts.data.forEach(post => {
        addPost(post)
    });
    addNextButton(posts.nextPage)
}

async function loadUserImg() {
    let stored_user_info = localStorage.getItem("userInfo")
    if (stored_user_info == null) {
        await Api.getUser(localStorage.getItem("uid"))
        stored_user_info = localStorage.getItem("userInfo");
    }
    let user_info = JSON.parse(stored_user_info);
    let user_img = document.createElement("img")
    user_img.classList.add("usuario_img")
    user_img.src = user_info.avatarUrl
    let usuario_img_div = document.querySelector(".usuario_img_div")
    usuario_img_div.appendChild(user_img)
}
async function sendPost(postText, postId) {
    let posts = await Api.sendPost(postText, postId);
}

function addPost(post) {
    let divPost = document.createElement("div")
    divPost.classList.add("post")
    divPost.classList.add("card")
    divPost.id = "post" + post.id
    divPosts.appendChild(divPost)

    let divImg = document.createElement("div")
    divImg.classList.add("divImg")
    divPost.appendChild(divImg)

    let divMainPost = document.createElement("div")
    divMainPost.classList.add("divMainPost")
    divPost.appendChild(divMainPost)

    let divDateAndButtons = document.createElement("div")
    divDateAndButtons.classList.add("divDateAndButtons")
    divPost.appendChild(divDateAndButtons)

    let user = document.createElement("h4")
    user.innerHTML = post.user.username
    divMainPost.appendChild(user)


    let p = document.createElement("p")
    p.innerHTML = post.content
    divMainPost.appendChild(p)

    addEditAndRemoveButton(divDateAndButtons, post.user.id)

    let h5 = document.createElement("h5")
    let data = new Date(post.createdAt)
    h5.innerHTML = data.toLocaleDateString("pt-br")
    divDateAndButtons.appendChild(h5)

}

function addNextButton(nextPage) {
    let nextButton = document.querySelector(".nextButton")
    if (nextButton == undefined) {
        nextButton = document.createElement("button")
        nextButton.classList.add("nextButton")
    }
    nextButton.addEventListener("click", function () {
        loadPosts(nextPage)
    })
    nextButton.textContent = "Next Page"
    divContainer.appendChild(nextButton)
}

function addEditAndRemoveButton(pai, postUid) {
    if (postUid == Api.uid) {
        editButton = document.createElement("p")
        editButton.classList.add("editButton")
        editButton.id = pai.id
        editButton.setAttribute("onclick", "editPost('" + editButton.id + "')")
        editButton.textContent = "Edit post"
        pai.appendChild(editButton)

        removeButton = document.createElement("p")
        removeButton.classList.add("removeButton")
        removeButton.setAttribute("onclick", "deletePost('" + editButton.id + "')")
        removeButton.textContent = "Remove post"
        pai.appendChild(removeButton)
    }
}

function addLogoutListener(){
    let bt_logout = document.querySelector(".logout")
    bt_logout.addEventListener("click", function(){
        localStorage.clear()
        document.location.href = "index.html"
    })
}

function checkIsLogged(){
    if (localStorage.getItem("uid") == null && localStorage.getItem("token") == null) {
        document.location.href = "index.html"
    } 
}

function editPost(divId) {

    console.log(divId)
    let postId = divId.split("post")[1]
    let div = document.querySelector("#" + divId)

    text = div.getElementsByTagName('p')[0].innerHTML

    for (let item of div.children) {
        item.style.display = "none";
    }

    textarea = document.createElement("textarea")
    textarea.classList.add("editTextArea")
    textarea.id = "ta_" + postId
    textarea.innerHTML = text
    div.appendChild(textarea)


    salvarButton = document.createElement("button")
    salvarButton.classList.add("salvarButton")
    salvarButton.id = "bt_" + postId
    salvarButton.addEventListener("click", function () { savePost(postId) })
    salvarButton.textContent = "Salvar post"
    div.appendChild(salvarButton)

}

async function createPost() {
    let txt = document.querySelector("#textareaPost").value
    let ans = await Api.savePost(txt)
    location.reload();
}

async function savePost(postId) {
    let txt = document.querySelector("#ta_" + postId).value
    let ans = await Api.savePost(txt, postId)
    location.reload();
}

async function deletePost(divId) {
    let postId = divId.split("post")[1]
    let ans = await Api.removePost(postId)
    location.reload();
}