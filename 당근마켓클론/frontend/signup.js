console.log("hi")

const checkPassword = () => {
    const formData = new FormData(form)
    const password1 = formData.get("password")
    const password2 = formData.get("password2")
    if (password1 === password2) return true
    else return false
}

const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(form)

    // console.log(sha256("hi"))
    const sha256Password = sha256(formData.get("password"))
    formData.set("password", sha256Password)
    console.log(formData.get("password"))

    const div = document.querySelector("#info")

    if (checkPassword()) {
        // div.innerText = "회원가입에 성공했습니다."  // 비밀번호가 같을 때 텍스트 없애줌
        // div.style.color = "blue"

        const res = await fetch("/signup", {
            method: "POST",
            body: formData,
        })
        // console.log("[res.json()]", res.json())
        const data = await res.json()

        if (data === '200') {
            div.innerText = "회원가입에 성공했습니다."  
            div.style.color = "blue"
            alert("회원가입에 성공하였습니다")
            window.location.pathname = "/login.html"
        } 
    } else {
        div.innerText = "비밀번호가 같지 않습니다."
        div.style.color = "red"
    }

}



const form = document.querySelector("#signup-form")
form.addEventListener("submit", handleSubmit)







