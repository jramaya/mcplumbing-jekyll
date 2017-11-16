$(function() {
  $('.showcase-images a').on('click', function(e) {
    e.preventDefault();
    var preview = $('.showcase-image');
    preview.find('a').attr('href', $(this).attr('href'));
    preview.find('img').attr('src', $(this).attr('href'));
    preview.find('.showcase-image-description').html($(this).data('description'));
    preview.find('.showcase-image-title').html($(this).data('title'));

    $('.showcase-images a').removeClass('active');
    $(this).addClass('active');
  });
});