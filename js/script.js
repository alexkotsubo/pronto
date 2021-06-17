'use strict';
let activeFixedMenu = false;
let fixedPadding = document.querySelectorAll('.fixed-padding');
const body = document.querySelector('body');
const nav = document.querySelector('#nav');

/* IB */

function ib() {
	let ib = document.querySelectorAll(".ib");
	for (let i = 0; i < ib.length; i++) {
		if (ib[i].querySelector('.ib_use')) {
			ib[i].style.backgroundImage = 'url(' + ib[i].querySelector('.ib_use').getAttribute('src') + ')';
		}
	}
}

ib();

/* Search */

const searchIcon = document.querySelector('.nav__search-icon');
const searchBtn = document.querySelector('.nav__search-btn');
const searchForm = document.querySelector('.nav__search-form');

searchIcon.addEventListener('click', e => {
	searchForm.classList.toggle('active');
});

searchForm.addEventListener('submit', e => {
	searchForm.classList.remove('active');
});

document.documentElement.addEventListener('click', function(e) {
	if (!e.target.closest('.nav__search')) {
		searchForm.classList.remove('active');
	}
});

/* Theahers Tabs */

/* Tabs */

function addTab(tabsBtns, tabsTabs, startFrom = 0) {
	let prevTab = startFrom;

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
	document.querySelectorAll('.teachers__btns-btn'),
	document.querySelectorAll('.teachers__tab')
);

/* Burger */

addBurger(document.querySelector('#nav-burger'));

function addBurger(elem) {
	const button = document.querySelector('#' + elem.id + ' .burger__btn');
	const links = document.querySelectorAll('#' + elem.id + ' .burger__link');
	const bgElem = document.querySelector('#' + elem.id + ' .burger__bg');
	let burgerClose;

	if (button && links && bgElem && elem) {
		burgerClose = document.querySelector('#' + elem.id + ' .burger__close-btn');
		burgerClose.addEventListener('click', function(e) {
			elem.classList.remove('active');
			burgBodyUnLock();
		});

		elem.classList.remove('active');
		burgBodyUnLock();

		button.addEventListener('click', function(e) {
			let popupActive = document.querySelector('.popup.open');

			if (popupActive) {
				closePopup(popupActive, false);
			}

			if (elem.classList.contains('active') && variation === 2) {
				elem.classList.remove('active');
				burgBodyUnLock();
			} else {
				elem.classList.add('active');
				burgBodyLock();
			}
		});

		for(let i = 0, length = links.length; i < length; i++) {
			links[i].addEventListener('click', function(e) {
				elem.classList.remove('active');
				burgBodyUnLock();
			});
		}

		document.documentElement.addEventListener('click', function(e) {
			if ((!e.target.closest('.burger') && elem.classList.contains('active')) || (e.target.closest('.' + bgElem.classList) && elem.classList.contains('active'))) {
				elem.classList.remove('active');
				burgBodyUnLock();
			}
		});
	}
}

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixedPadding.length > 0) {
		for(let i = 0, length = fixedPadding.length; i < length; i++) {
			fixedPadding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	setTimeout(helpFunction, 300);
	function helpFunction() {
		if (fixedPadding.length > 0) {
			for(let i = 0, length = fixedPadding.length; i < length; i++) {
				fixedPadding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}
}

/* Anchors */

let anchors = document.querySelectorAll('a');

for(let i = 0, length = anchors.length; i < length; i++) {
	anchors[i].addEventListener('click', function(e) {
		if (anchors[i].getAttribute('href') !== '#' &&
				anchors[i].getAttribute('href').trim() &&
				anchors[i].getAttribute('href').substr(0, 1) === '#' &&
				document.querySelector(anchors[i].getAttribute('href'))) {
			e.preventDefault();
			let anchorID = anchors[i].getAttribute('href');

			function scrollValue() {
				if (nav != undefined) {
					if (document.querySelector(anchorID).offsetTop > pageYOffset) {
						return document.querySelector(anchorID).offsetTop;
					}

					if (document.querySelector(anchorID).offsetTop <= pageYOffset) {
						return document.querySelector(anchorID).offsetTop - nav.offsetHeight;
					}
				} else {
					return document.querySelector(anchorID).offsetTop;
				}
			}
			
			window.scrollTo({
				top: scrollValue(),
				behavior: 'smooth'
			});
		}
	});
}

/* Popup */

let popupBtn = document.querySelectorAll('.popup-btn');
let closePopupBtn = document.querySelectorAll('.popup__close');
let unlock = true;
let timeout = 500;

if (popupBtn.length > 0) {
	for(let i = 0, length = popupBtn.length; i < length; i++) {
		popupBtn[i].addEventListener('click', function(e) {
			openPopup(document.getElementById(popupBtn[i].getAttribute('data-to-popup')));
		});
	}
}

if (closePopupBtn.length > 0) {
	for(let i = 0, length = closePopupBtn.length; i < length; i++) {
		closePopupBtn[i].addEventListener('click', function(e) {
			closePopup(closePopupBtn[i].closest('.popup'));
		});
	}
}

function openPopup(elem) {
	if (elem && unlock) {
		let popupActive = document.querySelector('.popup.open');

		if (popupActive) {
			closePopup(popupActive, false);
		} else {
			bodyLock();
		}

		elem.classList.add('open');
		elem.addEventListener('click', function(e) {
			if (!e.target.closest('.popup__body')) {
				closePopup(e.target.closest('.popup'));
			}
		});
	}
}

function closePopup(elem, doUnlock = true) {
	if (unlock) {
		elem.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixedPadding.length > 0) {
		for(let i = 0, length = fixedPadding.length; i < length; i++) {
			fixedPadding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (fixedPadding.length > 0) {
			for(let i = 0, length = fixedPadding.length; i < length; i++) {
				fixedPadding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if (e.which === 27) {
		closePopup(document.querySelector('.popup.open'));
	}
});

/* Select */

$(document).ready(function() {
	$('.learning-form__select').select2();
});