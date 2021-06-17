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