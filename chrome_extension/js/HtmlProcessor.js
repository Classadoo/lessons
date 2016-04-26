var HtmlProcessor = function(siteInfo) {    
    this.processAndSubmitCurrentPage = function() {        
        resolveUrlsAndSubmit(getCurrentSiteHtml());        
    }

    function resolveUrlsAndSubmit(cleanHtml){
        var stylesheetHrefs = [];
        var stylesheetContents = [];
        var htmlAttributes = {};        

        var realHtmlAttributes = document.querySelector("html").attributes

        for (var attr, i = 0, attrs = realHtmlAttributes, l = attrs.length; i<l; i++){
            attr = attrs.item(i)
            htmlAttributes[attr.nodeName] = attr.nodeValue;
        }

        var styleSheets = document.styleSheets;
        var styleSheetList = [].slice.call(styleSheets, 0);
        for (i in styleSheetList) {
            var styleSheet = styleSheetList[i];
            var owner = styleSheet.ownerNode
            if (owner.nodeName == "LINK"){
                stylesheetHrefs.push(owner.href);
            }else if(owner.nodeName == "STYLE"){
                stylesheetContents.push(owner.innerHTML);
            }
        }       

        siteInfo.html                   = cleanHtml;
        siteInfo.stylesheetHrefs        = stylesheetHrefs;
        siteInfo.stylesheetContents     = stylesheetContents;
        siteInfo.currentLocation        = window.location.href;
        siteInfo.baseUri                = document.baseURI;
        siteInfo.htmlAttributes         = htmlAttributes;

        console.log("submitting", siteInfo);
        chrome.runtime.sendMessage({
            resolveUrls: siteInfo
        }, function(response){
            console.log("html submitting for resolution");
        });
    }

    function removeNodes(nodes) {
        var nodeList = [].slice.call(nodes, 0)
        for (i in nodeList) { nodeList[i].remove() }
    }

    function removeAllUnusedTags(htmlClone) {
        removeNodes(htmlClone.querySelectorAll("script"));
        removeNodes(htmlClone.querySelectorAll("noscript"));
        removeNodes(htmlClone.querySelectorAll("meta"));        
        removeNodes(htmlClone.querySelectorAll("#classadoo-test-frame"));                
    }   

    function stripIframeSrc(htmlClone) {
        $(htmlClone).find("iframe[src]").each(function(i, iframe){
            iframe.removeAttribute("src");
        })
    }

    function stripPageMarkerBox(htmlClone) {
        $(htmlClone).find(':contains(Use UP/DOWN to change the color. Press DEL to clear, ESC or "X" to close.)').remove();
    }

    function getCurrentSiteHtml(){
        var fillerScripts = getIframeFillerScripts();                
        var htmlElement = document.querySelector('html');        
        var htmlClone = htmlElement.cloneNode(true);
        removeAllUnusedTags(htmlClone);
        stripIframeSrc(htmlClone);
        addLocationHrefScript(htmlClone);
        stripPageMarkerBox(htmlClone);
        ModifyPageForToolbar(false, $(htmlClone));
        fillerScripts.each(function(i, script) {
            $(htmlClone).find("body").append(script);
        })        

        return htmlClone.outerHTML;
    }

    // adds a script which sets a variable called testLocationHref, so that we can test location matching
    function addLocationHrefScript(htmlClone) {
        function addLocation() {
            testlocationHref = " location "
        }

        var funString = addLocation.toString().replace(" location ", location.href);
        var script = document.createElement('script');
        var code = document.createTextNode("(" + funString + ")()");
        script.appendChild(code);                
        $(htmlClone).find("head").append(script);
    }

    // generates scripts which will fill content in an iframe without a source on page load. 
    function getIframeFillerScripts() {        
        var frames = $("iframe:not([src]):not(#classadoo-test-frame)")         
         return frames.map(function(i, iframe){                        
            if (iframe.contentWindow) {                
                var $iframe = $(iframe);            
                var id = i
                $iframe.attr("data-test-id", id);
                var manager = new IframeManager($iframe);
                var content = manager.$("html")[0].outerHTML;

                function addContentToIframe() { 
                    if (typeof classadooIframesLoading === 'undefined') {
                        classadooIframesLoading = [true];
                    } else {
                        classadooIframesLoading.push(true);
                    }

                    var iframe = document.querySelector('[data-test-id=" id "]')
                    iframe.onload = function() {
                        var iDoc = iframe.contentWindow.document
                        iDoc.open();
                        iDoc.writeln(" content ");
                        iDoc.close();     
                        classadooIframesLoading.pop();                   
                    }
                    iframe.src = 'about:blank';   
                }

                var funString = addContentToIframe.toString().replace(" id ", id).replace(" content ", Util.escape(content))                
                var script = document.createElement('script');
                var code = document.createTextNode("(" + funString + ")()");
                script.appendChild(code);                
                return script
            }                        
        })
    }
}