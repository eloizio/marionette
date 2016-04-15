define(['backbone', 'marionette', 'text!templates/noUserTemplate'], 
  function(Backbone, Marionette, NoUserTemplate) {

    return Marionette.ItemView.extend({

      tagName: 'li',

      template: NoUserTemplate

    });

});