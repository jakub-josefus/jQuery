$(document).ready(function() {   
    var KolaPoleCheckbox = document.getElementsByName("kolo[]");
    var Prislusenstvi = document.getElementsByName("radio[]");
    var PocetKusuPole;
    var PocetDnu;
    var CelkovaCena;
    var Cena;
    var Vysledek;
    

    $("#VypocitejCenu").click(function(){
        PocetDnu = $('#VyberDny').val();
        Cena=0;
        Vysledek=0;  
        for (var i = 0; i < KolaPoleCheckbox.length; i++) {
            if (KolaPoleCheckbox[i].checked) {
                Cena=parseInt(KolaPoleCheckbox[i].getAttribute("data-price"));
                var cenaAPocetDnu= Cena*PocetDnu;
                Vysledek+=cenaAPocetDnu*PocetKusuPole[i];
            }
        }
        VypocetPrirazkaPrislusenstvi();
    }); 

    function VypocetPrirazkaPrislusenstvi() {
        for (var i = 0; i < Prislusenstvi.length; i++) {
            if (Prislusenstvi[i].checked) {
                var Prirazka=parseFloat(Prislusenstvi[i].getAttribute("data-price"));
                CelkovaCena=Vysledek*Prirazka;         
                $("#VypocetCeny").val(parseFloat(CelkovaCena).toFixed(2));
            }
        }
    }   

    $("#formularCheck").change(function(){
            var horske = $('#pocet-horske').val();
            var detske = $('#pocet-detske').val();
            var silnicni = $('#pocet-silnicni').val();
            var gravel = $('#pocet-gravel').val();   
            PocetKusuPole=[horske,detske,silnicni,gravel];   
    });


    $("#Odeslat").click(function(){
        OdhadCeny();
        if (ValidaceEmailu()) {
            $('#stavPoslani').text("Posláno");
        }
        else{
            $('#stavPoslani').text("Špatně vyplněný email znova");
        } 
    });


    
    function OdhadCeny() {
        var Typ = parseInt($('#OdhadCeny').val());
        console.log(Typ);
        var rozmezi = parseInt(CelkovaCena*0.7);
        console.log(rozmezi);
        if (parseInt(CelkovaCena) < parseInt(Typ) ) {
            $('#VlezlDoCeny').text("Váš odhad byl špatný");
        }
        else if (parseInt(Typ) > rozmezi){
            $('#VlezlDoCeny').text("Váš odhad byl DOBRÝ");
        }else
           $('#VlezlDoCeny').text("Váš odhad byl špatný");
    
    }
    
    function ValidaceEmailu() {
        var str = $('#email').val();
        if (str.includes("@")) {
            return true;
        }
    
    }
    
});