/* Tabs */

function addTab(tabsContainer, tabsBtns, tabsTabs) {
	// Таб по умолчанию
	let prevTab = 0;

	for(let i = 0, length = tabsBtns.length; i < length; i++) {
		tabsBtns[prevTab].classList.add('active');
		tabsTabs[prevTab].classList.add('active');
		tabsTabs[i].classList.add('disabled');

		tabsBtns[i].addEventListener('click', function(e) {
			tabsBtns[prevTab].classList.remove('active');
			tabsTabs[prevTab].classList.remove('active');
			tabsBtns[i].classList.add('active');
			tabsTabs[i].classList.add('active');
			prevTab = i;
		});
	}
}

addTab(
	document.querySelector('.header__tabs'),
	document.querySelectorAll('.header__tabs-btn'),
	document.querySelectorAll('.header__tabs-tab')
);

/*function addTab(tabControl, items) {
	if (tabControl && items) {
		let prevTab;

		document.addEventListener('DOMContentLoaded', function(e) {
			for(let i = 0, length = tabControl.length; i < length; i++) {
				if (tabControl[i].classList.contains('active')) {
					items[i].classList.add('active');
					prevTab = i;
				}

				if (!items[i]) {
					tabControl[i].classList.add('disable');
				}

				tabControl[i].addEventListener('click', function(e) {
					if (items[i]) {
						items[i].classList.add('active');
						tabControl[i].classList.add('active');

						if (prevTab !== undefined && prevTab !== i) {
							items[prevTab].classList.remove('active');
							tabControl[prevTab].classList.remove('active');
						}
						prevTab = i;
					}
				});
			}
		});
	}
}

addTab(document.querySelectorAll('.films__tab'), document.querySelectorAll('.films__content'));*/