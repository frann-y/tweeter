/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
    const ROOT_URL = 'http://localhost:8080';

  //Hide the NewTweet menu
    $(".new-tweet").hide();

  //Compose button to show NewTweet menu
    $("button").click(function(){
        $(window).scrollTop(0);
        $("section.new-tweet").slideToggle(function(){
            $("textarea").select();
        });
      });


  //Request helper function. 
    const request = (options, cb) => {
        $.ajax(options)
          .done(response => {
            cb(response);
          })
          .fail(err => {
            console.log('Error: ', err);
          })
          .always(() => {
            console.log('Request completed.');
          });
      };

  //Form submission using JQuery. Post request.
    $(".new-tweet form").submit(function(event) {
        event.preventDefault();
        let loggingText = $("form textarea").serialize();
      
            if(loggingText.length > 145 /*includes text=*/) {
                $( ".error" ).slideUp("fast", function() {
                    $(this).slideDown("fast").text( "Character limit exceeded.");
                })
            } else if (loggingText.length === 5/*cause  of serialization*/) {
                $( ".error" ).slideUp("fast", function() {
                    $(this).slideDown("fast").text( "Text field is empty.");
                })
            } else {
                $.ajax('/tweets', {
                    method: 'POST',
                    data: loggingText,
                 }).then(function(){
                    $( ".error" ).slideUp("fast") 
                    loadTweets(loggingText);
                    $("form textarea").val(''); //clears the form after
                    $(".error").text('');//clear error //empty
                    $(".counter").text(140);//reset counter //140
                })
            }
    });

  //W3D3: Fetching tweets with AJax. GET request.
    const loadTweets = () => {
        const tweetLog = $.ajax("/tweets", {
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

   //DYNAMIC TWEETS: create element w/ js/jquery
    function createTweetElement (tweetData) {
        const article = $('<article>').addClass('tweetArticles');

        const header = $('<header>');
        $('<img>')
            .addClass('avatar')
            .attr('src', tweetData.user.avatars.small)
            .appendTo(header); 
        $('<p>')
            .text(tweetData.user.name)
            .appendTo(header);
        $('<span>')
            .text(tweetData.user.handle)
            .appendTo(header);
        article.append(header);

        const section = $('<section>').addClass('middle').text(tweetData.content.text);
        article.append(section);
        
        const footer = $('<footer>').text(tweetData.created_at);
        article.append(footer);

        return article;
    };

  //DYNAMIC TWEETS: Loop through and render/prepend the tweets

    function renderTweets (tweets) {
        for (const article of tweets ) {
            const newArticle = createTweetElement (article);
            $("#old-tweets").prepend(newArticle);
        }
    }
});

