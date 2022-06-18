
function calc() {
    const principal = document.getElementById("principal").value
    const amount = document.getElementById("amount").value
    const numYears = document.getElementById("num-years").value

    const totalInterest = amount - principal
    if(totalInterest < 0) {
        alert("Amount must be more than Principal")
        return
    }
    document.getElementById("totinterest").value = totalInterest%1 > 0 ? totalInterest.toFixed(3) : totalInterest
    const sir = parseFloat(((totalInterest*100)/(principal*numYears)).toFixed(2))
    document.getElementById("sir").value = Number.isInteger(sir) ? Math.round(sir) : sir.toFixed(3)
    const cir =  parseFloat(((((amount/principal)**(1/numYears)) - 1)*100).toFixed(2))
    // console.log(cir)
    document.getElementById("cir").value = Number.isInteger(cir) ? Math.round(cir) : cir.toFixed(3)
}