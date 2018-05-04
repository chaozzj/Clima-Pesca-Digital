
$(document).ready(function()
 {
   var url="https://climapesca.org/api/get_category_posts/?id=3/";
   //var url="https://climapesca.org/?json=get_tag_posts&tag_slug=actualidad";
   $.getJSON(url,function(result){
    $.each(result.posts, function(i, field){
       var title=field.title;
       var link=field.url;
       var imgpost=field.thumbnail;
       $("#posts").append("<li> <img scr="+ imgpost+ " > <a href="+ link+" > <h2>"+title+"</h2></a></li>");
    });
   });
 });

/*function fetch_and_display_posts()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://climapesca.org/wp-admin/admin-ajax.php?action=posts");
    xhr.onload = function(){
        var posts_array = JSON.parse(xhr.responseText);

        var html = "";

        for(var count = 0; count < posts_array.length; count++)
        {
            var title = posts_array[count][0];
            var link = posts_array[count][1];
            var date = posts_array[count][2];
            var image = posts_array[count][3];

            html = html + "<li>" + "<a href='javascript:open_browser(\"" + link + "\")'>" + "<img height='128' width='128' src='" + image + "'>" + "<h2>" + title + "</h2>" + "<p>" + date + "</p></a></li>";
        }

        document.getElementById("posts").innerHTML = html;
        $("#posts").listview("refresh");
    }
    xhr.send();
}

function login()
{
    var username = 'root'//document.getElementById("username").value;
    var password = '6274v1c347x'//document.getElementById("password").value;

    if(username == "")
    {
        navigator.notification.alert("Please enter username", null, "Username Missing", "OK");
        return;
    }

    if(password == "")
    {
        navigator.notification.alert("Please enter password", null, "Password Missing", "OK");  
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://climapesca.org/wp-admin/admin-ajax.php?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    xhr.onload = function(){
        if(xhr.responseText == "FALSE")
        {
            navigator.notification.alert("Wrong Username and Password", null, "Wrong Creds", "Try Again");
        }
        else if(xhr.responseText == "TRUE")
        {
            fetch_and_display_posts();
            //$("#page_two_link").click();
        }
    }   
    xhr.send();
}

function open_browser(link)
{
    window.open(link, '_blank', 'location=yes');
}*/