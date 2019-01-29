/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
    const ROOT_URL = 'http://localhost:8080';

    $(".new-tweet").hide();

    $("button").click(function(){
        $("section.new-tweet").slideToggle(function(){
            $("textarea").select();
        });
      });


    //Request helper function. 
    const request = (options, cb) => {
        $.ajax(options)
          .done(response => {
            // dealing with the response from the server
            cb(response);
          })
          .fail(err => {
            console.log('Error: ', err);
          })
          .always(() => {
            console.log('Request completed.');
          });
      };

    //W3D3: Form submission using JQuery. Post request.
    $(".new-tweet form").submit(function(event) {
        event.preventDefault(); //prevents sending
        let loggingText = $("form textarea").serialize();
        
      
            if(loggingText.length > 145 /*includes text=*/) {
                $( ".error" ).slideUp("fast", function() {
                        $(this).slideDown("fast").text( "Character limit exceeded.");
                        })
            //     //.text then sideDown
            //     //form does not clear
            //     //form does not submit
            } else if (loggingText.length === 5/*cause  of serialization*/) {
                $( ".error" ).slideUp("fast", function() {
                    $(this).slideDown("fast").text( "Field is empty.");
                    })
                //.text then sideDown
                //form does not submit
            } else {
                //ajax post from the thing
                $.ajax('/tweets', {
                    method: 'POST',
                    data: loggingText,
                 }).then(function(){
                    loadTweets(loggingText);
                    $("form textarea").val(''); //clears the form after
                })
            }
    })

    //W3D3: Fetching tweets with AJax. GET request.
    //arrow funtion syntax
    //loads the tweets from the backend
    const loadTweets = () => {
        const tweetLog = 
        $.ajax("/tweets", {
          method: 'GET',
          dataType: 'json',
        }).then(function(data) {
            renderTweets(data)
        });
    
        request(tweetLog, response => {
          console.log(response);
        });
      };

    loadTweets();


      //class name of form, on, submit


 //DYNAMIC TWEETS TASK 1 : W3D2

function createTweetElement (tweetData) {
    //create element js/jquery
    //Lecture: w3d3
    //Use jquery to create a new element
    const article = $('<article>').addClass('tweetArticles');

    const header = $('<header>');
    $('<img>')
        .addClass('avatar')
        .attr('src', tweetData.user.avatars.small)
        .appendTo(header); //value image source gotten from tweetData
    $('<p>')
        .text(tweetData.user.name)
        .appendTo(header);
    $('<span>')
        .text(tweetData.user.handle)
        .appendTo(header);
    article.append(header); //appends header to article

    const section = $('<section>').addClass('middle').text(tweetData.content.text);
    article.append(section);
    
    const footer = $('<footer>').text(tweetData.created_at);
    article.append(footer);

    return article;

/*
        <article class= "tweetArticles">
          <header>
            <img class="avatar" src="/images/smiley.png">
            <p>Bill Fields</p>
            <span>@MrFields</span>
          </header>
          
          <section class= "middle">Little tweet here</section>
          
          <footer>10 Days ago</footer>
        </article>
*/
};

//test Code
//var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
 // to see what it looks like: console.log($tweet);
//$('#old-tweets').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



//DYNAMIC TWEETS: Task 2

function renderTweets (tweets) {
    for (const article of tweets ) {
        const newArticle = createTweetElement (article);
        $("#old-tweets").prepend(newArticle);
          // loops through tweets
        // calls createTweetElement for each tweet
        // takes return value and appends it to the tweets container
    }
}

 //change render tweets with response from loadtweets function. the data
//how to render tweets from loadData
//use renderTweets as the callback for the other function 

});

