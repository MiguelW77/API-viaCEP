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