
(function (root, factory)
{
    'use strict';
    var Pikaday;
    if (typeof exports === 'object') {
        // CommonJS module
        // Load pickaday as an optional dependency
        try { Pikaday = require('pikaday'); } catch (e) {}
        module.exports = factory(Pikaday);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function (req)
        {
            // Load pickaday as an optional dependency
            var id = 'pikaday';
            try { Pikaday = req(id); } catch (e) {}
            return factory(Pikaday);
        });
    } else {
        root.Pikaday = factory(root.Pikaday);
    }
}(this, function (Pikaday){
  angular.module("angular.datepicker", [])
  .directive("pickaDay",function() {
      return {
          restrict: "A",
          scope: {
              format: "@",
              minDate: "@",
              maxDate: "@",
              numberOfMonths: "@",
              disableWeekends: "@",
              yearRange: "@",
              defaultDate: "@",
              onSelect: "=",
              onOpen: "=",
              onClose: "=",
              onDraw: "="
          },
          link: function($scope, $elem) {
              var picker = null;
              $scope.$watchGroup(["format", "minDate", "maxDate", "numberOfMonths", "disableWeekends", "yearRange", "defaultDate"], function() {
                  if(picker){
                      picker.destroy();
                  }
                  var date = new Date();
                  format = $scope.format || "YYYY-MM-D",
                  defaultDate = "undefined" != typeof $scope.defaultDate ? new Date($scope.defaultDate) : !1,
                  minDate = "undefined" != typeof $scope.minDate ? new Date($scope.minDate) : !1,
                  maxDate = "undefined" != typeof $scope.maxDate ? new Date($scope.maxDate) : !1,
                  numberOfMonths = $scope.numberOfMonths || 3,
                  disableWeekends = !!$scope.disableWeekends || !1,
                  yearRange = $scope.yearRange || [1990, date.getFullYear()];

                  picker = new Pikaday({
                      field: $elem[0],
                      format: format,
                      minDate: minDate,
                      maxDate: maxDate,
                      numberOfMonths: numberOfMonths,
                      setDefaultDate: true,
                      defaultDate: defaultDate,
                      disableWeekends: disableWeekends,
                      yearRange: yearRange,
                      onSelect: function() {
                          $scope.onSelect && "function" == typeof $scope.onSelect && $scope.onSelect(this.getMoment().format(format), this.getMoment())
                      },
                      onOpen: function() {
                          $scope.onOpen && "function" == typeof $scope.onOpen && $scope.onOpen(this.getMoment().format(format), this.getMoment())
                      },
                      onClose: function() {
                          $scope.onClose && "function" == typeof $scope.onClose && $scope.onClose(this.getMoment().format(format), this.getMoment())
                      },
                      onDraw: function() {
                          $scope.onDraw && "function" == typeof $scope.onDraw && $scope.onDraw(this.getMoment().format(format), this.getMoment())
                      }
                  })
              }), $scope.$on("$destroy", function() {
                  picker.destroy();
              })
          }
      }
})
}));