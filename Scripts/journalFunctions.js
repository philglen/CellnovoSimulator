<!-- GLOBAL VARIABLES -->
<!-- TOTAL NUMBER OF JOURNAL ITEMS -->
var totalJournalItems = 0;
<!-- ARRAY OF JOURNAL TYPES FOR FILTER -->
var journalFilterArr = new Array('All','Blood Glucose','Basal Profile','Temp Basal','Bolus','Food','Activity','Events');
<!-- ARRAY OF JOURNAL ITEM TYPES -->
var journalTypeArr = new Array();

$(window).load(function(){
	createJournalItemEvent();
	<!-- CLICK FILTER ON JOURNAL PAGE -->
	$('#journalOverviewFilter').click(function(){
		$('#journal').hide(0);
		$('#journalFilterList').show(0);
		
		$('.journalFilterSelected').unbind('click');
		$('.journalFilterSelected').bind('click',function(){
			toggleJournalFilterSelected(this);
		});
	});
	<!-- CLICK BACK ON JOURNAL FILTER PAGE -->
	$('#journalFilterBack').click(function(){		
		$('#journalFilterList').hide(0);
		$('#journal').show(0);
	});
	<!-- CLICK OK ON JOURNAL FILTER PAGE -->
	$('#journalFilterOk').click(function(){
		$('#journalFilterList').hide(0);
		resetJournal();
		$('#journal').show(0);
	});
	<!-- CLICK NEXT ON DOWN ARROW TO GO TO NEXT PAGE OF JOURNAL ITEMS -->
	$('#journalItemNavigationNext').click(function(){
		if(journalPageIndex < journalPageCount){
			journalPageIndex++;
			updateJournalNavigation();
			var marginTop = (journalPageIndex*294)-294;
			$('#journalList').animate({"slide": "show", top:"-"+marginTop+"px"}, 1000);
		}
	});
	<!-- CLICK NEXT ON UP ARROW TO GO TO PREVIOUS PAGE OF JOURNAL ITEMS -->
	$('#journalItemNavigationPrev').click(function(){
		if(journalPageIndex > 1){
			journalPageIndex--;
			updateJournalNavigation();
			var marginTop = 294 - (journalPageIndex*294);
			$('#journalList').animate({"slide": "show", top:""+marginTop+"px"}, 1000);
		}
	});
	<!-- CLICK HIDE ON JOURNAL POPUP -->
	$('#journalPopupHide').click(function(){
		$('#journalPopup').hide(0);
	});
	
});

