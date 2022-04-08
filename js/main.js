// Parte lógica
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
function criarMatrizFinal(qtdEntrada, ordemSaida, operadores){
    let matriz = criarMatrizEntradas(qtdEntrada);

    let saidas = [];
    
    for(let index = 0; index < ordemSaida.length; index++){
        let saidaLinha = calcularSaidas(matriz, operadores[index]);
        for(let linha = 0; linha < saidaLinha.length; linha++){
            saidas.push(saidaLinha[linha]);
            matriz[linha].push(saidaLinha[linha]);
        }
    }

    // for(let linha = 0; linha < matriz.length; linha++){
    //     matriz[linha].push(saidas[linha]);
    // }

    return matriz;
}

console.table(criarMatrizFinal(4, [2, 2], ["x", "+"]));

// Parte física
function inserirTabela(){
}

// function inserirTabela(qtdEntrada, qtdSaida){
//     let matrizResultado = criarMatrizEntradas($('.th-entrada').length);
//     matrizResultado = calcularSaidas(matrizResultado, "+");

//     for(let linha = 0; linha < 2 ** qtdEntrada; linha++){
//         $('table').append(`<tr class='resultados'></tr>`);
//         for(let coluna = 0; coluna < qtdEntrada + qtdSaida; coluna++){
//             // Adicionando zeros na tabela
//             $('tr.resultados').eq(-1).append('<td>0</td>');
            
//             // Adicionando a classe "entrada" na <td>
//             $('td').eq(-1).addClass('entrada');

//             // Verificando se é 1 e alterando
//             if(matrizResultado[linha][coluna] == 1){
//                 $('td').eq(-1).text('1');
//             }
//         }
//     }
// }