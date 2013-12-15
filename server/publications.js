Meteor.publish('posts', function () {
    return Posts.find({}, {fields: {author: false}});
});
