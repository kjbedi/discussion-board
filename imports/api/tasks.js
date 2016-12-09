import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {Comments} from "./comments.js";
 
export const Tasks = new Mongo.Collection('tasks');
// export const Comments = new Mongo.Collection('comments');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      createdAt: new Date(),
	  owner: Meteor.userId(),
      email: Meteor.user().emails[0].address,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    Tasks.remove(taskId);
	//remove comments associated with the task
	Comments.remove({"id":taskId});
  }
});