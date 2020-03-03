var Quiz = {
  counter: 1,
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
  win: function(blockToAppend) {
    $.ajax({
      type:'GET',
      url: 'win.html',
      success: function(data){
       $(blockToAppend).html(data);
      }
    })
  },
  lose: function(blockToAppend) {
    $.ajax({
      type:'GET',
      url: 'lose.html',
      success: function(data){
        $(blockToAppend).html(data);
      }
    })
  },
  vote: function(questionUrl,blockToAppend,elCounter) {
    if (this.counter < 5) {
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
document.addEventListener('DOMContentLoaded',function(){

  $(document).on('change','.label-quiz input',function(){
    setTimeout(function(){
      Quiz.vote('question.html','.quiz','.quiz-progress-count');
    },300);
  });

  $(document).on('click','.btn-reload',function(e){
    e.preventDefault();
    location.reload();
  })

});//DOMContentLoaded