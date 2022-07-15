class Api {
    static token = ""
    static uid = ""
    static userInfo = ""

    static async registerUser(user) {
        const response = await fetch("https://blog-m2.herokuapp.com/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            .then(function (res) {
                if (res.ok) {
                    document.location.href = "index.html"
                }
                return res.json();
            })
            .then(function (data) {
                document.querySelector('#error').innerHTML = data.message
                return data
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
            });
        return response
    }

    static async getUser(id) {
        const response = await fetch("https://blog-m2.herokuapp.com/users/"+id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.token}`
                }
            })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                return data
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
            });

            Api.userInfo = JSON.stringify(response)
            localStorage.setItem("userInfo", Api.userInfo);
        
        return response
    }

    static async loginUser(user) {
        const response = await fetch("https://blog-m2.herokuapp.com/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            .then(function (res) {
                if (res.ok) {
                    document.location.href = "posts.html"
                }
                return res.json();
            })
            .then(function (data) {
                if (data.message != undefined)
                    document.querySelector('#error').innerHTML = data.message
                return data
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
            });

        Api.uid = response.userId
        localStorage.setItem("uid", Api.uid);

        Api.token = response.token
        localStorage.setItem("token", Api.token);

        return response

    }

    static async getPosts(page) {
        Api.uid = localStorage.getItem("uid")
        Api.token = localStorage.getItem("token")

        if (page == undefined) {
            page = "page=1"
        }

        const response = await fetch("https://blog-m2.herokuapp.com/posts?" + page,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.token}`
                }
            })
            .then(function (res) {
                if (res.ok) {
                }
                return res.json();
            })
            .then(function (data) {
                return data
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
            });

        return response
    }

    static async savePost(txt, postid) {
        Api.uid = localStorage.getItem("uid")
        Api.token = localStorage.getItem("token")


        let method = "POST"
        let url = "https://blog-m2.herokuapp.com/posts"

        let content = { content: txt}

        if (postid != undefined) {
            method = "PATCH"
            url = url + "/" + postid
        }

        const response = await fetch(url,
            {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.token}`
                },
                body: JSON.stringify(content)
            })
            .then(function (res) {
                if (res.ok) {
                }
                return res.json();
            })
            .then(function (data) {
                return data
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
            });

        return response
    }

    static async removePost(postid) {
        Api.uid = localStorage.getItem("uid")
        Api.token = localStorage.getItem("token")

        const response = await fetch("https://blog-m2.herokuapp.com/posts/"+postid,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.token}`
                }
            })
            .then(function (res) {
                if (res.ok) {
                }
                return res.json();
            })
            .then(function (data) {
                return data
            })
            .catch((error) => {
                console.log(JSON.stringify(error))
            });

        return response
    }


}