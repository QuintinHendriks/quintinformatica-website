$(function(){
	var l = false;
	var i = false;
	var f = false;

	$('#l').click(function(){
		l = true;
		$('#life').text("l")
	});
	
	$('#i').click(function(){
		if(l === true){
			i = true;
			$('#life').text("li")
		}
	});
	
	$('#f').click(function(){
		if(i === true){
			f = true;
			$('#life').text("lif")
		}
	});
	
	$('#e').click(function(){
		if(f === true){
                        $('#life').text("life");
			$('#game-of-life').fadeTo(1, 1, function(){
                        });
			$('#page').fadeTo(1, 0, function(){
			        $('#game-of-life').css('position', 'static');
                                $('#bootshit').prop('disabled', true);
				$('#page').css('display', 'none');
			});
		}
	});
});	