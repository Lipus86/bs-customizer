(function(){
    var app = angular.module('bsCustomizer', []);
    
    app.controller('customizerCtrl', function(){
       this.variables = bsVariables;
    });



    var bsVariables = [
        {
            name: 'gray-base',
            alias: 'grayLase',
            value: '#000',
            description: 'Text color'
        },
        {
            name: 'gray-darker',
            alias: 'grayDarker',
            value: 'lighten(@gray-base, 13.5%)',
            description: 'gray-darker color'
        },
        {
            name: 'gray-dark',
            alias: 'grayDark',
            value: 'lighten(@gray-base, 20%)',
            description: 'gray-dark color'
        },
        {
            name: 'gray',
            alias: 'gray',
            value: 'lighten(@gray-base, 33.5%)',
            description: 'gray color'
        }
    ];
})();