<!-- TOGGLE SELECTED JOURNAL ITEMS FOR FILTERING -->
function toggleJournalFilterSelected(butWhichItem){
	var journalFilterIndex = (butWhichItem.id).split('-')[1];
	selectedJournalFilter = journalFilterArr[journalFilterIndex-1];
	$('.journalFilterSelected').removeClass('journalFilterSelectedActive');
	$('#journalFilterSelect-'+journalFilterIndex).addClass('journalFilterSelectedActive');
}
<!-- CREATE EVENT JOURNAL ITEM --> 
function createJournalItemEvent(){
	var journalIndex = totalJournalItems+1;
	var journalListItem = '<div class="journalItem" id="journalItem-'+journalIndex+'">';                    	
	journalListItem += '<div class="journalTypeIcon"><img src="Images/journal_icon_web.png" /></div>';
	journalListItem += '<div class="left">';
	journalListItem += '<div class="foodItemName white bold left" id="journalTitle-'+journalIndex+'">Server Update</div>';
	journalListItem += '<div class="journalTime med white" id="journalTime-'+journalIndex+'">'+getCurrentTime()+'</div>';
	journalListItem += '<div class="journalDate med white" id="journalDate-'+journalIndex+'">'+getTodaysDate()+'</div>';
	journalListItem += '</div>';
	journalListItem += '<div class="right"><div class="journalInfo" id="journalInfo-'+journalIndex+'"></div>';
	journalListItem += '</div>';
	
	$('#journalList').prepend(journalListItem);
	totalJournalItems++;
	journalTypeArr[journalIndex-1] = 'Events';
	
	$('#journalInfo-'+journalIndex).bind('click',function(){
		$('.popupInfo').hide(0);
		$('#journalPopupTitle').html(getLanguageString('BackUp_Completed'));
		$('#journalPopupDate').html($('#journalTime-'+journalIndex).html() + '&nbsp;&nbsp;&nbsp;' + $('#journalDate-'+journalIndex).html());
		$('#journalPopup').show(0);
	});
}
<!-- CREATE BLOOD GLUCOSE JOURNAL ITEM -->
function createJournalItemBG(amount, note, wellbeing, diet, range){
	var journalIndex = totalJournalItems+1;
	var journalListItem = '<div class="journalItem" id="journalItem-'+journalIndex+'">';                    	
	journalListItem += '<div class="journalTypeIcon"><img src="Images/journal_icon_bg.png" /></div>';
	journalListItem += '<div class="left">';
	journalListItem += '<div class="foodItemName purple bold left" id="journalTitle-'+journalIndex+'">'+amount+' mmol/l</div>';
	journalListItem += '<div class="journalTime med white" id="journalTime-'+journalIndex+'">'+$('#bgResultsTime').html()+'</div>';
	journalListItem += '<div class="journalDate med white" id="journalDate-'+journalIndex+'">'+$('#bgResultsDate').html()+'</div>';
	journalListItem += '</div>';
	journalListItem += '<div class="right"><div class="journalInfo" id="journalInfo-'+journalIndex+'"></div>';
	journalListItem += '</div>';
	
	$('#journalList').prepend(journalListItem);
	totalJournalItems++;
	journalTypeArr[journalIndex-1] = 'Blood Glucose';
	
	$('#journalInfo-'+journalIndex).bind('click',function(){
		$('.popupInfo').hide(0);
		$('#journalPopupTitle').html(getLanguageString('bloodGlucoseReading'));
		$('#journalPopupDate').html($('#journalTime-'+journalIndex).html() + '&nbsp;&nbsp;&nbsp;' + $('#journalDate-'+journalIndex).html());
		$('#journalBGInfo').show(0);
		$('#journalBGAmount').html(amount);
		$('#journalBGRange').html(range);
		$('#journalBGWellbeing').html(wellbeing);
		$('#journalBGDiet').html(diet);
		$('#journalBGNote').html(note);
		
		$('#journalPopup').show(0);
	});
}
<!-- CREATE BASAL PROFILE JOURNAL ITEM -->
function createJournalItemBasalProfile(name, amount){
	var journalIndex = totalJournalItems+1;
	var journalListItem = '<div class="journalItem" id="journalItem-'+journalIndex+'">';                    	
	journalListItem += '<div class="journalTypeIcon"><img src="Images/journal_icon_basal.png" /></div>';
	journalListItem += '<div class="left">';
	journalListItem += '<div class="foodItemName blue bold left" id="journalTitle-'+journalIndex+'">'+name+'</div>';
	journalListItem += '<div class="journalTime med white" id="journalTime-'+journalIndex+'">'+getCurrentTime()+'</div>';
	journalListItem += '<div class="journalDate med white" id="journalDate-'+journalIndex+'">'+getTodaysDate()+'</div>';
	journalListItem += '</div>';
	journalListItem += '<div class="right"><div class="journalInfo" id="journalInfo-'+journalIndex+'"></div>';
	journalListItem += '</div>';
	
	$('#journalList').prepend(journalListItem);
	totalJournalItems++;
	journalTypeArr[journalIndex-1] = 'Basal Profile';
	$('#journalInfo-'+journalIndex).bind('click',function(){
		$('.popupInfo').hide(0);
		$('#journalPopupTitle').html(getLanguageString('journalbasalProfile'));
		$('#journalPopupDate').html($('#journalTime-'+journalIndex).html() + '&nbsp;&nbsp;&nbsp;' + $('#journalDate-'+journalIndex).html());
		$('#journalBasalInfo').show(0);
		$('#journalBasalName').html(name);
		$('#journalBasalAmount').html(amount);
		$('#journalPopup').show(0);
	});
}
<!-- CREATE TEMPORARY BASAL JOURNAL ITEM -->
function createJournalItemTempBasal(duration,adjust){
	var journalIndex = totalJournalItems+1;
	var journalListItem = '<div class="journalItem" id="journalItem-'+journalIndex+'">';
	journalListItem += '<div class="journalTypeIcon"><img src="Images/journal_icon_temp_basal.png" /></div>';
	journalListItem += '<div class="left">';
	journalListItem += '<div class="foodItemName blue bold left" id="journalTitle-'+journalIndex+'">Temporary Basal</div>';
	journalListItem += '<div class="journalTime med white" id="journalTime-'+journalIndex+'">'+getCurrentTime()+'</div>';
	journalListItem += '<div class="journalDate med white" id="journalDate-'+journalIndex+'">'+getTodaysDate()+'</div>';
	journalListItem += '</div>';
	journalListItem += '<div class="right"><div class="journalInfo" id="journalInfo-'+journalIndex+'"></div>';
	journalListItem += '</div>';
	
	$('#journalList').prepend(journalListItem);
	totalJournalItems++;
	journalTypeArr[journalIndex-1] = 'Temp Basal';
	
	
	$('#journalInfo-'+journalIndex).bind('click',function(){
		$('.popupInfo').hide(0);
		$('#journalPopupTitle').html(getLanguageString('tab/tempbasal'));
		$('#journalPopupDate').html($('#journalTime-'+journalIndex).html() + '&nbsp;&nbsp;&nbsp;' + $('#journalDate-'+journalIndex).html());		
		$('#journalTempBasalInfo').show(0);
		$('#journalTempBasalDuration').html(duration);
		$('#journalTempBasalAdjust').html(adjust);
		$('#journalPopup').show(0);
	});
	
}
<!-- CREATE BOLUS JOURNAL ITEM -->
function createJournalItemBolus(total,type,delivery,foodAmount,bgAmount){
	var journalIndex = totalJournalItems+1;
	var journalListItem = '<div class="journalItem" id="journalItem-'+journalIndex+'">';                    	
	journalListItem += '<div class="journalTypeIcon"><img src="Images/journal_icon_bolus.png" /></div>';
	journalListItem += '<div class="left">';
	journalListItem += '<div class="foodItemName blue bold left" id="journalTitle-'+journalIndex+'">'+total+'u '+type+'</div>';
	journalListItem += '<div class="journalTime med white" id="journalTime-'+journalIndex+'">'+getCurrentTime()+'</div>';
	journalListItem += '<div class="journalDate med white" id="journalDate-'+journalIndex+'">'+getTodaysDate()+'</div>';
	journalListItem += '</div>';
	journalListItem += '<div class="right"><div class="journalInfo" id="journalInfo-'+journalIndex+'"></div>';
	journalListItem += '</div>';
	
	$('#journalList').prepend(journalListItem);
	totalJournalItems++;
	journalTypeArr[journalIndex-1] = 'Bolus';
	$('#journalInfo-'+journalIndex).bind('click',function(){
		$('.popupInfo').hide(0);
		$('#journalPopupTitle').html(getLanguageString('bolusStarted'));
		$('#journalPopupDate').html($('#journalTime-'+journalIndex).html() + '&nbsp;&nbsp;&nbsp;' + $('#journalDate-'+journalIndex).html());
		$('#journalBolusInfo').show(0);
		$('#journalBolusTotal').html(''+total+'');
		$('#bolusDeliveryType').html(''+type+'');
		
		$('#journalBolusDelivery').html(''+delivery+'');
		
		$('#journalBolusFood').html(''+foodAmount+'');
		$('#journalBolusBG').html(''+bgAmount+'');
		
		$('#journalPopup').show(0);
	});
	
}
<!-- CREATE FOOD JOURNAL ITEM --> 
function createJournalItemFood(count, total){	
	var journalIndex = totalJournalItems+1;
	var journalListItem = '<div class="journalItem" id="journalItem-'+journalIndex+'">';                    	
	journalListItem += '<div class="journalTypeIcon"><img src="Images/journal_icon_food.png" /></div>';
	journalListItem += '<div class="left">';
	journalListItem += '<div class="foodItemName yellow bold left" id="journalTitle-'+journalIndex+'">'+count + ' Item';
	if(count > 1){
		journalListItem += 's';
	}	
	journalListItem += ' = '+total+'g</div>';
	journalListItem += '<div class="journalTime med white" id="journalTime-'+journalIndex+'">'+getCurrentTime()+'</div>';
	journalListItem += '<div class="journalDate med white" id="journalDate-'+journalIndex+'">'+getTodaysDate()+'</div>';
	journalListItem += '</div>';
	journalListItem += '<div class="right"><div class="journalInfo" id="journalInfo-'+journalIndex+'"></div>';
	journalListItem += '</div>';
	
	$('#journalList').prepend(journalListItem);
	totalJournalItems++;
	journalTypeArr[journalIndex-1] = 'Food';
	
	$('#journalInfo-'+journalIndex).bind('click',function(){
		$('.popupInfo').hide(0);
		$('#journalPopupTitle').html(getLanguageString('journalfoodLogged'));
		$('#journalPopupDate').html($('#journalTime-'+journalIndex).html() + '&nbsp;&nbsp;&nbsp;' + $('#journalDate-'+journalIndex).html());
		$('#journalFoodInfo').show(0);
		$('#journalFoodTotalCarbs').html(total);
		$('#journalFoodItems').html(count);
		$('#journalPopup').show(0);
	});
	
}
<!-- CREATE ACTIVITY JOURNAL ITEM -->
function createJournalItemActivity(type, duration, score){
	var journalIndex = totalJournalItems+1;
	var journalListItem = '<div class="journalItem" id="journalItem-'+journalIndex+'">';
	journalListItem += '<div class="journalTypeIcon"><img src="Images/journal_icon_activity.png" /></div>';
	journalListItem += '<div class="left">';
	journalListItem += '<div class="foodItemName orange bold left" id="journalTitle-'+journalIndex+'">'+type+'</div>';
	journalListItem += '<div class="journalTime med white" id="journalTime-'+journalIndex+'">'+getCurrentTime()+'</div>';
	journalListItem += '<div class="journalDate med white" id="journalDate-'+journalIndex+'">'+getTodaysDate()+'</div>';
	journalListItem += '</div>';
	journalListItem += '<div class="right"><div class="journalInfo" id="journalInfo-'+journalIndex+'"></div>';
	journalListItem += '</div>';
	
	$('#journalList').prepend(journalListItem);
	totalJournalItems++;
	journalTypeArr[journalIndex-1] = 'Activity';
	
	var durationDisplay = '';
	var durationArr = duration.split(":");
	var durationHours = durationArr[0];
	var durationMins = durationArr[1];
	var durationSecs = durationArr[2];
	
	if(durationHours == '00'){
		if(durationMins == '00'){
			durationDisplay = durationSecs+'sec';
		}else{
			durationDisplay = durationMins+'min:'+durationSecs+'sec';
		}
	}else{
		durationDisplay = durationHours + 'hr:'+durationMins+'min';
	}
	
	$('#journalInfo-'+journalIndex).bind('click',function(){
		$('.popupInfo').hide(0);
		$('#journalPopupTitle').html(getLanguageString('activityEvent'));
		$('#journalPopupDate').html($('#journalTime-'+journalIndex).html() + '&nbsp;&nbsp;&nbsp;' + $('#journalDate-'+journalIndex).html());		
		$('#journalActivityInfo').show(0);
		$('#journalActivityType').html(type);
		$('#journalActivityDuration').html(durationDisplay);
		$('#journalActivityScore').html(score);
		$('#journalPopup').show(0);
	});
	 
}

