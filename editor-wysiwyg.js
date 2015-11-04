
// self invoking module test

var moduleWYSIWYG = (function(){

	var masterContainer = '#master-content-container';
	var currentRange;
	var selectedRange;
	var DEFAULTS = {

		// if the caret is inside these elements, don't add a paragraph
		newParagraphExcludeElements : ['ul', 'ol', 'li'],

		// wysiwyg editor controls
		buttonCollection : {
			"Heading" : [
				{
					label : 'H1',
					altText : 'H1',
					fa : 'fa-header',
					executeCommand : 'formatBlock',
					executeCommandArg : 'h1'
				},
				{
					label : 'H2',
					altText : 'H2',
					fa : 'fa-header',
					executeCommand : 'formatBlock',
					executeCommandArg : 'h2'
				},
				{
					label : 'H3',
					altText : 'H3',
					fa : 'fa-header',
					executeCommand : 'formatBlock',
					executeCommandArg : 'h3'
				},
				{
					label : 'H4',
					altText : 'H4',
					fa : 'fa-header',
					executeCommand : 'formatBlock',
					executeCommandArg : 'h4'
				},
				{
					label : 'H5',
					altText : 'H5',
					fa : 'fa-header',
					executeCommand : 'formatBlock',
					executeCommandArg : 'h5'
				},
				{
					label : 'H6',
					altText : 'H6',
					fa : 'fa-header',
					executeCommand : 'formatBlock',
					executeCommandArg : 'h6'
				},
			],
			"Text" : [
				{
					label : 'Bold',
					altText : 'Bold',
					fa : 'fa-bold',
					executeCommand : 'bold',
					executeCommandArg : null,
					customMethod : '',
				},
				{
					label : 'Italic',
					altText : 'Italic',
					fa : 'fa-italic',
					executeCommand : 'italic',
					executeCommandArg : null,
					customMethod : '',
				},
				{
					label : 'Underline',
					altText : 'Underline',
					fa : 'fa-underline',
					executeCommand : 'underline',
					executeCommandArg : null,
					customMethod : '',
				}
			],
			"Align" : [
				{
					label : 'Left',
					altText : 'Left',
					fa : 'fa-align-left',
					executeCommand : 'justifyLeft',
					executeCommandArg : null,
					customMethod : '',
				},
				{
					label : 'Center',
					altText : 'Center',
					fa : 'fa-align-center',
					executeCommand : 'justifyCenter',
					executeCommandArg : null,
					customMethod : '',
				},
				{
					label : 'Right',
					altText : 'Right',
					fa : 'fa-align-right',
					executeCommand : 'justifyRight',
					executeCommandArg : null,
					customMethod : '',
				},
				{
					label : 'Justified',
					altText : 'Justified',
					fa : 'fa-align-justify ',
					executeCommand : 'justifyFull',
					executeCommandArg : null,
					customMethod : '',
				},
			],
			"Lists" : [
				{
					label : 'Unordered List',
					altText : 'Unordered List',
					fa : 'fa-list-ul',
					executeCommand : 'insertUnorderedList',
					executeCommandArg : null,
					customMethod : '',
				},
				{
					label : 'Ordered List',
					altText : 'Ordered List',
					fa : 'fa-list-ol',
					executeCommand : 'insertOrderedList',
					executeCommandArg : null,
					customMethod : '',
				},
			],
			"Links" : [
				{
					label : 'Link',
					altText : 'Link',
					fa : 'fa-link',
					executeCommand : '',
					executeCommandArg : null,
					customMethod : 'showLink',
				},
				{
					label : 'Unlink',
					altText : 'Unlink',
					fa : 'fa-unlink',
					executeCommand : 'unlink',
					executeCommandArg : null,
					customMethod : '',
				},
			],
			"Misc" : [
				{
					label : 'Blockquote',
					altText : 'Blockquote',
					fa : 'fa-quote-right',
					executeCommand : 'formatBlock',
					executeCommandArg : 'blockquote',
					customMethod : '',
				},
				{
					label : 'Code',
					altText : 'Code',
					fa : 'fa-code',
					executeCommand : '',
					executeCommandArg : null,
					customMethod : 'showCode',
				},
				{
					label : 'Table',
					altText : 'Table',
					fa : 'fa-table',
					executeCommand : '',
					executeCommandArg : null,
					customMethod : 'showTable',
				},
				{
					label : 'Video',
					altText : 'Video',
					fa : 'fa-video-camera',
					executeCommand : '',
					executeCommandArg : null,
					customMethod : 'showVideo',
				},
			],
			"Components" : [
				{
					label : 'Columns',
					altText : 'Columns',
					fa : 'fa-columns',
					executeCommand : '',
					executeCommandArg : null,
					customMethod : 'doColumns',
				},
				// Bootstrap Component Templates
				{
					label : 'Panel',
					altText : 'Panel',
					fa : 'fa-square-o',
					executeCommand : '',
					executeCommandArg : null,
					customMethod : 'doPanel',
				},
				// Jumbotron
				// Panel
				// Tabs
				// List Group
				// Well
				// Modal
				// Breadcrumbs
				// Label
				// Badge
				// Collapse
				// Carousel
				// Affix
				// Tooltip
				// Popover
			],
			"Widgets" : [

			]
		}
	};

	// private methods

	function createWYSIWYGToolbar(){
		//var html = "<div class='module-editor-toolbar module-wysiwyg-toolbar' contenteditable='false'>";
		var html='';
		for(k in DEFAULTS.buttonCollection){
			html += '<div class="btn-group">' +
						'<button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
							k + ' <span class="caret"></span>' +
						'</button>' +
						'<ul class="dropdown-menu">';
						for(var i=0;i<DEFAULTS.buttonCollection[k].length;i++){
							if( DEFAULTS.buttonCollection[k][i]['executeCommand'] != ''){
								html += '<li data-executeCommand="'+DEFAULTS.buttonCollection[k][i]['executeCommand']+'" data-executeCommandArg="'+DEFAULTS.buttonCollection[k][i]['executeCommandArg']+'"><a href="#"><span class="fa '+DEFAULTS.buttonCollection[k][i]['fa']+'"></span> '+DEFAULTS.buttonCollection[k][i]['label']+'</a></li>';
							}else{
								html += '<li data-customMethod="'+DEFAULTS.buttonCollection[k][i]['customMethod']+'"><a href="#"><span class="fa '+DEFAULTS.buttonCollection[k][i]['fa']+'"></span> '+DEFAULTS.buttonCollection[k][i]['label']+'</a></li>';								
							}							
						}
			html += 	'</ul>';
			html += '</div>';
		}
		//html += "</div>";
		return html;
	}

	return {

		init : function(){

			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			var list = document.querySelector('.master-content-container');
			var observer = new MutationObserver(function(mutations) {
				moduleWYSIWYG.addAllWYSIWYG();
			});
			observer.observe(list, {
			    attributes: true,
			    childList: true,
			    characterData: true
			});

			$(masterContainer).bind('mouseup', function (e) {
				currentRange = moduleWYSIWYG.getRange();
				var clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
				console.log('clear', clear);
				if (!clear) {
					moduleWYSIWYG.saveRange();
				}
			});
			
			// setDelegations
			this.setDelegations();

			// add wysiwyg
			this.addAllWYSIWYG();
			//this.addWYSIWGYToBody();

			return this;
		},

		setDelegations : function(){
			// $(masterContainer).delegate('.btn-group', 'click', function(e){
			// 	e.preventDefault();
			// });	

			// hide editor when contenteditable focused
			// $(masterContainer).delegate('div[contenteditable="true"], .module-wysiwyg-toolbar', 'focus', function(e){
			// 	$('.module-wysiwyg-toolbar').css({
			// 		display : 'block',
			// 		position : 'absolute',
			// 		width : '100%',
			// 		'z-index' : '99999',
			// 		top : - $('.module-wysiwyg-toolbar').outerHeight(), //$(this).offset().top - $('.module-wysiwyg-toolbar').outerHeight(),
			// 		left : $(this).offset().left,
			// 	});
			// 	$(this).children('.module-editor-toolbar').hide();
			// });
			// $(masterContainer).delegate('div[contenteditable="true"]', 'blur', function(e){
			// 	$('.module-wysiwyg-toolbar').css({
			// 		// display: 'none'
			// 	});
			// 	$(this).children('.module-editor-toolbar').show();
			// });
	
			// keydown
			$('div[contenteditable="true"]').on('keydown', function(e){			
				if (document.selection){
					parentElement = document.selection.createRange().parentElement().tagName; // IE
				} else {
					// everyone else
					parentElement = window.getSelection().anchorNode.parentNode.tagName; 
				}
				// console.log('parentElement', parentElement);
				// console.log('tagName', window.getSelection().anchorNode.parentNode.tagName)
				// console.log('anchorNode', window.getSelection().anchorNode);
				// console.log('parentNode', window.getSelection().anchorNode.parentNode);
				//e.preventDefault();
			});

			// keyup
			$('div[contenteditable="true"]').on('keyup',function(e) {
				// console.log('keyCode',e.keyCode);
				var parentElement;
				if (document.selection) {
					parentElement = document.selection.createRange().parentElement().tagName; // IE
				} else {
					// everyone else
					parentElement = window.getSelection().anchorNode.parentNode.tagName; 
				}
				// add paragraph on [enter] except when within some elements
				if(e.keyCode == '13' && DEFAULTS.newParagraphExcludeElements.indexOf(parentElement.toLowerCase()) < 0){
					e.preventDefault();
					moduleWYSIWYG.doExecuteCommand('formatBlock', 'p');
				}

			});

			// keep the selected range when drop downs are clicked
			$(masterContainer).delegate('.btn-group', 'click', function(e){
				e.preventDefault();
				moduleWYSIWYG.restoreRange();
			});

			// browser execCommand
			$(masterContainer).delegate('li[data-executeCommand]', 'click', function(e){
				e.preventDefault();
				moduleWYSIWYG.restoreRange();
				moduleWYSIWYG.doExecuteCommand($(this).attr('data-executeCommand'), $(this).attr('data-executeCommandArg'));
			});

			// custom commands
			$(masterContainer).delegate('li[data-customMethod]', 'click', function(e){
				e.preventDefault();
				moduleWYSIWYG.restoreRange();
				moduleWYSIWYG.doCustomMethod($(this).attr('data-customMethod'));
			});

			// image (set selection on image when image is clicked)
			$(masterContainer + ' img').on('click', function(e){
				var imgtest = $(e.target).prev().prop('tagName');
				var iframeWin = window;
				var iframeDoc = document;
				if (e.target.nodeName.toLowerCase() == "img") {
					var sel 	= iframeWin.getSelection();
					var range 	= iframeDoc.createRange();
					range.selectNode(e.target);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			});
		},

		// SELECTIONS

		getRange : function(){
			var sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				// console.log(sel.getRangeAt(0).toString())
				return sel.getRangeAt(0);
			}
		},

		getCurrentRange : function(){
			return currentRange;
		},

		getSelectedRange : function(){
			return selectedRange;
		},

		saveRange : function(){
			selectedRange = this.getRange();
		},

		restoreRange : function(){
			var selection = window.getSelection();
			if (selectedRange) {
				try {
					selection.removeAllRanges();
				} catch (ex) {
					document.body.createTextRange().select();
					document.selection.empty();
				}
				selection.addRange(selectedRange);
			}
		},

		// BUILD EDITOR

		addAllWYSIWYG : function(){
			$('.column').each(function(){
				var element = $(this);
				var foundWYSIWYG = false;
				$(this).children('.module-editor-toolbar').each(function(){
					if($(this).hasClass('module-wysiwyg')){
						foundWYSIWYG = true;
					}
				});
				if(!foundWYSIWYG){
					moduleWYSIWYG.addWYSIWGYToColumn(element);
				}
			});
			return this;
		},

		addWYSIWGYToColumn : function(column){
			//$(column).children('.module-editor-toolbar').after(createWYSIWYGToolbar());
			$(column).children('.module-editor-toolbar').addClass('module-wysiwyg-toolbar').children('span:first-child').after(createWYSIWYGToolbar());
			$(column).children('.module-editor-toolbar').css({
				left : 0,
				top : -$(column).children('.module-editor-toolbar').outerHeight()
			});
			return this;
		},

		addWYSIWGYToBody : function(column){
			$('body').after(createWYSIWYGToolbar());
			return this;
		},

		createWYSIWYGToolbar : function() {
			var toolbarHTML = createWYSIWYGToolbar();
			$('.module-editor-toolbar').each(function(){
				$(this).after(toolbarHTML);
			});
			return this;
		},

		// EXECUTE COMMANDS

		doExecuteCommand : function(command, arg){
			document.execCommand(command, false, arg);
			this.saveRange();
			return this;
		},

		doCustomMethod : function(command){
			eval("moduleWidget."+command+"();");
			console.log('doCustomMethod', command)
		},

	}

})();