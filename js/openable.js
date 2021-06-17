/* Openable */

window.addEventListener('load', (e) => {
	const openBlocks = document.querySelectorAll('.openable');

	for(let i = 0, length = openBlocks.length; i < length; i++) {
		const openContent = openBlocks[i].querySelector('.openable__content');
		const openBtn = openBlocks[i].querySelector('.openable__btn');
		// В атрибут data-start-height мы 
		// либо передаем data-start-height="колчичество рядов которое хотим показывать, елемент который является частью ряда и задаёт его высоту - например карточка, null, контейнер который оборачивает всё внутри .openable__content"
		// либо передаем data-start-height="null, null, просто высоту которую хотим показывать - полезно в случае скрытия текста, контейнер который оборачивает всё внутри .openable__content"
		const dataStartHeight = openContent.getAttribute('data-start-height').split(', ');
		let openWrapHeight = openBlocks[i].querySelector(dataStartHeight[3]).offsetHeight;
		let startHeight = 0;
		let opened = false;

		function calcStartHeight(e) {
			openWrapHeight = openBlocks[i].querySelector(dataStartHeight[3]).offsetHeight;
			if (dataStartHeight[2] === 'null') {
				startHeight = openBlocks[i].querySelector(dataStartHeight[1]).offsetHeight * +dataStartHeight[0];
			} else {
				startHeight = dataStartHeight[2];
			}

			if (e) {
				if (opened) {
					openContent.style.height = openWrapHeight + 'px';
				} else {
					openContent.style.height = startHeight + 'px';
				}
			}
		}

		window.addEventListener("resize", calcStartHeight);
		calcStartHeight();

		if (startHeight >= openWrapHeight) {
			openBtn.classList.add('disabled');
		} else {
			openContent.style.height = startHeight + 'px';

			openBtn.addEventListener('click', function(e) {
				if (!opened) {
					openContent.style.height = openWrapHeight + 'px';
					opened = true;
				} else {
					openContent.style.height = startHeight + 'px';
					opened = false;
				}
			});
		}
	}
});