$(document).ready(function()
 {
   var orgn = window.location.href;
   var urlpost = new URL(orgn);
   var mid= urlpost.searchParams.get("id");
   var url="https://climapesca.org/api/get_post/?id="+mid;
   //var url="https://climapesca.org/?json=get_tag_posts&tag_slug=actualidad";
   $.getJSON(url,function(result){
    $.each(result, function(i, field){
       var mtitle=field.title;
       var mcontent=field.content;
       if(String(mtitle)!="undefined"){
         $("#posts").append("<h1 class=\"half-top center-text no-bottom font-21\">"+mtitle+"</h1><p>"+ mcontent);
       }
        //$("#posts").append("<h1 class=\"half-top center-text no-bottom font-21\">"+orgn+"</h1><p>");
      
    });
   }).fail(function(jqXHR) {
    if (jqXHR.status == 404) {
       $("#posts").append("<li><h1>Error 404</h1></li>");
    } else {
       $("#posts").append("<li><h1>Error al obtener contenido, compruebe su conexión.</h1></li>");
    }
});;
});