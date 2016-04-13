function IframeManager($iframe) {
    var self = this;

    this.getIDoc = function() {
        return $($iframe[0].contentWindow.document);
    };

    this.getIWindow = function() {
        return $($iframe[0].contentWindow);
    };

    this.setIframeContent = function(html) {
        var iDoc = self.getIDoc()[0];
        iDoc.open();
        iDoc.writeln(html);
        iDoc.close();
        var headTag  = iDoc.getElementsByTagName("head")[0];        
        return $iframe[0].contentWindow.document;
    };    

    this.$ = function(selector) {
        return self.getIDoc().find(selector);
    };


    this.runWhenLoaded = function(fn){        
        var loadedCheck = setInterval(function(){
            var cWindow = $iframe[0].contentWindow
            var doc = cWindow && cWindow.document;        

            if (doc && doc.readyState === "complete"){
                clearInterval(loadedCheck);
                fn(doc);
            }
        },10);
    };
}