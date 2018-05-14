
$(document).ready(function()
 {
   var url="https://climapesca.org/api/get_category_posts/?id=3/";
   //var url="https://climapesca.org/?json=get_tag_posts&tag_slug=actualidad";
   $.getJSON(url,function(result){
    $.each(result.posts, function(i, field){
       var title=field.title;
       var link=field.url;
       var imgpost=field.thumbnail;
       $("#posts").append("<li> <img scr="+ imgpost+ " > <a href=\"#\" onclick= \"cordova.InAppBrowser.open('" + link + "','_system'); return false; \" > <h2>"+title+"</h2></a></li>");
    });
   }).fail(function(jqXHR) {
    if (jqXHR.status == 404) {
       $("#posts").append("<li><h1>Error 404</h1></li>");
    } else {
        $("#posts").append("<li><h1>Error al obtener noticias, compruebe su conexión.</h1></li>");
    }
});;
 });


$(document).bind( "mobileinit", function() {
    $.ajax({
        // Variables
        url: 'https://climapesca.org/app-core/app-mail.php',
        type: 'POST',
        data: {
            email: $('#email').val()
            mesbody: $('#message').val()

        }
    // Fonction HTML
    }, function(html) {
        var response = html;
        // PHP done and email sent
        if(response == "success") {
            alert("Email sent !");
        } else {
            alert("Email can't been sent...");
            return false;
        }
    });
    $.mobile.allowCrossDomainPages = true;
});