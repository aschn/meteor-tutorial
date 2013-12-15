Router.configure({
      layoutTemplate: 'layout',
      loadingTemplate: 'loading',
      waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function() {
    // routes
    this.route('postsList', {
      path: '/'
    });
    this.route('postPage', {
      path: '/posts/:_id',
      data: function() {return Posts.findOne(this.params._id);}
    });
    this.route('postSubmit', {
      path: '/submit'
    });

    // login hook
    var requireLogin = function() {
      if (! Meteor.user()) {
	if (Meteor.loggingIn())
	  this.render(this.loadingTemplate);
	else
	  this.render('accessDenied');
	this.stop();
      }
    }

    // apply login hook
    Router.before(requireLogin, {only: 'postSubmit'});
});
