'use strict';
  
      
    const limparFormulario = () => {
                document.getElementById('endereco').value = '';
                document.getElementById('numero').value = '';
                document.getElementById('Bairro').value = '';
                document.getElementById('Cidade').value = '';
                document.getElementById('Estado').value = '';

        }


    const preencherFormulario = (endereco) =>{
                document.getElementById('endereco').value = endereco.logradouro;
                document.getElementById('numero').value = ''
                document.getElementById('Bairro').value = endereco.bairro;
                document.getElementById('Cidade').value = endereco.localidade;
                document.getElementById('Estado').value = endereco.uf;
        };
  
        

    const pesquisarCep =  async() => {
   
   
        try{
    const cep = document.getElementById('CEP').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const regexcep = /^[0-9]{8}$/; 
   
    if  (!regexcep.test(cep)){
        document.getElementById('CEP').value = 'Formato invalido!'
        console.error("CEP não encontrado!")
        limparFormulario();
        return;
}
      const dados =  await fetch(url);
      const endereco = await dados.json();   
    
     if (endereco.hasOwnProperty('erro')){
        document.getElementById('CEP').value = 'CEP não encontrado!'
        console.error("CEP não encontrado!")
        limparFormulario();
        return;
}
        preencherFormulario(endereco); 
        console.log(endereco);

}catch(error){
    console.error("Erro ao buscar cep : " ,error);
    limparFormulario();
 }
};
document.getElementById('CEP')
.addEventListener('focusout',pesquisarCep); 


const preencherCadastro = async(event) =>{
    event.preventDefault();
    try{
        
        
        const nome = document.getElementById('Nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('Senha').value;
        const cep = document.getElementById('CEP').value.replace(/\D/g, '');
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const bairro = document.getElementById('Bairro').value;
        const cidade = document.getElementById('Cidade').value;
        const estado = document.getElementById('Estado').value;

        const dadosFuncionarios ={
            nome: nome,
            email: email,
            senha: senha,
            cep: cep,
            endereco: endereco,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado
        };

        console.log("enviando dados para api: ", dadosFuncionarios)

        const apiresposta = await fetch('http://localhost:8080/api/rhtecfuncionarios', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosFuncionarios)
        });

        if (apiresposta.ok){
            const funcionarioCriado = await apiresposta.json();
            alert("Funcionario Cadastrado!");
            document.getElementById('formcadastroFuncionario').reset();
        } else{
            const erroTexto = await apiresposta.text();
            alert("Erro ao cadastrar funcionário :" + erroTexto);
        }

    } catch(error){
        alert("Erro na conexão com a API.");
        console.error("Erro:", error);
    }
}


document.getElementById('formcadastroFuncionario')
.addEventListener('submit',preencherCadastro);