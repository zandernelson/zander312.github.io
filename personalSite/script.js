$(document).ready(function(){
  $("#outerMenu").hide();
  $(".menuItem").hide();
  $( "#btnOuter" ).click(function(){
  	$("#outerMenu").slideToggle(1000, 'linear');
    $(".menuItem").fadeToggle(2000);
	});
});