module.exports = function( ) {
  return {
    contains: function( v ) {
      for( var i = 0; i < this.length; i++ ) {
          if( this[ i ] === v )
            return true;
      }

      return false;
    },

    unique: function( ) {
      var arr = [ ];
      for( var i = 0; i < this.length; i++ ) {
          if( !arr.contains( this[ i ] ) ) {
              arr.push( this[ i ] );
          }
      }
      return arr; 
    }
  }
}