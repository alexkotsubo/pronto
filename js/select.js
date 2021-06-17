/* Select */

function addSelect(elem, multiple = false) {
	if (elem) {
		document.addEventListener('DOMContentLoaded', function(e) {
			if (!elem.getAttribute('data-select-disable')) {
				let selectIcon = document.querySelector('#' + elem.id + ' .select__icon');
				let selectList = document.querySelector('#' + elem.id + ' .select__list');
				let selectInput = document.querySelectorAll('#' + elem.id + ' .select__list .select__input');
				let selectLabel = document.querySelectorAll('#' + elem.id + ' .select__list .select__label');
				let selectValue = document.querySelector('#' + elem.id + ' .select__value');
				let selectTitle = document.querySelector('#' + elem.id + ' .select__title');
				let prevValue;
				let countValue = 0;
				let mainTitle = selectValue.innerHTML;

				if (elem.getAttribute('data-select-size') > 0 && elem.getAttribute('data-select-size') <= selectLabel.length) {
					let heightSize = 0;
					for(let i = 0, length = elem.getAttribute('data-select-size'); i < length; i++) {
						heightSize += selectLabel[i].offsetHeight;
					}
					selectList.style.height = heightSize + 'px';
				}

				if (elem.getAttribute('data-select-autofocus')) {
					turnSelect();
				}

				function requiredCheck() {
					if (elem.getAttribute('data-select-required')) {
						let notEmpty;
						if (!selectList.classList.contains('active')) {
							for(let i = 0, length = selectInput.length; i < length; i++) {
								if (selectInput[i].checked) {
									notEmpty = true;
									break;
								}
							}
							if (notEmpty != true) {
								selectList.classList.toggle('active');
								selectIcon.classList.toggle('active');
								elem.classList.add('error');
								return false;
							} else {
								elem.classList.remove('error');
								return true;
							}
						}
					}
				}

				function turnSelect() {
					selectList.classList.toggle('active');
					selectIcon.classList.toggle('active');
					requiredCheck();
				}

				document.documentElement.addEventListener('click', function(e) {
					if (!e.target.closest('#' + elem.id)) {
						selectList.classList.remove('active');
						selectIcon.classList.remove('active');
						requiredCheck();
					}
				});

				selectTitle.addEventListener('click', function(e) {
					turnSelect();
				});

				if (!multiple) {
					for(let i = 0, length = selectInput.length; i < length; i++) {
						if (selectInput[i].checked) {
							selectValue.innerHTML = selectLabel[i].innerHTML;
							prevValue = i;
						}

						selectInput[i].addEventListener('change', function(e) {
							turnSelect();
							selectValue.innerHTML = selectLabel[i].innerHTML;
							if (prevValue !== undefined && prevValue !== i) {
								selectInput[prevValue].checked = false;
							}
							prevValue = i;
							if (prevValue === i && !elem.getAttribute('data-select-required') && mainTitle != '') {
								selectValue.innerHTML = mainTitle;
								prevValue = undefined;
							} else if (prevValue === i) {
								selectInput[prevValue].checked = true;
								prevValue = i;
							}
						});
					}
				} else {
					for(let i = 0, length = selectInput.length; i < length; i++) {
						if (selectInput[i].checked) {
							if (selectValue.innerHTML == '' || countValue == 0) {
								selectValue.innerHTML = selectLabel[i].innerHTML;
							} else {
								selectValue.innerHTML += ', ' + selectLabel[i].innerHTML;
							}
							countValue += 1;
						}

						selectInput[i].addEventListener('change', function(e) {
							turnSelect();
							if (selectInput[i].checked) {
								if (selectValue.innerHTML == '' || countValue == 0) {
									selectValue.innerHTML = selectLabel[i].innerHTML;
								} else {
									selectValue.innerHTML += ', ' + selectLabel[i].innerHTML;
								}
								countValue += 1;
							} else {
								let prevText = selectValue.innerHTML;
								selectValue.innerHTML = selectValue.innerHTML.replace(', ' + selectLabel[i].innerHTML, '');
								if (prevText == selectValue.innerHTML) {
									selectValue.innerHTML = selectValue.innerHTML.replace(selectLabel[i].innerHTML + ', ', '');
								}
								countValue -= 1;
							}

							if (countValue == 0 && !elem.getAttribute('data-select-required') && mainTitle != '') {
								selectValue.innerHTML = mainTitle;
							} else if (countValue == 0) {
								selectInput[i].checked = true;
								countValue += 1;
							}
						});
					}
				}
			} else {
				elem.classList.add('disable');
			}
		});
	}
}

addSelect(document.getElementById('elem-select'));