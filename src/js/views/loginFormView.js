define(['backbone', 'marionette', 'models/loginModel', 'text!templates/loginFormTemplate'], function(Backbone, Marionette, LoginModel, LoginFormTemplate) {

  return Marionette.ItemView.extend({

    template: LoginFormTemplate,

    model: new LoginModel(),

    ui: {
      usernameField: '#username',
      passwordField: '#password',
      submit: 'button'
    },

    events: {
      'click @ui.submit': 'doLogin'
    },

    initialize: function() {
      this.listenTo(this.model, 'login:success', this.handleLoginSuccess);
      this.listenTo(this.model, 'login:failure', this.handleLoginFailure);
    },

    handleLoginSuccess: function(model, response) {
      this.triggerMethod('login:success', model, response);
    },

    handleLoginFailure: function(model, response) {
      alert(response.responseText);
    },

    doLogin: function() {
      this.model.set('username', this.ui.usernameField.val());
      this.model.set('password', this.ui.passwordField.val());
      this.model.login();
    }

  });

});