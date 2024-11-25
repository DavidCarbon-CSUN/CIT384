//Menu dropdown animation
jQuery(function ($) {
	$(".sub-menu").hide();
	$(".main-navigation .children").hide();

	if (matchMedia("only screen and (min-width: 1024px)").matches) {
		$(".menu-item").hover(
			function () {
				$(this).children(".sub-menu").fadeIn().addClass("submenu-visible");
			},
			function () {
				$(this).children(".sub-menu").fadeOut().removeClass("submenu-visible");
			}
		);
		$(".main-navigation li").hover(
			function () {
				$(this).children(".main-navigation .children").fadeIn().addClass("submenu-visible");
			},
			function () {
				$(this).children(".main-navigation .children").fadeOut().removeClass("submenu-visible");
			}
		);
	}
});

//Open social links in a new tab
jQuery(function ($) {
	$(".social-menu-widget li a").attr("target", "_blank");
});

//Video header
jQuery(function ($) {
	var testMobile;
	var isMobile = {
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		}
	};

	testMobile = isMobile.iOS();
	$(window).on("ready load", function () {
		//TODO: Reize Video Size
		if (testMobile != null) {
			$("#eyecatcher-custom-header-video-button").css("opacity", "0");
			$("#eyecatcher-custom-header-video").prop("controls", true);
		}
	});
});

//Video play/pause button
jQuery(function ($) {
	var video = $("#eyecatcher-custom-header-video");
	var videoIcon = $("#eyecatcher-custom-header-icon");

	// Function to toggle play/pause
	function togglePlayPause() {
		if (video.get(0).paused) {
			video.get(0).play();
			videoIcon.removeClass("fas fa-play");
			videoIcon.addClass("fas fa-pause");
		} else {
			video.get(0).pause();
			videoIcon.removeClass("fas fa-pause");
			videoIcon.addClass("fas fa-play");
		}
	}

	// Check autoplay policy and adjust UI accordingly
	const autoplayPolicy = navigator.getAutoplayPolicy("mediaelement");
	if (autoplayPolicy != null) {
		if (autoplayPolicy === "allowed" || autoplayPolicy === "allowed-muted") {
			if (autoplayPolicy === "allowed-muted") {
				video.prop("muted", true);
			}
			videoIcon.addClass("fas fa-pause");
			video.get(0).play();
		} else if (autoplayPolicy === "disallowed") {
			video.attr("poster", "../../assets/images/bg/video.poster.webp");
			videoIcon.addClass("fas fa-play");
		}
	}

	// Bind click events to icons
	videoIcon.click(togglePlayPause);
});

//Video play/pause button effects
jQuery(function ($) {
	/* Debug Start: 800 End: 1200 */
	var fadeStart = 800;
	var fadeUntil = 1200;
	var fadingVideo = $("#eyecatcher-custom-header-video");
	var fadingVideoIcon = $("#eyecatcher-custom-header-icon");

	$(window).bind("scroll", function () {
		var offset = $(document).scrollTop();
		var opacity = 0;
		if (offset <= fadeStart) {
			opacity = 1;
		} else if (offset <= fadeUntil) {
			opacity = 1 - offset / fadeUntil;
		}
		fadingVideo.css("opacity", opacity);
		fadingVideoIcon.css("opacity", opacity);
	});
});

//Menu bar
jQuery(function ($) {
	var headerHeight = $(".site-header").outerHeight();
	$(".header-clone").css("height", headerHeight);

	$(window).resize(function () {
		var headerHeight = $(".site-header").outerHeight();
		$(".header-clone").css("height", headerHeight);
	});
});

//Menu bar
jQuery(function ($) {
	var header = $(".site-header");
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			header.addClass("header-scrolled");
		} else {
			header.removeClass("header-scrolled");
		}
	});
});

//Header text effects
jQuery(function ($) {
	var fadeStart = 100;
	var fadeUntil = 400;
	var fading = $(".header-info");

	$(window).bind("scroll", function () {
		var offset = $(document).scrollTop();
		var opacity = 0;
		if (offset <= fadeStart) {
			opacity = 1;
		} else if (offset <= fadeUntil) {
			opacity = 1 - offset / fadeUntil;
		}
		fading.css("opacity", opacity);
	});
});

//Go to top
jQuery(function ($) {
	var goTop = $(".go-top");
	$(window).scroll(function () {
		if ($(this).scrollTop() > 800) {
			goTop.addClass("show");
		} else {
			goTop.removeClass("show");
		}
	});

	goTop.on("click", function () {
		$("html, body").animate({ scrollTop: 0 }, 1000);
		return false;
	});
});

//Multicolumn support
jQuery(function ($) {
	var twoCols = $(".page-template-page_widgetized section.at-2-col");
	for (var i = 0; i < twoCols.length; i += 2) {
		twoCols.slice(i, i + 2).wrapAll("<div class='multicolumn-row clearfix'></div>");
	}

	var threeCols = $(".page-template-page_widgetized section.at-3-col");
	for (var i2 = 0; i2 < threeCols.length; i2 += 3) {
		threeCols.slice(i2, i2 + 3).wrapAll("<div class='multicolumn-row clearfix'></div>");
	}
});

