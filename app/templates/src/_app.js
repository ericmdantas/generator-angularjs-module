"use strict";

;(function(ng)
{
  ng
    .module('<%= app %>', [])
    .service('GreetingService', [function()
    {
        var _sayHello = function()
        {
            return "hello there!";
        }

        this.sayHello = _sayHello;
    }]);
}(angular))
