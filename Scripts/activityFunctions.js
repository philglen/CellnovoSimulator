<!-- GLOBAL VARIABLES -->

<!-- ARRAY OF ACTIVITY TYPES -->
var activityTypeArr = new Array('Play','Sport','Walk','Gym','Cycle','Row','Run','Swim');
<!-- CURRENTLY SELECTED ACTIVITY -->
var activityType = '';
<!-- ARRAY OF ACTIVITY SCORES
var activityScoreArr = new Array();
<!-- ARRAY OF CONSTANTS FOR ACTIVITY SCORES PER HOUR -->
var activityScoreConstantArr = new Array(20,40,10,60,30,30,50,40,30);

$(window).load(function(){
	<!-- INITIALISE SCORES ARRAY -->
	for(var i = 0; i < 24; i++){
		activityScoreArr[i] = 0;
	}
	<!-- CLICK RECORD ACTIVITY BUTTON -->
	$('#activityRecordActivity').click(function(){
		$('#activity').hide(0);
		$('#recordActivity').show(0);
		
		resetSelectActivity();
		$("#activityTimer").stopwatch('reset');
		$('#activityTimer').html('00:00:00');
		$('#activityStartTimer').html(getLanguageString('start_button'));
		$('.activityIcon').unbind('click');
		$('.activityIcon').bind('click',function(){
			toggleActivitySelected(this);
		});
		
		$('#activityStartTimer').removeClass('activityStartTimerActive');
		$('#activityStartTimer').addClass('activityStartTimerDisabled');
		
	});
	<!-- CLICK BACK ON RECORD ACTIVITY PAGE -->
	$('#recordActivityBack').click(function(){
		$('#activity').show(0);
		$('#recordActivity').hide(0);
	});
	<!-- SET ELEMENT AS STOPWATCH -->
	$("#activityTimer").stopwatch();
	<!-- CLICK DISCARD ON ACTIVITY COMPLETE PAGE -->
	$('#activityCompleteDiscard').click(function(){
		//SHOW POPUP
		$('#activityComplete').hide(0);
		$('#activity').show(0);
	});
	<!-- CLICK RECORD ON ACTIVITY COMPLETE PAGE -->
	$('#activityCompleteRecord').click(function(){
		saveActivity();
	});
	
});
<!-- TOGGLE SELECTED ACTIVITY -->
function toggleActivitySelected(butWhichActivity){
	var activityIndex = (butWhichActivity.id).split('-')[1];
	activityType = activityTypeArr[activityIndex-1];
	resetSelectActivity();
	$('#activitySelectIcon-'+activityIndex).addClass('activityIcon'+activityType+'Active');
	$('#activityStartTimer').removeClass('activityStartTimerDisabled');
	$('#activityStartTimer').addClass('activityStartTimerActive');
	$('#activityStartTimer').unbind('click');
	$('#activityStartTimer').bind('click',function(){
		startActivityTimer();
	});
}
<!-- RESET RECORD ACTIVITY PAGE -->
function resetSelectActivity(){
	$('.activityIcon').removeClass('activityIconPlayActive');
	$('.activityIcon').removeClass('activityIconSportActive');
	$('.activityIcon').removeClass('activityIconWalkActive');	
	$('.activityIcon').removeClass('activityIconGymActive');
	$('.activityIcon').removeClass('activityIconCycleActive');
	$('.activityIcon').removeClass('activityIconRowActive');
	$('.activityIcon').removeClass('activityIconRunActive');	
	$('.activityIcon').removeClass('activityIconSwimActive');
}
<!-- START TIMER -->
function startActivityTimer(){
	$('.activityIcon').unbind('click');
	$("#activityTimer").stopwatch('start');
	$('#activityStartTimer').html(getLanguageString('stop_button'));
	$('#activityStartTimer').unbind('click');
	$('#activityStartTimer').bind('click',function(){
		stopActivityTimer();
	});
}
<!-- STOP TIMER -->
function stopActivityTimer(){
	$("#activityTimer").stopwatch('stop');
	$('#activityComplete').show(0);
	$('#recordActivity').hide(0);
	
	$('.activityCompleteIcon').hide(0);
	$('#activityComplete'+activityType).show(0);
	
	$('#activityCompleteType').html(getLanguageString('activity_'+activityType.toLowerCase()));
	$('#activityCompleteTime').html($('#activityTimer').html());
	$('#activityCompleteScore').html(''+calculateActivityScore()+'');
}

<!-- CONFIRM SAVE ACTIVITY -->
function saveActivity(){
	var activityDuration = $('#activityCompleteTime').html();
	var activityScore = parseFloat($('#activityCompleteScore').html());
	createJournalItemActivity(activityType,activityDuration,activityScore);
	
	var currentHour = getCurrentHour();
	activityScoreArr[currentHour] += activityScore;
	
	var activityGraphIndex = currentHour+1;
	
	$('#activityGraphBar-'+activityGraphIndex).removeClass('activityGraphBarDisabled');
	var margin_top = Math.round(160 - (activityScoreArr[currentHour]*1.4));
	
	
	$('#activityGraphBar-'+activityGraphIndex).css('margin-top',margin_top);
	
	$('#activityComplete').hide(0);
	$('#activity').show(0);
	var totalScore = 0; 
	for(var i = 0; i < 24; i++){
		totalScore += activityScoreArr[i];
	}
	var averageScore = Math.round(totalScore/30);
	$('#currentScoreValue').html(totalScore);
	$('#dailyAverageValue').html(averageScore);
	$('#dashActiviityValue').html(totalScore); 
}
<!-- CALCULATE THE ACTIVITY SCORE -->
function calculateActivityScore(){
	var score = 0;
	var activityTimeArr = ($('#activityTimer').html()).split(":");
	var activityTimeHours = activityTimeArr[0];
	var activityTimeMins = activityTimeArr[1];
	var activityTimeSecs = activityTimeArr[2];
	
	var activityTimeInSeconds = Math.round(parseFloat(activityTimeHours*3600))+ Math.round(parseFloat(activityTimeMins*60))+ Math.round(parseFloat(activityTimeSecs));
		
	var activityIndex = checkIfIsInArray(activityType, activityTypeArr);
	var activityScorePerSecond = activityScoreConstantArr[activityIndex] / 3600;
	
	score = Math.round(activityTimeInSeconds*activityScorePerSecond);
	
	return score;
}