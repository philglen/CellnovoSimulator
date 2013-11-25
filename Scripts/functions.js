// JavaScript Document

<!-- GLOBAL VARIABLES -->
<!-- LIST OF HOURS FOR GRAPHS -->
var hours_arr = new Array('00:00 - 00:59','01:00 - 01:59','02:00 - 02:59','03:00 - 03:59','04:00 - 04:59','05:00 - 05:59','06:00 - 06:59','07:00 - 07:59','08:00 - 08:59','09:00 - 09:59','10:00 - 10:59','11:00 - 11:59','12:00 - 12:59','13:00 - 13:59','14:00 - 15:59','15:00 - 15:59','16:00 - 16:59','17:00 - 17:59','18:00 - 18:59','19:00 - 19:59','20:00 - 20:59','21:00: 21:59','22:00 - 22:59','23:00 - 23:59');

<!-- CONFIRM CALLBACK FUNCTION -->
var whichConfirmFunction = '';

var yesterdaysDate = new Date();
yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);

$(document).ready(function(){
		
	updateClock();
	<!-- DETECT TOUCH SCREEN DEVICES -->
	function isTouchDevice() {
	   var el = document.createElement('div');
	   el.setAttribute('ongesturestart', 'return;');
	   if (typeof el.ongesturestart == "function") {
		  return true;
	   } else {
		  return false;
	   }
	}
	
	
	

	<!-- GLOBAL VARIABLES FORM UNLOCK AND CONFIRM FUNCTIONS -->

	var mouseStillDown = false;
	var counter = 0;
	
	<!-- SECURITY UNLOCK FUNCTION -->
	
	if(isTouchDevice()){
		$("#unlock").touchstart(function(event) {
			doUnlock();
		}).touchend(function(event) {
			clearInterval(mouseStillDown);
			mouseStillDown = false;
			counter = 0;
			$("#unlockImg").attr("src", "Images/security_hold_confirm_0.png");
			return;
		});
		
		$("#confirm").touchstart(function(event) {
			doConfirm();
		}).touchend(function(event) {
			clearInterval(mouseStillDown);
			mouseStillDown = false;
			counter = 0;
			$("#confirmImg").attr("src", "Images/hold_confirm_0.png");
			return;
		});
		
		$('head').append('<link rel="stylesheet" href="Styles/mobile.css">');
		
		
	}else{
		$("#unlock").mousedown(function(event) {
			doUnlock();
		}).mouseup(function(event) {
			clearInterval(mouseStillDown);
			mouseStillDown = false;
			counter = 0;
			$("#unlockImg").attr("src", "Images/security_hold_confirm_0.png");
			return;
		});
		
		$("#confirm").mousedown(function(event) {
			doConfirm();
		}).mouseup(function(event) {
			clearInterval(mouseStillDown);
			mouseStillDown = false;
			counter = 0;
			$("#confirmImg").attr("src", "Images/hold_confirm_0.png");
			return;
		});
	}
	
	function doUnlock() {
		if (counter <= 4) {
			counter ++;
			$("#unlockImg").attr("src", "Images/security_hold_confirm_" + counter + ".png");
		} else {
			clearInterval(mouseStillDown);
			$("#unlockpage").animate({"slide": "show", top:"-455px"}, 1000);
			$("#homepage").animate({"slide": "show", top:"-455px"}, 1000);
			//RESET
			counter = 0;
		}
		if (!mouseStillDown) {
			mouseStillDown = setInterval(doUnlock, 300);
		}
	}

	<!-- CONFIRM FUNCTION -->

	
	
	function doConfirm() {
		if (counter <= 4) {
			counter ++;
			$("#confirmImg").attr("src", "Images/hold_confirm_" + counter + ".png");
		} else {
			
			clearInterval(mouseStillDown);
			$("#confirmpage").animate({"slide": "hide", top:"-455px"}, 1000);
			//$("#" + butWhich + "").animate({"slide": "show", top:"-455px"}, 1000);
			$("#homepage").animate({"slide": "show", top:"-455px"}, 1000);
			$("#confirmImg").attr("src", "Images/hold_confirm_0.png");
			
			//CALL FUNCTION
			eval(whichConfirmFunction);			
			counter = 0;
			
		}
		if (!mouseStillDown) {
			mouseStillDown = setInterval(doConfirm, 300);
		}
	}

	// Set drag scroll on first descendant of class dragger on both selected elements
	$('#basalPreviewButtons, #inner').dragscrollable({dragSelector: '.dragger:first', acceptPropagatedEvent: true});
	$('#basalProfileListPanel, #basalProfileList').dragscrollable({dragSelector: '.dragger:first', acceptPropagatedEvent: true});


	<!-- BUTTON CLICKS -->
	<!-- CLICK DASHBOARD INSULIN BUTTON -->
	$("#dashInsulin").click(function() {
		$("#homepage").animate({"slide": "show", left:"-272px"}, 600);
		$("#insulin").animate({"slide": "show", left:"272px"}, 600);
		
		getCurrentBasalRate();
		
	});
	
	<!-- CLICK DASHBOARD BG BUTTON -->
	$("#dashBG").click(function() {
		$("#homepage").animate({"slide": "show", left:"-272px"}, 600);
		$("#bloodglucose").animate({"slide": "show", left:"272px"}, 600);
	});

	<!-- CLICK DASHBOARD FOOD BUTTON -->
	$("#dashFood").click(function() {
		$("#homepage").animate({"slide": "show", left:"-272px"}, 600);
		$("#food").animate({"slide": "show", left:"272px"}, 600);
		resetFoodOverview();
	});

	<!-- CLICK DASHBOARD INSULIN BUTTON -->
	$("#dashActivity").click(function() {
		$("#homepage").animate({"slide": "show", left:"-272px"}, 600);
		$("#activity").animate({"slide": "show", left:"272px"}, 600);
	});

	<!-- CLICK DASHBOARD INSULIN BUTTON -->
	$("#dashJournal").click(function() {
		$('.journalFilterSelected').removeClass('journalFilterSelectedActive');
		$('#journalFilterSelect-1').addClass('journalFilterSelectedActive');
		resetJournal();
		$("#homepage").animate({"slide": "show", left:"272px"}, 600);		
		$("#journal").animate({"slide": "show", left:"-272px"}, 600);
		
	});

	<!-- CLICK DASHBOARD INSULIN BUTTON -->
	$("#dashSettings").click(function() {
		$("#homepage").animate({"slide": "show", left:"-272px"}, 600);
		$("#settings").animate({"slide": "show", left:"272px"}, 600);
	});

	<!-- CLICK BG OVERVIEW BACK BUTTON -->
	$("#bgOverviewBack").click(function() {
		$("#bloodglucose").animate({"slide": "hide", left:"272px"}, 600);
		$("#homepage").animate({"slide": "show", left:"0px"}, 600);
	});

	<!-- CLICK INSULIN OVERVIEW BACK BUTTON -->
	$("#insulinOverviewBack").click(function() {
		$("#insulin").animate({"slide": "hide", left:"272px"}, 600);
		$("#homepage").animate({"slide": "show", left:"0px"}, 600);
	});

	<!-- CLICK FOOD OVERVIEW BACK BUTTON -->
	$("#foodOverviewBack").click(function() {
		$("#food").animate({"slide": "hide", left:"272px"}, 600);
		$("#homepage").animate({"slide": "show", left:"0px"}, 600);
	});

	<!-- CLICK ACTIVITY OVERVIEW BACK BUTTON -->
	$("#activityOverviewBack").click(function() {
		$("#activity").animate({"slide": "hide", left:"272px"}, 600);
		$("#homepage").animate({"slide": "show", left:"0px"}, 600);
	});

	<!-- CLICK JOURNAL OVERVIEW BACK BUTTON -->
	$("#journalOverviewBack").click(function() {
		$("#journal").animate({"slide": "hide", left:"-272px"}, 600);
		$("#homepage").animate({"slide": "show", left:"0px"}, 600);
	});

	<!-- CLICK SETTINGS OVERVIEW BACK BUTTON -->
	$("#settingsOverviewBack").click(function() {
		$("#settings").animate({"slide": "hide", left:"272px"}, 600);
		$("#homepage").animate({"slide": "show", left:"0px"}, 600);
	});

	<!-- CLICK BASAL OVERVIEW BUTTON -->
	$("#basalHeader").click(function() {
		$("#insulin").hide(0);
		$("#basalList").show(0);
	});

	
	
	$("#bolusHeader").click(function() {
		$("#insulin").hide(0);
		calculateBGValueUnits();
		resetBolus();
		$("#bolus").show(0);
	});
	
	$('#bolusBack').click(function(){
		$("#insulin").show(0);
		$("#bolus").hide(0);
	});

	

	<!-- CLICK BASAL PREVIEW BACK BUTTON -->
	
	

	$(".basalPreviewButton").click(function() {
		var tmp = this.id;
		var str = tmp.split("-");
		buttonID = str[1];
		toggleBasalBar();
		$("#basalPreviewGraph-" + buttonID).toggleClass("basalGraphBarActive");
	});
	
	$('#alertPopupYes').click(function(){
		$('#alertPopup').hide(0);
	});
	
	$('#standardPopupNo').click(function(){
		$("#standardPopup").hide(0);
	});	
});

