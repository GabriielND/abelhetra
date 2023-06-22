import React, { useEffect, useState } from "react";
import { shuffle, pontua, definePontos } from './script.js'

export default function Abelhetra() {
  const [ponto, setPonto] = useState(0);
  const [faseFixa, setFaseFixa] = useState(0);
  const [classe, setClasse] = useState("Iniciante");
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("Aviso");
  const [letra1, setLetra1] = useState("");
  const [letra2, setLetra2] = useState("");
  const [letra3, setLetra3] = useState("");
  const [letra4, setLetra4] = useState("");
  const [letra5, setLetra5] = useState("");
  const [letra6, setLetra6] = useState("");
  const [letraRepete, setLetraRepete] = useState("");
  const [letras, setLetras] = useState("");
  const [respostas, setRespostas] = useState([]);
  const [acertos, setAcertos] = useState([]);
  const [pontuacao, setPontuacao] = useState([]);
  const [mostraRegra, setMostraRegra] = useState(true);
  const [mostraPontos, setMostraPontos] = useState(true);
  const [mostraFases, setMostraFases] = useState(true);
  const [selectedFase, setSelectedFase] = useState('Fase 1');

  const [estiloRegra, setEstiloRegra] = useState({
    visibility : "hidden",
    opacity : 0,
  });
  
  const [estiloPontos, setEstiloPontos] = useState({
    visibility : "hidden",
    opacity : 0,
  });
  
  const [estiloAviso, setEstiloAviso] = useState({
    visibility : "visible",
    opacity : 0,
  });

  const [estiloFases, setEstiloFases] = useState({
    visibility : "visible",
    opacity : 0,
  });


  function embaralha(listaLetras){
    listaLetras = listaLetras.split("")
    let letraAtual = listaLetras[0]
    setLetraRepete(letraAtual.toUpperCase())
    listaLetras.splice(0, 1)

    let letraVazia = listaLetras.indexOf("\r")
    if (letraVazia !== -1){listaLetras.splice(letraVazia, 1)}

    listaLetras = shuffle(listaLetras)
    setLetra1(listaLetras[0].toUpperCase())
    setLetra2(listaLetras[1].toUpperCase())
    setLetra3(listaLetras[2].toUpperCase())
    setLetra4(listaLetras[3].toUpperCase())
    setLetra5(listaLetras[4].toUpperCase())
    setLetra6(listaLetras[5].toUpperCase())

  }
  const maxFases = 12
  let fase = Math.floor(Math.random() * maxFases) + 1
  // fase = 1

  const numFases = Array.from({length: maxFases}, (_, i) => i + 1)

  let fetchData = async() => {
    let endereco = "./fase" + fase + ".txt"
    let resp = await fetch(endereco)
    let final = await resp.text()
    let lista = final.split("\n")
    embaralha(lista[0])
    lista.pop()
    setLetras(lista[0])
    setPontuacao(definePontos(lista, lista[0]))
    lista.shift()
    setRespostas(oldRespostas => [...oldRespostas, ...lista])
    setFaseFixa(fase)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (ponto >= parseInt(pontuacao[7])){
        setClasse("Genial")
    } else if (ponto >= parseInt(pontuacao[6])){
      setClasse("Especialista")
    } else if (ponto >= parseInt(pontuacao[5])){
      setClasse("Dicionário")
    } else if (ponto >= parseInt(pontuacao[4])){
      setClasse("Experiente")
    } else if (ponto >= parseInt(pontuacao[3])){
      setClasse("Intermediário")
    } else if (ponto >= parseInt(pontuacao[2])){
      setClasse("Perspicaz")
    } else if (ponto >= parseInt(pontuacao[1])){
      setClasse("Esperto")
    } else if (ponto >= parseInt(pontuacao[0])){
      setClasse("Aprendiz")
    }
  }, [ponto])

  useEffect(() => {
    if(aviso !== "Aviso"){
      avisar()
    }
  }, [aviso])

  function addLetra(letra){
    sumirAviso()
    setTexto(texto + letra)
  }

  const handler = (event) => {
    if (letras.includes(event.key)){
      addLetra(event.key.toUpperCase())
    } else if (event.key === "Backspace"){
      apaga()
    } else if (event.key === "Enter"){
      enviar()
    }
  }

  function apaga(){
    sumirAviso()
    setTexto(texto.slice(0,-1))
  }

  function enviar(){
    sumirAviso()
    if (respostas.includes(texto.toLowerCase() + "\r") || respostas.includes(texto.toLowerCase())){
      let novoPonto = pontua(texto.toLowerCase(), letras, true)
      if (!JSON.stringify(acertos).includes(JSON.stringify([texto, novoPonto]))){
        setAcertos(oldAcertos => [[texto, novoPonto], ...oldAcertos])
        setPonto(ponto + novoPonto)
        setTexto("")
      } else if (JSON.stringify(acertos).includes(JSON.stringify([texto, novoPonto]))){
        setAviso("Palavra já encontrada")
      }
    } else if (texto.length < 4){
      setAviso("Use mais que 3 letras")
    } else if (!texto.includes(letraRepete)){
      setAviso("Use a letra do meio")
    }
    else {
      setAviso("Palavra não está na lista")
    }
  }

  function regras(){
    setMostraRegra(!mostraRegra)
    if (mostraRegra){
      setEstiloRegra({
        visibility : "visible",
        opacity : 1,
      })
    } else {
      setEstiloRegra({
        visibility : "hidden",
        opacity : 0,
      })
    }
  }

  function pontos(){
    setMostraPontos(!mostraPontos)
    if (mostraPontos){
      setEstiloPontos({
        visibility : "visible",
        opacity : 1,
      })
    } else {
      setEstiloPontos({
        visibility : "hidden",
        opacity : 0,
      })
    }
  }

  function fases(){
    setMostraFases(!mostraFases)
    if (mostraFases){
      setEstiloFases({
        visibility : "visible",
        opacity : 1,
      })
    } else {
      setEstiloFases({
        visibility : "hidden",
        opacity : 0,
      })
    }
  }

  function mudarFase(){
    fases()
    setAcertos([])
    setPonto(0)
    setTexto()
    fase = selectedFase.split(" ")[1]
    fetchData()
  }

  function avisar(){
    setEstiloAviso({
      visibility : "visible",
      opacity : 1,
    })
  }

  function sumirAviso(){
    setAviso("Aviso")
    setEstiloAviso({
      visibility : "hidden",
      opacity : 0,
    })
  }

  return (
    <div class="letras">
      <a id="fase" onClick={fases}>Fase #{faseFixa}</a>
      <a id="pontos" onClick={pontos}>{ponto} - {classe}</a>
      <a id="escrito">{texto}</a>
      <input type="text" id="escrito_input" value={texto} onKeyDown={(e) => handler(e)}/>
    <div class="cima">
      <button id="letra1" class="letra" onClick={() => addLetra(letra1)}>{letra1}</button>
      <button id="letra2" class="letra" onClick={() => addLetra(letra2)}>{letra2}</button>
    </div>
    <div class="meio">
        <button id="letra3" class="letra" onClick={() => addLetra(letra3)}>{letra3}</button>
        <button id="letra_repete" class="letra" onClick={() => addLetra(letraRepete)}>{letraRepete}</button>
        <button id="letra4" class="letra" onClick={() => addLetra(letra4)}>{letra4}</button>
    </div>
    <div class="baixo">
        <button id="letra5" class="letra" onClick={() => addLetra(letra5)}>{letra5}</button>
        <button id="letra6" class="letra" onClick={() => addLetra(letra6)}>{letra6}</button>
    </div>
    <div class="botoes">
      <button id="embaralhar" class="botao pequeno" onClick={() => embaralha(letras)}>⟳</button>
      <button id="enviar" class="botao" onClick={enviar}>Enviar</button>
      <button id="apagar" class="botao pequeno" onClick={apaga}>➜</button>
    </div>
    <div class="botoes">
      <button id="regras" class="botao" onClick={regras}>Regras</button>
    </div>

    <div class="container" style={estiloRegra}>
      <div class="ficha regras">
      <h2>Regras</h2>
      <ul>
        <li>Todas as palavras precisam ter a letra do meio</li>
        <li>Palavras precisam ter 4 letras ou mais</li>
        <li>Letras podem ser repetidas</li>
        <li>Palavras com hífen, substantivos próprios e palavras muito obscuras não estão na lista</li>
        <li>Palavras com 4 letras valem 1 ponto, palavras com mais de 4 letras valem 1 ponto por letra</li>
        <li>Palavras que usam todas as letras tem um adicional de 7 pontos</li>
      </ul>
      <button id="fechar_regras" class="botao interno" onClick={regras}>Fechar</button>
      </div>
    </div>

    <div class="container" style={estiloPontos}>
      <div class="ficha pontos">
      <h2>Pontos</h2>
      <a>Iniciante: 0</a>
      <a>Aprendiz: {pontuacao[0]}</a>
      <a>Esperto: {pontuacao[1]}</a>
      <a>Perspicaz: {pontuacao[2]}</a>
      <a>Intermediário: {pontuacao[3]}</a>
      <a>Experiente: {pontuacao[4]}</a>
      <a>Dicionário: {pontuacao[5]}</a>
      <a>Especialista: {pontuacao[6]}</a>
      <a>Genial: {pontuacao[7]}</a>
      
      <button id="fechar_pontos" class="botao interno" onClick={pontos}>Fechar</button>
      </div>
    </div>

    <div class="container" style={estiloFases}>
      <div class="ficha fases">
        <h2>Escolha uma fase:</h2> 
        <label>
            <select
              value={selectedFase}
              onChange={e => setSelectedFase(e.target.value)}>
              {numFases.map(item => {
                return (<option>Fase {item}</option>)
              })}
            </select>
        </label>
        <div class="botoes">
          <button class="botao interno" onClick={fases}>Cancelar</button>
          <button class="botao interno" onClick={mudarFase}>Selecionar</button>
        </div>
      </div>
    </div>

    <div class="container" style={estiloAviso}>
      <div class="ficha avisos">
        <a>{aviso}</a>
      </div>
    </div>
    <div style={{height: "250px"}}>
      <div class="acertos">
        <ul>
          <li style={{fontSize: "20px"}}>Acertos:</li>
            {acertos.map(item => {
              return (
                <li>{ item[0] } - { item[1] } </li>
                );
              })}
        </ul>
      </div>
    </div>
  </div>
  )
}
