define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    urlRoot: 'http://localhost:8081/users',

    parse: function(data) {
      return {
        idAttribute: data._id,
        name: data.name,
        email: data.email,
        image: 'http://www.gravatar.com/avatar/' + data._id + '?d=monsterid&size=50'
      }
    },

    modelEvents: {
      'sync': 'showProfileView'
    },

    showProfileView: function() {
      console.log('aaaaa');
    }
    
  });
});