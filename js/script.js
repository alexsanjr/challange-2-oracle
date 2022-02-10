function init() {
  const paginas = document.querySelectorAll('.pagina')
  const btnPlay = document.querySelector('.btn-play')
  const btnAdd = document.querySelector('.btn-add')
  const btnSalvar = document.querySelector('.btn-salvar')
  const btnCancelar = document.querySelector('.btn-cancelar')
  const btnNovoJogo = document.querySelector('.btn-novo-jogo')
  const btnDesistir = document.querySelector('.btn-desistir')
  
  const listaDePalavras = ['banana', 'amor', 'respeito', 'html', 
  'github', 'abacate', 'doce', 'peixe', 'rato', 'gato', 'impacto', 'chiclete']
  
  
  btnPlay.addEventListener('click', () => {
    paginas[0].classList.add('hidden')
    paginas[2].classList.remove('hidden')
    sortear(0, listaDePalavras.length)
  })
  
  btnAdd.addEventListener('click', () => {
    paginas[0].classList.add('hidden')
    paginas[1].classList.remove('hidden')
  })
  
  btnCancelar.addEventListener('click', () => {
    paginas[1].classList.add('hidden')
    paginas[0].classList.remove('hidden')
  })
  
  btnNovoJogo.addEventListener('click', () => document.location.reload())
  
  btnDesistir.addEventListener('click', () => {
    contador = 7
    posiErradas = []
    desenharDerrota()
  })
  
  btnSalvar.addEventListener('click', () => {
    const texto = document.querySelector('.adicionar-texto').value.replace(/[^a-zA-Z]/g, "")
    if(texto === '') {return alert('digite alguma coisa e somente letras')}
      paginas[1].classList.add('hidden')
      paginas[2].classList.remove('hidden')
      listaDePalavras.push(texto)
      sortear(0, listaDePalavras.length)
  })
  
  
  // // Jogo
  let memoriaDeLetras = []
  let contador = 0
  let contadorDeLetras = 0
  
  function sortear(min, max) {
      const i = Math.trunc(Math.random() * (max - min) + min)
      const palavraSecreta = listaDePalavras[i]
      const xPosi = desenharTracos(palavraSecreta.length) 
      verificarTecla(palavraSecreta, xPosi) 
  }
  
  function verificarLetraCerta(letra, palavraSecreta, xPosi) {
    memoriaDeLetras.push(letra)
    let regex = new RegExp(letra, 'gi');
    if (regex.test(palavraSecreta) && contador < 7) {
      for(let i = 0; i < palavraSecreta.length; i++) {
        if(palavraSecreta[i] === letra) {
          desenharLetrasCertas(letra, i, xPosi)
          contadorDeLetras++
        }
      contadorDeLetras === palavraSecreta.length ? desenharVitoria(): 'null'
      } 
    } else {
        desenharLetrasErradas(letra, posiErradas[0])
        posiErradas.shift()
        desenhar()
        contador++
        contador === 7 ? desenharDerrota() : ''
    }
  }
  
  function verificarRepeticaoDeTecla(letra, palavraSecreta, xPosi) {
    memoriaDeLetras.includes(letra)? alert('Essa letra já foi digitada') : verificarLetraCerta(letra, palavraSecreta, xPosi)
  }
  
  function verificarTecla(palavraSecreta, xPosi) {
  document.addEventListener('keydown', (event) => {
    let letra = event.code 
    const regex = /Key/
    
    if(regex.test(letra)) {
      letra = event.key
      verificarRepeticaoDeTecla(letra, palavraSecreta, xPosi)
    } 
  })
  }
  
  // //  Canvas
  
  const canvas = document.querySelector('.jogo')
  const ctx = canvas.getContext('2d')
  const root = document.querySelector(':root')
  const corAzul = getComputedStyle(root).getPropertyValue('--blue-color')
  const corCinza = '#495057'
  canvas.width = '1200'
  canvas.height = '800'
  ctx.lineWidth = 4.5
  
  function desenhar() {
    switch(contador) {
      case 0:
        desenharForca()
        break
      case 1:
        desenharCabeca()
        break
      case 2:
        desenharTronco()
        break
      case 3:
        desenharBracoEsq()
        break
      case 4:
        desenharBracoDir()
        break
      case 5:
        desenharPernaEsq()
        break
      case 6:
        desenharPernaDir()
        break
      default:
        break
    }
  }
  
  function desenharForca() {
    ctx.fillStyle = corAzul
    ctx.fillRect(400, 88, 177.5, 4.5)
    ctx.fillRect(400, 88, 4.5, 360)
    ctx.fillRect(575.5, 88 , 4.5, 49.5)
    ctx.fillRect(330, 445, 294, 5)
  }
  
  function desenharCabeca() {
    ctx.strokeStyle = corAzul
    ctx.beginPath();
    ctx.arc(577.5, 170, 31.5, 0, Math.PI * 2)
    ctx.stroke();
  }
  
  function desenharTronco() {
    ctx.fillStyle = corAzul
    ctx.fillRect(575.5, 201, 4.5, 135)
  }
  
  function desenharBracoEsq() {
    ctx.strokeStyle = corAzul
    ctx.beginPath()
    ctx.moveTo(577.5,201);
    ctx.lineTo(547.5, 273);
    ctx.stroke();
  }
  
  function desenharBracoDir() {
    ctx.strokeStyle = corAzul
    ctx.beginPath()
    ctx.moveTo(577.5,201);
    ctx.lineTo(607.5,273);
    ctx.stroke();
  }
  
  
  function desenharPernaEsq() {
  
    ctx.strokeStyle = corAzul
    ctx.beginPath()
    ctx.moveTo(577.5,336);
    ctx.lineTo(547.5,408);
    ctx.stroke();
  }
  
  function desenharPernaDir() {
    ctx.strokeStyle = corAzul
    ctx.beginPath()
    ctx.moveTo(577.5,336);
    ctx.lineTo(607.5,408);
    ctx.stroke();
  }
  
  function desenharTracos(count) {
    ctx.fillStyle = corAzul
    let a = 245
    let b = 80
    ctx.fillRect(a, 658, b, 4);
  
    let arr = [a]
      
    let i = 1
    for(i; i <= count - 1; i++) {
      c = a + b
      ctx.fillRect(c + 16, 658, b, 4);
        
      a = c + 16
      arr.push(a)
    }
    return arr
  }
  
  function desenharLetrasCertas(letra,indice, xPos) {
    ctx.fillStyle = corAzul
    const l = letra.toUpperCase()
    ctx.font = '48px inter';
    ctx.fillText(`${l}`, xPos[indice] + ( 48 / 2), 658 - 32)
  }
  
  let posiErradas = [405]
  for(let i = 0; i < 6; i++) {
    a = posiErradas[i]
    b = a + 48
    posiErradas.push(b)
  }
  
  function desenharLetrasErradas(letra, xPos) {
    const l = letra.toUpperCase()
    ctx.fillStyle = corCinza
    ctx.font = '24px inter';
    ctx.fillText(`${l}`, xPos, 706)
  
  }
  
  function desenharDerrota() {
    ctx.fillStyle = 'red'
    ctx.font = '24px inter';
    ctx.fillText('VOCÊ PERDEU!', 650, 250)
  
  }
  
  function desenharVitoria() {
    contador = 7
    posiErradas = []
    ctx.fillStyle = 'green'
    ctx.font = '24px inter';
    ctx.fillText('VOCÊ VENCEU PARABÉNS!', 650, 250)
  
  }
}

init()