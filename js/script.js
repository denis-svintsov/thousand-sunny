"use strict"

window.addEventListener("DOMContentLoaded", () => {

	// Проверка мобильного устройства
	const isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		IOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.IOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			);
		}
	}

	if (isMobile.any()) {
		document.body.classList.add("_touch");

		let menuArrows = document.querySelectorAll('.menu__arrow');
		if (menuArrows.length > 0) {
			for (let index = 0; index < menuArrows.length; index++) {
				const menuArrow = menuArrows[index];
				menuArrow.addEventListener("click", function (e) {
					menuArrow.parentElement.classList.toggle('_active');
				});
			}
		}

	}
	else {
		document.body.classList.add("_pc");
	}

	//Меню бургер
	const iconMenu = document.querySelector('.menu__icon');
	const menuBody = document.querySelector('.menu__body');
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		});
	}

	//Скролл при клике
	const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener("click", onMenuLinkClick)
		});

		function onMenuLinkClick(e) {
			const menuLink = e.target;
			if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto);
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

				if (iconMenu.classList.contains('_active')) {
					document.body.classList.remove('_lock');
					iconMenu.classList.remove('_active');
					menuBody.classList.remove('_active');
				}

				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth"
				});
				e.preventDefault(e);
			}
		}
	}

	//Спойлеры
	// const spoilers = document.querySelectorAll('.spoiler');
	// const spoiler_item = document.querySelectorAll('.spoiler-item');
	// if (spoilers) {
	// 	iconMenu.addEventListener("click", function (e) {
	// 		iconMenu.classList.toggle('_active');
	// 		menuBody.classList.toggle('_active');
	// 	});
	// }
	let spoilers = document.querySelectorAll('.spoiler');
	let spoilers_item = document.querySelectorAll('.spoiler-item');
	if (spoilers.length > 0) {
		for (let index = 0; index < spoilers.length; index++) {
			const spoiler = spoilers[index];
			const spoiler_item = spoilers_item[index];
			spoiler.addEventListener("click", function (e) {
				spoiler.classList.toggle('_active');
				spoiler_item.classList.toggle('_active');
			});
		}
	}
})