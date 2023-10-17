const localStorageKey = 'to-do-list'

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let inputTask = document.getElementById('input-new-task');
    let inputDate = document.getElementById('input-data');
    inputTask.style.border = '';
    inputDate.style.border = '';

    // validação dos dados inseridos
    if (!inputTask.value || !inputDate.value) {
        if (!inputTask.value) {
            inputTask.style.border = '1px solid red';
        }
        if (!inputDate.value) {
            inputDate.style.border = '1px solid red';
        }
        alert('Digite a demanda para inserir e/ou selecione uma data');
    } else if (validateIfExistsNewTask()) {
        alert('Já existe uma tarefa com essa descrição');
    } else {
        // incrementar no localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: inputTask.value,
            date: inputDate.value
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    inputTask.value = '';
    inputDate.value = '';
}


function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    let listData = document.getElementById('data')
    list.innerHTML = ''
    listData.innerHTML = ''
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']} <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
        fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li><li>${formatData(values[i]['date'])}</li>`
        //listData.innerHTML += `<li>${values[i]['date']}</li>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}


const data = document.getElementById('data');
const input = document.getElementById('input-data');

function formatData(input) {
    const opcoes = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(input))
}
showValues()
