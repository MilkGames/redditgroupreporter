// ==UserScript==
// @name         Reddit Steam Group Comment Reporter
// @namespace    MilkGames
// @version      0.1
// @description  More options to delete comments
// @author       MilkGames -- Royalgamer06 for original script
// @match        *://steamcommunity.com/groups/reddit*
// @grant        none
// ==/UserScript==

if (jQuery("[class*='commentthread_comment_timestamp']").length > 0) {
    jQuery("[class*='commentthread_comment_timestamp']").after(' <a class="actionlink repcomment">Report Comment</a><a class="actionlink">');
}

jQuery(".repcomment").click(function() {
    var reason = prompt("Please enter the reason for reporting this comment.", "");
    if (reason) {
        var author = jQuery(this).parent().find(".commentthread_author_link").attr("data-miniprofile");
        var date = jQuery(this).parent().find(".commentthread_comment_timestamp").attr("title");
        // Ugly code pls no to kill
        var datatosend = "comment=Author: " + author + "\n" + date + "\nReason: " + reason + "&count=15&sessionid=" + g_sessionID + "&extended_data=%7B%22topic_permissions%22%3A%7B%22can_view%22%3A1%2C%22can_post%22%3A1%2C%22can_reply%22%3A1%2C%22can_moderate%22%3A1%2C%22can_edit_others_posts%22%3A1%2C%22can_purge_topics%22%3A1%2C%22is_banned%22%3A0%2C%22can_delete%22%3A1%2C%22can_edit%22%3A1%7D%2C%22original_poster%22%3A144601510%2C%22forum_appid%22%3A0%2C%22forum_public%22%3A0%2C%22forum_type%22%3A%22General%22%2C%22forum_gidfeature%22%3A%220%22%7D&feature2=1456202492181247164&oldestfirst=true&include_raw=true";
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", "http://steamcommunity.com/comment/ForumTopic/post/103582791429796426/864943227215847264/");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(datatosend);
        ShowAlertDialog( 'Thank You!', 'Thank you for reporting a comment to the Reddit Group Moderators. \nYou may view your report <a href="http://steamcommunity.com/groups/reddit/discussions/0/1456202492181247164">here</a>.' );
        // IT WORKS! ... I hope.
    }
});
