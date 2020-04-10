$("#placar").click(mostraPlacar);
$("#botao-sinc").click(sincronizaPlacar); 


function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var nPalavras = $(".contador-palavras").text();
  
    var linha = criaLinha(usuario, nPalavras,); 
    linha.find(".botao-remover").click(removeLinha); 

    corpoTabela.prepend(linha);
    $(".placar").slideDown(600); 
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
    {
        scrollTop: "100px"

    },1000); 
}

function removeLinha(event){
        event.preventDefault();
        var linha = $(this).parent().parent(); 
        linha.fadeOut(); 
        setTimeout(function(){
            linha.remove();
        }, 1000);
        
}

function criaLinha(usuario, palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario); 
    var colunaPalavras = $("<td>").text(palavras); 
    var colunaRemover = $("<td>");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete"); 
    var link = $("<a>").attr("href","#").addClass("botao-remover");

    link.append(icone); 
    colunaRemover.append(link);
    linha.append(colunaUsuario)
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha; 
}

function mostraPlacar(event){
    $(".placar").stop().slideToggle(1000); 
}

function sincronizaPlacar(){
    placar = []; 
    var linhas = $("tbody>tr"); 
    
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text(); 
        var palavras = $(this).find("td:nth-child(2)").text(); 

        var score = {
            usuario: usuario,
            pontos: palavras
        };
        placar.push(score); 

});

        var dados = {
            placar : placar 
        };

        $.post("http://localhost:3000/placar", dados, function(){
            $(".tooltip").tooltipster("open");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        }, 1500);
        console.log("salvei no servidor");
    })      
       
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){

        $(data).each(function(){
            var linha = criaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha); 
            $("tbody").append(linha);

        });
    
    });
}