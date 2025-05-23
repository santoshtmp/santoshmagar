// --------site logo change in every 2 sec---
let site_logo = document.getElementById('site-logo');
let logos = ['logo-stmp-001.png', 'logo-stmp-002.png', 'logo-stmp-003.png', 'logo-stmp-004.png', 'logo-stmp-005.png', 'logo-stmp-006.png'];
var x = -1;
setInterval(function () {
  x = (x === logos.length - 1) ? 0 : x + 1;
  site_logo.src = '/assets/images/'.concat(logos[x])
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

// ---------------------- portfolio section -------------------------------------------
$('.portfolio-item').on('click', function (e) {
  e.stopPropagation();
  var detail = $(this).find('.portfolio-item-detail');
  if (detail.length) {
    detail.toggleClass("hide")
    if ($(this).find('.portfolio-item-detail').hasClass("hide")) {
      $("body").css('overflow', "");
    } else {
      $("body").css('overflow', "hidden");
    }
  } else {
    var href = $(this).find('a').attr("href");
    if (href != '#' && href != '') {
      window.open(href, '_blank');
    }
  }
  return false;
});
$('.portfolio-item-detail .detail').on('click', function (e) {
  e.stopPropagation();
})

// ----------------------- portfolio filter -------------------------


// form submit
$(document).on('submit', '#portfolio-filter', function (e) {
  e.stopPropagation();
  e.preventDefault();
  var portfolio_type_selected = $('#portfolio-filter input[type="radio"][name="type"]:checked').val();
  if (portfolio_type_selected == 'all') {
    $('.portfolio-list .portfolio-item').show();
  } else {
    portfolio_type_selected = (portfolio_type_selected == 'other') ? ' other' : portfolio_type_selected;
    portfolio_type_selected = portfolio_type_selected.split(' ');
    $('.portfolio-list .portfolio-item').each(function () {
      let current_portfolio = $(this);
      let portfolio_type = current_portfolio.attr('types').split(' ');
      let isPresent = portfolio_type_selected.some(value => portfolio_type.includes(value));
      if (isPresent) {
        current_portfolio.show();
      } else {
        current_portfolio.hide();
      }
    });
  }
  return false;
});


// on change in filter item make form submit
$(document).on(
  'change',
  '#portfolio-filter input[type="checkbox"], #portfolio-filter input[type="radio"]',
  function () {
    $('#portfolio-filter').trigger('submit');
  }
);

// -------------------------------------------------------------------------------------

let medium_posts_section = document.getElementById('medium-posts');
if (medium_posts_section) {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@santoshtmp7')
    .then(response => response.json())
    .then(data => {
      let postsHTML = '';
      data.items.slice(0, 5).forEach(post => {
        // Extract thumbnail from content
        let imgMatch = post.content.match(/<img.*?src="(.*?)"/);
        let imgSrc = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/120x80'; // Fallback

        postsHTML += `
						<a href="${post.link}" target="_blank" class="post">
							<div class="post-content">
								<h3>${post.title}</h3>
								<p>${post.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}...</p>
							</div>
							<img src="${imgSrc}" alt="Post Image">
						</a>
					`;
      });
      postsHTML += '<div class="view-all-blogs"><a href="https://medium.com/@santoshtmp7" target="_blank" class="view-all-blog-btn" rel="noopener noreferrer">View all blogs</a></div>';
      medium_posts_section.innerHTML = postsHTML;
    });
}
// -------------------------------------------------------------------------------------
