/**
 * Determines which breakpoint is currently active, either by querying for a psuedo element on the body
 * or by injecting an element with display classes.
 *
 * @returns {jQuery}
 */
jQuery.fn.extend( {
  isBreakpoint: function ( points ) {
    var query = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content') || null;
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