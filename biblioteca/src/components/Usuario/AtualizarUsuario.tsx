import { useEffect, useState } from "react";
import { Usuario } from "../../models/Usuario";
import { useNavigate, useParams } from "react-router-dom";

function AtualizarUsuario() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5290/Biblioteca/usuarios/buscar/${id}`)
        .then((resposta) => resposta.json())
        .then((usuario: Usuario) => {
          setNome(usuario.nome);
          setCpf(usuario.cpf);
          setTelefone(usuario.telefone);
          setEndereco(usuario.endereco);
        });
    }
  }, [id]);

  function alterarUsuario(e: any) {
    e.preventDefault();
    
    const usuario: Usuario = {
      id: id as string,
      nome: nome,
      cpf: cpf,
      telefone: telefone,
      endereco: endereco,
    };

    fetch(`http://localhost:5290/Biblioteca/usuarios/atualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((resposta) => resposta.json())
      .then((usuario: Usuario) => {
        navigate("/pages/usuario/listar");
      });
  }

  return (
    <div>
      <h1>Alterar Usuário</h1>
      <form onSubmit={alterarUsuario}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          placeholder="Digite o nome"
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <br />
        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          placeholder="Digite o CPF"
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <br />
        <label>Telefone:</label>
        <input
          type="text"
          value={telefone}
          placeholder="Digite o telefone"
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <br />
        <label>Endereço:</label>
        <input
          type="text"
          value={endereco}
          placeholder="Digite o endereço"
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default AtualizarUsuario;
