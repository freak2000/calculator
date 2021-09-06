$(function(){
  var isDecimalAdd = false
  var isOperatorAdd = false
  var isNumberAdd = 0
  function roundFun(value, n) {
    return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
  }
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
    var historyItem=$("<div></div>").text(formula).addClass("history")
    var deleteHistoryItem=$("<button></button>").text('✘').addClass("delete-history")    
    $(".title").after(historyItem).after(deleteHistoryItem)
    formula=formula.replace(/×/g,'*')
    formula=formula.replace(/÷/g,'/')
    formula=formula.replace(/π/g,'Math.PI')
    $(".result").text(roundFun(eval(formula),6)) 
    historyItem.append('='+roundFun(eval(formula),6))
    if($(".record").children(".history").length>7){
      $(".record button").eq(-2).remove()
      $(".record div").last().remove()
    }
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
  $(".record").on("click",".history",function(){
    var str = $(this).text()
    var index = str.indexOf("=")
    str = str.substr(index + 1,str.length)
    $(".result").text(str)
  })
  $(".record").on("click",".delete-history",function(){
    $(this).next("div").remove()
    $(this).remove()
  })
  $(".empty").click(function(){
    $("div").remove(".history")
    $("button").remove(".delete-history")
  })
})