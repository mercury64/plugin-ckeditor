<?php defined( 'SYSPATH' ) or die( 'No direct script access.' );

Observer::observe('modules::afer_load', function($plugin) {
	$lang = substr(I18n::lang(), 0, 2);
	Assets_Package::add('ckeditor')
		->js('ckeditor.core', PLUGINS_URL . $plugin->id() . '/vendors/ckeditor/ckeditor.js', 'jquery')
		->js('ckeditor.' . $lang, PLUGINS_URL . $plugin->id() . '/vendors/ckeditor/lang/'.$lang.'.js', 'ckeditor.core')
		->js('ckeditor', ADMIN_RESOURCES . 'js/ckeditor.js', 'global');

	WYSIWYG::add('ckeditor');
}, $plugin);
