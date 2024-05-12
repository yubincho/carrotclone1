
async function editMemo(event) {
    console.log(event.target.dataset.id)
    const id = event.target.dataset.id

    const editInput = prompt("수정할 값을 입력하세요~ ")
    console.log(editInput)

    const res = await fetch(`/memo/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            content: editInput,
        }),
    }) 
    readMemo()
}


function displayMemos(memo) {
    const ul = document.querySelector('#memo-ul')
    const li = document.createElement('li')
    const editBtn = document.createElement('button')
    li.innerText = `[id:${memo.id} ${memo.content}]`
    editBtn.innerText = '수정하기'
    editBtn.addEventListener("click", editMemo)
    editBtn.dataset.id = memo.id

    ul.appendChild(li)
    li.appendChild(editBtn)
}

async function readMemo() {
    const res = await fetch("/memos")
    const jsonRes = await res.json()
    console.log(jsonRes)
    // jsonRes = [{id:123, content: '블라블라'}]
    const ul = document.querySelector('#memo-ul')
    ul.innerHTML = "" // 데이터 초기화(이전 데이터들 모두 없애줌)

    jsonRes.forEach(displayMemos)
}




async function createMemo(value) {
    console.log("값은 ", value)
    // 서버에 요청 보내기 : 메모 만들어주세요~ 
    try {
        const res = await fetch("/memos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: new Date().getTime(),
                content: value,
            }),
        }) 
        // console.log("[res]", res)
        // const jsonRes = await res.json()
        // console.log("[jsonRes]", jsonRes)
        // return jsonRes
        readMemo()
        
    } catch (error) {
        console.error("Error: ", error.message)
    }
    
}

function handleSubmit(event) {
    event.preventDefault()
    console.log("동작하나???")

    const input = document.querySelector('#memo-input')
    console.log(input.value)
    createMemo(input.value)

    input.value = "" // 다시 값 지우기
}

const form = document.querySelector('#memo-form')
form.addEventListener("submit", handleSubmit)







