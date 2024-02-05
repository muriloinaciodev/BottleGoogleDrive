//Upload System
const labelFile   = document.getElementById('labelFile')
const fileInput   = document.getElementById('fileInput')
const submitInput = document.getElementById('submitInput')

// Ao arrastar algum arquivo em cima do label de upload
labelFile.addEventListener('dragover', (e) =>{
	e.preventDefault() // Desativa comportamento padrão
	// Estilos
	labelFile.textContent  = "Solte o Arquivo"
	labelFile.style.border = "2px dashed var(--default-color)"
})


// Ao arrastar algum arquivo para fora do label de upload
labelFile.addEventListener('dragleave', (e) =>{
	e.preventDefault() // Desativa comportamento padrão
	// Estilos
	labelFile.textContent  = "Enviar Arquivos"
	labelFile.style.border = "2px dashed transparent"
})

// Ao soltar um arquivo em cima do label de upload
labelFile.addEventListener('drop', (e) =>{
	e.preventDefault()                       // Desativa comportamento padrão
	fileInput.files = e.dataTransfer.files   // Passa dados do arquivo pro input file
	submitInput.click()                      // Aciona botão submit do form
})

// Ao clicar no botão de upload
fileInput.addEventListener('change', (e) =>{
	e.preventDefault()  // Desativa comportamento padrão
	submitInput.click() // Aciona botão submit do form
})


//Theme System
const btnTheme = document.getElementById('btnTheme')
btnTheme.addEventListener('click', () => {

	// Adiciona|Remove a classe darkmode
	document.body.classList.toggle('darkmode')

	// Se estiver no dark mode: mostra("light mode") senão: mostra("Dark Mode")
	if (document.body.classList.contains('darkmode')){
		btnTheme.textContent = 'Light Mode'
	} else {
		btnTheme.textContent = 'Dark Mode'
	}

	// Adiciona darkmode ao localstorage para lembrar se a opção esta ativada
	localStorage.setItem('darkmode', document.body.classList.contains('darkmode'))
})

// Verifica se o tema darkmode esta ativado e aciona
if (JSON.parse(localStorage.getItem('darkmode'))) {
	document.body.classList.toggle('darkmode')
	btnTheme.textContent = 'Light Mode'
}
