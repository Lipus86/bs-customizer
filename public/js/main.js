$(function() {
    var prevElement, activeElements, elementsProp, variables;
    $.ajax({
        url: '../data/config.json',
        dataType: 'json',
        async: false,
        success: function(data) {
            elementsProp = data;
        }
    });
    $.ajax({
        url: '../data/variables.json',
        dataType: 'json',
        async: false,
        success: function(data) {
            variables = data;
        }
    });

    $('.submitForm').on('click', function(e){
        sendForm(e);
    });
    for (elem in elementsProp) {
        $(elem).data('properties', elementsProp[elem]);
        activeElements = activeElements + ',' + elem;
    };
    $('#main').find(activeElements).on({
        click: function(e){
            var currentElement = $(this);
            showInputs(currentElement);
            e.stopPropagation();
            e.preventDefault();
        },
        mouseover : function(e) {
            $(activeElements).removeClass('hover');
            $(this).addClass('hover');
            e.stopPropagation();
        },
        mouseleave: function(e) {
            $(this).removeClass('hover');
            e.stopPropagation();
        }
    });
    $('#main').on('click', function(e){
        showInputs('all');
    });
    $(activeElements)
    $(document).on('keyup', function(e) {
      if (e.keyCode == 27) hidePopup();
    });

    function sendForm(e){
        var sendData = {};
        var formData = $('#generalForm').serializeObject();
        for (var key in formData ) {
            if(!(formData[key] == variables[key].value)) {
                sendData[key] = formData[key];
            }
        };
        $.ajax({
          type: 'POST',
          url: '/',
          data: sendData,
          success: function(data) {
            $('#style').replaceWith('<link id="style" rel="stylesheet" type="text/css" href="bootstrap.css" />');
            (data == 'OK') ? hideError() : showError('Check values');
          },
          error:  function(){
                showError('Problem with network');
            }
        });
        e.preventDefault();
    };
    function showError(text){
        $('body').append('<div id="info"></div>');
        $('#info').html('<div class="alert alert-danger" role="alert">' + text + '</div>');
    };
    function hideError(){
        if ($('#info')) $('#info').remove();
    };
    function showInputs(currentElement){
        if (currentElement === 'all') {
            $('.input-holder').show();
            if (prevElement) prevElement.removeClass('active-element');
        } else {
            hideInputs();
            var properties = currentElement.data('properties');
            for (prop in properties) {
                $('.input-holder').each(function(){
                    if ($(this).attr('id') == properties[prop]) {
                        $(this).show();
                    }
                });
            }
            currentElement.addClass('active-element');
            prevElement = currentElement;
        }
    };
    function hideInputs(){
        $('.input-holder').hide();
        if (prevElement) prevElement.removeClass('active-element');
    };
    $.fn.serializeObject = function(){
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});