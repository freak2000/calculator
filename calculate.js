$(function(){
  // 判断后面是否可以加小数点
  var isDecimalAdd = false
  // 判断后面是否可以加操作符
  var isOperatorAdd = false
  // 在输入一个小数点后，如果要输入第二个小数点，则必须在两个小数点之间出现“数字，操作符，数字”这样的组合，例如0.1+0.2中间的“1+0”,使用要用一个变量来判断是否可以输入小数点，当值为0时可以输入
  var isNumberAdd = 0
  // 利用一个函数对计算的结果进行保留小数点后n位小数，并且进行四舍五入
  function roundFun(value, n) {
    return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
  }
  // 对数字按钮绑定事件
  $(".number").click(function(){
    // 如果结果区只有一个0，则进行数字的替换
    if(($(".result").text()[$(".result").text().length-1])=='0' && $(".result").text().length == 1){
      $(".result").text('')
      $(".result").text($(this).text()+'')
    }
    // 否则将数字添加到已有的数字的末尾
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
      // 将isNumberAdd变为1，意味着只要再输入一个数字就可以输入小数点了
      isNumberAdd = true
    }
  })
  $(".dot").click(function(){
    if(!isDecimalAdd) {
      $(".result").text($(".result").text() + $(this).text())
      // 在输入小数点之后，紧接着不能够输入小数点或者数字
      isOperatorAdd = true
      isDecimalAdd = true
      // 将isNumberAdd变为3，意味着要输入“数字，操作符，数字”的组合
      isNumberAdd = 3
    }    
  })
  // 清除结果区所有数字，所有值回到默认值
  $(".ac").click(function(){
    isOperatorAdd = false
    isDecimalAdd = false
    $(".result").text(0)
  })
  // 等号绑定事件
  $(".equal").click(function(){
    isOperatorAdd = false
    isDecimalAdd = false
    isNumberAdd = 0
    var formula = $(".result").text()
    // 创建一个新的div作为历史记录，将结果区的文本导入到历史记录
    var historyItem=$("<div></div>").text(formula).addClass("history")
    // 删除按钮
    var deleteHistoryItem=$("<button></button>").text('✘').addClass("delete-history")   
    // 在标题后面插入历史记录 
    $(".title").after(historyItem).after(deleteHistoryItem)
    // 符号更换，使其可以被js的eval函数计算
    formula=formula.replace(/×/g,'*')
    formula=formula.replace(/÷/g,'/')
    formula=formula.replace(/π/g,'Math.PI')
    // 用eval函数计算，并且保留小数点后6位
    $(".result").text(roundFun(eval(formula),6)) 
    historyItem.append('='+roundFun(eval(formula),6))
    // 当历史记录超过7条时,删除最后一条
    if($(".record").children(".history").length>7){
      $(".record button").eq(-2).remove()
      $(".record div").last().remove()
    }
  })
  // 删除按钮
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
  // 点击历史记录后,在结果区显示历史记录李的结果
  $(".record").on("click",".history",function(){
    var str = $(this).text()
    var index = str.indexOf("=")
    str = str.substr(index + 1,str.length)
    $(".result").text(str)
  })
  // 删除历史记录
  $(".record").on("click",".delete-history",function(){
    $(this).next("div").remove()
    $(this).remove()
  })
  // 清空历史记录
  $(".empty").click(function(){
    $("div").remove(".history")
    $("button").remove(".delete-history")
  })
})