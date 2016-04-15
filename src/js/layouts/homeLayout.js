define(['marionette', 'backbone', 'text!templates/homeTemplate', 'models/userModel', 'views/userView', 'collections/userCollection', 'views/userListView'], 
  function(Marionette, Backbone, HomeTemplate, UserModel, UserView, UserCollection, UserListView) {
  return Marionette.LayoutView.extend({

    template: HomeTemplate,

    regions: {
      profile: '#profile',
      userList: '#userList'
    },

    modelEvents: {
      'sync': 'showProfileView'
    },

    initialize: function() {
      this.initProfile();
      this.initUserList();
    },

    initProfile: function() {
      this.userModel = new UserModel({
        id: 'me'
      });

      this.listenTo(this.userModel, 'sync', this.showProfileView, this);
      this.userModel.fetch({
        headers: {
          'Authorization': 'bearer ' + sessionStorage.sessionId
        }
      });
    },

    initUserList: function() {
      this.userList = new UserCollection();
      this.listenTo(this.userList, 'sync', this.showUserListView, this);
      this.userList.getAllUsers();
    },

    showUserListView: function () {
      this.showChildView('userList', new UserListView({
        collection: this.userList,
        getFriendship: true
      }));
    },

    showProfileView: function () {
      this.showChildView('profile', new UserView({
        model: this.userModel
      }));
    }

  });
});