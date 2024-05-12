



async function showMessage() {
    const res = await fetch("/show")
    const jsonRes = await res.json()

    const div = document.querySelector("#chat-div")
    div.innerHTML = ""

    jsonRes.forEach(v => {
        let p = document.createElement("p");  // 각 메시지를 위한 p 태그 생성
        p.textContent = v.text;  // p 태그의 내용 설정
        div.appendChild(p);  // 생성된 p 태그를 div에 추가
    })
}



let id = 0
async function createMessage(value) {

    const res = await fetch("/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            text: value,    
        })
    })
    console.log("[res]", res)

    showMessage()
}



async function handleSubmit(event) {
    event.preventDefault()

    const inputMsg = document.querySelector("#chat-input")
    console.log(inputMsg.value)

    createMessage(inputMsg.value)
}



const form = document.querySelector("#chat-form")
form.addEventListener("submit", handleSubmit)
