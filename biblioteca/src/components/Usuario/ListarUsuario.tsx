import React, { useEffect, useState } from "react";
import { Usuario } from "../../models/Usuario";
import { Link } from "react-router-dom";

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    fetch("http://localhost:5290/Biblioteca/usuarios/listar")
      .then((resposta) => resposta.json())
      .then((usuarios: Usuario[]) => {
        console.table(usuarios);
        setUsuarios(usuarios);
      });
  }

  function deletarUsuario(id?: string) {
    fetch(`http://localhost:5290/Biblioteca/usuarios/deletar/${id}`, {
      method: "DELETE",
    })
      .then((resposta) => {
        if (resposta.ok) {
          setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        } else {
          console.error("Erro ao deletar usuário");
        }
      });
  }

  return (
    <div>
      <h1>Listagem de Usuários</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Usuário ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.cpf}</td>
              <td>{usuario.telefone}</td>
              <td>{usuario.endereco}</td>
              <td>
                <button
                  onClick={() => {
                    deletarUsuario(usuario.id);
                  }}
                >
                  Deletar
                </button>
                <Link to={`/pages/usuario/alterar/${usuario.id}`}>
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarUsuario;
