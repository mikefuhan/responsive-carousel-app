$(function(){

  var AppViewModel = function() {
    var self = this;
    self.posts = ko.observableArray();
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
    ).then(function(data, photos) {
      // Lmit data to 10 posts
      $.each(data[0].slice(0, 10), function () {
        self.posts.push({
          title: this.title,
          content: this.body
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