console.log("test!")



const handleSubmitForm = async (event) => {
    // event.preventDefault()
    const form = document.getElementById("write-form");
    const body = new FormData(form)
    body.append('insertAt', new Date().getTime())

    try {
        const response = await fetch("/items", {
            method: "POST",
            body,
        })
        console.log("제출 완료 !")
        const result = await response.json()
        console.log(result)

        if (result === '200') window.location.pathname = "/"
        
    } catch(error) {
        console.error(error.message)
    }
    
}


const form = document.getElementById("write-form")
form.addEventListener("click", handleSubmitForm)












