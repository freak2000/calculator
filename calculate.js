$(function(){
  var isDecimalAdd = false
  var isOperatorAdd = false
  var isNumberAdd = 0
  $(".number").click(function(){
    if(($(".result").text()[$(".result").text().length-1])=='0' && $(".result").text().length == 1){
      $(".result").text('')
      $(".result").text($(this).text()+'')
    }
    else{
      $(".result").text($(".result").text() + $(this).text()+'')
    }
    isOperatorAdd = false
    if(isNumberAdd == 3 || isNumberAdd == 1) {
      isNumberAdd -= 1
    }
    if(isNumberAdd<=0) {
      isDecimalAdd = false
    }
    // isDecimalAdd = false
  })
  $(".operator").click(function(){
    if(!isOperatorAdd) {
      $(".result").text($(".result").text() + $(this).text())
      isOperatorAdd = true
      isDecimalAdd = true
      isNumberAdd = true
    }
    if(isNumberAdd == 2) {
      isNumberAdd =1
    }
  })
  $(".dot").click(function(){
    if(!isDecimalAdd) {
      $(".result").text($(".result").text() + $(this).text())
      isOperatorAdd = true
      isDecimalAdd = true
      isNumberAdd = 3
    }    
  })
  $(".ac").click(function(){
    isOperatorAdd = false
    isDecimalAdd = false
    $(".result").text(0)
  })
  $(".equal").click(function(){
    isOperatorAdd = false
    isDecimalAdd = false
    isNumberAdd = 0
    var formula = $(".result").text()
    formula=formula.replace(/×/g,'*')
    formula=formula.replace(/÷/g,'/')
    formula=formula.replace(/π/g,'Math.PI')
    $(".result").text(eval(formula)) 
  })
  $(".delete").click(function(){
    if($(".result").text().length>1) {
      var formula = $(".result").text()
      formula=formula.substr(0,formula.length-1)
      $(".result").text(formula)
    }
    else{
      $(".result").text('0')
    }
  })
})

