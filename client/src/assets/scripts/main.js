(function ($) {
    /**
     * Check a selector exist or not
     */
    $.fn.exists = function () {
        return this.length !== 0;
    };

    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        };
        console.log(22);
    });

})(jQuery);