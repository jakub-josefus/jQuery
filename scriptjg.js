$(document).ready(function() {   
    var KolaPoleCheckbox = document.getElementsByName("kolo[]");
    var Prislusenstvi = document.getElementsByName("radio[]");
    var PocetKusuPole;
    var PocetDnu;
    var CelkovaCena;
    var Cena;
    var Vysledek;
    

    $("#VypocitejCenu").click(function(){
        VypocetBezPrislusenstvi()
        VypocetPrirazkaPrislusenstvi();
    }); 

    function VypocetBezPrislusenstvi() {
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
    }

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
        VypocetBezPrislusenstvi()
        VypocetPrirazkaPrislusenstvi();
        OdhadCeny();
        if (ValidaceEmailu() && OdhadCeny()) {
            $('#stavPoslani').text("Posláno");
        }
        else{
            $('#stavPoslani').text("Špatně vyplněný email nebo málo peněz");
        } 
    });
    
    function OdhadCeny() {
        var Typ = parseInt($('#OdhadCeny').val());
        if ((CelkovaCena) <= parseInt(Typ) ) {
            $('#VlezlDoCeny').text("Vlezl jste se do ceny ještě vám zbyde "+ (Typ-CelkovaCena));
            return true;
        }
        else
           $('#VlezlDoCeny').text("Nevlezl jste se do ceny o "+(CelkovaCena-Typ));
           return false;   
    }
    
    function ValidaceEmailu() {
        var str = $('#email').val();
        if (str.includes("@")) {
            return true;
        }
    
    }
    
});