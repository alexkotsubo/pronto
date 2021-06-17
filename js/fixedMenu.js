/* Fixed Menu */

if (nav) {
	activeFixedMenu = true;
	let hide = false;
	let prevScroll;
	let navHeight = nav.offsetHeight;

	function fixedMenu() {
		if (pageYOffset > prevScroll && pageYOffset > navHeight) {
			if (hide == false) {
				nav.style.opacity = '0';
				hide = true;
			}
			nav.style.transform = 'translate(0, -110%)';
		}

		if (pageYOffset <= prevScroll) {
			nav.style.opacity = '1';
			nav.style.transform = 'none';
		}

		prevScroll = pageYOffset;
	}

	fixedMenu();

	window.addEventListener('scroll', fixedMenu);
}