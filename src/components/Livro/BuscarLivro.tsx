import React, { useState } from "react";
import { Livro } from "../../models/Livro";

function BuscarLivro() {
  const [id, setId] = useState(""); 
  const [livroEncontrado, setLivroEncontrado] = useState<Livro | null>(null);
  const [erro, setErro] = useState<string | null>(null); 

  const buscarLivro = () => {
    fetch(`http://localhost:5290/Biblioteca/livro/buscar/${id}`)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Livro não encontrado");
        }
        return resposta.json();
      })
      .then((data: Livro) => {
        setLivroEncontrado(data); 
        setErro(null); 
      })
      .catch((erro) => {
        console.error("Erro ao buscar livro:", erro);
        setLivroEncontrado(null); 
        setErro("Livro não encontrado"); 
      });
  };

  return (
    <div>
      <h1>Buscar Livro por ID</h1>
      <label>ID do Livro:</label>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Digite o ID do livro"
      />
      <button onClick={buscarLivro}>Buscar</button>

      {erro && <p>{erro}</p>}

      {livroEncontrado && (
        <div>
          <h2>Detalhes do Livro Encontrado</h2>
          <p>Título: {livroEncontrado.titulo}</p>
          <p>Autor: {livroEncontrado.autor}</p>
          <p>Editora: {livroEncontrado.editora}</p>
          <p>Categoria: {livroEncontrado.categoria}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarLivro;
