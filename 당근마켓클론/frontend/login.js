console.log("hhh")

let accessToken = null

const handleSubmit = async (event) => {
    // event.prevetDefault()

    const formData = new FormData(form)

    const sha256Password = sha256(formData.get("password"))
    formData.set("password", sha256Password)

    const div = document.getElementById("info")

    try {
        const res = await fetch("/login", {
            method : "POST",
            body : formData,
        })
    
        const result = await res.json()
        console.log("[result 액세스 토큰]", result) 
        accessToken = result.access_token
        console.log("[accessToken] :", accessToken)

        const infoDiv = document.querySelector("#info")
        infoDiv.innerText = "로그인되었습니다"

        const btn = document.createElement("button")
        btn.innerText = "상품 가져오기"
        btn.addEventListener("click", async () => {
            const res = await fetch("/items", {
                headers: {
                    "Authorization" : `Bearer ${accessToken}`
                }
            })
            const data = await res.json()
            console.log("[data]", data)
        })

        infoDiv.appendChild(btn)
        
        // if (res.status === 200) {
        //     console.log("[res.status]", res.status) // 200
        //     div.innerText = "로그인에 성공했습니다."  
        //     div.style.color = "blue"
        //     // alert("로그인에 성공했습니다")
        //     window.location.pathname = "/"
            
        // } else if (res.status === 401) {
        //     alert("로그인이 실패했")
        // }
    } catch (error) {
        console.error(error.message)
        div.innerText = "아이디나 비밀번호가 일치하지 않습니다"
        div.style.color = "red"
        
    }
    

}


const form = document.querySelector("#login-form")
form.addEventListener("submit", handleSubmit)