//Mobile menu
//Fixes Touch Screen Menu
jQuery(function ($) {
	var menuType = "desktop";

	function initMobileMenu() {
		var currMenuType = "desktop";

		if (matchMedia("only screen and (max-width: 1024px)").matches) {
			currMenuType = "mobile";
		}

		if (currMenuType !== menuType) {
			menuType = currMenuType;

			if (currMenuType === "mobile") {
				var $mobileMenu = $("#mainnav").attr("id", "mainnav-mobi").hide();
				var hasChildMenu = $("#mainnav-mobi").find("li:has(ul)");

				hasChildMenu.children("ul").hide();
				hasChildMenu.children("a").after('<span class="btn-submenu"></span>');
				$(".btn-menu .fa").removeClass("active");
			} else {
				var $desktopMenu = $("#mainnav-mobi").attr("id", "mainnav").removeAttr("style");

				$desktopMenu.find(".submenu").removeAttr("style");
				$(".btn-submenu").remove();
			}
		}
	}

	$(document).ready(initMobileMenu);
	$(window).on("resize", initMobileMenu);

	$(".btn-menu .fas").on("click", function () {
		$("#mainnav-mobi").slideToggle(300);
		$(this).toggleClass("active");
	});

	$(document).on("click", "#mainnav-mobi li .btn-submenu", function (e) {
		$(this).toggleClass("active").next("ul").slideToggle(300);
		e.stopImmediatePropagation();
	});
});

//Colors
//Fixes Background Image on Elements
jQuery(function ($) {
	var elements = "h1,h2:not(.widget-title),h3,h4,h5,h6,a,div,span";
	$(".page-template-page_widgetized section").each(function () {
		if ($(this).data("color") == "inherit") {
			$(this).find(elements).css("color", "inherit");
		}
	});
});

//Flex fallback
jQuery(function ($) {
	var doc = document.documentElement.style;
	if (!("flexWrap" in doc) && !("WebkitFlexWrap" in doc) && !("msFlexWrap" in doc)) {
		function equalColumns() {
			var multicol = $(".multicolumn-row");
			if ($(window).width() > 991) {
				multicol.each(function (index, element) {
					$(element)
						.find("section")
						.each(function () {
							var column = $(".multicolumn-row section");
							var maxHeight = Math.max.apply(
								null,
								column
									.map(function () {
										return $(this).outerHeight();
									})
									.get()
							);
							$(this).outerHeight(maxHeight);
						});
				});
			} else {
				$(".multicolumn-row section").css("height", "");
			}
		}
		function footerFix() {
			$(".footer-contact").addClass("footernoFlex");
		}

		$(document).ready(equalColumns);
		$(window).on("resize", equalColumns);
		$(document).ready(footerFix);
	}
});

/**
 * Utility function to calculate the current theme setting.
 * Look for a local storage value.
 * Fall back to system setting.
 * Fall back to base mode.
 */
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "base"; // Default to base if no localStorage or system setting is present
}

/**
 * Utility function to update the theme text and aria-label.
 */
function updateThemeText({ textEl, currentTheme }) {
  let newCta;

  switch (currentTheme) {
    case "dark":
      newCta = "Theme: Dark";
      break;
    case "light":
      newCta = "Theme: Light";
      break;
    default: // Base theme
      newCta = "Theme: Base";
      break;
  }

  textEl.innerText = newCta;
  textEl.setAttribute("aria-label", newCta);
}

/**
 * Utility function to update the theme setting on the html tag
 */
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

/**
 * Utility function to update the theme icon.
 */
function updateThemeIcon({ iconEl, currentTheme }) {
  iconEl.className = "fas"; // Reset class name
  switch (currentTheme) {
    case "dark":
      iconEl.classList.add("fa-moon");
      break;
    case "light":
      iconEl.classList.add("fa-sun");
      break;
    default: // Base theme
      iconEl.classList.add("fa-yin-yang");
      break;
  }
}

/**
 * On page load:
 */

/**
 * 1. Grab what we need from the DOM and system settings on page load
 */
const icon = document.querySelector("#footer-contact-theme-icon");
const text = document.querySelector("#footer-contact-theme-text");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
 * 2. Work out the current site settings
 */
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
 * 3. Update the theme setting, text, and icon according to current settings
 */
updateThemeText({ textEl: text, currentTheme: currentThemeSetting });
updateThemeOnHtmlEl({ theme: currentThemeSetting });
updateThemeIcon({ iconEl: icon, currentTheme: currentThemeSetting });

/**
 * 4. Add an event listener to toggle the theme
 */
text.parentElement.addEventListener("click", () => {
  const newTheme =
    currentThemeSetting === "dark"
      ? "light"
      : currentThemeSetting === "light"
      ? "base"
      : "dark"; // Cycle through dark -> light -> base

  localStorage.setItem("theme", newTheme);
  updateThemeText({ textEl: text, currentTheme: newTheme });
  updateThemeOnHtmlEl({ theme: newTheme });
  updateThemeIcon({ iconEl: icon, currentTheme: newTheme });

  currentThemeSetting = newTheme;
});