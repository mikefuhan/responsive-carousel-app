$(function(){

  var AppViewModel = function() {
    var self = this;
    self.posts = ko.observableArray();

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET'
    }).then(function(data) {
      // Lmit data to 10 posts
      $.each(data.slice(0, 10), function () {
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

});