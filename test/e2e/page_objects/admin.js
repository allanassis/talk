module.exports = {
  commands: [{
    url: function() {
      return `${this.api.launchUrl}/admin`;
    },
    ready() {
      return this
        .waitForElementVisible('body');
    },
    login(user = {}) {
      const adminPage = this.page.admin();
  
      adminPage
        .navigate()
        .waitForElementVisible('@loginLayout')
        .waitForElementVisible('@signInForm')
        .setValue('@emailInput', user.email)
        .setValue('@passwordInput', user.password)
        .waitForElementVisible('@signInButton')
        .click('@signInButton');
  
      this.pause(3000);
      
      adminPage
        .waitForElementVisible('@moderationContainer');
    },
  }],
  elements: {
    'loginLayout': '.talk-admin-login',
    'signInForm': '.talk-admin-login-sign-in',
    'emailInput': '.talk-admin-login-sign-in #email',
    'passwordInput': '.talk-admin-login-sign-in #password',
    'signInButton': '.talk-admin-login-sign-in-button',
    'storiesNav': '.talk-admin-nav-stories',
    'storiesDrawerNav': '.talk-admin-drawer-nav .talk-admin-nav-stories',
    'storiesSection': '.talk-admin-stories',
    'communityNav': '.talk-admin-nav-community',
    'communityDrawerNav': '.talk-admin-drawer-nav .talk-admin-nav-community',
    'communitySection': '.talk-admin-community',
    'moderationContainer': '.talk-admin-moderation-container',
    'drawerButton': '.mdl-layout__drawer-button',
    'drawerOverlay': 'div.mdl-layout__obfuscator.is-visible',
    'settingsButton': '.talk-admin-header-settings-button',
    'signOutButton': '.talk-admin-header-sign-out',
  }
};
