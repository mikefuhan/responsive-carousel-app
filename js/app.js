$(function(){

  var AppViewModel = function() {
    var self = this;
    self.cardsData = ko.observableArray();
    self.endpoint = 'https://jsonplaceholder.typicode.com';

    $.when(
      $.ajax({
        url: self.endpoint + '/posts',
        method: 'GET'
      }),
      $.ajax({
        url: self.endpoint + '/photos',
        method: 'GET'
      })
    ).then(function(posts, photos) {
      posts = posts[0].slice(0, 10); // Lmit data to 10 posts
      photos = photos[0].slice(0, 10); // Get first 10 photos objects
      $.each(posts, function(i) {
        self.cardsData.push({
          title: this.title,
          content: this.body,
          photo: 'https://via.placeholder.com' + photos[i].url.slice(19)
        });
      });
      // Carousel initialization
      $('.carousel').carousel({
        indicators: true,
        shift: 20,
        padding: 20
      });
    }, function(e) { // Fire a toast message in case Ajax failed
      Materialize.toast('Failed to load posts, try again later!', 8000);
    });

  };

  ko.applyBindings(new AppViewModel());
});