<!-- SET THE TIME IN THE STATUS BAR -->
function updateClock(){
	var currentTime = new Date();
	
	$("#statusTime").html(''+dateFormat(currentTime,"HH:MM")+'');
	$('#handsetDateTimeValue').html(''+dateFormat(currentTime,'ddS mmm yyyy')+'&nbsp;'+dateFormat(currentTime,'HH:MM')+'');
	
	setTimeout("updateClock()",1000);
}

<!-- TRIM A STRING FOR CHECKING FOR EMPTY NAMES -->
function trim (myString){     
    return myString.replace(/^s+/g,'').replace(/s+$/g,'')     
}


<!-- CHECK IF ITEM IS IN ARRAY
function checkIfIsInArray(butWhich, butWhichArray){
	var foundArrayIndex = -1;
	for(i=0;i<butWhichArray.length;i++){
		if(butWhichArray[i] == butWhich){
			foundArrayIndex = i;
			break;
		}
	}
	return foundArrayIndex;
}
<!-- SHOW CONFIRM PAGE -->
function showConfirm(){
	$('#homepage').hide(0);
	$('#homepage').css('top','25px');
	$('#confirmpage').show(0);
	$('#confirmDetails').removeClass('green');
	$('#confirmDetails').removeClass('blue');
	
}
<!-- HIDE CONFIRM PAGE -->
function hideConfirm(){
	$('#homepage').css('top','-455px');
	$('#homepage').show(0);
	$('#confirmpage').hide(0);
	$("#confirmImg").attr("src", "Images/hold_confirm_0.png");
}
<!-- SHOW ALERT PAGE -->
function showAlert(title,message){
	$('#alertPopupText').html(message);
	$('#alertPopupTitle').html(title);
	$('#alertPopup').show(0);
}
<!-- GET THE CURRENT HOUR -->
function getCurrentHour(){
	var currentTime = new Date();
	var currentHour = currentTime.getHours();
	
	return currentHour;
}
<!-- SHOW CONFIRM CANCEL POPUP -->
function showConfirmCancelPopup(){
	$('#standardPopup').show();	
	$('#standardPopupYes').unbind('click');
	$('#popupTitle').html(getLanguageString('confirmcancel'));
	$('#popupText').html(getLanguageString('alldatawillbelosttext'));
}

<!-- GET TODAYS DATE -->
function getTodaysDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yy = today.getFullYear().toString().slice(2);
	if(dd<10){
		dd='0'+dd;
	}
	if(mm<10){
		mm='0'+mm;
	}
	today = dd+'/'+mm+'/'+yy;
	return today;
}
<!-- GET CURRENT TIME -->
function getCurrentTime(){
	var now = new Date();
	var hh = now.getHours();
	var mm = now.getMinutes();
	if(mm<10){
		mm='0'+mm;
	}
	if(hh<10){
		hh='0'+hh;
	}
	now = hh+':'+mm;
	return now;
	
}

