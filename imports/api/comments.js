import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Comments = new Mongo.Collection('comments');


Meteor.methods({
  'comments.insert'(text,id) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Comments.insert({
       text,
      createdAt: new Date(),
	  owner: Meteor.userId(),
      email: Meteor.user().emails[0].address,
	  id:id,	
    });
  },
  'comments.remove'(commentId) {
    check(commentId, String);
    Comments.remove(commentId);
  },
});