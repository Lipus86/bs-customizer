(function(){
    var app = angular.module('bsCustomizer', []);
    
    app.controller('customizerCtrl', function($http){
        var customizer = this;
        $http.get('/data/variables.json')
       .then(function(res){
            customizer.variables = res.data;
        });
    });
})();