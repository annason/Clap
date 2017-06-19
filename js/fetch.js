function getDateCustom() {
    let currentDate = new Date();
    let ddRaw = currentDate.getDate();
    let dd = ("0" + ddRaw).slice(-2);
    let mmRaw = currentDate.getMonth() + 1;
    let mm = ("0" + mmRaw).slice(-2);
    let year = currentDate.getFullYear();
    return year + "-" + mm + "-" + dd;
}

let tag = "#ClapForPeter";

function getAjax() {

    let check = $.ajax({
        url: 'twitter.php',
        type: 'GET',
        data: {
            // q: encodeURI("#jatutestuje" since:" + getDateCustom()"),
            q: encodeURI(tag),
            count: 1
        },
        dataType: "json",
        success: function(response) {

            // console.log(JSON.stringify(response, null, 4));

            let previous = null;
            let current = null;



            if ("statuses" in response) {
                if (response.statuses.length <= 0) {
                    console.log("brak");
                    return;
                }
            } else if ("errors" in response) {
                console.log("error: " + response.errors[0].message);
                return;
            }

            let firstTimeStamp = response.statuses[0].created_at;
            let checker = new Date(firstTimeStamp).getTime();



            const offset = 450;
            let offsetTime = offset;

            for (let i = 0; i < response.statuses.length; i++) {
                setTimeout(function() {
                    createTweet(response, i, offset)
                }, offsetTime);

                offsetTime += offset;
            }


            let ids = [];

            setInterval(function() {

                //////////////////////////////////////////////////////

                var toRemove = document.getElementsByClassName('deleteme');

                function removeLast() {
                    document.querySelector("#comments ol").removeChild(document.querySelector("#comments ol").lastElementChild);
                }

                ///////////////////////////////////////////////////////////


                // console.log(ids);
                $.ajax({
                    url: 'twitter.php',
                    type: 'GET',
                    data: {
                        q: encodeURI(tag),
                        count: 15
                    },
                    // dataType: "json",
                    success: function(resp) {


                        if ("statuses" in resp) {
                            if (resp.statuses.length <= 0) {
                                console.log("brak");
                                return;
                            }
                        } else if ("errors" in resp) {
                            console.log('cerror: ' + resp.errors[0].message);
                            return;
                        }


                        current = JSON.stringify(resp.statuses[0].id);


                        if (previous && current && previous !== current) {
                            console.log('oh! the change!');

                            // console.log( console.log(JSON.stringify(resp, null, 4)));

                            for (let i = 0; i < resp.statuses.length; i++) {
                                setTimeout(function() {



                                    let toExclude = builRest(resp.statuses[i], checker, ids);

                                    if (toExclude) {
                                        ids.push(toExclude);
                                    }

                                    // ids.push(builRest(resp.statuses[i], checker, ids));



                                    /////////////////////////////////////////////////////////////////////

                                    console.log(toRemove);

                                    while (toRemove[0]) {
                                        toRemove[0].parentNode.removeChild(toRemove[0]);
                                    }



                                    let lis = document.querySelectorAll("#comments ol li");

                                    function opacityLast() {

                                        document.querySelector("#comments ol").lastElementChild.classList.add("animated");
                                        document.querySelector("#comments ol").lastElementChild.classList.add("fadeOut");
                                        document.querySelector("#comments ol").lastElementChild.classList.add("deleteme");
                                    }



                                    const HOWMANY = 4;

                                    if (HOWMANY < lis.length) {

                                        let removeIt = lis.length - HOWMANY;
                                        console.log("we need to remove something");

                                        for (let i = 0; i < removeIt; i++) {
                                            opacityLast();

                                        }

                                    }


                                    /////////////////////////////////////////////////////////////////////




                                }, offsetTime);

                                // offsetTime += offset;
                            }

                        } else {
                            console.log("nothing changed");
                        };

                        previous = current;


                    }
                })
            }, 25000);


        },
        error: function(errors) {


            console.log("błąd", errors);
        }
    });

};
