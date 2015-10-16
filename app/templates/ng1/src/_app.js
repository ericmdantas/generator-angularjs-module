;(function(ng) {
  "use strict";

  ng.module('module-name', [])
    .service('GreetingService', [function GreetingService() {
          this.sayHello = function() {
             return "hello there!";
          };
      }]);
}(angular));
