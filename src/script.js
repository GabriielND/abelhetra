export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function pontua(palavra, letras, extra){
  if (palavra.length === 4){
    return 1
  }
  else if (extra && palavra.includes(letras[0]) &&
           palavra.includes(letras[1]) && 
           palavra.includes(letras[2]) &&
           palavra.includes(letras[3]) &&
           palavra.includes(letras[4]) &&
           palavra.includes(letras[5]) &&
           palavra.includes(letras[6])){
    return (palavra.length + 7)
  }
  else {
    return (palavra.length)
  }
}

export function definePontos(respostas, letras){
  let pontosTotais = 0
  let pontuacao = []
  for (let i = 0; i < respostas.length; i++){
    pontosTotais += pontua(respostas[i].slice(0,-1), letras, false)
  }
  let media = (pontosTotais / 1.8)/respostas.length
  pontuacao.push(Math.round(3 * media))
  pontuacao.push(Math.round(5 * media))
  pontuacao.push(Math.round(8 * media))
  pontuacao.push(Math.round(16 * media))
  pontuacao.push(Math.round(26 * media))
  pontuacao.push(Math.round(36 * media))
  pontuacao.push(Math.round(48 * media))
  pontuacao.push(Math.round(60 * media))
  return pontuacao

}
  