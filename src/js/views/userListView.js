define(['backbone', 'marionette', 'views/userInteractiveView'], function(Backbone, Marionette, UserInteractiveView) {

  return Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'collection',

    childView: UserInteractiveView,

    collectionEvents: {
      'sync': 'checkout'
    },

    checkout: function() {
      console.log('aaa');
    }
  });

});