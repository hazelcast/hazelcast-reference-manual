	    	$(function() {
                  var toc = $("#toc").tocify().data("toc-tocify");
                  toc.setOptions({ showEffect: "show", 
						showEffectSpeed: "fast",
						hideEffect: "none",
						hideEffectSpeed: "fast",
						scrollTo: 5, 
						smoothScroll: false, 
						highlightOnScroll: true
						//extendPage: true,
						//extendPageOffset: 100,
						});
              });
