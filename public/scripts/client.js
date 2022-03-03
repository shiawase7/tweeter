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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  $('#tweet-container').empty();
  for (const tweet of tweets) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  }
}

const createTweetElement = function(data) {

  const username = data.user.name;
  const userProfilePic = data.user.avatars;
  const img = new Image();
  img.src = data.user.avatars;
  const handle = data.user.handle;
  const tweetContent = data.content.text;
  const tweetDate = timeago.format(data.created_at);

  return `
  <article class="tweet">
          <header class="tweet-header">
            <div class="user-profile">
              <div class="user-profile-pic">
              <img src=${userProfilePic}/>
              </div>
              <div class="user-name">
              ${username}
              </div>
            </div>
            <div class="handle">
            ${handle}
            </div>
          </header>

          <p class="tweet-content">
          ${tweetContent}
          </p>

          <footer>
           <div><span class="tweet-date">${tweetDate}</span></div>
           <div class="icons"> 
             <div><i class="fa-solid fa-flag"></i></div>
             <div><i class="fa-solid fa-retweet"></i></div>
             <div><i class="fa-solid fa-heart"></i></div>
           </div>
          </footer>
  </article>
  `
}

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log("Tweets data:",data)
      renderTweets(data)
    }
  })
};

$(document).ready(function() {
  // const $tweet = createTweetElement(tweetData);
  // $('#tweet-container').append($tweet);
  // renderTweets(data);
  loadTweets();

  $('#compose-tweet').submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length

    if (tweetLength > 140) {
      alert("Error! Your tweet is too long!");
      return false;
    }

    if ($("#tweet-text").val() === "") {
      alert("Error! Your tweet is empty!");
      return false;
    }


    $.ajax({ 
      type: 'POST',
      url: $("form").attr("action"),
      data: serializedData
    })
   

    console.log( $( this ).serialize() );
    // event.preventDefault();

  })


});




