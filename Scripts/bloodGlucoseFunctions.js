<!-- GLOBAL VARIABLES -->

<!-- SET BLOOD GLUCOSE READING -->
var bgValue = 0;
var selectedWellbeing = 'Feeling Well';
var selectedDiet = 'Pre-Meal';
var wellbeingArr = new Array('Feeling Well','Feeling Un-well');
var dietArr = new Array('Pre-Meal','Post-Meal','Fasting');
var rangeAssessment = '';

$(window).load(function(){
	<!-- CLICK AVERAGES ON BLOOD GLUCOSE PAGE -->
	$('#bloodGlucoseAverages').click(function(){
		toggleBloodGlucosePanels();
	});
	<!-- CLICK CONTROL ON BLOOD GLUCOSE PAGE -->
	$('#bgOverviewControl').click(function(){
		$('#bloodglucose').hide(0);
		$('#bgControlReading').show(0);
	});
	<!-- CLICK BACK ON BLOOD GLUCOSE CONTROL PAGE -->
	$('#bgControlReadingBack').click(function(){		
		$('#bgControlReading').hide(0);
		$('#bloodglucose').show(0);
	});
	$('#bgReadingLow').click(function(){
		takeBloodGlucoseReading(3.1);
	});
	
	$('#bgReadingMed').click(function(){
		takeBloodGlucoseReading(6.5);
	});
	
	$('#bgReadingHigh').click(function(){
		takeBloodGlucoseReading(9.5);
	});
	
	$('#bgReadingTakenContinue').click(function(){
		$('#bgReadingTaken').hide(0);
		$('#bgHealthAssessment').show(0);
		resetKeyboard();
	});
	
	$('.wellbeingSelected').click(function(){
		toggleWellbeingSelected(this);
	});
	
	$('.dietSelected').click(function(){
		toggleDietSelected(this);
	});
	
	$('#addNoteBttn').click(function(){
		showKeyboard(getLanguageString('addnote'));
		$('#keyboardNext').bind('click',function(){
			hideKeyboard();
			$('#addNoteText').html(''+$('.caption').html()+'');
		});
	});
	
	$('#bgHealthAssessmentContinue').click(function(){
		$('#bgHealthAssessment').hide(0);
		$('#bgReadingResults').show(0);
		
		$('#bloodGlucoseLastValue').html(bgValue);
		$('#bloodGlucoseLastDate').html(''+$('#bgReadingTakenValue').html()+'');
		$('#bloodGlucoseLastTime').html(''+$('#bgReadingTakenTime').html()+'');
		$('#dashBGValue').html(bgValue);
		$('#dashBGReading').html(''+$('#bgReadingTakenTime').html()+'');
		
		$('#bgResultsValue').html(bgValue);
		$('#bgResultsDate').html(''+$('#bgReadingTakenDate').html()+'');
		$('#bgResultsTime').html(''+$('#bgReadingTakenTime').html()+'');
		showSelectedWellbeing();
		showSelectedDiet();
		$('#bgResultsNoteText').html(''+$('#addNoteText').html()+'');
		$('#bgOverviewNoteText').html(''+$('#addNoteText').html()+'');
		$('#bgOverviewNote').show(0);
		$('#bgResultsNote').show(0);
		
	});
	
	$('#bgReadingResultsBack').click(function(){
		$('#bgHealthAssessment').show(0);
		$('#bgReadingResults').hide(0);
		
		
	});
	
	$('#bgReadingResultsRecord').click(function(){
		$('#bloodglucose').show(0);
		$('#bgReadingResults').hide(0);
		var note = $('#bgResultsNoteText').html();
		createJournalItemBG(bgValue, note, selectedWellbeing, selectedDiet, rangeAssessment);
		
		
	});
	
	<!-- SET INITIAL VALUES FOR BLOOD GLUCOSE READING -->
	/*
	$('#bloodGlucoseLastValue').html(bgValue);
	$('#bloodGlucoseLastDate').html(''+dateFormat(yesterdaysDate,"dd.mm.yyyy")+'');
	$('#bloodGlucoseLastTime').html('20:32');
	$('#dashBGValue').html(bgValue);
	$('#dashBGReading').html('20:32');
	
	$('#bgAverageSevenDayValue').html('7.0');
	$('#bgAverageThirtyDayValue').html('7.2');
	$('#bgAverageNinetyDayValue').html('6.9');
	<!-- CREATE JOURNAL ITEM FOR BLOOD GLUCOSE READING -->
	createJournalItemBG(bgValue);
	*/
});
function toggleWellbeingSelected(butWhichItem){
	var wellbeingIndex = (butWhichItem.id).split('-')[1];
	selectedWellbeing = wellbeingArr[wellbeingIndex-1];
	$('.wellbeingSelected').removeClass('wellbeingSelectedActive');
	$('#wellbeingSelect-'+wellbeingIndex).addClass('wellbeingSelectedActive');
}

function toggleDietSelected(butWhichItem){
	var dietIndex = (butWhichItem.id).split('-')[1];
	selectedDiet = dietArr[dietIndex-1];
	$('.dietSelected').removeClass('dietSelectedActive');
	$('#dietSelect-'+dietIndex).addClass('dietSelectedActive');
	
}

