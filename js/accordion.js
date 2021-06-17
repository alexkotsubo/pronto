/* Accrodion */

function addAccrodion(nav, content, anim) {
	if (nav && content && anim) {
		for(let i = 0, length = nav.length; i < length; i++) {
			let accordionTap = true;

			content[i].style.marginTop = '-' + content[i].offsetHeight + 'px';
			content[i].classList.add('disable');
			setTimeout(helpFunction, 300);

			function helpFunction() {
				content[i].style.marginTop = '-' + content[i].offsetHeight + 'px';
				content[i].style.transition = '0.3s';
				nav[i].addEventListener('click', function(e) {
					if (accordionTap == false) {
						content[i].style.marginTop = '-' + content[i].offsetHeight + 'px';
						content[i].classList.add('disable');
						anim[i].classList.remove('active');
						accordionTap = true;
					} else {
						content[i].style.marginTop = '0px';
						content[i].classList.remove('disable');
						anim[i].classList.add('active');
						accordionTap = false;
					}
				});
			}
		}
	}
}

addAccrodion(
	document.querySelectorAll('.elem-accordion__nav'),
	document.querySelectorAll('.elem-accordion__content'),
	document.querySelectorAll('.elem-accordion__anim')
);