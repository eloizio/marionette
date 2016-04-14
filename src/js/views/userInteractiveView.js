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

      initialize: function() {
        this.friendship = new FriendshipModel({
          id: this.model.get('idAttribute')
        });
        this.listenTo(this.friendship, 'sync', this.adjustFriendshipStatus);
        this.friendship.getFriendship();
      },

      adjustFriendshipStatus: function() {
        var friendshipStatusCode = this.friendship.get('status');

        _.each(this.ui, function(index, element, list) {
          list[element].addClass('hide');
        }); 

        if(friendshipStatusCode === 0 && this.friendship.get('userRequested') !== this.model.get('idAttribute')){
          this.ui.acceptRequestButton.removeClass('hide');
        }
        else if(friendshipStatusCode === 0){
          this.ui.waitingApprovalButton.removeClass('hide');
        }
        else if(friendshipStatusCode === 1){
          this.ui.friendDisclaimer.removeClass('hide');
        }
        else if(!friendshipStatusCode){
          this.ui.addFriendButton.removeClass('hide');
        }
      },

      addFriendHandler: function() {
        this.friendship.addFriend();
      },

      acceptRequestHandler: function() {
        this.friendship.acceptRequest();
      }

    });

});