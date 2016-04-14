define(['marionette', 'backbone', 'views/loginFormView', 'text!templates/loginContainerTemplate'], function(Marionette, Backbone, LoginFormView, LoginContainerTemplate) {
  return Marionette.LayoutView.extend({

    template: LoginContainerTemplate,

    regions: {
      form: '#form',
      footer: '#footer'
    },

    childEvents: {
      'login:success': 'handleLoginSuccess'
    },

    handleLoginSuccess: function(childView, model, response) {
      this.trigger('login:success', model, response);
    },

    onBeforeShow: function() {
      this.showChildView('form', new LoginFormView())
    }

  });
});