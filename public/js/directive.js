/**Basado en el fiddle http://jsfiddle.net/qwtaq5o8/ **/
angular.module('TestLaureateApp').directive('scrolly', function ($window) {
  return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          var raw = element[0];

          angular.element($window).bind('scroll', function () {
              if ((this.pageYOffset + 200)/(raw.offsetHeight) > 0.6
               ) {
                  scope.$apply(attrs.scrolly);
              }
          });
      }
  };
});
