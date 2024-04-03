var app = {
    invitadosFn: function () {
        console.log(invitados)
        $(".usr-nombre").val(invitados.invitado);
        $(".usr-correo").val(invitados.email);
        for (var i = 1; i <= invitados.asistentes; i++) {
            $("#invitados").append("<option value='" + i + "'>" + i + " invitado(s)</option>");
        }
    },
    enviarConfirmacion: function (event) {
        event.preventDefault();
        localStorage.setItem('confirmado', true);
        alergia_input = ($("#alergia").val() == null) ? "" : $("#alergia").val();
        alcohol_input = ($("#alcohol").val() == null) ? "" : $("#alcohol").val();
        cancion_input = ($("#cancion").val() == null) ? "" : $("#cancion").val();
        var data = {
            user_name: $(".usr-nombre").val(),
            user_email: $(".usr-correo").val(),
            user_comentarios: $(".deseos-invitados").val(),
            user_invitados: $(".num-invitados").val(),
            uid_fire: "pNPGzPBhnedBkdgl3iGyymaEBJQ2",
            cancion: $("#cancion").val(),
            admin_user: "wK3T3I6uk9jU2bfYlK6u3tjozsTStX2xtMA=",
            hashtag: "bodah&m",
            url_boda: "http://marinayhector.com.mx/",
            direccion_texto: `"Parroquia Santiago Apóstol"<br />
Sixto Gorjón, Centro, Tequila, Jalisco, México`,
            historia: `Después de 5 años en los que no hemos podido ser mas felices, finalmente decidimos casarnos, nos complace sean participes de nuestra unión.`,
            llave_invitado: window.location.search.replace(/\?/g, '')
        };

        $.ajax({
            type: "GET",
            url: "https://invitacionesinteligentes.mx/notificaciones-mbl/endpoint-mail-qr.php",
            dataType: 'json',
            traditional: true,
            data: data,
            beforeSend: function (data) {
                $(".wrap-send").fadeIn();
            },
            success: function (respuesta) {
                console.log(respuesta);
                setTimeout(function () {
                    $(".enviando").hide();
                    $(".wrap-confirmacion").show().html(
                        `<h1>¡Muchas Gracias por tu confirmación <b></b>, te esperamos en nuestra Boda!</h1>`
                    );
                }, 3000);
            },
            error: function (respuesta) {
                console.log(respuesta);
                $(".enviando").hide();
                $(".wrap-confirmacion").show().html(
                    `<h1>¡Muchas Gracias por tu confirmación <b></b>, te esperamos en nuestra Boda!</h1>`
                );
            }
        });
        firebase.database().ref("datosBoda/" + data.uid_fire + "/invitados").push({
            nombre_invitado: data.user_name,
            correo_invitado: data.user_email,
            num_invitado: data.user_invitados,
            deseos_invitados: data.user_comentarios,
            fecha_invitado: Date(Date.now()),
            alergia: alergia_input,
            alcohol: alcohol_input,
            cancion: cancion_input,
            codigo: window.location.search.replace(/\?/g, '')

        });
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