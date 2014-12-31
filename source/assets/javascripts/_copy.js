
/*
 * zeroclipboard sample
 */
(function(){

    window.onload = function() {
        var client = new ZeroClipboard( document.getElementById("copyAsMarkdown") );
        client.on( "ready", function( readyEvent ) {
            client.on( "aftercopy", function( event ) {
                // `this` === `client`
                // `event.target` === the element that was clicked
                alert("Copied your data to clipboard!\n\n" + event.data["text/plain"] );
            } );
        } );
    };

})();

