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

// Object.prototype.getKeyByValue = function(value, objs) {
//     // защита от циклических ссылок
//     if (!objs)
//       objs = [];
//     for (var prop in this) {
//       if (this.hasOwnProperty(prop)) {
//         if (this[prop] === value) {
//           return prop;
//         } else if (typeof this[prop] === "object" && objs.indexOf(this[prop]) == -1) {
//           objs.push(this[prop]);
//           var res = this[prop].getKeyByValue(value, objs);
//           if (res)
//             return prop + "." + res; //за дополнительные баллы оценки - выведем цепочку названий ключей
//         }
//       }
//     }
//   }

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




function selectTemplate () {
	const rightSelectBtn = document.querySelector('#rightSelectBtn')
	const leftSelectBtn = document.querySelector('#leftSelectBtn')
	const closePopupBtn = document.querySelector('#closePopupBtn')
	const closeOutPopup = document.querySelector('.fixed-overlay')
	const selectCreateBtn = document.querySelector('#selectCreateBtn')

	const imgSiteSelect = document.querySelector('#imgSiteSelect')

	const popup = document.querySelector('.fixed-overlay__modal')

	const allCardsImg = document.querySelectorAll('.templateSlide > img')

	console.log(allCardsImg)

	
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
			console.log('dfjdhfjdhfj')
			templateName = (el.src).replace('https:d3uexwp24ewwim.cloudfront.net/editor/templates/', '').replace('/img/main-bg.png', '')
		   
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

		templateName = tempData[indexTemplate]['url'].replace('https:d3uexwp24ewwim.cloudfront.net/editor/templates/', '')

		imgSiteSelect.src = tempData[indexTemplate]['url'] + '/img/main-bg.png'
	}

	leftSelectBtn.onclick = () => {
		indexTemplate -= 1
		checkIndex()
	   
		templateName = tempData[indexTemplate]['url'].replace('https:d3uexwp24ewwim.cloudfront.net/editor/templates/', '')

		imgSiteSelect.src = tempData[indexTemplate]['url'] + '/img/main-bg.png'
	}

	selectCreateBtn.onclick = () => {
		let id = wcr_templates.getKeyByValue(templateName)

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
	setTimeout(() => {selectTemplate()}, 1000);
	
    
	
} 

load()