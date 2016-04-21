;(function(ng) {
  "use strict";

  ng.module('<%= app %>', [])
    .service('GreetingService', [function GreetingService() {
        this.sayHello = function() {
           return "hello there!";
        };
      }]);
}(window.angular));
