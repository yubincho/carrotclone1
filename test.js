
// let hour = 8;  // 근무시간 
// let 초과근무시간 = 4; //초과근무시간
// const 알바수당 = 9400 * `${hour}`;

// let 추가근무수당 = 9400 * 초과근무시간 * 1.5;

// let 총근무수당 = 알바수당 + 추가근무수당;


// console.log(총근무수당)


// ---------------------

class GROSS_WAGE {

    constructor(평근무시간, 초과근무시간) {
        this.평근무시간 = 평근무시간;
        this.초과근무시간 = 초과근무시간;
    }

    알바수당(평근무시간) {
        return 9400 * 평근무시간
    }

    추가근무수당(초과근무시간) {
        return 9400 * 초과근무시간 * 1.5;
    }

    총근무수당(알바수당, 추가근무수당) {
        return 알바수당 + 추가근무수당;
    }


}

const 알바 = new GROSS_WAGE();


const aaa = 알바.알바수당(8)
const bbb = 알바.추가근무수당(4)

// console.log("[#]", 알바.총근무수당(aaa, bbb))


// -----------------------------

// const average = ((184 + 165 + 160) / 3).toFixed(2)

// console.log(average)


const obj = {'민수': 184, '철수': 165, '영희': 160}

// sum = 0;
// Object.values(obj).forEach(value => {
//     sum += value;
//     // console.log(sum);
// });

const sum = Object.values(obj).reduce((acc, value) => acc + value, 0);

const average = (sum / 3).toFixed(2)
console.log(average)

let min = []
Object.entries(obj).forEach(([key, value]) => {
    
    if (value < average) {
        // console.log(key, value);
        // console.log(key, (average - value).toFixed(2))
        const value2 = (average - value).toFixed(2);
        min.push({ key, value2 });
    }
});

console.log(min)

const maxDiff = Math.max(...min.map(item => item.value2));
console.log(maxDiff);


// ----------------------------------------------


console.log(10 / 3);
console.log(parseInt(10 / 3));

console.log(10 % 3);

// ------------------------------------------------

const elevatorMaxWeight = 500;
const deliveryPersonWeight = 80;
const boxWeight = 30;

const maxBoxes = Math.floor((elevatorMaxWeight - deliveryPersonWeight) / boxWeight);

console.log(maxBoxes);

// ---------------------------------------------

let 총금액 = 8700;

let 오천원 = parseInt(총금액 / 5000);
let 천원 = parseInt(총금액 % 5000 / 1000);
let 오백원 = parseInt(총금액 % 1000 / 500);
let 백원 = parseInt(총금액 % 500 / 100);
console.log(오천원);
console.log(천원);
console.log(오백원);
console.log(백원);

// ---------------------------------------------

const 철수한바퀴 = parseInt(56 / 4)
const 민수한바퀴 = parseInt(84 / 7)

const 차이OF세바퀴 = ( 철수한바퀴 - 민수한바퀴 ) * 3

console.log("[차이OF세바퀴]", 차이OF세바퀴)

// ----------------------------------------------

const totalDistance = 37876; // 철수가 2시간 동안 간 거리 (m)
const totalTime = 2 * 3600; // 2시간을 초 단위로 변환 (초)

const speed = totalDistance / totalTime; // 철수의 속도 (m/s)

const timeInSeconds = 30; // 철수가 자전거를 타고 30초 동안 간 시간 (초)
const distanceIn30Seconds = speed * timeInSeconds; // 30초 동안 간 거리 (m)

console.log("[distanceIn30Seconds]", distanceIn30Seconds.toFixed(2))

// ----------------------------------------------


console.log(1 < 3);
console.log(42 > 30);
console.log(5 !== 3);
console.log(31 == 31);
console.log(11 <= 32);
console.log(12 >= 5);

// ------------------------------------------------

let a = 3000;
const b = a.toString()

console.log("[b]", b[0] == '3')


// ------------------------------------------------

let abc = 3340; 
const bcd = abc.toString().split('')
console.log("[bcd]", bcd)

// ------------------------------------------------

// 철수의 달리기와 윗몸일으키기 성능
const runningTimeFor2Laps = 261; // 2바퀴 도는 데 걸린 시간 (초)
const situpsIn3Minutes = 118; // 3분 동안 한 윗몸일으키기 개수

// 테스트 조건
const runningTimeLimit = 11 * 60 + 50; // 11분 50초를 초로 변환
const situpsTimeLimit = 55; // 윗몸일으키기 테스트 시간 (초)
const situpsRequired = 35; // 통과 기준 윗몸일으키기 개수

// 철수의 달리기 테스트 계산
const timePerLap = runningTimeFor2Laps / 2; // 한 바퀴 도는 데 걸리는 시간
const totalTimeFor5AndHalfLaps = timePerLap * 5.5; // 5바퀴 반 도는 데 걸리는 시간

// 철수의 윗몸일으키기 테스트 계산
const situpsPerSecond = situpsIn3Minutes / (3 * 60); // 초당 윗몸일으키기 개수
const situpsIn55Seconds = situpsPerSecond * situpsTimeLimit; // 55초 동안 하는 윗몸일으키기 개수

// 테스트 결과
const runningTestPassed = totalTimeFor5AndHalfLaps <= runningTimeLimit;
const situpTestPassed = situpsIn55Seconds >= situpsRequired;


// 디버깅용 출력
console.log("달리기 테스트 통과:", runningTestPassed);
console.log("윗몸일으키기 테스트 통과:", situpTestPassed);

if (runningTestPassed || situpTestPassed) {
    console.log("true")
} else {
    console.log("false")
}


// ----------------------------------------

// 100 ~ 200 사이의 랜덤 

const randomNumber = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
// Math.random() * (개수)) + 시작값
// 수열 : n + 100
console.log("[randomNumber]", randomNumber)

const toString = randomNumber.toString().split('').join(' ')
console.log("[toString]", toString)  


// -------------------------------------------

const com = Math.floor(Math.random() * 3);
const me = Math.floor(Math.random() * 3);

console.log("[computerNumber]", com);
console.log("[myNumber]", me);


if (me > com) {
    console.log("승리")
} else if (me < com) {
    console.log("패배")
} else {
    console.log("비김")
}



// ------------------------

const choices = ["가위", "바위", "보"];

console.log("[computerChoice]", choices[com]);
console.log("[myChoice]", choices[me]);


if (com === me) {
    console.log("비김");
} else if ((me === 0 && com === 2) || (me === 1 && com === 0) || (me === 2 && com === 1)) {
    console.log("승리");
} else {
    console.log("패배");
}

// ----------------------------------

const random = Math.floor(Math.random() * (900 - 100 + 1)) + 100;
console.log("[random]", random);

const numToString = random.toString().split('').join(' ')

let count = 0
numToString.split(' ').forEach(element => {
    const num = parseInt(element, 10); 
    console.log("[num]", num)
    if (num % 2 === 0) {
        count++;
    }
    console.log("count", count);
})

if (count === 3) {
    console.log("1등");
} else if (count === 2 && ((numToString[0] % 2 === 0 && numToString[1] % 2 === 0) || (numToString[1] % 2 === 0 && numToString[2] % 2 === 0))) {
    console.log("2등");
} else {
    console.log("꽝")
}

// -----------------------------------------------

