/* Open Menu */

let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

if (isMobile.any()) {
	body.classList.add('touch');
	const openMenu = document.querySelectorAll('.menu');
	const openMenuLinks = document.querySelectorAll('.menu > li');
	const openMenuArrow = openMenu.querySelectorAll('.menu__arrow');
	const openMenuSubMenu = openMenu.querySelectorAll('.menu > li .menu__sub-menu');

	if (openMenu && openMenuLinks && openMenuArrow && openMenuSubMenu) {
		for(let i = 0, length = openMenuArrow.length; i < length; i++) {
			openMenuArrow[i].addEventListener('click', function(e) {
				openMenuSubMenu.classList.toggle('open');
				openMenuArrow[i].classList.toggle('active');
			});

			for(let j = 0, length = openMenuLinks.length; j < length; j++) {
				openMenuLinks[j].addEventListener('click', function(e) {
					openMenuSubMenu.classList.remove('open');
					openMenuArrow[i].classList.remove('active');
				});
			}

			document.documentElement.addEventListener('click', function(e) {
				if (!e.target.closest('.menu')) {
					openMenuSubMenu.classList.remove('open');
					openMenuArrow[i].classList.remove('active');
				}
			});
		}
	}
} else {
	body.classList.add('mouse');
}