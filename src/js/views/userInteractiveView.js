define(['backbone', 'marionette', 'views/userView', 'models/friendshipModel', 'text!templates/userInteractiveTemplate'], 
  function(Backbone, Marionette, UserView, FriendshipModel, UserInteractiveTemplate) {

    return UserView.extend({

      template: function(data) {
        return _.template(UserInteractiveTemplate)(data);
      },

      ui: {
        addFriendButton: 'button#addFriend',
        waitingApprovalButton: 'button#waitingApproval',
        acceptRequestButton: 'button#acceptRequest',
        friendDisclaimer: 'span#friendDisclaimer'
      },

      events: {
        'click @ui.addFriendButton': 'addFriendHandler',
        'click @ui.acceptRequestButton': 'acceptRequestHandler'
      },

      // Can't make it work
      // modelEvents: {
      //   'sync':  'adjustFriendshipStatus'
      // },

      initialize: function(options) {
        if(options.getFriendship) {
          this.friendship = new FriendshipModel({
            id: this.model.get('idAttribute')
          });
          this.listenTo(this.friendship, 'sync', this.adjustFriendshipStatus);
          this.friendship.getFriendship();
        }
        else if(typeof options.friendshipStatus !== 'undefined') {
          this.bindUIElements();
          this.handleFriendshipButtons(options.friendshipStatus, options.userRequested);
        }
      },

      handleFriendshipButtons: function(friendshipStatusCode, userRequested) {
        _.each(this.ui, function(index, element, list) {
          list[element].addClass('hide');
        }); 

        if(friendshipStatusCode === 0 && userRequested !== this.model.get('idAttribute')){
          this.ui.acceptRequestButton.removeClass('hide');
        }
        else if(friendshipStatusCode === 0 || friendshipStatusCode === -1){
          this.ui.waitingApprovalButton.removeClass('hide');
        }
        else if(friendshipStatusCode === 1){
          this.ui.friendDisclaimer.removeClass('hide');
        }
        else if(!friendshipStatusCode){
          this.ui.addFriendButton.removeClass('hide');
        }
      },

      adjustFriendshipStatus: function() {
        this.handleFriendshipButtons(this.friendship.get('status'), this.friendship.get('userRequested'));
      },

      addFriendHandler: function() {
        this.friendship.addFriend();
      },

      acceptRequestHandler: function() {
        this.friendship.acceptRequest();
      }

    });

});