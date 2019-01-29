$(document).ready(function() {
    // --- our code goes here ---
    console.log("Document is ready");
 
  // CSS selector for the form text input: form. textarea
  $("form textarea").on("input", function(event){
    let loggingText = $(this).val();
    let loggingTextLength = loggingText.length;
    let countDown = 140 - loggingTextLength;
    let counter = $(this).closest("form")
        .find(".counter"); //element that hold the value w jquery
    counter.text(countDown);

    if (countDown < 0) {
        counter.addClass("addRed");
    } else {
        counter.removeClass("addRed");
    };
    
    //console.log(loggingText); //get the text/ the value of the text //set into a value  
    //console.log(loggingTextLength);
    //console.log(countDown);
    //console.log($(this).closest("form").find(".counter").text(countDown));


    //target the value of this .counter.
    //$(this.counter).val(countDown);
    //form counter: form.counter
    //counter counts down
  })

});
