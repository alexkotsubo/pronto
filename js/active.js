/* Active */

let anchors = document.querySelectorAll('a');

if (anchors) {
	let scroll = [];
	let maxScroll = [];
	let bodyHeight = document.body.scrollHeight;
	let prevScroll = 0;

	function getScrollValues() {
		for(let i = 0, length = anchors.length; i < length; i++) {
			if (anchors[i].getAttribute('href') !== '#' &&
					anchors[i].getAttribute('href').trim() &&
					anchors[i].getAttribute('href').substr(0, 1) === '#' &&
					document.querySelector(anchors[i].getAttribute('href'))) {
				if (nav != undefined) {
					if (pageYOffset > prevScroll) {
						scroll[i] = document.querySelector(anchors[i].getAttribute('href')).offsetTop;
					}

					if (pageYOffset <= prevScroll) {
						scroll[i] = document.querySelector(anchors[i].getAttribute('href')).offsetTop - nav.offsetHeight;
					}
				} else {
					scroll[i] = document.querySelector(anchors[i].getAttribute('href')).offsetTop;
				}
				maxScroll[i] = document.querySelector(anchors[i].getAttribute('href')).offsetHeight + scroll[i];
				prevScroll = pageYOffset;
			} else {
				scroll[i] = null;
				maxScroll[i] = null;
			}
		}
	}

	function getScrollPosition() {
		for(let i = 0, length = anchors.length; i < length; i++) {
			if (scroll[i] != null && pageYOffset >= scroll[i] && pageYOffset < maxScroll[i]) {
				anchors[i].classList.add('active');
			} else {
				anchors[i].classList.remove('active');
			}
		}
	}

	function addActive() {
		let scroll = [];
		let maxScroll = [];

		getScrollValues();
		getScrollPosition();

		window.addEventListener('scroll', function(e) {
			if (document.body.scrollHeight == bodyHeight) {
				getScrollPosition();
			} else {
				bodyHeight = document.body.scrollHeight;
				getScrollValues();
				getScrollPosition();
			}
		});
	}

	addActive();
}