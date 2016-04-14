define(['backbone', 'marionette', 'models/userModel', 'text!templates/userTemplate'], 
  function(Backbone, Marionette, UserModel, UserTemplate) {

    return Marionette.ItemView.extend({

      tagName: 'li',
      className: 'collection-item avatar',

      template: function(data) {
        return _.template(UserTemplate)(data);
      },

      templateHelper: function() {
        return this.model.attributes;
      }
    });

});