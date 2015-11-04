// NOTES

// Make all .column child elements have the attribute contenteditable set to false, 
// except for the element that has focus; set this to true.

// This will prevent nested elements from being able to delete or merge with surrounding elements.

// On save, remove contenteditable attribute from all .column child elements (or all elements)

// Add listener that adds option to delete element, maybe add a button to the wysiwyg toolbar

// self invoking module test

var moduleEditor = (function(){

	// default properties
	var masterContainer = '.master-content-container';
	
	// mutationObserver
	// var target 			= document.querySelector('.master-content-container');
	// var observer;
	// var observerConfig 	= { attributes: true, childList: true, characterData: true };

	// drag and drop
	var source;
	var draggableID;
	var droppableID;
	var draggableParentID;
	var droppableParentID;
	var draggableParentClass;
	var droppableParentClass;
	var draggableHTML;
	// editor
	var editorMode = 'easy';
	var oTemplate = {
		elementType : '',
		elementParent : '',
		containerType : '',
		columnTemplate : ''
	}
	var DEFAULTS = {
		//editorMode : 'easy',
		draggableElements : ['article', 'section'],
		draggableClasses : ['article', 'section', 'row', 'container', 'column'], // 'col-xs-1', 'col-xs-2', 'col-xs-3', 'col-xs-4', 'col-xs-5', 'col-xs-6', 'col-xs-7', 'col-xs-8', 'col-xs-9', 'col-xs-10', 'col-xs-11', 'col-xs-12', '.col-sm-1', 'col-sm-2', 'col-sm-3', 'col-sm-4', 'col-sm-5', 'col-sm-6', 'col-sm-7', 'col-sm-8', 'col-sm-9', 'col-sm-10', 'col-sm-11', 'col-sm-12', '.col-md-1', 'col-md-2', 'col-md-3', 'col-md-4', 'col-md-5', 'col-md-6', 'col-md-7', 'col-md-8', 'col-md-9', 'col-md-10', 'col-md-11', 'col-md-12', '.col-lg-1', 'col-lg-2', 'col-lg-3', 'col-lg-4', 'col-lg-5', 'col-lg-6', 'col-lg-7', 'col-lg-8', 'col-lg-9', 'col-lg-10', 'col-lg-11', 'col-lg-12'
		featuresCollection : {
			section : {
				attributes : {
					draggable : true,
					dragText : 'Section', // Drag Section (<span class="fa fa-arrows"></span>)
					className : 'section module-editor-toolbar-drag'
				},
				features : [
					{
						name : "Collapse <span class='fa fa-chevron-down'></span>", 
						elementType : 'button',
						className : 'editor-section-collapse'
					},
					{
						name : 'Add Article (prepend)',
						elementType : 'button',
						className : 'editor-section-add-article module-editor-toolbar-button'
					},
					{
						name : 'Delete Section',
						elementType : 'button',
						className : 'editor-section-delete-section module-editor-toolbar-button'
					},
					{
						name : 'Add New Section',
						elementType : 'button',
						className : 'editor-section-add-section module-editor-toolbar-button'
					}				
				]			
			},
			article : {
				attributes : {
					draggable : true,
					dragText : 'Article', // Drag Article
					className : 'article module-editor-toolbar-drag'
				},
				features : [
					{
						name : "Collapse <span class='fa fa-chevron-down'></span>", 
						elementType : 'button',
						className : 'editor-article-collapse'
					},
					{
						name : 'Add Row',
						elementType : 'button',
						className : 'editor-article-add-row module-editor-toolbar-button'
					},	
					{
						name : 'Delete Article',
						elementType : 'button',
						className : 'editor-article-delete-article module-editor-toolbar-button'
					},
					{
						name : 'Add Article (after)',
						elementType : 'button',
						className : 'editor-article-add-article module-editor-toolbar-button'
					}			
				]
			},
			row : {
				attributes : {
					draggable : true,
					dragText : 'Row', // Drag Row
					className : 'row module-editor-toolbar-drag'
				},
				features : [
					{
						name : "Collapse <span class='fa fa-chevron-down'></span>", 
						elementType : 'button',
						className : 'editor-row-collapse'
					},
					// {
					// 	name : 'Add Columns',
					// 	elementType : 'button',
					// 	className : 'editor-row-add-columns module-editor-toolbar-button'
					// },
					{
						name : 'Delete Row',
						elementType : 'button',
						className : 'editor-row-delete-row module-editor-toolbar-button'
					},
					{
						name : 'Add Row',
						elementType : 'button',
						className : 'editor-row-add-row module-editor-toolbar-button'
					}
				]
			},
			column : {
				attributes : {
					draggable : true,
					dragText : 'Column', // Drag Column
					className : 'editor-column module-editor-toolbar-drag'
				},
				features : [
					// {
					// 	name : "Add Widget",
					// 	elementType : 'button',
					// 	className : 'editor-column-add-widget module-editor-toolbar-button'
					// },
					// {
					// 	name : "--", 
					// 	elementType : 'button',
					// 	className : 'fa fa-chevron-down editor-column-collapse'
					// }
				]
			}
		},
		templates : {
			section : "<section class='section'><article class='article'></article></section>",
			article : "<article class='article'>[columns will go here, prompt user to select columns with a button]</article>",			
			row 	: "<div class='row'>row was added</div>",
			column 	: "<div class='column'>column was added</div>",
			columns : {
				"Standard" : [
					"_12", 
					"_6x6",
					"_4x4x4",
					"_3x3x3x3",
					"_2x2x2x2x2x2"
				],
				"Three Column" : [
					//"_1x10x1",
					//"_2x8x2",
					"_3x6x3",
					"_5x2x5"
				],
				"Two Column" : [
					"_2x10", 
					"_10x2",
					"_3x9", 
					"_9x3",
					"_4x8", 
					"_8x4",
					"_5x7",					 
					"_7x5"
				]
			},
			widgets : {
				// some widget
			}
		}
	};

	// html elemtents methods
	// function sectionHTML(innerElements){
	// 	var html = document.createElement('section');
	// 		html.setAttribute('class', 'section');
	// 		html.appendChild( innerElements );
	// 	return html;
	// }

	// function articleHTML(innerElements){
	// 	var html = document.createElement('article');
	// 		html.setAttribute('class', 'article');
	// 		html.appendChild( innerElements );
	// 	return html;	
	// }

	// function containerHTML(innerElements){
	// 	var html = document.createElement('div');
	// 		html.setAttribute('class', 'container');
	// 		html.appendChild( innerElements );
	// 	return html;
	// }

	// function rowHTML(innerElements){
	// 	var html = document.createElement('div');
	// 		html.setAttribute('class', 'row');
	// 		html.appendChild( innerElements );
	// 	return html;
	// }

	// function columnHTML(cols){
	// 	var h = document.createElement('h1');
	// 	var html = document.createElement('div');
	// 		html.setAttribute('class', 'column col-xs-12 col-sm-12 col-md-'+cols+' col-lg-'+cols);
	// 		html.appendChild(h);
	// 	return html;
	// }

	function closestParent(el, selector) {
	    var matchesFn;
	    var parent;
	    // find vendor prefix
	    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
	        if (typeof document.body[fn] == 'function') {
	            matchesFn = fn;
	            return true;
	        }
	        return false;
	    });
	    // traverse parents
	    while (el!==null) {
	        parent = el.parentElement;
	        if (parent!==null && parent[matchesFn](selector)) {
	            return parent;
	        }
	        el = parent;
	    }
    	return null;
	}

	// html string methods
	function getSectionHTML(innerElements){
		return "<section class='section'>"+innerElements+"</section>";
	}

	function getArticleHTML(innerElements){
		return "<article class='article'>"+innerElements+"</article>";
	}

	function getContainerHTML(innerElements){
		return "<div class='container'>"+innerElements+"</div>";
	}

	function getRowHTML(innerElements){
		return "<div class='row'>"+innerElements+"</div>";
	}

	function getColumnHTML(template){
		var aTemplate = template.replace('_','').split('x');
		var html = "";
		// console.log('aTemplate', aTemplate);
		for(var i=0;i<aTemplate.length;i++){
			// console.log('aTemplate[i]', aTemplate[i]);
			html += buildColumn(aTemplate[i]);
		}
		return html;
	}

	function buildColumn(cols){
		return "<div class='column col-xs-12 col-sm-12 col-md-"+cols+" col-lg-"+cols+"' contenteditable='true'>" +
					"<h2>Sed Ut Perspiciatis</h2>" + 
					"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>" +
				"</div>";
	}

	function getOTemplate(){
		return oTemplate;
	}

	function createUUID(){
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		return uuid;
	}

	function isbefore(a, b) {
	    if (a.parentNode == b.parentNode) {
	        for (var cur = a; cur; cur = cur.previousSibling) {
	            if (cur === b) { 
	                return true;
	            }
	        }
	    }
	    return false;
	} 

	function httpGet(url, oData){
		var response;
		$.ajax({
			url : url,
			dataType : 'json',
			data : oData
		})
		.success(function(data){
			// console.log('data', data);
			return data;
		})
		.error(function(){
			response = 'An unknown error occurred.';
		});
		return response;
	}

	return {

		// INIT MODULE

		init : function(){
			// watch for changes // https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			var list = document.querySelector('.master-content-container');
			var observer = new MutationObserver(function(mutations) {
				console.log('SOMETHING ADDED TO DOM');
				//moduleEditor.addContentEditable();

			});
			observer.observe(list, {
			    attributes: true,
			    childList: true,
			    characterData: true
			});

			$(masterContainer).addClass(editorMode);

			// add IDS to containers
			$(masterContainer + ' .container').each(function(){
				var elementID = $(this).attr('id');			
				if(elementID == undefined){
					$(this).attr('id', 'element-container-' + createUUID() ); // + Math.floor((Math.random() * 10000) + 1) );
				}
			});
			
			// listen for changes to the dom
			// and if a specific element (determined by class) is added than do something else
			// create an observer instance
			//$(masterContainer).on('DOMNodeInserted', function(e) {
				//console.log('e', e);
				//moduleEditor.addElementToolbar(e.target);
				// make columns editable
				//moduleEditor.addContentEditable(e.target);	
			//});
			
			moduleEditor.addContentEditable(masterContainer)//.addElementToolbars().setDelegations().addMissingToolbars();

			// test ckeditor
			// $('.column').on('focus', function(){
			// 	var element = $(this);
			// 	var editor = CKEDITOR.instances[ $(this).attr('id') ];
			// 	if(!editor){
			// 		$(this).children('.module-editor-toolbar').remove();
			// 		var editorID = $(this).attr('id');
			// 		CKEDITOR.inline( editorID );
			// 		CKEDITOR.instances[editorID].on('focus', function(){
			// 			//$(element).find('.module-editor-toolbar').remove();
			// 			var a = CKEDITOR.instances[editorID];
			// 			var e = jQuery( a.editable().$ ).find('.module-editor-toolbar').remove();
			// 			var f = a.getData();
			// 		});
			// 		CKEDITOR.instances[$(this).attr('id')].on('blur', function(){
			// 			moduleEditor.addMissingToolbars();
			// 		});
			// 	}
			// });
			
			// add toolbar html to content and set click events
			this.addElementToolbars().setDelegations();
			return this; // enable chaining
		},

		addContentEditable : function(){
			$(masterContainer + ' .module-editor-toolbar').each(function(){
				$(this).attr('contenteditable', false);
			});		
			$(masterContainer + ' .column').each(function(){
				$(this).attr('contenteditable', true);	
				$(this).click(function(){
					//$(this).attr('contenteditable', true);	
					// var el = $(this);
					// var range = document.createRange();
					// var sel = window.getSelection();
					// range.setStart(el,1);
					// range.collapse(true);
					// sel.addRange(range);
					// el.focus();
				});
				
			});	
			return this;	
		},

		addMissingToolbars : function(){
			// this is all that's needed to addMissingToolbars
			this.addElementToolbars();
			return this;
		},

		// iterate over objects, then add the toolbar 
		// this method used on page load only
		addElementToolbars : function(){
			// add toolbars by class
			for(var i=0;i<DEFAULTS.draggableClasses.length;i++){
				if(DEFAULTS.draggableClasses[i]!='container'){
					var aElements = $(masterContainer + ' .'+DEFAULTS.draggableClasses[i]);
					for(j=0;j<aElements.length;j++){
						this.addElementToolbar($(aElements[j]));	
					}				
				}				
			}
			return this;
		},

		// this method is used when module fires up, or when an element is added to the dom
		addElementToolbar : function(element){
			// console.log('addElementToolbar', element);
			var attributes 		= {};
			var features 		= [];
			var thisClass 		= '';			
			var html 			= '';
			var elementType 	= $(element).prop('nodeName');
			var elementClasses 	= $(element).attr('class');
			if(elementClasses != undefined){
				var aElementClasses = elementClasses.split(' ');
				for(var i=0;i<DEFAULTS.draggableClasses.length;i++){
					if(elementClasses.indexOf(DEFAULTS.draggableClasses[i])>=0){
						thisClass = DEFAULTS.draggableClasses[i];
					}
				}		
				if(thisClass != ''){
					this.addToolbarToElement(element, thisClass);	
				}				
			}			
			return this;
		},

		buildHTMLToolbar : function(thisClass){
			var attributes 	= DEFAULTS.featuresCollection[thisClass.toLowerCase()].attributes;
			var features 	= DEFAULTS.featuresCollection[thisClass.toLowerCase()].features;			
			var html 		= '';
				html += "<div class='module-editor-toolbar' contenteditable='false'>";
				html += "<span class='btn btn-primary btn-xs'><span class='fa fa-arrows'></span></span>"+"(DEBUG:"+attributes.dragText+")"; // + "["+ Math.floor((Math.random() * 100) + 1) +"]";	
			for(var i=0;i<features.length;i++){
				html += "<"+features[i].elementType+" class='btn btn-primary btn-xs pull-right "+features[i].className+"'>"+features[i].name+"</"+features[i].elementType+">";
			}
				html += "</div>";	
			return html;
		},
		
		addToolbarToElement : function(element, thisClass){
			// console.log('addToolbarToElement', thisClass, element);
			// add id if id does not exist
			var elementID = $(element).attr('id');			
			// console.log('elementID',elementID);
			if(elementID == undefined){
				// console.log('INSIDE');
				$(element).attr('id', 'element-' + thisClass + '-' + createUUID() ); // + Math.floor((Math.random() * 10000) + 1) );
			}
			if( !$(element).children().hasClass('module-editor-toolbar') ){ // && !$(element).children().hasClass('container')
				var html = this.buildHTMLToolbar(thisClass);
					$(element).attr('draggable', true)
						.attr('ondrag', 'return moduleEditor.doOnDrag(event)')
						.attr('ondragstart', 'return moduleEditor.doOnDragStart(event)')
						.attr('touchstart', 'return moduleEditor.doOnTouchStart(event)')
						.attr('ondragend', 'return moduleEditor.doOnDragEnd(event)');
						//.attr('onclick', 'return false'); // for IE
				$(element).prepend(html);
				// droppable attributes
				if(!$(element).parent().hasClass('container')){
					$(element).parent().attr('ondrop', 'return moduleEditor.doOnDrop(event)')
						.attr('ondragover', 'return moduleEditor.doOnDragOver(event)')
						.attr('ondragenter', 'return moduleEditor.doOnDragEnter(event)')
						.attr('ondragleave', 'return moduleEditor.doOnDragLeave(event)');	
				}
			}	
			return this;
		},

		// DELEGATIONS

		setDelegations : function(){
			// add elements
			$(masterContainer).delegate('.editor-section-add-section', 'click', function(){
				oTemplate.elementType = 'section'; 
				oTemplate.elementParent = $(this);
				moduleEditor.loadModalWithTemplates();
				moduleEditor.showModal();
				//moduleEditor.addElementAfter($(this),'section');
				//moduleEditor.addMissingToolbars();
			});	
			$(masterContainer).delegate('.editor-section-add-article', 'click', function(){
				oTemplate.elementType = 'article'; 
				oTemplate.elementParent = $(this);
				moduleEditor.loadModalWithTemplates();
				moduleEditor.showModal();
				//moduleEditor.addElementPrepend($(this),'article');
			});	
			$(masterContainer).delegate('.editor-article-add-article', 'click', function(){
				oTemplate.elementType = 'article'; 
				oTemplate.elementParent = $(this);
				moduleEditor.loadModalWithTemplates();
				moduleEditor.showModal();
				//moduleEditor.addElementAfter($(this),'article');
			});
			$(masterContainer).delegate('.editor-article-add-row', 'click', function(){
				oTemplate.elementType = 'row'; 
				oTemplate.elementParent = $(this);
				moduleEditor.loadModalWithTemplates();
				moduleEditor.showModal();
				//moduleEditor.addElementAppend($(this),'row');
			});
			$(masterContainer).delegate('.editor-row-add-row', 'click', function(){
				oTemplate.elementType = 'row'; 
				oTemplate.elementParent = $(this);
				moduleEditor.loadModalWithTemplates();
				moduleEditor.showModal();
				//moduleEditor.addElementAppend($(this),'row');
			});

			// toggle children
			$(masterContainer).delegate('.editor-section-collapse, .editor-article-collapse, .editor-row-collapse', 'click', function(){

				if( $(this).parent().parent().hasClass('editor-collapse-on') ){
					$(this).parent().parent().removeClass('editor-collapse-on').addClass('editor-collapse-off');
				}else{
					$(this).parent().parent().removeClass('editor-collapse-off').addClass('editor-collapse-on');
				}
				$(this).parent().parent().children().each(function(){
					if(!$(this).hasClass('module-editor-toolbar') ){
						$(this).slideToggle('fast');
					}
				});
				if( $(this).children().hasClass('fa-chevron-down') ){
					$(this).children().removeClass('fa-chevron-down').addClass('fa-chevron-right');
				}else{
					$(this).children().removeClass('fa-chevron-right').addClass('fa-chevron-down');
				}
			});

			// delete elements		
			$(masterContainer).delegate('.editor-article-delete-article, .editor-section-delete-section, .editor-row-delete-row', 'click', function(){
				$(this).parent().parent().remove();
			});
			return this;
		},

		// EDITOR

		setEditorMode : function(mode){
			this.editorMode = mode;
			$(masterContainer).removeClass('easy').removeClass('advanced').addClass(mode);
			//this.addMissingToolbars();
			return this;
		},

		addElementAfter : function(element, elementType){
			$(element).parent().parent().after(DEFAULTS.templates[elementType]);
			return true;
		},

		addElementAppend : function(element, elementType){
			$(element).parent().parent().append(DEFAULTS.templates[elementType]);
			return true;
		},

		addElementPrepend : function(element, elementType){
			$(element).parent().parent().children('.module-editor-toolbar').after(DEFAULTS.templates[elementType]);
			return true;	
		},

		// DRAG AND DROP 

		doOnTouchStart : function(e){
			// e.preventDefault();
			// var orig = e.originalEvent;
			// var x = orig.changedTouches[0].pageX;
			// var y = orig.changedTouches[0].pageY;
			// $(e.target).css({top: y, left: x});
		},

		doOnDragStart : function(e){		
			source = e.target;	
			e.dataTransfer.effectAllowed = 'move';
			//e.dataTransfer.setData("Data", $(e.target));
			e.dataTransfer.setData("Text", "" + $(e.target).index());

			// original code
			$(e.target).addClass('editor-draggable');
			draggableID 			= $(e.target).attr('id');
			draggableClass 			= $(e.target).attr('class');
			draggableParentID 		= $(e.target).parent().attr('id');
			draggableParentClass 	= $(e.target).parent().attr('class');
			
			draggableHTML 			= $(e.target).html();
			$(e.target).parent().children().each(function(){
				if(!$(this).hasClass('module-editor-toolbar')){
					$(this).addClass('editor-droppable-inactive');	
				}				
			});

			// do last						
			if (e.dataTransfer.setDragImage) {
				e.dataTransfer.setDragImage(e.target, 0, 0); // event.x, event.y
			}
			//$(e.target).html(''); // do this to create a placeholder (but need to fill later)
			//return true;
		},

		doOnDragEnd : function(e){
			$(e.target).removeClass('editor-draggable');
			return false;
		},

		doOnDrag : function(e){
			return false;
		},

		doOnDragLeave : function(e){		
			//$(e.target).removeClass('editor-droppable-active');
			return false;
		},

		// this fires once
		doOnDragEnter : function(e){

			// $('#draggableID').parent().children().each(function(){
			// 	$(this).removeClass('editor-droppable-active');
			// });
			
			// console.log('draggableClass',draggableClass);

			var foundDropSiteClass 	= false;
			var dropSiteClass 		= '';
			for(var i=0;i<DEFAULTS.draggableClasses.length;i++){
				if( $(e.target).hasClass(DEFAULTS.draggableClasses[i])){
					foundDropSiteClass 	= true;
					droppableID 		= $(e.target).attr('id');
					droppableParentID 	= $(e.target).parent().attr('id');
					dropSiteClass 		= DEFAULTS.draggableClasses[i];	
					break;				
				}
			}
			if(!foundDropSiteClass){
				// console.log('checking parents...');
				var dropsiteParents = $(e.target).parentsUntil(masterContainer);
				for(var p=0;p<dropsiteParents.length;p++){
					if($(dropsiteParents[p]).hasClass('section') && draggableClass.indexOf('section')>=0){
						// console.log('found section class');
						droppableID 		= $(dropsiteParents[p]).attr('id');
						droppableParentID 	= $(dropsiteParents[p]).parent().attr('id');
						dropSiteClass 		= 'section';
						break;
					}
					if($(dropsiteParents[p]).hasClass('article') && draggableClass.indexOf('article')>=0){
						// console.log('found article class');
						droppableID 		= $(dropsiteParents[p]).attr('id');
						droppableParentID 	= $(dropsiteParents[p]).parent().attr('id');
						dropSiteClass 		= 'article';
						break;
					}
					if($(dropsiteParents[p]).hasClass('container') && draggableClass.indexOf('container')>=0){
						// console.log('found container class');
						droppableID 		= $(dropsiteParents[p]).attr('id');
						droppableParentID 	= $(dropsiteParents[p]).parent().attr('id');
						dropSiteClass 		= 'container';
						break;
					}
					if($(dropsiteParents[p]).hasClass('row') && draggableClass.indexOf('row')>=0){
						// console.log('found row class');
						droppableID 		= $(dropsiteParents[p]).attr('id');
						droppableParentID 	= $(dropsiteParents[p]).parent().attr('id');
						dropSiteClass 		= 'row';
						break;
					}
					if($(dropsiteParents[p]).hasClass('column') && draggableClass.indexOf('column')>=0){
						// console.log('found column class');
						droppableID 		= $(dropsiteParents[p]).attr('id');
						droppableParentID 	= $(dropsiteParents[p]).parent().attr('id');
						dropSiteClass 		= 'column';
						break;
					}
				}
			}

			// console.log('draggableID', draggableID, 'droppableID', droppableID);
			

			$('#'+draggableID).parent().children().each(function(){
				$(this).removeClass('editor-droppable-active');
			});

			// console.log('draggableParentID', draggableParentID, 'droppableParentID', droppableParentID);
			if(draggableParentID == droppableParentID){
				$('#'+droppableID).addClass('editor-droppable-active');	
			}
			// console.log('-----------------------');
			// ORIGINAL WORKING CODE
			//Grab the dragging element, get class (section, article, row, column)
			// var thisParentClass = $('#'+draggableID).parent().attr('id');
			// droppableID = $(e.target).attr('id');
			// droppableParentID = $(e.target).parent().attr('id');
			// if($('#'+droppableID).attr('class') != undefined && droppableParentID == draggableParentID){
			// 	// test code
			// 	if (isbefore(source, e.target)) {
			// 	  e.target.parentNode.insertBefore(source, e.target);
			// 	}
			// 	else {
			// 	  e.target.parentNode.insertBefore(source, e.target.nextSibling);
			// 	}
			// 	// leave below code
			// 	$(e.target).addClass('editor-droppable-active');
			// }
			return false;
		},

		// this fires over and over
		doOnDragOver : function(e){
			if (e.preventDefault) {
		    	e.preventDefault(); // Necessary. Allows us to drop.
		    }
		    // add this back later
			// if($('#'+droppableID).attr('class') != undefined && droppableParentID == draggableParentID){
			// 	$(e.target).addClass('editor-droppable-active');
			// }
			return false;
		},

		doOnDrop : function(e){
			if (e.stopPropagation) {
				e.stopPropagation(); // stops the browser from redirecting.
			}
			if (e.preventDefault){
				e.preventDefault(); // stops the browser from redirecting off to the text.	
			} 

			// clean up
			$('#'+draggableID).parent().children().each(function(){
				$(this).removeClass('editor-droppable-inactive');
				$(this).removeClass('editor-droppable-active');
			});	

			var draggableParentClass = $('#'+draggableID).parent().attr('class');
			if( draggableParentClass.indexOf('section')>=0){
				draggableChildClass = 'article';
			}
			if( draggableParentClass.indexOf('article')>=0){
				draggableChildClass = 'container';
			}
			if( draggableParentClass.indexOf('container')>=0){
				draggableChildClass = 'row';
			}
			if( draggableParentClass.indexOf('row')>=0){
				draggableChildClass = 'column';
			}

			// console.log('draggableParentClass',draggableParentClass);
			// console.log('draggableChildClass',draggableChildClass);

			// swap content
			//var droppableParentID = $('#'+droppableID).parent().attr('id');
			var droppableParentID = $(e.target).closest('.'+draggableChildClass).parent().attr('id');
			var draggableParentID = $('#'+draggableID).parent().attr('id');
			var droppableID = $(e.target).closest('.'+draggableChildClass).attr('id');
			if(droppableParentID == draggableParentID){	
				var dragHTML = $('#'+draggableID).html(); 
				var dropHTML = $('#'+droppableID).html(); 
				$('#'+draggableID).html( dropHTML );
            	$('#'+droppableID).html( dragHTML );
				return false;
			}else{
				return false;	
			}	
		},

		// WIDGETS

		getWidgets : function(){

			return this;
		},

		getWidgetTemplate : function(){

			return this;
		},

		// TEMPLATES MODAL

		httpGet : function(){
			httpGet('json.json', {});
			return this;
		},

		getTemplate : function(){

			return this;
		},

		getOTemplate : function(){
			return getOTemplate();
		},

		insertTemplateTo : function(){

		},

		insertTemplate : function(template){
			var html = '';
			oTemplate.columnTemplate = template;
			switch (oTemplate.elementType){
				case 'section':
					// html = sectionHTML(articleHTML(containerHTML(rowHTML(columnHTML()))));
					html = getSectionHTML(getArticleHTML(getContainerHTML(getRowHTML(getColumnHTML(template)))));
					$(oTemplate.elementParent).parent().parent().after(html);
				break;
				case 'article':
					html = getArticleHTML(getContainerHTML(getRowHTML(getColumnHTML(template))));
					if( oTemplate.elementParent.context.className.indexOf('editor-section-add-article')>=0){
						// console.log('-----TOP-----');
						$(oTemplate.elementParent).parent().parent().append(html);
					}
					if(oTemplate.elementParent.context.className.indexOf('editor-article-add-article')>=0){
						// console.log('-----BOT-----FIX-THIS-');
						$(oTemplate.elementParent).parent().parent().after(html);
					}
				break;
				case 'row':
					html = getRowHTML(getColumnHTML(template));
					// console.log('PARENT',oTemplate.elementParent.parent().parent());
					$(oTemplate.elementParent).parent().parent().after(html);
				break;
				default:
				break;
			}

			this.addMissingToolbars();
			this.hideModal();

			// initialize ckeditor for columns that don't already have ckeditor initialized
			// $('.column').each(function(){
			// 	var editor = CKEDITOR.instances[ $(this).attr('id') ];
			// 	if(!editor){
			// 		CKEDITOR.inline($(this).attr('id'));
			// 		var ckeditor = CKEDITOR.instances[$(this).attr('id')];
			// 		ckeditor.on('focus', function(){
			// 			var a = CKEDITOR.instances[editorID];
			// 			var e = jQuery( a.editable().$ ).find('.module-editor-toolbar').remove();
			// 			var f = a.getData();						
			// 		});
			// 		ckeditor.on('blur', function(){
			// 			moduleEditor.addMissingToolbars();
			// 		});
			// 	}
			// });

			return this;
		},

		loadModalWithTemplates : function(){
			var html = "";
			for(key in DEFAULTS.templates.columns){
				for(var a=0; a<DEFAULTS.templates.columns[key].length;a++){
					var aTemplate = DEFAULTS.templates.columns[key][a].replace('_', '').split('x');
					html += "<div class='row'>";
					html += "<h4>" + key + ' ' + DEFAULTS.templates.columns[key][a].replace('_', '') + "</h4>";
					for(var b=0;b<aTemplate.length;b++){
						html += "<div onclick=\"moduleEditor.insertTemplate('"+DEFAULTS.templates.columns[key][a]+"', '"+key+"', '"+a+"', '"+b+"')\" class='text-center column col-xs-12 col-sm-12 col-md-"+aTemplate[b]+" col-lg-"+aTemplate[b]+"' style='border: solid 1px #ccc; cursor: pointer;'>Column</div>";
					}
					html += "</div><br /><br />";
				}
			}
			$('#ajaxModal .modal-body').html(html);
			return this;
		},

		showModal : function(){
			$('#ajaxModal').modal('show');
			return this;
		},
		hideModal : function(){
			$('#ajaxModal').modal('hide');
			$('#ajaxModal .modal-body').html('');
			return this;
		},

		// SAVE

		clearToolbars : function(){
			// open everything
			$('.editor-section-collapse, .editor-article-collapse, .editor-row-collapse, .module-editor-toolbar-button').each(function(){
				$(this).parent().parent().children().each(function(){
					if(!$(this).hasClass('module-editor-toolbar') ){
						$(this).show('fast');
					}
				});
			});

						// delete all wysiwyg html
			$('.module-editor-toolbar').remove();
			
			// remove draggable stuff
			for(var i=0;i<DEFAULTS.draggableClasses.length;i++){
				$(masterContainer + ' .'+DEFAULTS.draggableClasses[i]).each(function(){
					$(this).removeAttr('draggable')
							.removeAttr('ondrop')
							.removeAttr('ondrag')
							.removeAttr('ondragover')
							.removeAttr('ondragenter')
							.removeAttr('ondragleave')
							.removeAttr('ondragstart')
							.removeAttr('ondragend');
				});
			}
			$('.container').each(function(){
				$(this).removeAttr('draggable')
						.removeAttr('ondrop')
						.removeAttr('ondrag')
						.removeAttr('ondragover')
						.removeAttr('ondragenter')
						.removeAttr('ondragleave')
						.removeAttr('ondragstart')
						.removeAttr('ondragend');
			});
			return this;
		},

		save : function(){
			this.clearToolbars();

			// debug (html to save)
			// console.log( $('#master-content-container').html() );

			// save to database
			return this;
		}

	}

})();