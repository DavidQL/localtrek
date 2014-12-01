$(function() {
  $(document).on('click', 'a.sign-up', function(e) {
    e.preventDefault();
    var email = $('.email').val();
    $.ajax({
        url: "https://docs.google.com/forms/d/1Wi16pSVc83ynlbYJtkMjSPG_bfdcSUL1O4eRdZPg8OA/formResponse",
        data: {"entry.1653288301" : email},
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function (){
                $('.email').val("");
                vex.dialog.alert("Thanks! We'll be in touch.");
            },
            200: function (){
                $('.email').val("");
                vex.dialog.alert("Thanks! We'll be in touch.");
            }
        }
    });

    if (window.location.href.indexOf('github') >= 0) {
        $('#try-it iframe').attr('src', '/localtrek/path-create.html');
    }
    
  });
});