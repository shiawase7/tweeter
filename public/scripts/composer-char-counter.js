$(document).ready(function() {
  
  const maxChar = 140;

  //Adds text to ID counter
  $('.counter').text(maxChar);

  //grab the tweet text ID
  const $tweettext = $('#tweet-text');


  $tweettext.on('keyup', function() {
   
    // grabs this (tweettext) value and counts the length
    let textLength = $(this).val().length;
   
    console.log($(this).val());
    console.log(maxChar - textLength)

    $('.counter').text(maxChar - textLength);
  })
  
});

