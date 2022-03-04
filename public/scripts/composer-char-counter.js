$(document).ready(function() {
  
  const maxChar = 140;
  const $counter = $('.counter');

  //Adds text to ID counter
  $counter.text(maxChar);

  //grab the tweet text ID
  const $tweettext = $('#tweet-text');


  $tweettext.on('keyup', function() {
   
    // grabs this (tweettext) value and counts the length
    let textLength = $(this).val().length;
    if (maxChar < textLength) {
      $counter.addClass('past-limit');
    } else {
      $counter.removeClass('past-limit');
    }
    $('.counter').text(maxChar - textLength);
  });
  
});

