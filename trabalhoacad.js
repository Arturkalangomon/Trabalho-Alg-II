//importações...
const terminal = require('./../terminal/terminal.js');
const strings = require('./../strings/strings.js');
const colegio = require('./../colegio/colegio.js');
//const processamenus = require('./../arquivo/processamenus.js');


//arquivo (nome.extensão)... se não existe, vai dar erro...
const fs = require('fs'); //manipula arquivos... 
const localArquivo = './../arquivo/teste.denylson'; //especifica o local e o arquivo...

const bd = fs.readFileSync(localArquivo, 'utf-8'); //ler a partir do local (arquivo)
const dados = carregarDados(bd);
const alunos = dados.alunos;
const materias = dados.materias;

//
function carregarDados(string) { //ler dados... não utilizada...
    //string = Buffer.from(string, 'base64').toString()
    const linhas = strings.quebrarString(string, '\n');
    const primeiraLinha = strings.quebrarString(linhas[0], ';');

    const qtdAlunos = strings.converterStringParaInteiro(primeiraLinha[0]);
    const qtdMaterias = strings.converterStringParaInteiro(primeiraLinha[1]);

    let aluno;
    const alunos = [];

    for (let i = 1; i <= qtdAlunos; i++) {
        aluno = strings.quebrarString(linhas[i], ';');
        alunos.push(aluno);
    }


    let materia;
    const materias = [];

    for (let i = (qtdAlunos + 1); i <= (qtdMaterias + qtdAlunos); i++) {
        materia = strings.quebrarString(linhas[i], ';');
        materias.push(materia);//adiciona...
    }

    return {
        alunos,
        materias
    }; // JSON
}

function prepararDadosSalvar(alunos, materias) { //salva... não utilizada...
    let dados = `${alunos.length};${materias.length}\n`;
    
    for (let i = 0; i < alunos.length; i++) {
        dados = dados.concat(`${alunos[i]}\n`); //concatena string...
    }

    for (let i = 0; i < materias.length; i++) {
        dados = dados.concat(`${materias[i]}\n`); //concatena string...
    }
    dados = dados.split(',').join(';');
    //dados = Buffer.from(dados).toString('base64')
    return dados;
}

//modificação da função para uso...

function prepararDadosSalvarAluno(alunos) { //salva... em uso... salva aluno...
    let dados = `${alunos.length}\n`;
    
    for (let i = 0; i < alunos.length; i++) {
        dados = dados.concat(`${alunos[i]}\n`); //concatena string...
    }

    dados = dados.split(',').join(';');
    //dados = Buffer.from(dados).toString('base64')
    return dados;
}
function prepararDadosSalvarMateria(materias) { //salva... não implementada... sem uso...
    let dados = `${materias.length}\n`;
    
        for (let j = 0; j < materias.length; j++) {
        dados = dados.concat(`${materias[j]}\n`); //concatena string...
    }
    dados = dados.split(',').join(';');
    //dados = Buffer.from(dados).toString('base64')
    return dados;
}


//processamento...
const entrada = terminal.escolherTerminal(); //ler entrada...

let escolhaUsuario = ''; //entrada digitada pelo usuario...
let mensagem = ''; //escolha a ser exibida...
for(;escolhaUsuario !== '4';){
    limparTela(); //função que limpa a tela...
    exibir(mensagem); //exibe a mensagem (evento ocorrido)
    menuInicial(); //retorna para o menu...
    escolhaUsuario = terminal.lerALinhaInteira(entrada); //aguarda uma nova entrada..

    switch (escolhaUsuario) { //swtich (escolha da opção no menu)
        case '1':
            limparTela();
            console.log(   '\n==================================================================\n \t Listar Aluno\n==================================================================\n\t');
            ListaAlunos();        
            break;
        case '2':
            AdicionaAluno();       
            break;
        case '3':
            limparTela();
            LancaNotas();
            break;
        case '4': //encerra e sair...
            console.log('Saindo...');
            break;
        default:
            mensagem = 'opcao invalida';
            break;
    }
}


