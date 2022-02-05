// (function($) {
// 	"use strict";


    

// })(jQuery);

const mainData = [
    {'url':'https://d3uexwp24ewwim.cloudfront.net/editor/templates/micro/barber',
    'tags': ['sport', 'beauty'], 'description': 'Sample text to display'},
    {'url':'https://d3uexwp24ewwim.cloudfront.net/editor/templates/micro/lami',
    'tags': ['art', 'business'], 'description': 'Sample text to display'},
    {'url':'https://d3uexwp24ewwim.cloudfront.net/editor/templates/micro/nails',
    'tags': ['health', 'person'], 'description': 'Sample text to display'},
    {'url':'https://d3uexwp24ewwim.cloudfront.net/editor/templates/micro/cakes',
    'tags': ['person', 'business'], 'description': 'Sample text to display'},
    {'url':'https://d3uexwp24ewwim.cloudfront.net/editor/templates/micro/smm',
    'tags': ['person', 'beauty'], 'description': 'Sample text to display'},
]

let mainPagesData = [
    /*{'url':'https://d3uexwp24ewwim.cloudfront.net/drafts/1/X3XAIYKXGEFQ',
    'title': 'User page title1'},
    {'url':'https://d3uexwp24ewwim.cloudfront.net/drafts/1/ON6394RN3P1P',
    'title': 'User page title9'},
	{'url':'https://d3uexwp24ewwim.cloudfront.net/drafts/1/ON6394RN3P1P',
    'title': 'User page title5'},
	{'url':'https://d3uexwp24ewwim.cloudfront.net/drafts/1/ON6394RN3P1P',
    'title': 'User page title3'},*/
	{'userid':'1',
	'siteid':'X3XAIYKXGEFQ',
    'title': 'User page title1'},
	{'userid':'1',
	'siteid':'ON6394RN3P1P',
	'title': 'User page title2'},
	{'userid':'1',
	'siteid':'9XC2M35X6GEL',
	'title': 'User page title3'},
]





let tempData = []
tempData = mainData




function updateCards(){
    const cardContainer = document.querySelector('.templatesCarousel')

    cardContainer.innerHTML = tempData.map(item => 
		`<div class="carousel__slide templateSlide">
			<img src="${item['url']}/img/main-bg.png" class="carousel__image" alt="Carousel Slide Image"/>
			<h3 class="carousel__title">${item['description']}</h3>
	  	</div>`
    ).join('')

}

function userPages (data) {
	const pagesCarouselBlock = document.querySelector('.pagesCarouselBlock')
	const pagesSlider = document.querySelector('.pagesSlider')
	const pagesText = document.querySelector('.pagesText')

	function pageSlides(){
		const pageSlide = document.querySelectorAll('.overlayPagesSlider')

		for(let slide of pageSlide){
			slide.onclick = () => {
				location.href = `https:d3uexwp24ewwim.cloudfront.net/editor/edit.html?userid=${slide.parentElement.dataset.wcrUserid}&siteid=${slide.parentElement.dataset.wcrSiteid}`
			}
		}
	}

	if(data.length != 0){

		// pagesSlider.innerHTML = data.map(item => 
		// 	`<div class="carousel__slide pagesSlide">
		// 		<iframe width="300" height="550" scrolling="no" src="${item['url']}/index.html" class="carousel__image" alt="Carousel Slide Image">No support</iframe>
		// 		<h3 class="carousel__title">${item['title']}</h3>
		// 		<div class="overlayPagesSlider"></div>
		// 	  </div>`
		// ).join('')

		pagesSlider.innerHTML = data.map(item => 
			`<div class="carousel__slide pagesSlide" data-wcr-userid="${item['userid']}" data-wcr-siteid="${item['siteid']}">
				<iframe width="300" height="550" scrolling="no" src="https://d3uexwp24ewwim.cloudfront.net/drafts/${item['userid']}/${item['siteid']}/index.html" class="carousel__image" alt="Carousel Slide Image">No support</iframe>
				<h3 class="carousel__title">${item['title']}</h3>
				<div class="overlayPagesSlider"></div>
			  </div>`
		).join('')


		pagesCarouselBlock.style.display = "block"
		pagesText.style.display = "none"

		setTimeout(() => {pageSlides()}, 3000);
	}else{
		pagesCarouselBlock.style.display = "none"
		pagesText.style.display = "block"
	}
}




