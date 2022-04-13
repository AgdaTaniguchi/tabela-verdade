function gerarTabela(){
    // $('.campo-saida').each((index) => {
    //     $(`.campo-saida:eq(${index}) .inpSaida`).each((contador) => {
    //         console.log(index, contador);
    //         $('table thead tr').append(`<th class='th-entrada'>${'opa'}</th>`);
    //     });
    // });
    
    $('.campo-saida .letraEntrada').each((index) => {
        $('table thead tr').append(`<th class='th-entrada'></th>`);
    });

    $('table thead tr').append(`<th class='th-entrada'>S</th>`);
    
    inserirTabela();
}

function adicionarSaida(){
    $('.campo-saida').eq($('.campo-saida').length - 1).clone().appendTo('.campos');
}

gerarTabela();