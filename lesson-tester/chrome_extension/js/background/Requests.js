console.log("ajax_fns loaded");

Requests = {
   baseUrl: "http://localhost:4000",    

    getNextId: function(dir) {
        return $.ajax({
            url: Requests.baseUrl + "/next_test_id",
            type: "get",
            data: {dir: dir}            
        })
    },

    sendSiteData: function(siteData) {
        return $.ajax({
            url: Requests.baseUrl + "/resource_downloader",
            type: "post",
            data: siteData            
        })
    },

    // get external css, when resolving html
    getCss: function(cssLocation) {
        return $.ajax({
            url: cssLocation,
            type: "get",
            crossDomain: true,
            dataType: "text"
        })
    },
}
