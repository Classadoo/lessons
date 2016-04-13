console.log("ajax_fns loaded");

Requests = {
   baseUrl: "http://localhost:4000",    

    getTaskNames: function() {
        return $.ajax({
            url: Requests.baseUrl + "/task_names",
            type: "get",
            data: {}
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