<!-- TOGGLE BETWEEN LAST B.G. AND AVERAGE B.G. READINGS -->
function toggleBloodGlucosePanels(){
	if($('#bloodGlucoseAverages').hasClass('purplePromptButton')){
		$('#bloodGlucoseAverages').removeClass('purplePromptButton');
		$('#bloodGlucoseLast').unbind('click');
		$('#bloodGlucoseAveragesPanel').hide(0);
		$('#bloodGlucoseLastPanel').show(0);
		$('#bloodGlucoseLast').addClass('purplePromptButton');
		$('#bloodGlucoseAverages').bind('click',function(){
			toggleBloodGlucosePanels();
		});
	}else{
		$('#bloodGlucoseAverages').addClass('purplePromptButton');
		$('#bloodGlucoseAverages').unbind('click');
		$('#bloodGlucoseAveragesPanel').show(0);
		$('#bloodGlucoseLastPanel').hide(0);
		$('#bloodGlucoseLast').removeClass('purplePromptButton');
		$('#bloodGlucoseLast').bind('click',function(){
			toggleBloodGlucosePanels();
		});
		
	}
}

function showSelectedWellbeing(){
	switch(selectedWellbeing){
		case 'Feeling Well':
			$('#bgResultsFeelingWell').show(0);
			$('#bgOverviewFeelingWell').show(0);
			break;
		case 'Feeling Un-well':
			$('#bgResultsFeelingUnwell').show(0);
			$('#bgOverviewFeelingUnwell').show(0);
			break;
	}
}

function showSelectedDiet(){
	switch(selectedDiet){
		case 'Pre-Meal':
			$('#bgResultsPreMeal').show(0);
			$('#bgOverviewPreMeal').show(0);
			break;
		case 'Post-Meal':
			$('#bgResultsPostMeal').show(0);
			$('#bgOverviewPostMeal').show(0);
			break;
		case 'Fasting':
			$('#bgResultsFasting').show(0);
			$('#bgOverviewFasting').show(0);
			break;
	}
}

function takeBloodGlucoseReading(bgReadingValue){
	$('#bloodglucose').hide(0);
	$('#bgReadingTaken').show(0);
	$('#bgReadingTakenValue').html(''+bgReadingValue+'');
	$('#bgReadingTakenTime').html(''+getCurrentTime()+'');
	$('#bgReadingTakenDate').html(''+getTodaysDate()+'');
	
	$('.wellbeingSelected').removeClass('wellbeingSelectedActive');
	$('#wellbeingSelect-1').addClass('wellbeingSelectedActive');
	
	$('.dietSelected').removeClass('dietSelectedActive');
	$('#dietSelect-1').addClass('dietSelectedActive');
	
	selectedWellbeing = 'Feeling Well';
	selectedDiet = 'Pre-Meal';
	
	$('.bgAssessmentItem').hide(0);
	$('.bgReadingItem').hide(0);
	$('#addNoteText').html('');
	resetKeyboard();
	
	bgValue = bgReadingValue;
	
	var targetRangeLow = parseFloat($('#editTargetBGLow').scroller('getValue')[0]) + (parseFloat($('#editTargetBGLow').scroller('getValue')[1])/10);
	var targetRangeHigh = parseFloat($('#editTargetBGHigh').scroller('getValue')[0]) + (parseFloat($('#editTargetBGHigh').scroller('getValue')[1])/10);  
	
	var hyperglycaemicLimit = parseFloat($('#editHyperglycaemia').scroller('getValue')[0]) + (parseFloat($('#editHyperglycaemia').scroller('getValue')[1])/10);
	var hypoglycaemicLimit = parseFloat($('#editHypoglycaemia').scroller('getValue')[0]) + (parseFloat($('#editHypoglycaemia').scroller('getValue')[1])/10);

	if(bgReadingValue >= targetRangeLow && bgReadingValue <= targetRangeHigh){
		//INSIDE TARGET RANGE
		$('#bgInsideTargetRange').show(0);
		$('#bgResultsInsideRange').show(0);
		$('#bgOverviewInsideRange').show(0);
		rangeAssessment = 'Inside Target Range'; 
	}else if(bgReadingValue < targetRangeLow){
		if(bgReadingValue < hypoglycaemicLimit){
			//HYPOGLYCAEMIC
			$('#bgBelowHypoglycaemic').show(0);
			$('#bgResultsHypoglycaemic').show(0);
			$('#bgOverviewHypoglycaemic').show(0);
			rangeAssessment = 'Below Hypoglycaemic Limit';
		}else {
			//OUTSIDE TARGET RANGE - LOW
			$('#bgOutsideTargetRangeLow').show(0);
			$('#bgResultsBelowRange').show(0);
			$('#bgOverviewBelowRange').show(0);
			rangeAssessment = 'Outside Target Range (Lower)';
		}
	}else if(bgReadingValue > targetRangeHigh){
		if(bgReadingValue > hyperglycaemicLimit){
			//HYPERGLYCAEMIC
			$('#bgAboveHyperglycaemic').show(0);
			$('#bgResultsHyperglycaemic').show(0);
			$('#bgOverviewHyperglycaemic').show(0);
			rangeAssessment = 'Above Hyperglycaemic Limit';
		}else {
			//OUTSIDE TARGET RANGE - HIGH
			$('#bgOutsideTargetRangeHigh').show(0);
			$('#bgResultsAboveRange').show(0);
			$('#bgOverviewAboveRange').show(0);
			rangeAssessment = 'Outside Target Range (Higher)';
		}
	}else{
		//DO NOTHING
	}

}