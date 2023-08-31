// --------site logo change in every 2 sec---
let site_logo = document.getElementById('site-logo');
let logos = ['logo-stmp-001.png', 'logo-stmp-002.png', 'logo-stmp-003.png', 'logo-stmp-004.png', 'logo-stmp-005.png', 'logo-stmp-006.png'];
var x = -1;
setInterval(function () {
  x = (x === logos.length - 1) ? 0 : x + 1;
  site_logo.src = 'assets/images/'.concat(logos[x])
}, 2000);



// ----------------------header nav-----------------------------
$(".header-nav").each(function () {
  var toggleUD = $(this).find('.ham-list');
  toggleUD.addClass("ham-hide");
  $(this).find('.ham').click(function () {
    toggleUD.toggleClass("ham-hide");
  })
});

$(".ham-list li").click(function () {
  $(".ham-list").addClass("ham-hide");
});

// ---------------------click: load more -------------------------------

$("#btn_load_more").click(function () {
  var html_content = '<div> <p> No More Data ... comming soon ...</p>  <i class="ri-error-warning-fill"></i>  </div>';
  var check = $('.info-load');
  if (check.length == 0) {
    $("#other-info").append(html_content);
  }
  $('#other-info').addClass('info-load');
  $(this).hide();
});

// ------------------------click show info_hide---------------------------------------
$(".email_addr .ri-error-warning-line").click(function () {
  $(".email_addr span").toggleClass("info_hide");
});
$(".phone_addr .ri-error-warning-line").click(function () {
  $(".phone_addr span").toggleClass("info_hide");
});
// --------------------click send mail-----------------------
// https://mailtrap.io/blog/javascript-send-email/
$(document).ready(function () {
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
    submitHandler: function (form) {
      return false;
      //    form.submit();
    }
  });

  const host = "live.smtp.mailtrap.io";
  const uname = "api";
  const pp = "c317bf5508d97b11bacc48fc01e3aa8e";
  const from = "no-reply@santoshmagar.com.np";
  const sendto = 'santoshtmp7@gmail.com';

  $('#send_email').click(function () {
    if ($("#contact-form").valid()) {
      var inputFirstName = $("#inputFirstName").val();
      var inputLastName = $("#inputLastName").val();
      var inputEmail = $("#inputEmail").val();
      var inputMessage = $("#inputMessage").val();
      var return_msg_send = "<h5>Thank you for Getting In Touch.</h5><div> <p>First Name : " + inputFirstName + " </p>  <p>Last Name : " + inputLastName + " </p>  <p>Email : " + inputEmail + " </p> <p>Message : " + inputMessage + " </p></div> ";

      emailjs.init("JmqcuyKKtIViXdlgx");
      emailjs.send("service_yfntq1m", "template_criz1th", {
        from_name: inputFirstName + " " + inputLastName,
        to_name: "santoshmagar.com.np",
        user_email: inputEmail,
        message: inputMessage,
        reply_to: "no-reply@santoshmagar.com.np",
      }).then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        $(".msg_send").empty();
        $(".msg_send").append(return_msg_send);
        $('#contact-form')[0].reset();
      }, function (error) {
        $(".msg_send").empty();
        $(".msg_send").append('<p style="color:red;"> Failed to send message.... <br> Please use other method to process. </p>');
        console.log('FAILED...');
      });
      $("#msgModal").css({ "display": "block" });

    }
  });


  $('#send_ok').click(function () {
    $("#msgModal").css({ 'display': 'none' });
  });

  $('#send_return').click(function () {
    $("#msgModal").css({ 'display': 'none' });
  });

});

// -------------------------------------------------------------------------------------------------------------------------
