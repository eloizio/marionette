define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    urlRoot: 'http://localhost:8081/friendships',

    addFriend: function() {
      this.save({},{
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        },
        type: 'POST'
      });
    },

    acceptRequest: function() {
      this.save({}, {
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        },
        type: 'PUT'
      });
    },

    getFriendship: function() {
      this.fetch({
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        }
      });
    }
    
  });
});