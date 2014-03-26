cms.plugins.ckeditor = {};


// Switch on tinymce handler
cms.plugins.ckeditor.switchOn_handler = function( textarea_id, params ) {
	var local_params = {};
	
	params = $.extend(local_params, params);
	
	var instance = CKEDITOR.instances[textarea_id];
	if(instance)
		cms.plugins.ckeditor.switchOff_handler(instance, textarea_id);
	
	return CKEDITOR.replace( textarea_id );
};

// Switch off tinymce handler
cms.plugins.ckeditor.switchOff_handler = function( editor, textarea_id ) {
	var instance = CKEDITOR.instances[textarea_id];
	if (instance){
		instance.destroy(true);
	}
};

cms.plugins.ckeditor.exec_handler = function( editor, command, textarea_id, data ) {
	switch(command) {
		case 'insert':
			if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(data)){
				data = '<img src="' + data + '">';
			} else if (/((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))/.test(data)) {
				data = '<a href="' + data + '">' + data + '</a>';
			}

			editor.insertHtml(data);
			break;
		case 'changeHeight':
			editor.height(data);
	}

	return true;
};

$(function(){
	cms.filters
		.add( 'ckeditor', cms.plugins.ckeditor.switchOn_handler, cms.plugins.ckeditor.switchOff_handler, cms.plugins.ckeditor.exec_handler );
});