<!doctype html>
<html>
<head>
	<title>moduleEditor</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	
	<!-- Optional theme -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

	<!-- Font Awesome -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	
	<!-- jQuery -->
	<script src='//code.jquery.com/jquery-2.1.4.min.js'></script>
	
	<!-- Latest compiled and minified JavaScript -->
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
	<script src="jquery.ui.touch-punch.min.js"></script>

	<!-- ckeditor -->
	<!---<script src="ckeditor/ckeditor.js"></script>--->

	<!-- rangy -->
	<script type="text/javascript" src="external/log4javascript.js"></script>
	<script type="text/javascript" src="src/core/core.js"></script>
	<script type="text/javascript" src="src/core/dom.js"></script>
	<script type="text/javascript" src="src/core/domrange.js"></script>
	<script type="text/javascript" src="src/core/wrappedrange.js"></script>
	<script type="text/javascript" src="src/core/wrappedselection.js"></script>
	<script type="text/javascript" src="src/modules/inactive/rangy-textcommands.js"></script>

	<!-- editor module -->
	<script src='script.js'></script>
	<script src='editor-widget.js'></script>
	<script src='editor-wysiwyg.js'></script>

	<script>
	function gEBI(id) {
            return document.getElementById(id);
        }

        function getEBCN(className){
        	console.log('document.getElementsByClassName(className)', document.getElementsByClassName(className))
        	return document.getElementsByClassName(className);
        }

		 window.onload = function() {
			rangy.init();
			console.log('ready');

				var textCommandsModule = rangy.modules.TextCommands;
				if (rangy.supported && textCommandsModule && textCommandsModule.supported) {
					//var toggleBoldButton = gEBI("btn-bold");
					var toggleBoldButton = getEBCN('btn-bold');
					$('.btn-bold').on('mousedown', function(){

						console.log('clicked');
						rangy.execSelectionCommand("bold", false, null);
						return false;
					});
					// toggleBoldButton.disabled = false;
					// toggleBoldButton.ontouchstart = toggleBoldButton.onmousedown = function() {
					// 	//alert(rangy.querySelectionCommandValue("bold"));
					// 	console.log('clicked');
					// 	rangy.execSelectionCommand("bold", false, null);
					// 	return false;
					// };
				}
		};
	</script>

</head>
<body>

<script>
// CKEDITOR.config.allowedContent = true;
// CKEDITOR.disableAutoInline = true;
</script>

<div class='container-fluid'>
	<div class='row'>
		<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
			<button class='btn btn-primary' onclick='moduleEditor.init()'>
				Init Module
			</button>
			<button class='btn btn-primary' onclick='moduleEditor.save()'>
				Save
			</button>
			<button class='btn btn-primary' onclick='moduleEditor.addMissingToolbars()'>
				Reload Module
			</button>
			<button class='btn btn-primary' onclick="moduleEditor.setEditorMode('easy')">
				Use Easy
			</button>
			<button class='btn btn-primary' onclick="moduleEditor.setEditorMode('advanced')">
				Use Advanced
			</button>

			<hr />

			<div class='table-responsive' id='editor-key'>
				<table class='table'>
					<tr>
						<td class="key-key">Editor Key</td>
						<td class="key-section">Section</td>
						<td class="key-article">Article</td>
						<td class="key-row">Row</td>
						<td class="key-column">Column</td>
					</tr>
				</table>
			</div>

		</div>
	</div>
