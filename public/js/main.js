$(function() {
    var prevElement,
        activeElements,
        elementsProp = {
           'h1': ['hcolor', 'fx', 'gh', 'lf'],
           'h2': ['gh', 'lf'],
           'h3': [ 'gh', 'lf']
        };


    $('.submitForm').on('click', function(e){
        sendForm(e, $(this).parents('form').serialize());
        console.log($(this).parents('form').serialize());
    });
    for (elem in elementsProp) {
        $(elem).data('properties', elementsProp[elem]);
        activeElements = activeElements + ',' + elem;
    };
    $(activeElements).on('click', function(e){
        var currentElement = $(this);
        showPopup(currentElement);
        e.stopPropagation();
        e.preventDefault();
    });
    $('body').on('click', function(e){
        hidePopup();
    });
    $(activeElements).on({
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
    $(document).on('keyup', function(e) {
      if (e.keyCode == 27) hidePopup();
    });

    function sendForm(e, formData){
        $.ajax({
          type: 'POST',
          url: '/',
          data: formData,
          success: function(data) {
            $('#style').attr('href', 'bootstrap.css');
            (data == 'OK') ? hideError() : showError('Check values');
          },
          error:  function(){
                showError('Problem with network');
            }
        });
        e.preventDefault();
    };
    function showError(text){
        $('#info').html('<div class="alert alert-danger" role="alert">' + text + '</div>');
    };
    function hideError(){
        $('#info').html('&nbsp;');
    };
    function showPopup(currentElement){
        if (prevElement)  hidePopup(prevElement);
        generatePopup(currentElement);
        currentElement.addClass('active-element');
        prevElement = currentElement;
    };
    function hidePopup(){
        $('#pop-up').remove();
        if (prevElement) prevElement.removeClass('active-element');
    };
    function generatePopup(currentElement){
        var properties = currentElement.data('properties');
        $('body').append('<div id="pop-up" class="well"></div>')
        for (prop in properties) {
            $('#pop-up').append('<input type="text" name="' + properties[prop] + '"/>');
        }
        $('#pop-up').append('<input class="btn btn-info submitForm" type="submit" value="Update" /><a href="#" class="close"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>');
        $('.close, .allSettings').on('click', function(){
            hidePopup();
        });
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