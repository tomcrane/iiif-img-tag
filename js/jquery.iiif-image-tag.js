// for demo purposes. Assumes Openseadragon already in scope rather than loading it.
// Doesn't check for errors. And so on.
(function($) {
    $.fn.iiifImage = function(osdControlImagePath) {
        if(!osdControlImagePath) {
            osdControlImagePath = "openseadragon/images/";
        }
        return this.filter("img").each( function() {
            var info = this.src.split("/").slice(0, -4).join("/") + "/info.json";
            var $img = $(this);
            $img.css("cursor", "pointer");
            var viewer;
            var $osd = $("<div/>").insertAfter($img);
            console.log($osd);
            $osd.css({"height":($img.height()+"px"), "width":($img.width()+"px")});
            $osd.hide();
            $img.click(function(){
                if(!viewer){
                    viewer = OpenSeadragon({
                        element: $osd[0],
                        prefixUrl: osdControlImagePath,
                        tileSources: info
                    });
                    viewer.addHandler("full-screen", function(ev){
                        if (!ev.fullScreen) {
                            $osd.hide();
                            $img.show();
                        }
                    });
                }
                $osd.show();
                $img.hide();
                viewer.setFullScreen(true);
            });
        });
    }
}(jQuery));