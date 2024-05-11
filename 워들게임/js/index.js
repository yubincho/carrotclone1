console.log('dgd')

const 정답 = "APPLE"

let index = 0
let attempts = 0

function appStart() {

    const nextLine = () => {
        if (attempts === 6) return
        attempts += 1
        index = 0
    }

    const gameover = () => {
        window.removeEventListener("keydown", handleKeyDown)
    }

    const handleEnterKey = () => {
        let 맞은_개수 = 0
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
    
    const handleKeyDown = (event) => {
        if (index === 5) return;

        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        console.log("키가 눌렸습니다", event.key, event.keyCode);

        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`)

        if (index === 5) {
            if (event.key === "Enter") handleEnterKey()
            else return
        } else if (65 <= keyCode <= 90) {
            thisBlock.innerHTML = key;
            index++
        }

    }

    let timer;
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
        clearInterval(timer); // 기존 타이머를 정지
        setInterval(setTime, 1000);
    };
    startTimer();
    window.addEventListener("keydown", handleKeyDown);
}


appStart();