function selectTemplate () {
	const rightSelectBtn = document.querySelector('#rightSelectBtn')
	const leftSelectBtn = document.querySelector('#leftSelectBtn')
	const closePopupBtn = document.querySelector('#closePopupBtn')
	const closeOutPopup = document.querySelector('.fixed-overlay')
	const selectCreateBtn = document.querySelector('#selectCreateBtn')

	const imgSiteSelect = document.querySelector('#imgSiteSelect')

	const popup = document.querySelector('.fixed-overlay__modal')

	const allCardsImg = document.querySelectorAll('.templateSlide > img')

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}

	
	wcr_templates = {
		'0': 'micro/barber',
		'1': 'micro/cakes',
		'2': 'micro/lami',
		'3': 'micro/nails',
		'4': 'micro/smm',
	}

	let templateName = ''
	let indexTemplate = 0

	closePopupBtn.onclick = () => {
		popup.classList.remove('active')
	}

	closeOutPopup.onclick = (e) => {
		if(e.target.parentElement.className != 'selectTemplateBlock' && e.target.parentElement.className != 'selectTemplateBtns' && e.target.className != 'selectTemplateBlock' && e.target.className != 'selectTemplateBtns' && e.target.className != 'modal_container'){
			popup.classList.remove('active')
		}
	}


	function checkIndex(){
		if(indexTemplate > tempData.length - 1) 
			indexTemplate = 0
		if(indexTemplate < 0) 
			indexTemplate = tempData.length - 1
	}

	for(let el of allCardsImg){
		el.onclick = () => {
			templateName = (el.src).replace('https://d3uexwp24ewwim.cloudfront.net/editor/templates/', '').replace('/img/main-bg.png', '')
		   
			popup.classList.add('active')

			imgSiteSelect.src = el.src

			for(let templateEl of tempData){
				if(templateEl['url'].includes(templateName)){
					indexTemplate = tempData.indexOf(templateEl)
				}
			}
		}
	}

	rightSelectBtn.onclick = () => {
		indexTemplate += 1
		checkIndex()

		templateName = tempData[indexTemplate]['url'].replace('https://d3uexwp24ewwim.cloudfront.net/editor/templates/', '')

		imgSiteSelect.src = tempData[indexTemplate]['url'] + '/img/main-bg.png'
	}

	leftSelectBtn.onclick = () => {
		indexTemplate -= 1
		checkIndex()
	   
		templateName = tempData[indexTemplate]['url'].replace('https://d3uexwp24ewwim.cloudfront.net/editor/templates/', '')

		imgSiteSelect.src = tempData[indexTemplate]['url'] + '/img/main-bg.png'
	}

	selectCreateBtn.onclick = () => {
		let id = getKeyByValue(wcr_templates, templateName)
		let oReq = new XMLHttpRequest();
		oReq.open("GET", 'https:e7wqns4290.execute-api.eu-central-1.amazonaws.com/user/create/' + id, true);
		oReq.setRequestHeader("Authorization", "1");
		oReq.onload = function (oEvent) {
			location.href = "https:d3uexwp24ewwim.cloudfront.net/editor/edit.html?userid=1&siteid=" + JSON.parse(oEvent.srcElement.response).templateid
		};

		oReq.send();
	}
}


function load() {
    updateCards()
	userPages(mainPagesData)
	setTimeout(() => {selectTemplate()}, 3000);
} 

load()