function menuInicial() {//essa bagaça vai ficar repetitiva, mas ok...
    console.log('==================================================================');
    console.log('| \t  Cadastro de Alunos Versão 0.1 Beta... \t         |');
    console.log('========================= Menu Principal =========================\n');
    console.log(' \t1 ► Listar Alunos\n\t2 ► Cadastrar Alunos \n\t3 ► Lançar Media \n\t4 ► Sair\n\t');
    console.log('------------------------------------------------------------------');
    console.log(' \t Digite uma opção acima');
    console.log('------------------------------------------------------------------');
}

function ListaAlunos(){
    const fs = require('fs'); //manipula arquivos... 
    const localArquivo = './../arquivo/teste.denylson'; //especifica o local e o arquivo...

    const bd = fs.readFileSync(localArquivo, 'utf-8'); //ler a partir do local (arquivo)
    mensagem = carregarDados(bd); //chegando lá...
//    LancaNotas(); //automaticamente lançar a nota dos alunos cadastrados e sua situação...
}

function AdicionaAluno(){
    var quantidadeparadigitar = require('readline-sync');
    terminal.imprimir('\n > Informe a quantidde de alunos desejados: \n');//especifica a quantidade a cadastrar...
    var qtdAlunos = quantidadeparadigitar.question('');//recebe a quantidade desejada...
    const alunos = []; //array alunos
    const entrada = terminal.escolherTerminal();//função que vem de terminal captura e trata a entrada
                        
        for(let i = 0; i < qtdAlunos; i ++){
            terminal.imprimir('\n================================================================');
            terminal.imprimir(' Por favor informe o nome do aluno: ►');
            terminal.imprimir('=================================================================');
            let nome = terminal.lerALinhaInteira(entrada);
                            
            terminal.imprimir('por favor informe a nota do bimestre 1: ');
            let nota1 = strings.converterStringParaFloat(terminal.lerALinhaInteira(entrada));
            terminal.imprimir('\n-----------------------------------------------------------------');
            terminal.imprimir('por favor informe a nota do bimestre 2: ');
            let nota2 = strings.converterStringParaFloat(terminal.lerALinhaInteira(entrada));
            let aluno = [nome, nota1, nota2]; //array 0, 1, 2...
                            
            alunos.push(aluno); //adiciona... aluno array...
            terminal.imprimir('\n-----------------------------------------------------------------');
            //fins de teste... (backup requerido antes e ao testar...)
            const dadosPreparados = prepararDadosSalvarAluno(alunos);

            fs.writeFileSync('./../arquivo/teste.denylson', dadosPreparados, 'utf-8'); //apenas salva no arquivo (sobrescreve o que existir)
            //persistencia de dados...
            
    }
}


function limparTela(){
    console.log('\n\n\n\n\n\n\n\n\n'); //function gambiarristica... >.-.> :v powered by © Denylson Melo...
}

function LancaNotas(){//funcional mas requer melhorias...
    //const colegio = require('./../colegio/colegio.js');
    const fs = require('fs'); //manipula arquivos... 
    const localArquivo = './../arquivo/teste.denylson'; //especifica o local e o arquivo...

    const bd = fs.readFileSync(localArquivo, 'utf-8'); //ler a partir do local (arquivo)
    mensagem = carregarDados(bd); //ler a partir do local (arquivo)

    colegio.imprimirBoletim(alunos); //englobado na função importada...
}

function exibir(mensagem){
    console.log(mensagem);
}

//salvar no arquivo...
//const dadosPreparados = prepararDadosSalvar(alunos, materias);
//fs.writeFileSync('./../arquivo/teste.denylson', dadosPreparados, 'utf-8');
//não utilizado...

//Artur, Joyce Maria, Amarildo, Rosiane Felix Matias grupo 1 -> Sistema de Notas 