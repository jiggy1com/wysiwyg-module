
// self invoking module test

var moduleWidget = (function(){

	var DEFAULTS = {

		modalTemplate : '<div class="modal fade" id="widgetModal" tabindex="-1" role="dialog" aria-labelledby="widgetModalLabel" aria-hidden="true">'+
							'<div class="modal-dialog modal-lg">'+
								'<div class="modal-content">'+
									'<div class="modal-header">'+
										'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
										'<h4 class="modal-title" id="widgetModalLabel"></h4>'+
									'</div>'+
									'<div class="modal-body">'+
										'<div class="controller">'+
										'</div>'+
										'<div class="preview">'+
										'</div>'+
									'</div>'+
									'<div class="modal-footer">'+
										'<button type="button" class="btn btn-primary">Save</button>'+
										'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>',

		snippets : [

		],

		widgets : {
			panel : {
				template : 	'<div class="panel panel-default">'+
								'<div class="panel-heading">'+
									'Heading Goes Here'+
								'</div>'+
							  	'<div class="panel-body">'+
							    	'Basic panel example'+
							  	'</div>'+
							'</div>',
				prop : ''
			}
		}

	}

	function getSelectionStart() {
   		var node = document.getSelection().anchorNode;
   		return (node.nodeType == 3 ? node.parentNode : node);
	}

	return {

		init : function(){
			// add modal html to body to be used when adding a widget
			document.addEventListener("DOMContentLoaded", function(event) { 
  				//do work
  				console.log('widget init');
				$('body').append(DEFAULTS.modalTemplate);

			});
			

			return this;
		},

		insertHTMLAtCaret : function(widget, obj){

		},

		insertHTMLAfterElement : function(widget, obj){
			var sel = window.getSelection();
				
				var parentElement = getSelectionStart();
				console.log('parentElement',parentElement);
				console.log('parentElement value', $(parentElement).html());
				if($(parentElement).html()=='' || $(parentElement).html() == '<br>'){
					console.log('top')
					$(parentElement).replaceWith(DEFAULTS.widgets[widget].template);
				}else{
					console.log('bot')
					$(parentElement).after(DEFAULTS.widgets[widget].template);
				}
			
			return this;
		},

		// bootstrap components / templates

		doColumns : function(){
			console.log('doColumns works')
			return this;
		},

		doPanel : function(){
			// $('#widgetModal .modal-body .preview').html(DEFAULTS.widgets.panel.template);
			// $('#widgetModal').modal('show');
			this.insertHTMLAfterElement('panel', {
				heading : 'test',
				body : 'test'
			});
			return this;
		}

	}

})();