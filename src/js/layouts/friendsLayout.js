define(['marionette', 'backbone', 'text!templates/friendsTemplate', 'models/userModel', 'views/userView', 'collections/friendshipCollection', 'views/userListView'], 
  function(Marionette, Backbone, FriendsTemplate, UserModel, UserView, FriendshipCollection, UserListView) {
  return Marionette.LayoutView.extend({

    template: FriendsTemplate,

    regions: {
      profile: '#profile',
      friends: '#friends',
      pendingRequests: '#requests',
      pendingApprovals: '#approvals'
    },

    initialize: function() {
      this.initProfile();
      this.initFriendsList();
      this.initRequestedFriendsList();
      this.initApprovalFriendsList();
    },

    initProfile: function() {
      this.model = new UserModel({
        id: 'me'
      });

      this.listenTo(this.model, 'sync', this.showProfileView, this);
      this.model.fetch({
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        }
      });
    },

    showProfileView: function() {
      this.showChildView('profile', new UserView({
        model: this.model
      }));
    },

    initFriendsList: function() {
       // Backend is crashing when calling this service
      this.friendsList = new FriendshipCollection({
        fieldToParse: 'userRequested'
      });
      this.listenTo(this.friendsList, 'sync', this.friendListView, this);
      this.friendsList.getFriendships();
    },

    initRequestedFriendsList: function() {
      this.requestedFriendsList = new FriendshipCollection({
        fieldToParse: 'userRequested'
      });
      this.listenTo(this.requestedFriendsList, 'sync', this.requestedFriendListView, this);
      this.requestedFriendsList.getFriendshipRequested();
    },

    initApprovalFriendsList: function() {
      this.pendingApprovalFriendsList = new FriendshipCollection({
        fieldToParse: 'userRequester'
      });
      this.listenTo(this.pendingApprovalFriendsList, 'sync', this.pendingApprovalFriendListView, this);
      this.pendingApprovalFriendsList.getFriendshipRequests();
    },

    showFriendsList: function(regionName, collection, friendshipStatus, userRequested) {
      this.showChildView(regionName, new UserListView({
        collection: collection,
        getFriendship: false,
        friendshipStatus: friendshipStatus,
        userRequested: userRequested
      }));
    },

    friendListView: function() {
      this.showFriendsList('friends', this.friendsList);
    },

    requestedFriendListView: function() {
      this.showFriendsList('pendingRequests', this.requestedFriendsList, -1, this.model.get('idAttribute'));
    },

    pendingApprovalFriendListView: function() {
      this.showFriendsList('pendingApprovals', this.pendingApprovalFriendsList, 0, this.model.get('idAttribute'));
    }

  });
});