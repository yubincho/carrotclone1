
console.log("gggggg")


const renderData = (data) => {

    data.forEach(element => {
        const main = document.querySelector("main")
        // console.log(element, element.id)
        const div = document.createElement("div")
        div.innerText = element.title
        main.appendChild(div)
        
    });
}

const fetchList = async () => {
    const res = await fetch("/items")
    const data = await res.json()
    console.log(data)
    renderData(data)
}

fetchList()