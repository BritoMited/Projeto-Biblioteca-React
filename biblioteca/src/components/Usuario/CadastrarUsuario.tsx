import React, { useState } from 'react';
import { Usuario } from '../../models/Usuario';
import { useNavigate } from 'react-router-dom';

function CadastrarUsuario() {
    
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");

    function cadastrarUsuario(e: any) {
        const usuario: Usuario = {
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            endereco: endereco
        };

        // FETCH ou AXIOS
        fetch("http://localhost:5290/Biblioteca/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        })
        .then((resposta) => resposta.json())
        .then((usuario: Usuario) => {
            navigate("/pages/usuario/listar");
          });

        e.preventDefault();
    }

    return (
        <div>
            <center>
            <h1>Cadastrar Usuário</h1>
            <form onSubmit={cadastrarUsuario}>
                <label>Nome:</label>
                <input
                    type="text"
                    placeholder="Digite o nome"
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <br />
                <label>CPF:</label>
                <input
                    type="text"
                    placeholder="Digite o CPF"
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
                <br />
                <label>Telefone:</label>
                <input
                    type="text"
                    placeholder="Digite o telefone"
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />
                <br />
                <label>Endereço:</label>
                <input
                    type="text"
                    placeholder="Digite o endereço"
                    onChange={(e) => setEndereco(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Cadastrar</button>
            </form>
            </center>
        </div>
    );
}

export default CadastrarUsuario;
