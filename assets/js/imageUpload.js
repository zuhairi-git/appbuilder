$(document).ready(() => {
      var $dropzone = $('.image_picker'),
          $droptarget = $('.drop_target'),
          $dropinput = $('#inputIcon, #inputLogo, #inputSplash'),
          $dropimg = $('.image_preview'),
          $remover = $('[data-action="remove_current_image"]');
        $dropzone.on('dragover', function() {
          $droptarget.addClass('dropping');
          return false;
        });
  
        $dropzone.on('dragend dragleave', function() {
          $droptarget.removeClass('dropping');
          return false;
        });
  
        $dropzone.on('drop', function(e) {
          $dropimg = $(e.target).closest('.image_picker').children().find('.image_preview');
          $droptarget.removeClass('dropping');
          $droptarget.addClass('dropped');
          $remover.removeClass('disabled');
          e.preventDefault();
          
          var file = e.originalEvent.dataTransfer.files[0],
              reader = new FileReader();
  
          reader.onload = function(event) {
            $dropimg.css('background-image', 'url(' + event.target.result + ')');
          };
          
          console.log(file);
          reader.readAsDataURL(file);
  
          return false;
        });
  
        $dropinput.change(function(e) {
          $droptarget.addClass('dropped');
          $dropimg = $(e.currentTarget).closest('.image_picker').children().find('.image_preview');
          $remover.removeClass('disabled');
          $('.image_title input').val('');
          var file = $(this).get(0).files[0];
          reader = new FileReader();
          
          reader.onload = function(event) {
            $dropimg.css('background-image', 'url(' + event.target.result + ')');
          }
          
          reader.readAsDataURL(file);
        });
  
        $remover.on('click', function() {
          $(this).closest('.image_picker').children().find('.image_preview').css('background-image', '');
          $droptarget.removeClass('dropped');
          $(this).addClass('disabled');
          $('.image_title input').val('');
        });
  
        $('.image_title input').blur(function() {
          if ($(this).val() != '') {
            $droptarget.removeClass('dropped');
          }
        });
  });