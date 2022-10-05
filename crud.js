let form = document.getElementById('cadastro');

form.addEventListener('submit', function(){
    
    //definir array principal
    let storage = (localStorage.ALUNOS) ? JSON.parse(localStorage.ALUNOS) : [];

    let aluno = document.querySelector('.aluno').value;
    let notas = document.querySelector('.notas').value;
    let arrayNotas  = notas.split(',');
    let media = 0;
    for(let i = 0; i < arrayNotas.length; i++){
        media += parseFloat(arrayNotas[i]);
    }
    media = (media/arrayNotas.length).toPrecision(2);
    let situacao;
    if(media >= 7){
        situacao = "Aprovado";
    }else if(media < 5){
        situacao = "Reprovado";
    }else{
        situacao = "Recuperação";
    }
    //definir objeto do veiculo
    let cadastroNotas = {
        "aluno" : aluno,
        "notas" : notas,
        "media" : media,
        "situacao" : situacao
    }    

    //button submit
    let submitButton = document.querySelector('button').value;
    if(!submitButton){
        
        //adicionar o veiculo do storage
        storage.push(cadastroNotas);
        msgSuccess = 'Notas lançadas com Sucesso';

    }else{
        let idRegistro = document.querySelector('#idRegistro').value;
        storage[idRegistro] = cadastroNotas;
        msgSuccess = 'Notas Aualizadas com Sucesso'
    }
    //salvar no local storage
    localStorage.setItem('ALUNOS',JSON.stringify(storage));
        
    alert(msgSuccess);

    form.reset();
    listarDados();
    document.querySelector('button').value = '';
    
})

function listarDados(){
    if(localStorage.ALUNOS){
        let dados = JSON.parse(localStorage.ALUNOS);
        let estrutura = '';

        for(const i in dados){
            estrutura += `
                <tr>
                    <td>${dados[i].aluno}</td>
                    <td>${dados[i].notas}</td>
                    <td>${dados[i].media}</td>
                    <td>${dados[i].situacao}</td>
                    <td><a href="#" onclick="deleteItem(${i})">Excluir</a></td>
                    <td><a href="#" onclick="updateItem(${i})">Editar</a></td>
                </tr>
            `;
        }
        document.querySelector('table tbody').innerHTML = estrutura;
    }else{
        estrutura = `
            <tr>
                <td colspan="6" align="center">Insira as notas do Alunos Aqui</td>    
            </tr>
        `;
        document.querySelector('table tbody').innerHTML = estrutura;
    }
    
}

function deleteItem(id){
    let dados = (localStorage.ALUNOS) ? JSON.parse(localStorage.ALUNOS) : [];
    dados.splice(id,1);
    if(dados.length > 0){
       localStorage.setItem('ALUNOS', JSON.stringify(dados));
    }else{
        localStorage.setItem('ALUNOS','');    
    }
    
    listarDados();
}
function updateItem(id){
    let dados = (localStorage.ALUNOS) ? JSON.parse(localStorage.ALUNOS) : [];
    let dadosSelecionados = dados[id];

    document.querySelector('.aluno').value = dadosSelecionados.aluno;
    document.querySelector('.notas').value = dadosSelecionados.notas;
    
    //adicionar controle de edição no button
    document.querySelector('button').value = 'editar';
    document.querySelector('#idRegistro').value = id;
}



