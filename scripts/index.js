$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    
    //populate copyright
    createCopyright();
});

function createCopyright() {
    var copyright = "&copy; 2019";
    var currYear = new Date().getFullYear();
    copyright = copyright.concat((currYear > 2019 ? "-" + currYear : "") + ", Daniel Phan");

    $("#timestamp").append(copyright);
}
