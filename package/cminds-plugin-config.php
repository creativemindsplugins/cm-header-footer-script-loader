<?php
ob_start();
include plugin_dir_path(__FILE__) . 'views/plugin_compare_table.php';
$plugin_compare_table = ob_get_contents();
ob_end_clean();
$cminds_plugin_config = array(
	'plugin-is-pro'				 => FALSE,
	'plugin-is-addon'			 => FALSE,
	'plugin-version'			 => '1.2.4',
	'plugin-abbrev'				 => 'cmhandfsl',
	'plugin-file'				 => CMHeaderAndFooterSL::$plugin_file,
	'plugin-dir-path'			 => plugin_dir_path( CMHeaderAndFooterSL::$plugin_file ),
	'plugin-dir-url'			 => plugin_dir_url( CMHeaderAndFooterSL::$plugin_file ),
	'plugin-basename'			 => plugin_basename( CMHeaderAndFooterSL::$plugin_file ),
    'plugin-campign'             => '?utm_source=scriptloaderfree&utm_campaign=freeupgrade',
    'plugin-show-guide'                 => TRUE,
    'plugin-guide-text'                 => '    <div style="display:block">
        <ol>
         <li>Go to the plugin <strong>"Setting"</strong></li>
         <li>Add JavaScript or CSS code and choose if this will appear in the header or footer. </li>
         <li>You can also restrict if to choose this on pages or posts only</li>
        <li> You can add additional codes or pause specific code based on your needs.</li>
         </ol>
    </div>',
     'plugin-guide-video-height'         => 240,
     'plugin-guide-videos'               => array(
          array( 'title' => 'Installation tutorial', 'video_id' => '162714982' ),
     ),
    'plugin-upgrade-text'           => 'Good Reasons to Upgrade to Pro',
    'plugin-upgrade-text-list'      => array(
        array( 'title' => 'Support custom posts type', 'video_time' => 'More' ),
        array( 'title' => 'Target by post type', 'video_time' => 'More' ),
        array( 'title' => 'Manually approve each script and style', 'video_time' => 'More' ),
        array( 'title' => 'Ability to override default settings in each post', 'video_time' => 'More' ),
        array( 'title' => 'Load in header or in footer', 'video_time' => 'More' ),
        array( 'title' => 'Target script by specific URL', 'video_time' => 'More' ),
        array( 'title' => 'Set script for specific post', 'video_time' => 'More' ),
     ),
    'plugin-upgrade-video-height'   => 240,
    'plugin-upgrade-videos'         => array(
        array( 'title' => 'Script Loader Premium Features', 'video_id' => '141020978' ),
    ),
	'plugin-icon'				 => '',
    'plugin-affiliate'               => '',
    'plugin-redirect-after-install'  => admin_url( 'admin.php?page=cm-handfsl' ),
	'plugin-name'				 => CMHeaderAndFooterSL::$plugin_name,
	'plugin-license-name'		 => CMHeaderAndFooterSL::$plugin_name,
	'plugin-slug'				 => '',
	'plugin-short-slug'			 => 'ecommerce-tracking',
	'plugin-menu-item'			 => CMHeaderAndFooterSL::$plugin_slug,
	'plugin-textdomain'			 => CMHeaderAndFooterSL::$plugin_text_domain,
	'plugin-userguide-key'		 => '2727-header-and-footer-script-loader-free-version-tutorial',
	'plugin-video-tutorials-url'		 => 'https://www.videolessonsplugin.com/video-lesson/lesson/header-footer-script-loader-plugin/',
	'plugin-store-url'			 => 'https://www.cminds.com/wordpress-plugins-library/cm-header-and-footer-script-loader-plugin-for-wordpress?utm_source=scriptloaderfree&utm_campaign=freeupgrade&upgrade=1',
	'plugin-support-url'		 => 'https://www.cminds.com/contact/',
	'plugin-review-url'			 => 'https://www.cminds.com/wordpress-plugins-library/wordpress-header-and-footer-script-loader-plugin/#reviews',
	'plugin-changelog-url'		 => 'https://www.cminds.com/wordpress-plugins-library/cm-header-and-footer-script-loader-plugin-for-wordpress/#changelog',
	'plugin-licensing-aliases'	 => array(),
	'plugin-compare-table'	 => $plugin_compare_table,
);