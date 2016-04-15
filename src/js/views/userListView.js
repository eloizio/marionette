define(['backbone', 'marionette', 'views/userInteractiveView', 'views/noUserView'], 
  function(Backbone, Marionette, UserInteractiveView, NoUserView) {

  return Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'collection',

    childView: UserInteractiveView,
    emptyView: NoUserView,

    initialize: function(options) {
      this.getFriendship = options.getFriendship || false;
      this.friendshipStatus = options.friendshipStatus;
      this.userRequested = options.userRequested;
    },

    childViewOptions: function() {
      return {
        getFriendship: this.getFriendship,
        friendshipStatus: this.friendshipStatus,
        userRequested: this.userRequested
      };
    }
  });

});