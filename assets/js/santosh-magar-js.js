// --------site logo change in every 2 sec---
let site_logo=document.getElementById('site-logo');
let logos=['logo-stmp-001.png','logo-stmp-002.png','logo-stmp-003.png','logo-stmp-004.png','logo-stmp-005.png','logo-stmp-006.png'];
var x = -1;
setInterval(function () {
  x = (x === logos.length - 1) ? 0 : x + 1;
  site_logo.src='assets/images/'.concat(logos[x])
},2000);



// ----------------------header nav-----------------------------
$(".header-nav").each(function(){
  var toggleUD = $(this).find('.ham-list');
  toggleUD.addClass("ham-hide");
  $(this).find('.ham').click(function(){
    toggleUD.toggleClass("ham-hide");
  })
});

$(".ham-list li").click(function(){
  $(".ham-list").addClass("ham-hide");
});

// ---------------------click: load more -------------------------------

$("#btn_load_more").click(function(){
	var html_content = '<div> <p> No More Data ... comming soon ...</p>  <i class="ri-error-warning-fill"></i>  </div>';
	var check = $('.info-load');
	if (check.length==0) { 
		$("#other-info").append(html_content );
	}
	$('#other-info').addClass('info-load');
  $(this).hide();
});

// ------------------------click show info_hide---------------------------------------
$(".email_addr .ri-error-warning-line").click(function(){
  $(".email_addr span").toggleClass("info_hide");
});
$(".phone_addr .ri-error-warning-line").click(function(){
  $(".phone_addr span").toggleClass("info_hide");
});
// --------------------click send mail-----------------------

$(document).ready(function() {
  $("#contact-form").validate({
   rules: {
    inputPhone: {
      minlength: 10,
      digits: true
    }
  },
  messages: {
    inputPhone: {
      number: 'Accept only number',
    }
  },
  submitHandler: function(form) {
    return false;
      //    form.submit();
    }
  });

  const host= "smtp.gmail.com";
  const uname= "santoshmagarcomnp@gmail.com";
  const pp ="snp!!2#COM7";
  const from = "no-reply@santoshmagar.com";
  const sendto = 'santoshtmp7@gmail.com';

  $('#send_email').click(function(){
   if($("#contact-form").valid()){
    var inputFirstName = $("#inputFirstName").val(); 
    var inputLastName = $("#inputLastName").val();
    var inputEmail = $("#inputEmail").val(); 
    var inputPhone = $("#inputPhone").val(); 
    var inputMessage = $("#inputMessage").val(); 
    // var return_msg_send = "<h5>Thank you for Getting In Touch.</h5><div> <p>First Name : "+inputFirstName+" </p>  <p>Last Name : "+inputLastName+" </p>  <p>Email : "+inputEmail+" </p>  <p>Phone Number : "+inputPhone+" </p>    <p>Message : "+inputMessage+" </p>     </div> ";
    var return_msg_send = "<div  class='warning'> <span>Sorry message cannot be send. </span> <br> Please contact through <br> Phone: +977-9803928344 <br> OR <br> Email: santoshtmp7@gmail.com </div><br>"
    $(".msg_send").empty();
    $(".msg_send").append(return_msg_send);
    $("#msgModal").css({"display":"block"});
    var email_body_site_admin = "<div> santoshmagar.com.np Get In Touch Message : <p>First Name : "+inputFirstName+" </p>  <p>Last Name : "+inputLastName+" </p>  <p>Email : "+inputEmail+" </p>  <p>Phone Number : "+inputPhone+" </p>    <p>Message : "+inputMessage+" </p>     </div> ";
    
    Email.send({
      Host: host,
      Username: uname,
      Password: pp,
      To: sendto,
      From: from,
      Subject: "santoshmagar.com.np Message",
      Body: email_body_site_admin,
    });
   
  }
});


$('#send_ok').click(function(){
   if($("#contact-form").valid()){
    var inputFirstName = $("#inputFirstName").val(); 
    var inputLastName = $("#inputLastName").val();
    var inputEmail = $("#inputEmail").val(); 
    var inputPhone = $("#inputPhone").val(); 
    var inputMessage = $("#inputMessage").val();     
    var email_body_user = "<div>Dear "+inputFirstName+", <br> </p>  Thanks for reaching out! <br> We'll contact you soon .. <p>Regards <br> <a href='https://santoshmagar.com.np'>santoshmagar.com.np</a></p></div> ";
    Email.send({
      Host: host,
      Username: uname,
      Password: pp,
      To: inputEmail,
      From: from,
      Subject: "Thank you",
      Body: email_body_user,
    });
  }
});


$('#send_return').click(function(){
  $("#msgModal").css({'display':'none'});
});



});

// -------------------------------------------------------------------------------------------------------------------------
