// Criando e calculando a matriz
function criarMatrizEntradas(qtdEntrada){
    let matriz = [];

    for(let linha = 0; linha < 2 ** qtdEntrada; linha++){
        matriz.push([]); // Adicionando uma linha na matriz
        for(let coluna = 0; coluna < qtdEntrada; coluna++){
            if(linha == 0){
                matriz[linha].push(0); // Adiciona os valores da primeira linha
            }
            else{
                let repeticao = 2 ** (qtdEntrada - 1 - coluna);
                let qtdNum = 0;
                let ultimoNum = matriz[linha - 1][coluna];
                
                let colunaNum = [];
                for(let linhaProv = 0; linhaProv < linha; linhaProv++){
                    colunaNum.push(matriz[linhaProv][coluna]);
                }

                colunaNum = colunaNum.slice(colunaNum.length - repeticao, colunaNum.length);

                for(let cont = 0; cont < colunaNum.length; cont++) {
                    if(ultimoNum == colunaNum[cont]){
                        qtdNum++;
                    }
                }

                if(qtdNum < repeticao){
                    matriz[linha].push(ultimoNum);
                }
                else{
                    matriz[linha].push(ultimoNum == 0 ? 1 : 0);
                }
            }
        }
    }

    return matriz;
}

function calcularSaidas(matriz, operador){
    let saida = [];
    
    for (let cont = 0; cont < matriz.length; cont++) {
        if(operador == "+"){
            saida.push(0);
        }
        else if(operador == "x"){
            saida.push(1);
        }
    }


    for(let linha = 0; linha < matriz.length; linha++){
        for(let coluna = 0; coluna < matriz[0].length; coluna++){
            switch(operador){
                case "+":
                    saida[linha] += matriz[linha][coluna];
                    break;
                    
                case "x":
                    saida[linha] *= matriz[linha][coluna];
                    break;
            }
        }
    }
    
    for(let contador = 0; contador < saida.length; contador++){
        if(saida[contador] > 1){
            saida[contador] = 1;
        }
    }
    
    return saida;
}

// Separar as matrizes de acordo com as saídas
function criarMatriz(ordemSaida, operadores){
    let qtdEntrada = 0;
    let colunasSaidas = [];
    
    let contador = 0;
    for (let index = 0; index < ordemSaida.length; index++) {
        qtdEntrada += ordemSaida[index];
        colunasSaidas.push([]);
        for(let i = 0; i < ordemSaida[index]; i++){
            colunasSaidas[index].push(contador);
            contador++;
        }
    }

    let matriz = criarMatrizEntradas(qtdEntrada);
    let saidas = [];
    
    for(let contador = 0; contador < ordemSaida.length; contador++){
        let saidaLinha = [];
        let matrizTemporaria = [];
        
        for(let linha = 0; linha < matriz.length; linha++){
            matrizTemporaria.push([]);
            for(let coluna = 0; coluna < matriz[0].length; coluna++){
                if(colunasSaidas[contador].includes(coluna)){
                    matrizTemporaria[linha].push(matriz[linha][coluna]);
                }
            }

            saidaLinha = calcularSaidas(matrizTemporaria, operadores[contador]);
        }

        for(let coluna = 0; coluna < saidaLinha.length; coluna++){
            if(contador != ordemSaida.length - 1 || ordemSaida.length == 1){
                saidas.push([]);
            }
            saidas[coluna].push(saidaLinha[coluna]);
        }
    }

    // Adicionando saídas intermediárias
    for(let linha = 0; linha < saidas.length; linha++){
        for(let coluna = 0; coluna < ordemSaida.length; coluna++){
            matriz[linha].push(saidas[linha][coluna]);
        }
    }
    
    // Adicionando saída final
    if(ordemSaida.length == 1){
        return matriz;
    }

    let saidaFinal = calcularSaidas(saidas, operadores[operadores.length - 1]);

    for(let linha = 0; linha < saidaFinal.length; linha++){
        matriz[linha].push(saidaFinal[linha]);
    }
    
    return matriz;
}

// console.table(criarMatriz([3, 2], ["x", "x", "x"]));

// Adicionando a matriz na tabela
function inserirTabela(){
    // Pegando a quantidade de >> ENTRADAS <<
    let qtdEntradas = [];
    $('.campo-saida').each((item) => {
        qtdEntradas.push($(`.campo-saida:eq(${item}) .letraEntrada`).length);
    });
    qtdEntradas.pop();

    // Calculando a quantidade total de entradas
    let totalEntradas = 0;
    for(let index = 0; index < qtdEntradas.length; index++){
        totalEntradas += qtdEntradas[index];
    }

    // Pegando as >> OPERAÇÕES << das saídas
    let operacoes = [];
    $('.campo-saida').each((item) => {
        operacoes.push($(`.campo-saida:eq(${item}) .operacao`).val());
    });

    let matriz = criarMatriz(qtdEntradas, operacoes);

    for(let linha = 0; linha < matriz.length; linha++){
        $("table").append("<tr class='resultado'></tr>");
        for(let coluna = 0; coluna < matriz[0].length; coluna++){
            $('tr.resultado').eq(-1).append(`<td>${matriz[linha][coluna]}</td>`);
            if(coluna >= totalEntradas && coluna != totalEntradas + qtdEntradas.length){
                $('td').eq(-1).addClass('saida-intermediaria');
            }
            else if(coluna == totalEntradas + qtdEntradas.length){
                $('td').eq(-1).addClass('saida-final');
                if($('td').eq(-1).text() == '1'){
                    $('td').eq(-1).html('<div class="saida-positiva">1</div>');
                    // $('td').eq(-1).addClass('saida-positiva');
                }
            }
        }
    }
}

inserirTabela();

function gerarTabela(){
    inserirTabela();
}
