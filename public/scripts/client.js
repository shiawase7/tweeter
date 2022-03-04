/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function to escape text, deal with cross-site scripting
const escapes = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  $('#tweet-container').empty();
  for (const tweet of tweets) {
    $('#tweet-container').prepend(createTweetElement(tweet));
  }
};

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
          ${escapes(tweetContent)}
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
  `;
};


const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json"
  }).then((result) => {
    renderTweets(result);
  });
};



$(document).ready(function() {
  // const $tweet = createTweetElement(tweetData);
  // $('#tweet-container').append($tweet);
  // renderTweets(data);
  loadTweets();

  $('#compose-tweet').submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length;

    if (tweetLength > 140) {
      $("#error").text("Error! Your tweet is too long!");
      $("#error").slideDown("slow");
      
      return false;
    }

    if ($("#tweet-text").val() === "") {
      $("#error").text("Error! Your tweet is empty!");
      $("#error").slideDown("slow");
     
      return false;
    }

    $("#error").slideUp("slow");


    $.ajax({
      type: 'POST',
      url: $("form").attr("action"),
      data: serializedData
    }).then(() => {
      location.reload();
    });
  });


});