</div>
<div class='container-fluid'>
	<div class='row'>
		<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>

			<div class='master-content-container' id='master-content-container'><!--- this master container acts like the parent div in the admin --->

				<!--- ALL USER HTML CONTENT FOR THE PAGE --->
				<!---
				<div id='testdiv'>
					I am a test div.
				</div> --->

				<!---
				<section class='section'>
					<article class='article'>
						<div class='container'>
							<div class='row'>
								<div class='column col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									<h4>Joshua Erikson Powns the World!</h4>
									<p>Hey Josh! Is this easier for you? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
									<h5>Why?</h5>
									<ul>
										<li>Strong</li>
										<li>Smart</li>
										<li>Sophisticated</li>
									</ul>
									<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
								</div>
							</div>
						</div>
					</article>
				</section>
				--->

				<section class='section'>
					<article class='article'>
						<div class='container'>
					        <div class='row'>
					            <div class='column col-xs-12 col-sm-12 col-md-6 col-lg-6'><img src='//www.smallbizpro.net/images/services/BlockServices.png'></div>
					            <div class='column col-xs-12 col-sm-12 col-md-6 col-lg-6'>
					                <h2>Catering to Your Needs!</h2>
					                <h3>We have assisted hundreds of businesses in securing $71
					                Million in Public Works Contracts.</h3>
					                <p>We provide small businesses & supplier diversity contract
					                providers with comprehensive technical support to achieve
					                contract and shareholders' program objectives.</p>
					                <p>Through our uniquely designed business infrastructure
					                system, our clients develop high performance and competency in
					                four vital areas:</p>
					                <ul>
					                    <li>Business Planning</li>
					                    <li>General Operations Management</li>
					                    <li>Business Development & Marketing</li>
					                    <li>Cash Flow Management</li>
					                </ul>
					            </div>
					        </div>
					        <div class='row top-buffer'>
					            <div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'><img src='//www.smallbizpro.net/images/services/company_workshops.jpg'></div>
					            <div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'><img src='//www.smallbizpro.net/images/services/client_two.jpg'></div>
					            <div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'><img src='//www.smallbizpro.net/images/services/client_three.jpg'></div>
					            <div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'><img src='//www.smallbizpro.net/images/services/client_four.jpg'></div>
					        </div>
					    </div>
				    </div>
				</section>

				
				<!--- <section class='section'>
					<article class='article'>
						<div class='container'>
							<div class='row'>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 1 Column 1</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 1 Column 2</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 1 Column 3</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 1 Column 4</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
							</div>
							<div class='row'>
								<div class='column col-xs-12 col-sm-12 col-md-4 col-lg-4'>
									<h4>Section 1 Row 2 Column 1</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-4 col-lg-4'>
									<h4>Section 1 Row 2 Column 2</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-4 col-lg-4'>
									<h4>Section 1 Row 2 Column 3</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
							</div>
						</div>
					</article>
				</section>

				<!-- section 2 -->

				<section class='section'>
					<article class='article'>
						<div class='container'>
							<div class='row'>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 2 Column 1</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 2 Column 2</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 2 Column 3</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-3 col-lg-3'>
									<h4>Section 2 Column 4</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
							</div>
							<div class='row'>
								<div class='column col-xs-12 col-sm-12 col-md-4 col-lg-4'>
									<h4>Section 2 Row 2 Column 1</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-4 col-lg-4'>
									<h4>Section 2 Row 2 Column 2</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
								<div class='column col-xs-12 col-sm-12 col-md-4 col-lg-4'>
									<h4>Section 2 Row 2 Column 3</h4>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</div>
							</div>
						</div>
					</article>
				</section>	 --->
				
			</div>

		</div>
	</div>
</div>

			
<!--- <textarea rows='10' cols='100' id='textarea'></textarea> --->
	
<!-- AJAX Modal -->
<div class="modal fade" id="ajaxModal" tabindex="-1" role="dialog" aria-labelledby="ajaxModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title" id="ajaxModalLabel">Select Grid</h4>
			</div>
			<div class="modal-body">				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>


<style>
#ajaxModal .modal-body .row{
	margin: 0px auto;
}

/* WYSIWYG Toolbar Styles */
.module-wysiwyg-toolbar{
	position: absolute;
	top: 0px;
	left: 0px;
}
/*.module-wysiwyg-toolbar{
	background-color: #ccc;
	padding: 5px;
	display: none;
}*/

