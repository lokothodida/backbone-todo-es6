import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import TodoList from './collections/todolist';
import AppView from './views/app';

var todoList = new TodoList();

var Router = Backbone.Router.extend({
  routes: {
    ''               : 'displayAllTodos',  // main page
    'filter/:filter' : 'setFilter',        // filtered results
  },
  
  setFilter: function(filter) {
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
});

var initialize = function() {
  // Begin routing and display the main page
  var router  = new Router();
  var appView = new AppView({ model: todoList });

  // Use the history module to keep track of the page
  Backbone.history.start();
};

export default {
  initialize,
};