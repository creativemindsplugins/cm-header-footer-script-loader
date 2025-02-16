jQuery(document).ready(function($) {

	$( '.repeater' ).repeater({

		defaultValues: {
			'item-code': '',
			'item-destination': 'header',
			'item-load': 'all',
			'item-type': 'css'
		},
		show: function() {
			var item_ID = $(this).find( '.item_ID' );

			$.ajax({
				url: ajax_cm_handfsl_vars.ajaxurl,
				data: {
					nonce: ajax_cm_handfsl_vars.get_unique_id_nonce,
					action: ajax_cm_handfsl_vars.get_unique_id_action
				},
				method: "POST"
			}).done( function( response ) {
				var unique_ID = parseInt( response );
				var items_IDS = [];

				$( 'input[class=item_ID]' ).each( function() {
					items_IDS.push( parseInt( $(this).val() ));
				});

				if( jQuery.inArray( unique_ID, items_IDS ) != -1 ){
					while( jQuery.inArray( unique_ID, items_IDS ) != -1 ){
						unique_ID++;
					}
				}

				item_ID.val( unique_ID );
			});

			$(this).slideDown();
		},
		hide: function( deleteElement ) {
			if( confirm('Are you sure you want to delete this element?') )
			{
				$(this).slideUp( deleteElement );
			}
		},
		// isFirstItemUndeletable: true

	});

	$(document).on( 'change', '.item-load', function() {

		if( $(this).val() === 'custom' )
		{
			$(this).parents( '.repeater-item' ).find( '.cpt' ).removeClass( 'hidden' );
		}
		else
		{
			$(this).parents( '.repeater-item' ).find( '.cpt' ).addClass( 'hidden' );
		}

	});
	
	$('.cm-handfsl_field_help_container').each(function () {
        var newElement,
            element = $(this);
            newElement = $('<div class="cm-handfsl_field_help"></div>');
        newElement.attr('title', element.html());

        if (element.siblings('th').length) {
            element.siblings('th').append(newElement);
        } else {
            element.siblings('*').append(newElement);
        }
        element.remove();
    });

    $('.cm-handfsl_field_help').tooltip({
        show: {
            effect: "slideDown",
            delay: 100
        },

        position: { my: "left top", at: "right top" },

        content: function () {
            var element = $(this);
            return element.attr('title');
        },

        close: function (event, ui) {
          ui.tooltip.hover(
              function () {
                  $(this).stop(true).fadeTo(400, 1);
              },
              function () {
                  $(this).fadeOut("400", function () {
                      $(this).remove();
                  });
              });
        }
    });
		
	$(document).on('click', '.cmhandfsl_create', function () {
		var that = $(this);
		if(that.next().find('.cmhandfsl-custom-script-add').hasClass('hide') == true) {
			that.next().find('.cmhandfsl-custom-script-add').slideDown(500).removeClass('hide').addClass('show');
		} else {
			that.next().find('.cmhandfsl-custom-script-add').slideUp(500, function () {
				that.next().find('.cmhandfsl-custom-script-add').removeClass('show').addClass('hide');
			});
		}
	});
	
	$(document).on('click', '.cmhandfsl_expand_collapse_btn', function () {
		var that = $(this);
		var collapse_text = 'Collapse Additional Settings (&#8593;)';
		var expand_text = 'Expand Additional Settings (&#8595;)';
		if(that.closest('.cmhandfsl-custom-script-row').find('.cmhandfsl_expand_collapse').hasClass('hide') == true) {
			that.closest('.cmhandfsl-custom-script-row').find('.cmhandfsl_expand_collapse').slideDown(500).removeClass('hide').addClass('show');
			that.html(collapse_text);
			
			that.closest('.cmhandfsl-custom-script-row').find('select.cpt').next('.select2-container').find('.select2-search__field').css('width', 'auto');
		} else {
			that.closest('.cmhandfsl-custom-script-row').find('.cmhandfsl_expand_collapse').slideUp(500, function () {
				that.closest('.cmhandfsl-custom-script-row').find('.cmhandfsl_expand_collapse').removeClass('show').addClass('hide');
				that.html(expand_text);
			});
		}
	});
	
	$( document ).on( 'change', '.item-load-n', function () {
        $( this ).parents( '.cmhandfsl-custom-script-row' ).find( '.cpt' ).addClass( 'hidden' );
        if ( $( this ).val() === 'custom' ) {
            $( this ).parents( '.cmhandfsl-custom-script-row' ).find( '.cpt' ).removeClass( 'hidden' );
			$( this ).parents( '.cmhandfsl-custom-script-row' ).find('select.cpt').next('.select2-container').find('.select2-search__field').css('width', 'auto');
        }
    });
	
	$( document ).on( 'click', '#cmhandfsl-create-rule-btn', function () {
		
		var item_name		= $( '.cmhandfsl-custom-script-add input[name="item-name"]' );
		var item_code		= $( '.cmhandfsl-custom-script-add textarea[name="item-code"]' );
		var item_note		= $( '.cmhandfsl-custom-script-add textarea[name="item-note"]' );
		var item_type		= $( '.cmhandfsl-custom-script-add select[name="item-type"]' );
		var item_location	= $( '.cmhandfsl-custom-script-add select[name="item-destination"]' );
		var item_device		= 'all_devices';
		var item_load		= $( '.cmhandfsl-custom-script-add select[name="item-load"]' );
		var item_load_cpt	= $( '.cmhandfsl-custom-script-add select[name="cpt"]');
		var item_load_postpage	= '';
		var item_load_url	= '';
		var item_load_cats	= '';
		var item_load_tags	= '';
		var item_disabled	= '0';
		
		var item_timeframe_from = '';
		var item_timeframe_to = '';
		
		var valid = true;
		
		if ( item_name.val() === '' ) {
			item_name.addClass( 'invalid' );
			valid = false;
		} else {
			item_name.removeClass( 'invalid' );
		}
		
		if ( item_code.val() === '' ) {
			item_code.addClass( 'invalid' );
			valid = false;
		} else {
			item_code.removeClass( 'invalid' );
		}
		
		if ( !valid ) {
			return false;
		} else {
			$.ajax( {
				url: ajax_cm_handfsl_vars.ajaxurl,
				data: {
					action: 'cmhandfsl_create_update_rule',
					mode: 'create',
					item_name: item_name.val(),
					item_code: item_code.val(),
					item_note: item_note.val(),
					item_type: item_type.val(),
					item_location: item_location.val(),
					item_device: item_device,
					item_load: item_load.val(),
					item_load_cpt: item_load_cpt.val(),
					item_load_postpage: item_load_postpage,
					item_load_url: item_load_url,
					item_load_cats: item_load_cats,
					item_load_tags: item_load_tags,
					item_disabled: item_disabled,
					item_timeframe_from: item_timeframe_from,
					item_timeframe_to: item_timeframe_to,
				},
				method: "POST"
			} ).done( function ( response ) {
				location.reload(true);
			});
		}
	});
	
	$( document ).on( 'click', '#cmhandfsl-update-rule-btn', function () {
		var rowkey = $(this).data('rowkey');
		
		var item_name		= $(this).closest('.cmhandfsl-custom-script-row').find('input[name="item-name"]');
		var item_code		= $(this).closest('.cmhandfsl-custom-script-row').find('textarea[name="item-code"]');
		var item_note		= $(this).closest('.cmhandfsl-custom-script-row').find('textarea[name="item-note"]');
		var item_type		= $(this).closest('.cmhandfsl-custom-script-row').find('select[name="item-type"]');
		var item_location	= $(this).closest('.cmhandfsl-custom-script-row').find('select[name="item-destination"]');
		var item_device		= 'all_devices';
		var item_load		= $(this).closest('.cmhandfsl-custom-script-row').find('select[name="item-load"]');
		var item_load_cpt	= $(this).closest('.cmhandfsl-custom-script-row').find('select[name="cpt"]');
		var item_load_postpage	= '';
		var item_load_url	= '';
		var item_load_cats	= '';
		var item_load_tags	= '';
		var item_disabled	= '0';
				
		var item_timeframe_from = '';
		var item_timeframe_to = '';
		
		var valid = true;
		
		if ( item_name.val() === '' ) {
			item_name.addClass( 'invalid' );
			valid = false;
		} else {
			item_name.removeClass( 'invalid' );
		}
		
		if ( item_code.val() === '' ) {
			item_code.addClass( 'invalid' );
			valid = false;
		} else {
			item_code.removeClass( 'invalid' );
		}
		
		if ( !valid ) {
			return false;
		} else {
			$.ajax( {
				url: ajax_cm_handfsl_vars.ajaxurl,
				data: {
					action: 'cmhandfsl_create_update_rule',
					mode: 'update',
					id: rowkey,
					item_name: item_name.val(),
					item_code: item_code.val(),
					item_note: item_note.val(),
					item_type: item_type.val(),
					item_location: item_location.val(),
					item_device: item_device,
					item_load: item_load.val(),
					item_load_cpt: item_load_cpt.val(),
					item_load_postpage: item_load_postpage,
					item_load_url: item_load_url,
					item_load_cats: item_load_cats,
					item_load_tags: item_load_tags,
					item_disabled: item_disabled,
					item_timeframe_from: item_timeframe_from,
					item_timeframe_to: item_timeframe_to,
				},
				method: "POST"
			} ).done( function ( response ) {
				alert("Script Updated!");
			});
		}
	});
	
	$( document ).on( 'click', '#cmhandfsl-delete-rule-btn', function () {
		if ( confirm( 'Are you sure you want to delete this element?' ) ) {
			var rowkey = $(this).data('rowkey');
			$.ajax( {
                url: ajax_cm_handfsl_vars.ajaxurl,
                data: {
                    action: 'cmhandfsl_delete_rule',
                    id: rowkey,
                },
                method: "POST"
            } ).done( function ( response ) {
				$('#cmhandfsl_scripts_list_'+rowkey).remove();
			});
		}
	});
	
	$( 'select.cpt' ).select2( {
		width: 300,
		placeholder: "Select",
		allowClear: true
	} );
	
	$( document ).on( 'click', '.cmhandfsl_single_posts_filters a', function () {
		var that = $(this);
		var type = that.data('type');
		$('.cmhandfsl_single_posts_filters a').removeClass('button-primary');
		that.addClass('button-primary');
		if(type == '') {
			$('.cmhandfsl_single_posts_scripts').find('tr').css('display', 'inline-table');
		} else {
			$('.cmhandfsl_single_posts_scripts').find('tr').css('display', 'none');
			$('.cmhandfsl_single_posts_scripts').find('tr.'+type).css('display', 'inline-table');
		}
	});
		
	var $body = $('body');

    $body.on('mouseenter', '.cm_field_help', function () {
        if ($(this).find('.cm_field_help--wrap').length > 0) {
            return;
        }
        var helpHtml = $(this).attr('data-title');
        var $helpItemWrapHeight = "style='min-height:" + $(this).parent().outerHeight() + "px'";
        var $helpItemWrap = $("<div class='cm_field_help--wrap'" + $helpItemWrapHeight + "><div class='cm_field_help--text'></div></div>");

        $(this).append($helpItemWrap);

        var $helpItemText = $(this).find('.cm_field_help--text');
        $helpItemText.html(helpHtml);
        $helpItemText.html($helpItemText.html());

        setTimeout(function () {
            $helpItemWrap.addClass('cm_field_help--active');
        }, 300);
    }).on('mouseleave', '.cm_field_help', function() {
        var $helpItem = $(this).find('.cm_field_help--wrap');
        setTimeout(function () {
            $helpItem.removeClass('cm_field_help--active');
        }, 600);
        setTimeout(function () {
            $helpItem.remove();
        }, 800);

    });
	
});