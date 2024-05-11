

const 더하기 = (a, b) => {
    console.log(a + b)
}

const 계산기 = {
    더하기 : function(a, b) {
        return a + b;
    },
    빼기 : function(a, b) {
        console.log(a - b)
    },
    곱하기 : function(a, b) {
        console.log(a * b)
    }
}

console.log(계산기.더하기(50, 200))  // 250


// const 할인된_가격 = (기기이름, 가격) => {
//     if (기기이름 === "맥북") {
//         return 가격 * 0.8;
//     } else {
//         return 가격 * 0.9;
//     }
// }

const 할인된_가격 = (가격) => {
    if (가격 > 1000) return 가격 - 1000;
    else return 가격;
}

console.log(할인된_가격( 1000))


// const timeElement = document.getElementById("time");
// timeElement.style.color = "tomato";
// timeElement.innerText = "01:00"


const timeEl = document.querySelector("#timer");

function 클릭시_실행될_함수() {
    timeEl.style.color = "orange";
    timeEl.innerText = "12:00"
}

timeEl.addEventListener('click', 클릭시_실행될_함수)


function setTime() {
    const time = new Date()
    const 분 = time.getMinutes().toString()
    const 초 = time.getSeconds().toString()
    const timeH1 = document.querySelector("#timer")
    timeH1.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`
}

setInterval(setTime, 1000)






