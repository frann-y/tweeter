$(document).ready(function() {
    // --- our code goes here ---
    console.log("Document is ready");
 
  // CSS selector for the form text input: form. textarea
  $("form textarea").on("input", function(event){
    let loggingText = $(this).val();
    let loggingTextLength = loggingText.length;
    let countDown = 140 - loggingTextLength;
    let counter = $(this).closest("form")
        .find(".counter");
    counter.text(countDown);

    if (countDown < 0) {
        counter.addClass("addRed");
    } else {
        counter.removeClass("addRed");
    };
  })
});
