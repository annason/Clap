let container = document.querySelector("#comments ol");



function createTweet(response, i, offset) {


    grid();

    let username = response.statuses[i].user.screen_name;
    let name = response.statuses[i].user.name;
    let tweetid = response.statuses[i].id;
    let avatar = response.statuses[i].user.profile_image_url;
    let content = response.statuses[i].text;


    let date = function(tdate) {

        let timestamp = Date.parse(response.statuses[0].created_at)
        let dateof = new Date(timestamp);

        var dd = dateof.getDate();
        var mmRaw = dateof.getMonth() + 1;
        var mm = ("0" + mmRaw).slice(-2);
        var year = dateof.getFullYear();
        var hour = dateof.getHours();
        var minutes = ("0" + dateof.getMinutes()).slice(-2);
        return hour + ':' + minutes + " - " + dd + '.' + mm + '.' + year;
    }

    function findHashtag(cont) {

        let rerexp = /(\S*#(?:\[[^\]]+\]|\S+))/g

        return cont.replace(rerexp, ` <span class="hashtag">$1</span>`)

    }

    ////////////////////////////////
    let newMsg = document.createElement("li");
    newMsg.classList.add("comment");
    newMsg.classList.add("first");
    newMsg.classList.add("last");
    /////////////////////////////////////

    newMsg.innerHTML = `
<div class="comment-body animated fadeInDown">
    <div class="comment-arrow"></div>
    <div class="comment-avatar">
        <div class="avatar"><img src="${avatar}" alt=""></div>
    </div>
    <div class="comment-text">
        <div class="comment-author clearfix">
            <span class="link-author" hidefocus="true" style="outline: none;">${name}</span>
            <span class="username u-dir" dir="ltr" data-aria-label-part="">@${username}</span>

        </div>
        <div class="comment-entry">
            ${findHashtag(content)}
        </div>

        <span class="comment-date"><a href="https://twitter.com/${username}/status/${tweetid}" target="_blank"> <i class="fa fa-clock-o" aria-hidden="true"></i> ${date()}</a></span>
    </div>
    <div class="clear"></div>
</div>
`




    container.appendChild(newMsg);

    // container.insertBefore(newMsg, container.firstChild);

    setTimeout(function() {
        show(gifs)
    }, offset + 1000);


}

//////////////////////////////////////
//////////////////////////////////////

function builRest(tweet, checker, ids) {





    let timestamp = Date.parse(tweet.created_at)
    if (timestamp <= checker ) {
        return;
    }


    if (ids.indexOf(tweet.id_str) > -1 ) {
        return;
    }

    hide(gifs);
    grid();

    //
    let username = tweet.user.screen_name;
    let name = tweet.user.name;
    let tweetid = tweet.id;
    let avatar = tweet.user.profile_image_url;
    let content = tweet.text;


    let date = function(tdate) {

        let dateof = new Date(timestamp);
        let dd = dateof.getDate();
        let mmRaw = dateof.getMonth() + 1;
        let mm = ("0" + mmRaw).slice(-2);
        let year = dateof.getFullYear();
        let hour = dateof.getHours();
        let minutes = ("0" + dateof.getMinutes()).slice(-2);
        return hour + ':' + minutes + " - " + dd + '.' + mm + '.' + year;
    }

    function findHashtag(cont) {

        let rerexp = /(\S*#(?:\[[^\]]+\]|\S+))/g

        return cont.replace(rerexp, ` <span class="hashtag">$1</span>`)

    }

    ////////////////////////////////
    let newMsg = document.createElement("li");
    newMsg.classList.add("comment");
    newMsg.classList.add("first");
    newMsg.classList.add("last");
    /////////////////////////////////////

    newMsg.innerHTML = `
<div class="comment-body animated fadeInUp">
    <div class="comment-arrow"></div>
    <div class="comment-avatar">
        <div class="avatar"><img src="${avatar}" alt=""></div>
    </div>
    <div class="comment-text">
        <div class="comment-author clearfix">
            <span class="link-author" hidefocus="true" style="outline: none;">${name}</span>
            <span class="username u-dir" dir="ltr" data-aria-label-part="">@${username}</span>

        </div>
        <div class="comment-entry">
            ${findHashtag(content)}
        </div>

        <span class="comment-date"><a href="https://twitter.com/${username}/status/${tweetid}" target="_blank"> <i class="fa fa-clock-o" aria-hidden="true"></i> ${date()}</a></span>
    </div>
    <div class="clear"></div>
</div>
`

console.log("I\'ve just added tweet id "+ tweetid);



        container.insertBefore(newMsg, container.firstChild);


        setTimeout(function() {
            show(gifs)
        }, 800);



    return tweet.id_str;


}
