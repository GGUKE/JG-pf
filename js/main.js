const ui={
	init: function(){
		this.header();
		this.page1();
		this.page2();
		this.page3();
		this.page4();
	},
	header(){
		document.querySelector('.tab').addEventListener('click', function(e) {
			e.preventDefault(); 
			
			let tab = this.closest('.tab');
			tab.classList.toggle('active');
		});

		let gnbClick=document.querySelectorAll("#header .gnb_inner ul li");
		let sectionArr=document.querySelectorAll("section");

		
		gnbClick.forEach((item, i) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();

				if(i == 0){
					gsap.to(window, {
						scrollTo: 0, duration: 0.3
					})
				}
				else{
					gsap.to(window, {
						scrollTo: sectionArr[i-1], duration: 0.3
					})
				}
			});
		});
		
    },
	page1(){

		let logoColor=document.querySelector("#header");
		
		const page1Tl=gsap.timeline({
			scrollTrigger: {
				trigger: "#page1",
				scrub: true,
				start: "top 1%",
				// markers: true,
				onEnter: function(){
					logoColor.classList.add("on");
				},
				onLeaveBack: function(){
					logoColor.classList.remove("on");
				} 
			}
		});
		
		if(window.matchMedia("(max-width: 768px)").matches){
			gsap.utils.toArray(".main-typo").forEach(function(mainTypo){
				const tl=gsap.timeline({
					scrollTrigger: {
						trigger: mainTypo,
						scrub: 1,
						start: "top bottom",
					}
				});
		
				tl.to(mainTypo.querySelector("div:nth-child(1)"), {
					x: "-7%",
					duration: 1
				});
		
				tl.to(mainTypo.querySelector("div:nth-child(2)"), {
					x: "7%",
					duration: 1,
					delay: -1
				});
			});
		}
		else{ // pc
			gsap.utils.toArray(".main-typo").forEach(function(mainTypo){
				const tl=gsap.timeline({
					scrollTrigger: {
						trigger: mainTypo,
						scrub: 1,
						start: "top bottom"
					}
				});
		
				tl.to(mainTypo.querySelector("div:nth-child(1)"), {
					x: "-20%",
					duration: 1
				});
		
				tl.to(mainTypo.querySelector("div:nth-child(2)"), {
					x: "20%",
					duration: 1,
					delay: -1
				});
			});
		}
		
		gsap.utils.toArray(".scale-ani").forEach(function(scaleAni){
			const tl=gsap.timeline({
				scrollTrigger: {
					trigger: scaleAni,
					start: "top center",
					end: "bottom top",
					// markers: true,
					scrub: 1,
					onEnter: function(){
						scaleAni.classList.add("active");
					},
					onLeaveBack: function() {
						scaleAni.classList.remove("active");
					}
				},
			});
		});

	},
	page2(){

		const skillsTl=gsap.timeline({
			scrollTrigger: {
				trigger: "#page2",
				scrub: true,
				start: "top center",
				// markers: true,
				onEnter: function(){
					document.body.classList.add("active");
				},
				onEnterBack: function(){
					document.body.classList.add("active");
				},
				onLeaveBack: function(){
					document.body.classList.remove("active");
				} 
			}
		});
		
		const swiper=new Swiper(".mainSwiper", {
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true
			},
			breakpoints: {
				480: {
					slidesPerView: 1,
					spaceBetween: 10
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				1020: {
					slidesPerView: 3,
					spaceBetween: 30
				}
			},
		});

	},
	page3(){

		let page3inner=document.querySelectorAll("#page3 .inner .info");
		
		const page3Tl=gsap.timeline({
			scrollTrigger: {
				trigger: "#page3",
				start: "top center",
				end: "+=3000",
				// markers: true,
			}
		});
		
		page3Tl.fromTo("#page3 .title", {
			opacity: 0.1
		},{
			opacity: 1, duration: 0.5
		});
		
		page3Tl.fromTo("#page3 .info", {
			x: -50, opacity: 0
		},{
			x: 0, opacity: 1, duration: 0.3, stagger: 0.1
		});
		
		page3inner[0].classList.add("active");
		
		gsap.fromTo(page3inner[0].lastElementChild, { display: "block", height: 0 }, { height: "auto", duration: 0.3 });
		
		page3inner.forEach(function(item1, i){
			item1.addEventListener("click", function(e){
				e.preventDefault();
		
				if(e.target === e.currentTarget.querySelector(".link")){
					window.open(e.currentTarget.querySelector(".link").getAttribute("href"), "portfolio");
		
					return;
				}
		
				if(item1.classList.contains("active") == false){
					page3inner.forEach(function(item2, j){
						if(j == i){
							item2.classList.add("active");
							gsap.fromTo(item2.lastElementChild, {
								display: "block", height: 0
							},
							{
								height: "auto", duration: 0.3
							});
						}
						else{
							item2.classList.remove("active");
							gsap.to(item2.lastElementChild, {
								height: 0, display: "none", duration: 0.3
							});
						}
					});
				}
				else{
					item1.classList.remove("active");
		
					gsap.to(item1.lastElementChild, {
						height: 0, display: "none", duration: 0.3
					});
				}
			});
		});
		
	},
	page4(){
		const prdSwiper=new Swiper(".main-product .swiper", {
			loop: true,
			speed: 2000,
			slidesPerView: 1.5,
			centeredSlides: true,
			spaceBetween: 20,
			autoplay: {
				delay: 4000
			},
			breakpoints: {
				769: {
					slidesPerView: 3,
					spaceBetween: 20
				},
				1025: {
					slidesPerView: 4.5,
					spaceBetween: 50
				}
			}
		});
	}
	
}

window.addEventListener("load", function(){
	lenisAnimation();
	ui.init();
});