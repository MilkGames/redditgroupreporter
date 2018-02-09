// ==UserScript==
// @name         Reddit Steam Group Comment Reporter
// @namespace    MilkGames
// @version      0.22
// @description  Report comments on the Reddit Steam group.
// @author       MilkGames
// @match        *://steamcommunity.com/groups/reddit
// @grant        none
// ==/UserScript==

(function() {
    if (localStorage.getItem("noticeok")) {
        localStorage.removeItem("noticeok");
    }
    if (!localStorage.getItem("notice2ok")) {
        ShowAlertDialog( "Reddit Steam Group Reporter", "<h3>Message from Reddit Group Reporter developers:</h3>\nStatus of Chrome extension: Errors, errors, and errors. I've been dealing with a bunch of errors mainly in relation with the grabbing of cookies. If anyone would like to help me out, <a href='steam://friends/add/76561198104867238'>please do</a> or add me via Discord (MilkGames#6495) \n\n\n<img height='450' width='850' src='https://milkgames.pw/file/8FrI.gif'>\n\n<h1>Thank you for understanding.</h1>", "Understood" )
        .done(function() {
        localStorage.setItem("notice2ok", "true"); // Show notice & if done (ok button pressed) set localStorage item noticeok to true.
        }
    );}
    var element = document.createElement("reportcount");
    var reports = localStorage.getItem("reports");
    if (reports === null) {
        localStorage.setItem("reports", "0");
        //Since reports was originally "null", and we need to be userfriendly, we set the reports to the number "0", and update the var.
        reports = localStorage.getItem("reports");
    }
    element.appendChild(document.createTextNode('Reports: ' + reports));
    document.getElementsByClassName('commentthread_count')[0].appendChild(element);
    jQuery("reportcount").css( {
       'color' : '#d65d5d',
       'border' : '1px solid #565656',
       'border-radius': '10px',
       'padding' : '3px',
       'padding-left' : '4px',
       'padding-right' : '4px',
       'height' : '10px' } );
    var $comments = jQuery("[class*='commentthread_comment_timestamp']");
    if ($comments.length > 0) {
        $comments.after(' <a class="actionlink repcomment">Report Comment</a><a class="actionlink">');
    }
    jQuery(".commentthread_allcommentslink").css("margin-right", "7px");
    jQuery(".repcomment").click(function() {
        var $this = jQuery(this);
        var author = $this.parent().find(".commentthread_author_link").attr("data-miniprofile");
        var date = $this.parent().find(".commentthread_comment_timestamp").attr("title");
        var dateu = $this.parent().find(".commentthread_comment_timestamp").attr("data-timestamp");
        ShowPromptDialog( "Reporting a Comment", "Please enter your reasoning for reporting this comment", "Submit Report", "Cancel")
        .done(function(reason, other) {
            if (reason) {
            // Ugly code pls no to kill
            var datatosend = "comment=Author: " + author + "\n" + date + "\nReason: " + reason + "&count=15&sessionid=" + g_sessionID + "&extended_data=%7B%22topic_permissions%22%3A%7B%22can_view%22%3A1%2C%22can_post%22%3A1%2C%22can_reply%22%3A1%2C%22can_moderate%22%3A1%2C%22can_edit_others_posts%22%3A1%2C%22can_purge_topics%22%3A1%2C%22is_banned%22%3A0%2C%22can_delete%22%3A1%2C%22can_edit%22%3A1%7D%2C%22original_poster%22%3A144601510%2C%22forum_appid%22%3A0%2C%22forum_public%22%3A0%2C%22forum_type%22%3A%22General%22%2C%22forum_gidfeature%22%3A%220%22%7D&feature2=1479857071262320410&oldestfirst=true&include_raw=true";
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.readyState === xhr.DONE) { // The request is done, we have a response from the server.
                    if (xhr.responseText === '{"success":false}') { // Is the response text {"success":false}? Let the user know something went wrong.
                        ShowAlertDialog('Reddit Steam Group Reporter', 'Whoops! It looks like something went wrong. Try again?');
                    } else { // Else? It should be all fine :)
                        ShowAlertDialog('Thank You!', 'Thank you for reporting a comment to the Reddit Group Moderators. \nYou may view your report <a href="http://steamcommunity.com/groups/reddit/discussions/0/1479857071262320410">here</a>.');
                        localStorage.setItem('reports',parseInt(reports)+1);
                        //Make sure to parse it as an int, not a string, otherwise you get 01, 011, 0111, etc.
                        localStorage.setItem(dateu,"");
                        //Makes a localStorage item with the Unix Timestamp - prevent doublereports?
                        reports = localStorage.getItem("reports");
                        element.innerHTML = "Reports: "+reports;
                        //Update the Report number on top of page. Live updates whooooo!11
                        // IT WORKS! ... I hope.
                    }
                }
            };
            xhr.withCredentials = true;
            xhr.open("POST", "http://steamcommunity.com/comment/ForumTopic/post/103582791429796426/864943227215847264/");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send(datatosend);
        }
        });
    });
})();
