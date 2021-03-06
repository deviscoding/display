/**
 * Determines which breakpoint is currently active, either by querying for a psuedo element on the body
 * or by injecting an element with display classes.
 *
 * @returns {jQuery}
 */
jQuery.fn.extend( {
  isBreakpoint: function ( points ) {
    var query = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '') || null;
    if ( !points.constructor === Array ) { points = [ points ]; }
    if (null !== query) { return (points.indexOf(query) !== -1); }
    var test  = false;
    var $body = $( 'body' );
    var cls = ' d-none d-sm-none d-md-none d-lg-none d-xl-none';
    $.each( points, function ( index, alias ) {
      if ( !$body.find( '.detect-' + alias ).length ) {
        var tCls = 'detect-' + alias + cls;
        tCls = (alias === 'xs') ? tCls.replace('d-none','d-inline') : tCls.replace(alias + '-none',alias + '-inline');
        $body.append( '<span class="' + tCls + '"></span>' );
      }
      if ( $( '.detect-' + alias ).first().is( ':visible' ) ) {
        test = true;
        return false;
      }
    } );
    return test
  }
} );
/**
 * Fires an event after the last repeated event.  Useful for resize & similar events.
 *
 * @returns {jQuery}
 */
;(function($){
  $.fn.extend({
    afterwards: function( eventName, callback, options ) {

      var plugin = this;
      var $plugin = $(plugin);
      var eTimer;

      plugin.defaultOptions = {
        'interval': 250,
        'preventDefault': false,
        'stopPropagation': false
      };

      var settings = $.extend({}, plugin.defaultOptions, options);

      return $plugin.on(eventName, function(e) {

        if ( settings.preventDefault ) { e.preventDefault(); }
        if ( settings.stopPropagation ) { e.stopPropagation(); }
        if ( settings.stopImmediatePropagation ) { e.stopImmediatePropagation(); }

        clearTimeout(eTimer);
        eTimer = setTimeout(callback, settings.interval);
      });
    }
  });
})(jQuery);