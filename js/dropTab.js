/* Drop Tab */

function addDropTab(elem, transition = 0.3, variation = 1, start = true) {
	if (elem !== null) {
		let dropContent = document.querySelector('#' + elem.id + ' .drop-tab__content');
		let dropContentHeight = dropContent.offsetHeight;
		let dropTab = document.querySelector('#' + elem.id);
		let dropNav = document.querySelector('#' + elem.id + ' .drop-tab__nav');
		let dropIcon = document.querySelector('#' + elem.id + ' .drop-tab__icon');
		let dropContentTransition = transition;

		if (variation === 1) {
			dropTab.classList.add('variation_1');
			if (!start) {
				dropTab.classList.toggle('active');
				dropTab.classList.add('init');
			} else {
				document.documentElement.addEventListener('click', function(e) {
					if (!e.target.closest('#' + elem.id)) {
						dropTab.classList.remove('active');
					}
				});
			}
			setTimeout(dropInit, 100);
			function dropInit() {
				dropContent.style.transition = dropContentTransition + 's';
				dropIcon.style.transition = dropContentTransition + 's';
				dropNav.addEventListener('click', function(e) {
					dropTab.classList.toggle('active');
				});
			}
		} else if (variation === 2) {
			let openDrop = true;
			dropTab.classList.add('variation_2');
			if (!start) {
				dropTab.classList.toggle('active');
				dropTab.classList.add('init');
				openDrop = false;
			} else {
				dropContent.style.marginTop = '-' + dropContentHeight + 'px';
			}
			dropIcon.style.transition = dropContentTransition + 's';
			setTimeout(dropInit, 100);
			function dropInit() {
				dropContent.style.transition = dropContentTransition + 's';
				dropNav.addEventListener('click', function(e) {
					dropTab.classList.toggle('active');
					if (!openDrop) {
						dropContent.style.marginTop = '-' + dropContentHeight + 'px';
						openDrop = true;
					} else {
						dropContent.style.marginTop = 0;
						openDrop = false;
						document.documentElement.addEventListener('click', function(e) {
							if (!e.target.closest('#' + elem.id)) {
								dropTab.classList.remove('active');
								dropContent.style.marginTop = '-' + dropContentHeight + 'px';
								openDrop = true;
							}
						});
					}
				});
			}
		}
	}
}

window.onload = function(e) {
	addDropTab(document.getElementById('elem'));
}