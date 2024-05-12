console.log('dgd')

const 정답 = "APPLE"

let index = 0
let attempts = 0

let timer;

function appStart() {

    const displayGameover = () => {
        const div = document.createElement("div")
        div.innerText = '게임이 종료되었습니다'
        div.style = "display: flex; justify-content: center; align-items: center; position: absolute; top: 40vh; left: 45vw;"
        document.body.appendChild(div)
    }



    const nextLine = () => {
        if (attempts === 6) return
        attempts += 1
        index = 0
    }

    const gameover = () => {
        window.removeEventListener("keydown", handleKeyDown)
        displayGameover()
        clearInterval(timer)
    }

    const handleEnterKey = async() => {
        let 맞은_개수 = 0

        const 응답 = await fetch('/answer')
        const 정답_객체 = await 응답.json()
        const 정답 = 정답_객체.answer


        // 정답 확인
        console.log("enter key!")
        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`)
            console.log(block.innerText)
            const 입력한_글자 = block.innerText
            const 정답_글자 = 정답[i]
            if (입력한_글자 === 정답_글자) {
                맞은_개수 += 1
                block.style.background = "#6AAA64"
            }
            else if (정답.includes(입력한_글자)) block.style.background = "#C9B458"
            else block.style.background = "#787C7E"

            block.style.background = "white"
            console.log("[입력한_글자]: ", 입력한_글자, "[정답_글자]: ", 정답_글자)
        }

        if (맞은_개수 === 5) gameover()
        else nextLine()
    }

    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`)
            preBlock.innerText = ""
        }
        if (index !== 0) index -= 1

    }
    
    const handleKeyDown = (event) => {
        if (index === 5) return;

        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        console.log("키가 눌렸습니다", event.key, event.keyCode);

        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`)

        if (event.key === 'Backspace') handleBackspace()
        else if (index === 5) {
            if (event.key === "Enter") handleEnterKey()
            else return
        } else if (65 <= keyCode <= 90) {
            thisBlock.innerHTML = key;
            index++
        }

    }


    const startTimer = () => {
        const time = new Date();

        const setTime = () => {
            const curTime = new Date();
            const pasTime = new Date(curTime - time);

            const min = pasTime.getMinutes().toString().padStart(2, "0");
            const sec = pasTime.getSeconds().toString().padStart(2, "0");
            const H1 = document.querySelector("#timer");
            H1.innerText = `${min}:${sec}`;
        };

        timer = setInterval(setTime, 1000);

    };
    startTimer();
    window.addEventListener("keydown", handleKeyDown);
}


appStart();



