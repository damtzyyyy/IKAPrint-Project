(function () {
  "use strict";

  //===== Prealoder

  window.onload = function () {
    window.setTimeout(fadeout, 200);
  };

  function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
  }

  /*=====================================
	Sticky
	======================================= */
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;

    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }

    // show or hide the back-top-top button
    var backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "block";
    } else {
      backToTo.style.display = "none";
    }
  };

  //WOW Scroll Spy
  var wow = new WOW({
    //disabled for mobile
    mobile: false,
  });
  wow.init();

  //====== counter up
  var cu = new counterUp({
    start: 0,
    duration: 2000,
    intvalues: true,
    interval: 100,
  });
  cu.start();

  // for menu scroll
  var pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  // section menu active
  function onScroll(event) {
    var sections = document.querySelectorAll(".page-scroll");
    var scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute("href");
      var refElement = document.querySelector(val);
      var scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  var navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".page-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });
})();

// ========== Send email ===================
function sendEmail() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var sub = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  // Mengecek apakah semua kolom tidak kosong
  if (name && email && phone && sub && message) {
    var body =
      "Name : " +
      name +
      "<br/> Email : " +
      email +
      "<br/> Phone : " +
      phone +
      "<br/> subject : " +
      sub +
      "<br/> Message : " +
      message;

    Email.send({
      SecureToken: "f52fab16-34b8-4fe8-a034-0c608e2b93f6",
      To: "icapcurva1999@gmail.com",
      From: "pancaker1691@gmail.com",
      Subject: "Message Form Website",
      Body: body,
    })
      .then(function (message) {
        if (message === "OK") {
          swal("Thank You!", "Message Sent Successfully!", "success");
        } else {
          swal("Oh no!", "Something Went Wrong!", "error");
        }
      })
      .catch(function (error) {
        console.error("Email sending error:", error);
        swal("Oh no!", "Something Went Wrong!", "error");
      });
  } else {
    swal("Oops!", "Please fill in all fields.", "warning");
  }
}

(function () {
  const fonts = ["cursive", "sans-serif", "serif", "monospace"];
  let captchaValue = "";

  function generateCaptcha() {
    let value = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      value += characters.charAt(randomIndex);
    }
    captchaValue = value;
  }

  function setCaptcha() {
    let html = captchaValue
      .split("")
      .map((char) => {
        const rotate = -20 + Math.trunc(Math.random() * 30);
        const font = Math.trunc(Math.random() * fonts.length);
        return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]}">${char}</span>`;
      })
      .join("");
    const previewElement = document.querySelector(
      ".contact-form .captcha .preview"
    );
    if (previewElement) {
      previewElement.innerHTML = html;
    }
  }

  function initCaptcha() {
    const refreshBtn = document.querySelector(
      ".contact-form .captcha .captcha-refresh"
    );
    if (refreshBtn) {
      refreshBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default button behavior
        generateCaptcha();
        setCaptcha();
      });
    }

    generateCaptcha();
    setCaptcha();
  }

  initCaptcha();

  const sendBtn = document.getElementById("sendbtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      let inputCaptchaValue = document.querySelector(
        ".contact-form .captcha input"
      ).value;
      if (inputCaptchaValue === captchaValue) {
        sendEmail();

        // Clear input fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";

        // Clear captcha input
        document.querySelector(".contact-form .captcha input").value = "";

        // Reset captcha
        generateCaptcha();
        setCaptcha();
      } else {
        swal("Oh no!", "Captcha Error!", "error");
      }
    });
  }
})();
