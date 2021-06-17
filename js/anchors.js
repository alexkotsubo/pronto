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