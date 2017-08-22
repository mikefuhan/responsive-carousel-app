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
        url: self.endpoint + '/albums/1/photos', // Get photos from one album instead of loading 5000 items!
        method: 'GET'
      })
    ).then(function(posts, photos) {
      posts = posts[0].slice(0, 10); // Lmit data to 10 items
      photos = photos[0].slice(0, 10); // Get first 10 items
      $.each(posts, function(i) {
        self.cardsData.push({
          title: this.title,
          content: this.body,
          // Update URL to the new HTTPS placeholder.com website formerly placehold.it
          // Change photos dimensions and remove dimensions text
          photo: 'https://via.placeholder.com/300' + photos[i].url.slice(23) + '?text=+'
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