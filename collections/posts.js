Posts = new Meteor.Collection('posts');

Meteor.methods({
  post: function(postAttributes) {
      // set vars
      var user = Meteor.user(),
	postWithSameLink = Posts.findOne({url: postAttributes.url});

      // check for logged in
      if (!user)
	throw new Meteor.Error(401, "log in please");

      // check for title
      if (!postAttributes.title)
	throw new Meteor.Error(422, "need a title");

      // check for repeats, 302 = redirect
      if (postAttributes.url && postWithSameLink) {
	throw new Meteor.Error(302, 'this link has already been posted',
			       postWithSameLink._id);
      }

      // pick out whitelisted keys
      var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
	userId: user._id,
	    author: user.username,
	    submitted: new Date().getTime()
      });

      // actually insert
      var postId = Posts.insert(post);
      return postId;
  }
});
