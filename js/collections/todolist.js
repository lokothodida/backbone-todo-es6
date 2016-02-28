import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Store from 'backbone.localstorage';
import Todo from '../models/todo';

var TodoList = Backbone.Collection.extend({
  model: Todo,

  localStorage: new Store('backbone-todo'),

  completed: function() {
    return this.filter(function(todo) {
      return todo.get('completed');
    });
  },

  remaining: function() {
    return this.without.apply(this, this.completed());
  },
});

export default TodoList;