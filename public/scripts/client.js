/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function(data) {
  const $username = $(".user-name");
  const $userProfilePic = $('.user-profile-pic');
  const img = new Image();
  img.src = data.user.avatars;
  const $handle = $('.handle');
  const $tweetcontent = $('tweet-content');
  const $tweetdate = $('.tweet-date');

  $username.text(data.user.name);
  $userProfilePic.append(img);
  $handle.text(data.user.handle);
  $tweetcontent.text(data.content);
  $tweetdate.text(data.created_at);
}

$(document).ready(function() {
  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);
});




// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
