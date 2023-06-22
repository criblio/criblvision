require([
    "splunkjs/mvc",
    "splunkjs/mvc/simplexml/ready!"
], function(
            mvc
            ) {
        var defaultTokenModel = mvc.Components.get("default");
        var submittedTokenModel = mvc.Components.get("submitted");
        $("#showButton").click(function(){
            defaultTokenModel.set("show_details","true"); 
            submittedTokenModel.set("show_details","true"); 
        });
        $("#hideButton").click(function(){
            defaultTokenModel.unset("show_details");
            submittedTokenModel.unset("show_details"); 
        });
});
