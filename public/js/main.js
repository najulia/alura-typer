var tempoInicial = $("#tempo").text(); 
var campo = $(".campo-digitacao");

$(document).ready(function(){
    iniciaContadores();
    iniciaCronometro();
    atualizaTamanhoFrase(); 
    inicializaMarcadores(); 
    $("#reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom"
    });

}); 

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo; 
    $("#tempo").text(tempo);

}

function iniciaContadores(){
    campo.on("input", function() {
        campo.val();
        var conteudo = campo.val();
     
        var qntdCaracteres = conteudo.length;
        var contadorCaracteres = $(".contador-caracteres");
        contadorCaracteres.text(qntdCaracteres); 
     
        var qntdPalavras = conteudo.split(/\S+/).length - 1; 
       var contador = $(".contador-palavras");
       contador.text(qntdPalavras); 
     });
}

function iniciaCronometro(){
    campo.one("focus", function(){
        var tempo = $("#tempo").text();
       var cronometroId = setInterval(function(){
            tempo--;
         $("#tempo").text(tempo);
         if(tempo < 1){
            clearInterval(cronometroId); 
            finalizaJogo();
        }
          
        }, 1000);
    
    });
}

function inicializaMarcadores(){
    campo.on("input", function() {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        
        
        if (digitado == comparavel){
           campo.addClass("campo-correto");
           campo.removeClass("campo-incorreto");
    
           
        } else{
            campo.addClass("campo-incorreto");
           campo.removeClass("campo-correto");
    
            
        }
    });
}

function finalizaJogo(){
    campo.attr("disabled", true); 
    campo.toggleClass("campo-desabilitado");
    inserePlacar();
}

function reiniciaJogo(){

        campo.attr("disabled", false);
        campo.val(""); 
        $(".contador-palavras").text("0");
        $(".contador-caracteres").text("0"); 
        $("#tempo").text(tempoInicial);
        iniciaCronometro();
        campo.toggleClass("campo-desabilitado");
        campo.removeClass("campo-correto")
        campo.removeClass("campo-incorreto")

}





