var Quiz = {
  counter: 1,
  //подгружаем вопросы викторины
  loadQuestion: function(questionUrl,blockToAppend){
    //questionUrl - url запроса
    //blockToAppend - селектор блока для вставки, полученных данных
    $.ajax({
      type:'GET',
      url:questionUrl,
      success: function(data){
       $(blockToAppend).html(data);
      }
    })
  },
  calculate: function() {

  },
  //уведомление при успешном прохождении викторины
  win: function(blockToAppend) {
    $.ajax({
      type:'GET',
      url: 'win.html',
      success: function(data){
       $(blockToAppend).html(data);
      }
    })
  },
  //уведомление при не успешном прохождении викторины
  lose: function(blockToAppend) {
    $.ajax({
      type:'GET',
      url: 'lose.html',
      success: function(data){
        $(blockToAppend).html(data);
      }
    })
  },
  //подсвечиваем правильный/неправильный ответ соответ. классом
  isRight: function(isright,el) {
    //isright - boolean, правильный ли ответ
    //el - элемент
    if (isright === true) {
      el.addClass('right');
    } else {
      el.addClass('wrong');
    }
  },
  //выбираем вариант ответа в викторине
  vote: function(questionUrl,blockToAppend,elCounter) {
    //elCounter - селектор счетчика вопросов
    if (this.counter < 10) {
      this.loadQuestion(questionUrl,blockToAppend);
    } else {
      //тут организовать проверку результатов
      //и запускать функцию win() или lose()
      //this.lose('.screen-content.bycard');
      this.win('.screen-content.bycard');
    }
    //увеличиваем счетчик ответов
    this.counter++;
    $(elCounter).text(this.counter);
  }
}

var Subscribe = {
  showPopup: function() {
    var template = '<div class="thanks-popup">'+
    '<div class="thanks-popup-inner">'+
    '<div class="thanks-popup-title">Спасибо за подписку!</div>'+
    '<div class="thanks-popup-txt">Следите за вашим почтовым ящиком :)</div>'+
    '<div>'+
    '<a href="javascript:void(0);" class="btn btn-bordered thanks-popup-btn">Ок!</a>'+
    '</div></div></div>';

    $('body').append(template);
    $('html').addClass('not-scroll');
    setTimeout(function(){
      $('.thanks-popup').remove();
      $('html').removeClass('not-scroll');
    },15000)
  },
  closePopup: function() {
    $('.thanks-popup').remove();
    $('html').removeClass('not-scroll');
  }
}

document.addEventListener('DOMContentLoaded',function(){

  $(document).on('change','.label-quiz input',function(e){
    var label = $(this).closest('label');
    Quiz.isRight(true,label);

    setTimeout(function(){
      Quiz.vote('question.html','.quiz','.quiz-progress-count');
    },1200);
  });

  $(document).on('click','.btn-reload',function(e){
    e.preventDefault();
    location.reload();
  })

  $(document).on('click','.thanks-popup-btn',Subscribe.closePopup)

  //отображаем попап с благодарностью за подписку
  //после отправки формы
  // Subscribe.showPopup();

});//DOMContentLoaded