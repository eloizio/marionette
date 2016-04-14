define(['marionette', 'backbone'], function(Marionette, Backbone) {
  return Marionette.LayoutView.extend({
    template: '<div>Hello World!</div>',
    regions: {
      content: '#content'
    }
  });
});