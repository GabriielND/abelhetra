import React from "react";
import { addLetra } from "./script";



export default function Colmeia() {
  return <div class="letras">
    <a id="escrito">A</a>
    <div class="cima">
      <button id="letra1" class="letra" onClick={addLetra("A")}>A</button>
      <button id="letra2" class="letra"></button>
    </div>
    <div class="meio">
        <button id="letra3" class="letra"></button>
        <button id="letra_repete" class="letra"></button>
        <button id="letra4" class="letra"></button>
    </div>
    <div class="baixo">
        <button id="letra5" class="letra"></button>
        <button id="letra6" class="letra"></button>
    </div>
  </div>
}