/* Editor Toolbar Styles */



/* easy mode */
.easy .section > .module-editor-toolbar{
	display : none;
}
.easy .section .article > .module-editor-toolbar{
	display : none;
}
.easy .section .article .row .module-editor-toolbar{
	display: none;
}
.easy .section .article .row:hover{
	border: dotted 1px #999999;
}
.easy .section .article .row:hover .module-editor-toolbar{
	display: block;
}

/* show all column toolbars when hovering over the row */
/*.easy .section .article .row:hover .column > .module-editor-toolbar{
	display: block;
}*/

.easy .section .article .row .column .module-editor-toolbar{
	display: none;
}
.easy .section .article .row .column:hover > .module-editor-toolbar{
	display: block;
}

/* advanced mode */
.advanced .section{
	display: block;
}
.advanced .section > .module-editor-toolbar{
	display: block;
            
}
.advanced .section:hover {
	border: dotted 1px #333;
}
.advanced .section:hover .module-editor-toolbar{
	display: block;
}

.advanced .section .article > .module-editor-toolbar{
	display: none;
}
.advanced .section .article:hover{
	border: dotted 1px #666666;
}
.advanced .section .article:hover .module-editor-toolbar{
	display: block;
}

.advanced .section .article > .container .row > .module-editor-toolbar{
	display: none;
}
.advanced .section .article > .container .row:hover > .module-editor-toolbar{
	display: block;
}
.advanced .section .article .row:hover{
	border: dotted 1px #999999;
}
/* show all column toolbars when hovering over the row */
/*.advanced .section .article > .container .row:hover .column > .module-editor-toolbar{
	display: block;
}*/

.advanced .section .article > .container .row .column .module-editor-toolbar{
	display: none;
}
.advanced .section .article > .container .row .column:hover .module-editor-toolbar{
	display: block;
}


/* colorize toolbar */
#editor-key .key-key{
	
}
#editor-key .key-section{
	background-color: #333;
	color: #fff;
}
#editor-key .key-article{
	background-color: #666;
	color: #fff;
}
#editor-key .key-row{
	background-color: #999;
	color: #fff;
}
#editor-key .key-column{
	background-color: #ccc;
	color: #fff;
}
.section > .module-editor-toolbar{
	background-color: #333333; /* dark gray */
	color: #fff;
}
.article > .module-editor-toolbar{
	background-color: #666666; /* gray */
	color: #fff;
}
.row > .module-editor-toolbar{
	background-color: #999999; /* light gray */
	color: #fff;
}
.column > .module-editor-toolbar{
	background-color: #cccccc; /* lightest gray */
	color: #fff;
}

/* EDITOR TOOLBAR */
.module-editor-toolbar{
	padding: 5px;
	cursor: move;
	display: none;
}
.module-editor-toolbar .btn{
	margin-left: 5px;
}
.module-wysiwyg-toolbar span:first-child{
	margin: 0px 5px;
}

/*.column .module-editor-toolbar{
	padding: 5px 15px 5px 5px;
	margin: 0px -15px;
}*/
.module-wysiwyg-toolbar{
	/*border: solid 1px #999;*/
-webkit-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.5);
-moz-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.5);
box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.5);
	padding: 5px;
	margin: 0px;
	width: 100%;
}


.editor-draggable > *{
/*	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
	filter: alpha(opacity=50);
	-moz-opacity:0.5;
	-khtml-opacity: 0.5;
	opacity: 0.5;*/
	cursor: move;
}
.editor-droppable-inactive, .editor-droppable-active{
	position: relative;
	display: block !important;
	cursor: move;
	/*padding-top: 32px;*/ /* matches the height of .module-editor-toolbar */
}
.editor-droppable-inactive{
	border: solid 5px lightgreen ;
}
.editor-droppable-active{
	border: solid 5px darkgreen !important;
}
.module-editor-toolbar.editor-droppable-active{
	background-color: #ccc;
}
.editor-droppable-inactive .module-editor-toolbar{
	/*display: none;*/
/*	position:absolute; top: 0px;
	width: 100%;
*/
}

