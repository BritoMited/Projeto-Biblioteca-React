namespace Biblioteca.models;
//Classe para pegar o id do livro que vai ser emprestado

public class EmpModel{

    public EmpModel(){
        
    }
    public EmpModel(int idLivro, int idUsuario){

        IdUsuario = idUsuario;
    }

  
     public int? IdUsuario { get; set; }


}