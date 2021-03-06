// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params) {
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    // library: library

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */


    params.library.on('play', function(song) {
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song) {
      // get the current songQueue array
      var currentQueue = this.get('songQueue');
      // push the song to the songQueue array
      currentQueue.push(song);
      // set the updated songQueue array to the app
      this.set('songQueue', currentQueue);
    }, this);

    // params.library.on('ended', function(song) {
    //   song.dequeue();
    // }, this);

    // params.library.on('dequeue', function() {
    //   var currentQueue = this.get('songQueue');
    //   currentQueue.shift();
    //   this.set('songQueue', currentQueue);
    // }, this);

  }

});
