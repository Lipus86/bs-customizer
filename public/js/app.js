(function(){
    var app = angular.module('bsCustomizer', []);
    
    app.controller('customizerCtrl', function($http, $rootScope){
        
        $http.get('/data/variables.json')
       .then(function(res){
            $rootScope.variables = res.data;
        });
    });
})();