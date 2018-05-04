/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },

    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
    //Post de Wordpres
};

 function fetch_and_display_posts()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://climapesca.org/wp-admin/admin-ajax.php?action=posts");
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
    var username = 'admin'//document.getElementById("username").value;
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
    xhr.open("GET", "http://climapesca.org/wp-admin/admin-ajax.php?action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
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
}
