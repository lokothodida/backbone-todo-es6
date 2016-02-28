import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import TodoList from './collections/todolist';
import AppView from './views/app';

var todoList = new TodoList();

var Router = Backbone.Router.extend({
  routes: {
    '' : 'displayAllTodos',
    'filter/:filter' : 'setFilter',
    '*path' : 'displayError',
  },
  
  setFilter: function(filter) {
    console.log(filter);
    switch (filter) {
      case 'pending':
        todoList.trigger('resetPending');
        break;
      case 'completed':
        todoList.trigger('resetCompleted');
        break;
      default:
        todoList.trigger('resetAll');
        break;
    }
  },
  
  displayAllTodos: function(path) {
    todoList.trigger('resetAll');
  },
  
  displayError: function() {
    console.log('errorpage');
  },
});

var initialize = function() {
  var router = new Router();
  var appView = new AppView({ model: todoList });

  Backbone.history.start();
};

export default {
  initialize,
};