.editor-collapse-on .module-editor-toolbar{
	display: block !important;
}
<!---
.module-editor-toolbar{
	background-color: #ccc;
	padding: 5px;
	cursor: move;
	display: none;
}


.module-editor-toolbar-button{
	cursor: pointer;
}
.module-editor-toolbar-drag{
	cursor: move;
}
.editor-draggable{
	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
	filter: alpha(opacity=50);
	-moz-opacity:0.5;
	-khtml-opacity: 0.5;
	opacity: 0.5;
	cursor: move;
}
.editor-droppable-inactive, .editor-droppable-active{
	position: relative;
	display: block !important;
}
.editor-droppable-inactive{
	border: solid 5px lightgreen !important;
	/*background-color: lightgreen !important;*/
	padding-top: 32px; /* matches the height of .module-editor-toolbar */
	cursor: move;
	display: block !important;
}
.editor-droppable-active{
	border: solid 5px darkgreen !important;
	/*background-color: darkgreen !important;*/
	padding-top: 32px; /* matches the height of .module-editor-toolbar */
	cursor: move;
}
.module-editor-toolbar.editor-droppable-active{
	background-color: #ccc;
}
.editor-droppable-inactive .module-editor-toolbar{
	/*display: none;*/
	position:absolute; top: 0px;
}

.editor-collapse-on .module-editor-toolbar{
	display: block !important;
}
--->
/* General Styles for Testing */

.section{
	margin: 0px 0px;
}
.article{
	margin: 0px 30px;
}
.section .article .container{
}
.section .article .container .row .column{
}

.section .article .container .row .col-xs-1,.section .article .container .row .col-xs-2,.section .article .container .row .col-xs-3,.section .article .container .row .col-xs-4,.section .article .container .row .col-xs-5,.section .article .container .row .col-xs-6,.section .article .container .row .col-xs-7,.section .article .container .row .col-xs-8,.section .article .container .row .col-xs-9,.section .article .container .row .col-xs-10,.section .article .container .row .col-xs-11,.section .article .container .row .col-xs-12,
.section .article .container .row .col-sm-1,.section .article .container .row .col-sm-2,.section .article .container .row .col-sm-3,.section .article .container .row .col-sm-4,.section .article .container .row .col-sm-5,.section .article .container .row .col-sm-6,.section .article .container .row .col-sm-7,.section .article .container .row .col-sm-8,.section .article .container .row .col-sm-9,.section .article .container .row .col-sm-10,.section .article .container .row .col-sm-11,.section .article .container .row .col-sm-12,
.section .article .container .row .col-md-1,.section .article .container .row .col-md-2,.section .article .container .row .col-md-3,.section .article .container .row .col-md-4,.section .article .container .row .col-md-5,.section .article .container .row .col-md-6,.section .article .container .row .col-md-7,.section .article .container .row .col-md-8,.section .article .container .row .col-md-9,.section .article .container .row .col-md-10,.section .article .container .row .col-md-11,.section .article .container .row .col-md-12,
.section .article .container .row .col-lg-1,.section .article .container .row .col-lg-2,.section .article .container .row .col-lg-3,.section .article .container .row .col-lg-4,.section .article .container .row .col-lg-5,.section .article .container .row .col-lg-6,.section .article .container .row .col-lg-7,.section .article .container .row .col-lg-8,.section .article .container .row .col-lg-9,.section .article .container .row .col-lg-10,.section .article .container .row .col-lg-11,.section .article .container .row .col-lg-12{
	/*border: dotted 1px gray;*/
}
</style>

<script>
moduleEditor.init();
moduleWidget.init();
moduleWYSIWYG.init();


</script>

</body>
</html>
