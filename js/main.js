var qtdSaidas = 3;

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
    let novaMatriz = matriz;
    let numeroInserir = [];
    
    for(let linha = 0; linha < matriz.length; linha++){
        let colunaInserida = false;
        for(let coluna = 0; coluna < matriz[0].length; coluna++){
            if(!colunaInserida){
                switch(operador){
                    // Ou
                    case "+":
                        numeroInserir.push(0);
                        if(matriz[linha][coluna] == 1){
                            novaMatriz[linha].push(1);
                            colunaInserida = true;
                        }
                        break;
                    
                    // E
                    case "x":
                        numeroInserir.push(1);
                        if(matriz[linha][coluna] == 0){
                            novaMatriz[linha].push(0);
                            colunaInserida = true;
                        }
                        break;
    
                    case "!":
                        break;
                }
            }
        }
    }

    let maiorLength = 0;
    for(let linha = 0; linha < novaMatriz.length; linha++){
        if(novaMatriz[linha].length > maiorLength){
            maiorLength = novaMatriz[linha].length;
        }
    }
    
    for(let linha = 0; linha < novaMatriz.length; linha++){
        for(let coluna = 0; coluna < maiorLength; coluna++){
            if(novaMatriz[linha][coluna] == undefined){
                novaMatriz[linha].push(numeroInserir[linha]);
            }
        }        
    }

    return novaMatriz;
}

function inserirTabela(qtdEntrada, qtdSaida){
    let matrizResultado = criarMatrizEntradas($('.th-entrada').length);
    console.log(matrizResultado);
    matrizResultado = calcularSaidas(matrizResultado, "+");

    for(let linha = 0; linha < 2 ** qtdEntrada; linha++){
        $('table').append(`<tr class='resultados'></tr>`);
        for(let coluna = 0; coluna < qtdEntrada + qtdSaida; coluna++){
            // Adicionando zeros na tabela
            $('tr.resultados').eq(-1).append('<td>0</td>');
            
            // Adicionando a classe "entrada" na <td>
            $('td').eq(-1).addClass('entrada');

            // Verificando se é 1 e alterando
            if(matrizResultado[linha][coluna] == 1){
                $('td').eq(-1).text('1');
            }
        }
    }
}

inserirTabela($('.th-entrada').length, 1);