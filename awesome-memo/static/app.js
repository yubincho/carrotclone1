
async function deleteMemo(event) {
    const id = event.target.dataset.id
    try {
        const res = await fetch(`/memos/${id}`, {
            method: "DELETE",
        });
        const result = await res.text();
        console.log("[delete result]", result);  // "성공했습니다"
        if (res.ok) {
            readMemo();
        } else {
            console.error("메모 삭제에 실패했습니다:", result);
        }
    } catch (error) {
        console.error("메모 삭제 중 오류 발생:", error.message);
    }
}

async function editMemo(event) {
    console.log(event.target.dataset.id)
    const id = event.target.dataset.id

    const editInput = prompt("수정할 값을 입력하세요~ ")
    console.log(editInput)

    const res = await fetch(`/memos/${id}`, {
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

    const delBtn = document.createElement('button')
    delBtn.innerText = '삭제'
    delBtn.addEventListener("click", deleteMemo)
    delBtn.dataset.id = memo.id

    ul.appendChild(li)
    li.appendChild(editBtn)
    li.appendChild(delBtn)
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







