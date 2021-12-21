const mostrarAnimacoes = (tempo) => {
    setInterval(()=> {
        animateCSS('#apostar', 'pulse') //botao
        animateCSS('.fa-heartbeat', 'swing') //icone dos erros
        animateCSS('.fa-exclamation-circle', 'bounce') //icone das chances
        animateCSS('.fa-concierge-bell', 'wobble') //icone das tentativas
    },tempo)
}

var erros = []
const Num_Aleatorio = parseInt(Math.random()*40+1)
const CHANCES = 5

const apostarNumero = () => {
    let n = parseInt(numero.value)
        if(!verificaNumeroInvalido(n)){return} 
            if(!verificaNumeroSorteado(n)){return}
                 if(n !== Num_Aleatorio){
                     if(!verificarNumeroErroRepetido(n)){return} 
        erros.push(n)

        let numErros = erros.length
        let numChances = CHANCES - numErros
        saidaErro.innerHTML = `<h4 class="alert alert-danger"> <i class="fas fa-angry"></i> ${numErros}  (${erros.join(", ")})</h4>`
        saidaChance.innerHTML = `<h4 class="alert alert-primary"> <i class="fas fa-grimace"></i> ${numChances}</h4>`
        verificarFimDoJogoDica(numChances)
    }
    limparCampo()
}

const limparCampo = () => {
    numero.value = ''
    numero.focus()
}

const mostrarOcultarItens = () => {  
    jogar.classList.remove('d-none')
    apostar.classList.add('d-none')
    boxNumero.classList.add('d-none')
    boxErro.classList.add('d-none')
    boxChance.classList.add('d-none')
}

const verificarFimDoJogoDica = (numChances) => {
    if(numChances === 0){
        
        alert("Suas chances acabaram! - GAME OVER")
        mostrarOcultarItens()

        saidaDica.innerHTML = `<h4 class="alert alert-danger"><i class="fas fa-sad-cry"></i> GAME OVER! O andar sorteado era : ${Num_Aleatorio}</h4>`
        limparCampo()
        return false
    }else{
        let dica = numero.value < Num_Aleatorio ? "maior" : "menor"
        saidaDica.innerHTML = `<h4 class="alert alert-success"><i class="fas fa-grin-beam-sweat"></i> Tente um andar ${dica} que ${numero.value}</h4>`
    }
}

const verificarNumeroErroRepetido = (n) => {
    if(erros.indexOf(n) !== -1){
        alert(`Você já apostou o número ${n} -  Tente outro!!!`)
        limparCampo()
        return false
    }
    return true
}

const verificaNumeroInvalido = (n) => {
    if(n <= 0 || n > 60 || isNaN(n)){
    
        Swal.fire({
            title: 'Erro!',
            text: 'Informe um número válido!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        limparCampo() 
        return false
    }
    return true
}

const verificaNumeroSorteado = (n) => {
    if(n === Num_Aleatorio){

        mostrarOcultarItens()
        saidaDica.innerHTML = `<h4 class="alert alert-success"><i class="fas fa-grin-stars"></i> Parabéns! O andar sorteado é: ${Num_Aleatorio}</h4>`

        alert("Parabéns! Você acertou!")
        limparCampo()
        return false
    }
    return true
}

mostrarAnimacoes(9500)
jogar.addEventListener('click', () => window.location.reload()) 
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault() 
    apostarNumero() 
})