<!-- RESET JOURNAL PAGE -->
function resetJournal(){
	filterJournal();		
	journalPageIndex = 1;
	$('#journaList').css('top','0px');
	updateJournalNavigation();
	
}
<!-- UPDATE JOURNAL PAGINATION -->
function updateJournalNavigation(){
	
	if(journalPageCount > 1){
		//DISPLAY PAGINATION
		$('#journalItemNavigation').show(0);
		
		var pageCountStr = '';
		var pageIndexStr = '';
		
		if(journalPageIndex < 10){
			pageIndexStr = '0'+journalPageIndex;
		}else{
			pageIndexStr = ''+journalPageIndex;
		}
		
		if(journalPageCount < 10){
			pageCountStr = '0'+journalPageCount;
		}else{
			pageCountStr = ''+ journalPageCount;
		}
		$('#journalItemNavigationPageNo').html(pageIndexStr+'/'+pageCountStr);
	}else{
		$('#journalItemNavigation').hide(0);
	}
}
<!-- FILTER JOURNAL ITEMS -->
function filterJournal(){
	var journalFilterIndex;
	for(var i = 1; i <= 7; i++){
		if($('#journalFilterSelect-'+i).hasClass('journalFilterSelectedActive')){
			journalFilterIndex = i-1;
			break;
		}
	}
	var journalItemCount = 0;
	for(var i = 0; i < journalTypeArr.length; i++){
		var journalIndex = i+1;
		if(journalTypeArr[i] != null){
			if(journalFilterIndex == 0){
				//ALL
				$('#journalItem-'+journalIndex).show(0);
				journalItemCount++;			
			}else if(journalTypeArr[i] == journalFilterArr[journalFilterIndex]){
				$('#journalItem-'+journalIndex).show(0);
				journalItemCount++;
			}else{
				$('#journalItem-'+journalIndex).hide(0);
			}
		}
	}
	journalPageCount = Math.ceil(journalItemCount / 5);
	

}


