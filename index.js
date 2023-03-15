const DATA_KEY = 'data'

window.addEventListener("load", () => {
    // console.log('page loaded')
    populateTableWithData()
})

function calc(event) {
    event.preventDefault()
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

    addRowToLocalStorage(principal, amount, numYears, totalInterest, sir, cir)
}

function addRowToLocalStorage(principal, amount, numYears, interest, sir, cir) {

    let storedData = JSON.parse(window.localStorage.getItem(DATA_KEY))
    
    if (storedData == null) {
        storedData = []
    }

    storedData.forEach(element => {
        console.log(element)
    });

    while (storedData.length > 9) {
        storedData.shift()
    }

    storedData.push({principal: principal, amount:amount, numYears:numYears, interest:interest, sir:sir, cir:cir})
    window.localStorage.setItem(DATA_KEY, JSON.stringify(storedData))

    populateTableWithData()
}

function populateTableWithData() {
    
    let storedData = JSON.parse(window.localStorage.getItem(DATA_KEY))

    const tableEl = document.getElementById("history-table")

    const rowsCount = tableEl.rows.length

    // console.log(rowsCount)
    
    for(let i=0; i<rowsCount; i++) {
        tableEl.deleteRow(0)
    }
    // console.log(storedData)
    if (storedData && storedData.length > 0) {
        const tHead = tableEl.createTHead().insertRow(-1)

        const headers = ["Principal", "Amount", "Years", "Interest", "SIR", "CIR"]

        headers.forEach((header) => {
            const headerCell = document.createElement("th")
            headerCell.innerHTML = header
            tHead.appendChild(headerCell)
        })

        const tBodiesLength = tableEl.tBodies.length
        const tbody = tBodiesLength > 0 ? tableEl.tBodies.item(tableEl.tBodies.length - 1) : tableEl.createTBody()

        storedData.forEach( item => {
            let row = tbody.insertRow(0)
            row.insertCell(0).innerHTML = item.principal
            row.insertCell(1).innerHTML = item.amount
            row.insertCell(2).innerHTML = item.numYears
            row.insertCell(3).innerHTML = item.interest
            row.insertCell(4).innerHTML = item.sir
            row.insertCell(5).innerHTML = item.cir
        })
        document.getElementById("history-div").style.visibility="visible"
    } else {
        document.getElementById("history-div").style.visibility="hidden"
    }
}

function clearHistory() {
    window.localStorage.removeItem(DATA_KEY)

    populateTableWithData()
}

document.getElementById("input-form").addEventListener("submit", calc)