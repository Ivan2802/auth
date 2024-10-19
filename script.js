
// Registration ----------------------

const url = 'https://95afdd0ceb9eb27c.mokky.dev/db_users'
let stat = document.querySelector('.status')
let btnOut = document.querySelector('.out')

let note1 = document.querySelector('.note1')
let buttonIn = document.querySelector('.in')
let n1 = document.querySelector('.n1')
let p1 = document.querySelector('.p1')

function addUser(){
    return fetch(url,
        {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
}

buttonIn.addEventListener('click', () => {
    userData = {
        name: seq(n1.value),
        password: seq(p1.value)
    }
    if (userData.name != '' && userData.password != ''){
        addUser()
        clearFields([n1, p1])
        writeNot2(true)
    }
    else{
        writeNot2(false)
    }
})

// Authorization --------------


window.onload = function() {
    if (localStorage.name && localStorage.password){
        setAuth()
    }
    else{
        setUnAuth()
    }
}


let note2 = document.querySelector('.note2')
let buttonUp = document.querySelector('.up')
let n2 = document.querySelector('.n2')
let p2 = document.querySelector('.p2')

let isAuth = false

function checkUser(){
    return fetch(url)
}

function seq(data){
    seqData = window.btoa(data)

    seqData = seqData.replace('=', '')
    seqData = seqData.replace('=', '')

    nseqData = ''
    for(let i = String(seqData).length-1; i >= 0; i--){
        nseqData += seqData[i]
    }


    for(let i = 1; i < 10; i++){
        nseqData = window.btoa(nseqData)
    }

    nseqData = nseqData.replace('=', '')
    nseqData = nseqData.replace('=', '')

    return nseqData
}


function saveUser(){
    localStorage.setItem('name', seq(userData.name))
    localStorage.setItem('password', seq(userData.password))
}

buttonUp.addEventListener('click', () => {
    userData = {
        name: n2.value,
        password: p2.value
    }
    checkUser()
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            isAuth = false
            data.forEach(el => {
                if (seq(userData.name) == el.name && seq(userData.password) == el.password){
                    isAuth = true
                    saveUser()
                    writeNot1()
                    setAuth()
                }else{
                    writeNot1()
                }
            })
        })
    clearFields([n2, p2])
})


// Out -------------------

btnOut.addEventListener('click', () => {
    localStorage.clear()
    setUnAuth()
})


// trash funcs

function clearFields(fields = []){
    fields.forEach(el => {
      el.value = ''  
    })
}
function writeNot1(){
    if (isAuth){
        note2.innerHTML = 'Successful!'
    }
    else{
        note2.innerHTML = 'This user doesnt exist!'
    }
}
function writeNot2(isIt){
    if (isIt){
        note1.innerHTML = 'Successful!'
    }
    else{
        note1.innerHTML = 'Something going wrong!'
    }
}
function setAuth(){
    stat.innerHTML = 'Auth!'
}
function setUnAuth(){
    stat.innerHTML = 'Not auth!'
}



