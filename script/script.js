var app = {
    invitadosFn: function () {
        console.log(invitados)
        $(".usr-nombre").val(invitados.invitado);
        $(".usr-correo").val(invitados.email);
        for (var i = 1; i <= invitados.asistentes; i++) {
            $("#invitados").append("<option value='" + i + "'>" + i + " invitado(s)</option>");
        }
    },
    
    galeriaOpt: {
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        margin: 0,
        stagePadding: 0,
        responsiveClass: true,
        nav: false,
        dots: false,
        animateOut: 'fadeOut',
        items:2,
        responsive: {
            0:{
                items:1,
                margin:0
            },
            600: {
                items: 1,
                margin: 10
            }
        }
    },
    galeria: function () {
        $(".galeria .owl-carousel").owlCarousel(this.galeriaOpt);
    },
    recomendacionesOpt: {
        margin: 55,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3600,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        stagePadding: 34,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3
            }
        }
    },
    recomendaciones: function () {
        $("#recomendaciones-carousel").owlCarousel(this.recomendacionesOpt);
    },
    reloj: function () {
        setInterval(function () {
            contador("2022-07-17T15:00:00.000");
        }, 1000);
    },
    abrirRecomendacion: function (recomendacion) {
        // e.preventDefault();
        $(".modal-wrap").load(recomendacion + ".html");
        $(".modal-container").fadeIn();
    },
    reproducirMusica: function () {
        var _e = $(".btn-musica"),
            _a = $("audio");
        _e.toggleClass("pausa");
        (_e.hasClass("pausa")) ? _a.get(0).pause(): _a.get(0).play();
    },
    cerrarModal: function (e) {
        $('.modal-container').fadeOut();
        e.preventDefault();
    },
   
    invitadosInit:function(){
        (invitados == null) ? $('.modal-container').show().html(`<div class="modal-wrap"><div class="wrap-info-modal"><h3>Disculpe las molestias</h3><p>No podemos encontrar tu invitación, por favor contactar a los novios.</p></div>`): this.invitadosFn();
    },
    init: function () {
        this.invitadosInit();
        this.galeria();
        this.recomendaciones();
        this.reloj();
    }
};
setTimeout(function(){
    $(".btn-musica").addClass("hide");
},1800);
app.init();
$.stellar({
    responsive: true
});
if(localStorage.getItem('confirmado') == "true"){
    $(".wrap-confirmacion").html(
        "<h1>¡Muchas Gracias por tu confirmación te esperamos en nuestra Boda!</h1>"
    ).show();
}
var $grid = $('#photos-galeria').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-item'
});
$grid.imagesLoaded(function(){
    $grid.masonry();
});
$("header").sticky({topSpacing:0});