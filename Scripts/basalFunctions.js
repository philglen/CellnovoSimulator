<!-- GLOBAL VARIABLES -->

<!-- CURRENTLY VIEWED BASAL PROFILE -->
var thisProfileIndex;
<!-- CURRENTLY ACTIVE BASAL PROFILE -->
var activeProfileIndex = -1;
<!-- ARRAY OF BASAL PROFILES -->
var profilesArr = new Array();
<!-- ARRAY OF PROFILE NAMES
var profileNamesArr = new Array();
<!-- ARRAY OF BASAL VALUES FOR CURRENT BASAL PROFILE -->
var profileValArr = new Array();
<!-- ARRAY OF TOTAL BASAL COUNTS -->
var profileBasalCountArr = new Array();

<!-- BOOLEAN FOR NEW OR EDIT BASAL PROFILE -->
var isNewBasalProfile;
<!-- BOOLEAN FOR COPYING OR EDITING BASAL VALUE -->
var isBasalBarCopy;

$(window).load(function(){

<!-- CLICK BASAL EDIT PROFILE BUTTON -->
	$("#basalEditProfileBttn").click(function() {
		$("#basalProfileEdit").show(0);
		$("#basalProfileHome").hide(0);
		isNewBasalProfile = false;
		isBasalBarCopy = false;
		resetBasalEdit();
		$("#basalEditGraph-1").attr('class','basalGraphBar basalGraphBarActive');
		$('#basalEditProfileName').html($('#basalProfileHomeName').html());
		$("#insulinBasalEditBack").unbind('click');
		$("#insulinBasalEditBack").bind('click',function() {
			//IF NO CHANGES HAVE BEEN MADE
			$("#basalProfileEdit").hide(0);
			$("#basalProfileHome").show(0);
		});
		$('#basalTimeNext').removeClass('basalTimeNextCopy');
		$('#basalTimeNext').addClass('basalTimeNext');
		updateBasalGraph('edit');
		
	});
	<!-- CLICK CREATE BASAL PROFILE -->
	$("#insulinBasalListCreate").click(function() {
		$("#basalProfileEdit").show(0);
		$("#basalProfileHome").hide(0);
		isNewBasalProfile = true;
		isBasalBarCopy = true;
		resetBasalEdit();
		$("#basalEditGraph-1").attr('class','basalGraphBar basalGraphBarCopy');
		$("#basalEditProfileName").html(getLanguageString('newprofilename'));
		$("#insulinBasalEditBack").unbind('click');
		$("#insulinBasalEditBack").bind('click',function() {
			//IF NO CHANGES HAVE BEEN MADE
			$("#basalProfileEdit").hide(0);
			$("#basalList").show(0);
		});
		$('#basalTimeNext').removeClass('basalTimeNext');
		$('#basalTimeNext').addClass('basalTimeNextCopy');
		
		updateBasalGraph('edit');
		
	});
	<!-- CLICK REVIEW BASAL PROFILE -->
	$("#insulinBasalEditReview").click(function() {
		$("#basalProfilePreview").show(0);
		$("#basalProfileEdit").hide(0);
		reviewBasalProfile();
	});
	<!-- CLICK PREVIOUS HOUR IN EDITING / CREATING BASAL PROFILE -->
	$('#basalTimePrev').click(function(){
		var activeGraphBar = getBasalProfileEditGraphBar();
		if(activeGraphBar != 1){
			$('#basalEditGraph-'+activeGraphBar).attr('class','basalGraphBar');
			if(isBasalBarCopy){
				$('#basalEditGraph-'+(activeGraphBar - 1)).attr('class','basalGraphBar basalGraphBarCopy');
			}else{
				$('#basalEditGraph-'+(activeGraphBar - 1)).attr('class','basalGraphBar basalGraphBarActive');
			}
			$('#basalTimeText').html(hours_arr[activeGraphBar - 2]);
			var sliderValue =  profileValArr[activeGraphBar - 2];
			changeBasalWheels(Math.floor(sliderValue), Math.floor(((sliderValue % 1).toFixed(2))*100));
					
			//$('#editBasalRate').scroller('setValue', [Math.floor(sliderValue), Math.floor(((sliderValue % 1).toFixed(2))*100)], true);
			updateBasalEditValue();
			updateBasalGraph('edit');
		}
	});
	
	<!-- CLICK NEXT HOUR IN EDITING / CREATING BASAL PROFILE -->
	$('#basalTimeNext').click(function(){
		var activeGraphBar = getBasalProfileEditGraphBar();
		
		if(isBasalBarCopy || profileValArr[activeGraphBar] == 0){
			profileValArr[activeGraphBar] = profileValArr[activeGraphBar - 1];
		}
		
		if(activeGraphBar != 24){
			$('#basalEditGraph-'+ activeGraphBar).attr('class','basalGraphBar');
			
			if(isBasalBarCopy){
				$('#basalEditGraph-'+(activeGraphBar + 1)).attr('class','basalGraphBar basalGraphBarCopy');
			}else{
				$('#basalEditGraph-'+(activeGraphBar + 1)).attr('class','basalGraphBar basalGraphBarActive');
			}
			var sliderValue =  profileValArr[activeGraphBar];
			changeBasalWheels(Math.floor(sliderValue), Math.floor(((sliderValue % 1).toFixed(2))*100));
			//$('#editBasalRate').scroller('setValue', [Math.floor(sliderValue), Math.floor(((sliderValue % 1).toFixed(2))*100)], true);
					
			$('#basalTimeText').html(hours_arr[activeGraphBar]);
			updateBasalEditValue();
			updateBasalGraph('edit');
		}
		
		if(activeGraphBar == 23 && isNewBasalProfile && profileValArr[activeGraphBar] != 0) {
			$('#insulinBasalEditReview').removeClass('promptButtonDisabled');
			$('#insulinBasalEditReview').bind('click',function(){
				$("#basalProfilePreview").show(0);
				$("#basalProfileEdit").hide(0);
				reviewBasalProfile();	
			});
		}
	});
	
	<!-- INITIALISE BASAL TUMBLER -->
	$(function(){
		$('#editBasalRate').scroller({
			wheels: [ { 'tens': { 0: '0', 1: '1' }, 'units': { 5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95' } } ],
			display: 'inline',
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				calculateBasalValue(scrollerVals);
			}
		});    
	});
	<!-- SET INITIAL VALUE OF BASAL TUMBLER -->
	$('#editBasalRate').scroller('setValue', [0, 30], true);
	<!-- INIALISE TEMPORARY BASAL DURATION TUMBLER -->
	$(function(){
		$('#editTempBasalDuration').scroller({
			wheels: [ { 'hours': { 0:'0h',1:'1h',2:'2h',3:'3h',4:'4h',5:'5h',6:'6h',7:'7h',8:'8h',9:'9h',10:'10h',11:'11h',12:'12h',13:'13h',14:'14h',15:'15h',16:'16h',17:'17h',18:'18h',19:'19h',20:'20h',21:'21h',22:'22h',23:'23h'  }, 'mins': { 00: '00m', 30: '30m' } } ],
			display: 'inline',
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});    
	});
	<!-- SET INITIAL VALUE FOR TEMPORARY BASAL DURATION TUMBLER -->
	$('#editTempBasalDuration').scroller('setValue',[3,00],true);
	
	<!-- INITIALISE TEMPORARY BASAL ADJUST TUMBLER -->
	$(function(){
		$('#editTempBasalAdjust').scroller({
			wheels: [ { 'percent': {05: '05%', 10: '10%', 15: '15%', 20: '20%', 25: '25%', 30: '30%', 35: '35%', 40: '40%', 45: '45%', 50: '50%', 55: '55%', 60: '60%', 65: '65%', 70: '70%', 75: '75%', 80: '80%', 85: '85%', 90: '90%', 95: '95%',100: '100%',105: '105%', 110: '110%', 115: '115%', 120: '120%', 125: '125%', 130: '130%', 135: '135%', 140: '140%', 145: '145%', 150: '150%', 155: '155%', 160: '160%', 165: '165%', 170: '170%', 175: '175%', 180: '180%', 185: '185%', 190: '190%', 195: '195%',200: '200%' } } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});
	});
	<!-- SET INITIAL VALUE FOR TEMPORARY BASAL ADJUST TUMBLER -->
	$('#editTempBasalAdjust').scroller('setValue',[150],true);
	
	<!-- CLICK TEMPORARY BASAL BUTTON ON BASAL PAGE -->
	$('#basalTempButton').click(function(){
		$('#basalList').hide(0);
		$('#tempBasal').show(0);
		
		$('#editTempBasalDuration').scroller('setValue',[3,00],true);
		$('#editTempBasalAdjust').scroller('setValue',[150],true);
	});
	<!-- CLICK BACK BUTTON ON TEMPORARY BASAL PAGE -->
	$('#tempBasalBack').click(function(){
		$('#basalList').show(0);
		$('#tempBasal').hide(0);
	});
	<!-- CLICK START BUTTON ON TEMPORARY BASAL PAGE -->
	$('#tempBasalStart').click(function(){
		confirmStartTempBasal();
		
	});

	<!-- CLICK BASAL CREATE NEW NEXT BUTTON -->
	$("#insulinBasalProfileNext").click(function(){
		resetKeyboard();
		if(!isNewBasalProfile){
			$('.caption').html($('#basalPreviewProfileName').html());	
		}
		showKeyboard(getLanguageString('JournalBasalProfileName'));
		
		$("#keyboardNext").bind("click", function() {
			var caption = trim($('.caption').html());
	
			if(caption == ''){
				showKeyboardError(getLanguageString('basalprofilenameletters')+'<br />'+getLanguageString('basal/popup/wrongname/text'));
			}else{
				var duplicate = false;
				for(var i = 0;i<profileNamesArr.length; i++){
					if(caption == profileNamesArr[i]){
						duplicate = true;
						break;
					}
				}
				if(duplicate){
					showKeyboardError(getLanguageString('basal/popup/wrongname/title')+'<br />'+getLanguageString('basal/popup/wrongname/text'));
				}else{				
					confirmSaveBasalProfile();
				}
			}
			
		});
	});
	
	<!-- CLICK BASAL PREVIEW PROFILE BUTTON -->
	$("#basalPreviewProfileBttn").click(function() {
		$("#basalProfilePreview").show(0);
		$("#basalProfileHome").hide(0);
		$("#insulinBasalProfileNext").hide(0);
		$('#basalPreviewProfileName').html($("#basalProfileHomeName").html());
		
		$("#insulinBasalPreviewBack").unbind('click');
		$("#insulinBasalPreviewBack").bind('click',function(){
			$("#basalProfilePreview").hide(0);
			$("#basalProfileHome").show(0);
		});
	});
	
	<!-- CLICK COPY BASAL PROFILE BUTTON -->
	$('#basalCopyProfileBttn').click(function() {
		copyBasalProfile();
	});
	
	<!-- CLICK DELETE BASAL PROFILE BUTTON -->
	$('#basalDeleteProfileBttn').click(function() {
		confirmDeleteBasalProfile();
	});
	
	<!-- CLICK BASAL GRAPH BAR -->	
	$('.clickableBasalGraphBar').click(function(){
		toggleBasalBarCopy();
	});
	
	<!-- CLICK ACTIVATE PROFILE BUTTON -->
	$('#insulinBasalProfileHomeActivate').click(function(){
		confirmActivateBasalProfile();
	});
	
	<!-- CLICK BASAL OVERVIEW BACK BUTTON -->
	$("#insulinBasalListBack").click(function() {
		$("#basalList").hide(0);
		$("#insulin").show(0);
		
		getCurrentBasalRate();
	});
	

	<!-- CLICK BASAL HOME PAGE BACK BUTTON -->
	$("#insulinBasalProfileHomeBack").click(function() {
		$("#basalProfileHome").hide(0);
		$("#basalList").show(0);
	});
	
});

<!-- GET CURRENTLY SELECTED BASAL GRAPH BAR -->
function getBasalProfileEditGraphBar(){
	var activeGraphBar;
	for(var i = 1; i <= 24; i++){
		if($('#basalEditGraph-'+i).hasClass('basalGraphBarActive') || $('#basalEditGraph-'+i).hasClass('basalGraphBar basalGraphBarCopy')){
			activeGraphBar = i;
			break;
		}
	}
	
	return activeGraphBar;
}

<!-- CALCULATE BASAL VALUE FROM THE TUNBLER -->
function calculateBasalValue(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1])/100;
	
	var insulinVal = scrollerValsTens + scrollerValsUnits;
		
	var graphVal = insulinVal;
	
	changeBasalWheels(scrollerValsTens, scrollerValsUnits);
	/*
	if(scrollerValsUnits > 0.5 && scrollerValsTens == 1){
		$('#editBasalRate').scroller('setValue', [1, 50], true);
	}
	*/
	var activeGraphBar = getBasalProfileEditGraphBar();
	
	profileValArr[activeGraphBar - 1] = graphVal;
	
	updateBasalGraph('edit');
	updateBasalEditValue();
	
}
<!-- UPDATE TUMBLER DEPENDING ON CURRENT VALUE -->
function changeBasalWheels(scrollerValsTens, scrollerValsUnits){
	var maxBasalRateArr = $('#editMaxBasalRate').scroller('getValue');
	var maxBasalRateTens = parseInt(maxBasalRateArr[0]);
	var maxBasalRateUnits = parseInt(maxBasalRateArr[1]);
	
	var basalRateWheelsStr = "[{'tens': {0:'0'";
	for(var i = 1; i <= maxBasalRateTens; i++){
		basalRateWheelsStr += ","+i+":'"+i+"'";
	}
	
	if(scrollerValsTens == maxBasalRateTens){
		if(maxBasalRateTens == 0){
			basalRateWheelsStr += "}, 'units': { 5: '05'";
		
			for(var i = 10; i <= maxBasalRateUnits; i = i+5){			
				basalRateWheelsStr += ","+i+":'"+i+"'";
			}
		}else{
			basalRateWheelsStr += "}, 'units': { 0: '00'";
		
			for(var i = 5; i <= maxBasalRateUnits; i = i+5){			
				basalRateWheelsStr += ","+i+":'";
				if(i < 10){
					basalRateWheelsStr += "0";
				}
				basalRateWheelsStr += ""+i+"'";
			}
		}
		
		basalRateWheelsStr += "} } ]";
	}else if(scrollerValsTens == 0){
		basalRateWheelsStr += "}, 'units': { 5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95' } } ]";
	}else{
		basalRateWheelsStr += "}, 'units': { 0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95' } } ]";
	}
		
	$('#editBasalRate').scroller('destroy');
	
	$(function(){
		$('#editBasalRate').scroller({
			wheels: eval(basalRateWheelsStr),
			display: 'inline',
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				calculateBasalValue(scrollerVals);
			}
		});    
	});
	
	
	
	$("#insulinBasalEditBack").unbind('click');
	$("#insulinBasalEditBack").bind('click',function() {
		//CHANGES HAVE BEEN MADE
		showConfirmCancelPopup();
		if(isNewBasalProfile){
			$('#standardPopupYes').bind('click',function() {
				$("#standardPopup").hide(0);
				$("#basalProfileEdit").hide(0);
				$("#basalList").show(0);
			});
		}else{
			$('#standardPopupYes').bind('click',function() {
				$("#standardPopup").hide(0);
				$("#basalProfileEdit").hide(0);
				$("#basalProfileHome").show(0);
			});
		}
	});	
}
<!-- UPDATE BASAL VALUE -->
function updateBasalEditValue(){
	var basalEditValue = 0;
	for(var i = 1; i <= 24; i++){
		basalEditValue += profileValArr[i-1];
	}
	basalEditValue = parseFloat(Math.round(basalEditValue * 100) / 100).toFixed(2);
	
	$('#basalEditValue').html(basalEditValue);
}

<!-- UPDATE BASAL GRAPH -->
function updateBasalGraph(butWhich){
	var max_val = Math.max.apply(0,profileValArr);
	
	for(var i = 1; i <= 24; i++){
		if(profileValArr[i-1] == 0){
			var margin_top = 0;
		}else{
			var margin_top = Math.round(60 - (60/max_val)*profileValArr[i-1]);
		}
		
		switch(butWhich){
			case 'edit':
				$('#basalEditGraph-'+i).css('margin-top',margin_top);
				break;
			case 'review':
				$('#basalPreviewGraph-'+i).css('margin-top',margin_top);
				break;
			case 'profile':
				$('#basalGraphBar-'+i).css('margin-top',margin_top);
				break;
			
		}
		
	}

}

<!-- RESET GRAPH AND VALUES WHEN CREATING / EDITING BASAL PROFILE -->
function resetBasalEdit(){
	for(var i = 1; i <= 24; i++){
		if(isNewBasalProfile){
			$("#basalEditGraph-"+(i)).attr('class','basalGraphBar basalGraphBarDisabled');
			profileValArr[i-1] = 0;
		}else{
			$("#basalEditGraph-"+(i)).attr('class','basalGraphBar');
		}
	}
	if(isNewBasalProfile){
		$('#insulinBasalEditReview').addClass('promptButtonDisabled');
		$('#insulinBasalEditReview').unbind('click');
		profileValArr[0] = 0.05;
	}else{
		if($('#insulinBasalEditReview').hasClass('promptButtonDisabled')){
			$('#insulinBasalEditReview').toggleClass('promptButtonDisabled');
			$('#insulinBasalEditReview').bind('click',function(){
				$("#basalProfilePreview").show(0);
				$("#basalProfileEdit").hide(0);
				reviewBasalProfile();	
			});
		}
	}
	
	updateBasalEditValue();
	
	
	$('#basalTimeText').html(hours_arr[0]);
	var sliderValue =  profileValArr[0];
	
	changeBasalWheels(Math.floor(sliderValue), Math.floor(((sliderValue % 1).toFixed(2))*100));
	
			
	//$('#editBasalRate').scroller('setValue', [Math.floor(sliderValue), Math.floor(((sliderValue % 1).toFixed(2))*100)], true);
}
<!-- CONFIRM SAVE BASAL PROFILE -->
function confirmSaveBasalProfile(){
	//ANIMATION
	hideKeyboard();
	showConfirm();
	$('#confirmTitle').hide(0);
	
	if(isNewBasalProfile){
		$("#confirmMessage").html(getLanguageString('basal/apply/name/1'));
	}else{
		$("#confirmMessage").html(getLanguageString('basal/apply/edit/1'));
	}
	
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		showKeyboard(getLanguageString('JournalBasalProfileName'));
		hideConfirm();
	});
	
	$("#confirmDetails").addClass('blue');
	$("#confirmDetails").html($('.caption').html()+'<br>'+$('#basalPreviewValue').html()+'  u');
	whichConfirmFunction = 'saveBasalProfile()';
	
}
<!-- SAVE BASAL PROFILE -->
function saveBasalProfile(){
	if(isNewBasalProfile){
		
		var profileIndex = profilesArr.length + 1;
				
		profilesArr[profileIndex-1] = profileValArr; 
		profileNamesArr[profileIndex-1] = $('.caption').html();
		profileBasalCountArr[profileIndex-1] = $('#basalPreviewValue').html();
		
		var basalProfileList = '<div id="existingBasalButton-'+profileIndex+'" class="existingBasal">';
		basalProfileList += '<div class="left med">';
		basalProfileList += '<div class="existingBasalTextTop" id="existingBasalTextTop-'+profileIndex+'"></div>';
		basalProfileList += '<div class="existingBasalTextBot blue" id="existingBasalTextBot-'+profileIndex+'"></div>';
		basalProfileList += '</div>';
		basalProfileList += '<div class="right">';
		basalProfileList += '<div class="existingBasalRate blue" id="existingBasalRate-'+profileIndex+'"></div>';
		basalProfileList += '</div>';
		basalProfileList += '</div>';
		
		$('#basalProfileList').append(basalProfileList);
		$('#existingBasalTextTop-'+profileIndex).html('' + profileNamesArr[profileIndex-1] + '');
		$('#existingBasalRate-'+profileIndex).html('' + profileBasalCountArr[profileIndex-1] + ' u');
		
		$("#existingBasalButton-"+profileIndex).bind('click',function(){
			viewProfile(profileIndex-1);			
		});
	}else{
		var profileIndex = thisProfileIndex + 1;
				
		profilesArr[profileIndex-1] = profileValArr; 
		profileNamesArr[profileIndex-1] = $('.caption').html();
		profileBasalCountArr[profileIndex-1] = $('#basalPreviewValue').html();
		
		$('#existingBasalTextTop-'+profileIndex).html('' + profileNamesArr[profileIndex-1] + '');
		$('#existingBasalRate-'+profileIndex).html('' + profileBasalCountArr[profileIndex-1] + ' u');
	}
	
	$('#basalProfilePreview').hide(0);
	$('#basalList').show(0);
}
<!-- VIEW BASAL PROFILE -->
function viewProfile(butWhich){
	$('#basalList').hide(0);
	$("#basalProfileHome").show(0);
		
	$('#basalProfileHomeName').html('' + profileNamesArr[butWhich] + '');
	$('#basalProfileHomeValue').html('' + profileBasalCountArr[butWhich] + ' '+getLanguageString('units'));
	
	profileValArr = profilesArr[butWhich];
	thisProfileIndex = butWhich;
	if(activeProfileIndex == thisProfileIndex){
		$('#basalEditProfileBttn').hide(0);
		$('#basalDeleteProfileBttn').hide(0);
		$('#insulinBasalProfileHomeActivate').hide(0);	
	}else{
		$('#basalEditProfileBttn').show(0);
		$('#basalDeleteProfileBttn').show(0);
		$('#insulinBasalProfileHomeActivate').show(0);	
	}
	
	updateBasalGraph('profile');
	
}

<!-- REVIEW BASAL PROFILE -->
function reviewBasalProfile(){
	var totalBasalReviewValue = 0;
	
	$('#basalPreviewProfileName').html($("#basalEditProfileName").html());
	$("#insulinBasalProfileNext").show(0);
	$("#insulinBasalPreviewBack").unbind('click');
	$("#insulinBasalPreviewBack").bind('click',function(){
		$("#basalProfilePreview").hide(0);
		$("#basalProfileEdit").show(0);
	});
	
	
	for(var i = 1; i <= 24; i++){
		var basalReviewValue = profileValArr[i-1];
		totalBasalReviewValue += basalReviewValue;
		$('#basalPreviewValue-'+i).html(parseFloat(Math.round(basalReviewValue * 100) / 100).toFixed(2) + ' u \/ hr');
	}
	$('#basalPreviewValue').html(parseFloat(Math.round(totalBasalReviewValue * 100) / 100).toFixed(2));
	toggleBasalBar();
	$("#basalPreviewGraph-1").addClass("basalGraphBarActive");
	updateBasalGraph('review');

}

<!-- COPY BASAL PROFILE -->
function copyBasalProfile(){
	var profileIndex = profilesArr.length + 1;
	var copyProfileIndex = thisProfileIndex + 1;
		
	profilesArr[profileIndex-1] = profilesArr[copyProfileIndex-1]; 
	profileNamesArr[profileIndex-1] = getCopyProfileName(profileNamesArr[copyProfileIndex-1]);
	profileBasalCountArr[profileIndex-1] = profileBasalCountArr[copyProfileIndex-1];
	
	
	var basalProfileList = '<div id="existingBasalButton-'+profileIndex+'" class="existingBasal">';
	basalProfileList += '<div class="left med">';
	basalProfileList += '<div class="existingBasalTextTop" id="existingBasalTextTop-'+profileIndex+'"></div>';
	basalProfileList += '<div class="existingBasalTextBot blue" id="existingBasalTextBot-'+profileIndex+'"></div>';
	basalProfileList += '</div>';
	basalProfileList += '<div class="right">';
	basalProfileList += '<div class="existingBasalRate blue" id="existingBasalRate-'+profileIndex+'"></div>';
	basalProfileList += '</div>';
	basalProfileList += '</div>';
	
	$('#basalProfileList').append(basalProfileList);
	$('#existingBasalTextTop-'+profileIndex).html('' + profileNamesArr[profileIndex-1] + '');
	$('#existingBasalRate-'+profileIndex).html('' + profileBasalCountArr[profileIndex-1] + ' u');
	
	$("#existingBasalButton-"+profileIndex).bind('click',function(){
		viewProfile(profileIndex-1);			
	});
	
	$('#basalProfileHome').hide(0);
	$('#basalList').show(0);
	
}

<!-- CALCULATE APPROPRIATE BASAL PROFILE NAME WHEN COPYING -->
function getCopyProfileName(origProfileName){
	var copyProfileName = '';
	if(origProfileName.length >= 3){
		if(origProfileName[origProfileName.length -2] == '-'){
			var previousCopyIndex = parseInt('' + origProfileName[origProfileName.length -1]);
			if(!isNaN(previousCopyIndex)){
				previousCopyIndex++
				copyProfileName = origProfileName.substr(0,origProfileName.length - 1) + '' + previousCopyIndex;
			}else{
				copyProfileName = origProfileName + '-1';
			}
		}else if(origProfileName[origProfileName.length -3] == '-' && origProfileName.length > 3){
			var previousCopyIndex = parseInt('' + origProfileName[origProfileName.length -2] + origProfileName[origProfileName.length -1]);
			if(!isNaN(previousCopyIndex)){
				previousCopyIndex++
				origProfileName.substr(0,origProfileName.length -2) + '' + previousCopyIndex;
			}else{
				copyProfileName = origProfileName + '-1';
			}
		}else{
			copyProfileName = origProfileName + '-1';
		}
	}else{
		//HAS NOT BEEN COPIED PREVIOUSLY
		copyProfileName = origProfileName + '-1';
	}
	//CHECK IF IT EXISTS
	copyProfileName = checkIfExistsProfileName(copyProfileName);
	return copyProfileName;

}

<!-- CHECK IF BASAL PROFILE NAME ALREADY EXISTS -->
function checkIfExistsProfileName(profileName){
	var altProfileName = profileName;
	
	for(var i=0; i < profileNamesArr.length; i++){
		if(profileName == profileNamesArr[i]){
			altProfileName = getCopyProfileName(profileName);
			break;
			
		}
	}
	
	return altProfileName;
}

<!-- CONFIRM DELETE BASAL PROFILE -->
function confirmDeleteBasalProfile(){
	$('#homepage').hide(0);
	$('#confirmpage').show(0);
	$("#confirmMessage").html(getLanguageString('deletingProfile'));
	
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		$('#homepage').show(0);
		$('#confirmpage').hide(0);
	});
	
	$("#confirmDetails").addClass('blue');
	$("#confirmDetails").html(''+profileNamesArr[thisProfileIndex]+'<br>'+profileBasalCountArr[thisProfileIndex]+'  u');
	whichConfirmFunction = 'deleteBasalProfile()';
}
<!-- DELETE BASAL PROFILE -->
function deleteBasalProfile(){
	var profileIndex = thisProfileIndex + 1;
				
	profilesArr[profileIndex-1] = null; 
	profileNamesArr[profileIndex-1] = null;
	profileBasalCountArr[profileIndex-1] = null;
	
	$('#existingBasalButton-'+profileIndex).hide(0);
	
	$('#basalProfileHome').hide(0);
	$('#basalList').show(0);
}

<!-- TOGGLE BETWEEN COPYING PREVIOUS BASAL VALUE OR EDITING -->
function toggleBasalBarCopy(){
	var activeBasalGraphBar = getBasalProfileEditGraphBar();
	
	if(isBasalBarCopy){
		isBasalBarCopy = false;
		$('#basalEditGraph-'+activeBasalGraphBar).removeClass('basalGraphBarCopy');
		$('#basalEditGraph-'+activeBasalGraphBar).addClass('basalGraphBarActive');
		//CHANGE NEXT BUTTON
		$('#basalTimeNext').removeClass('basalTimeNextCopy');
		$('#basalTimeNext').addClass('basalTimeNext');
		
	}else{
		isBasalBarCopy = true;
		$('#basalEditGraph-'+activeBasalGraphBar).removeClass('basalGraphBarActive');
		$('#basalEditGraph-'+activeBasalGraphBar).addClass('basalGraphBarCopy');
		//CHANGE NEXT BUTTON
		$('#basalTimeNext').removeClass('basalTimeNext');
		$('#basalTimeNext').addClass('basalTimeNextCopy');
	}
}
<!-- CONFIRM ACTIVATE BASAL PROFILE -->
function confirmActivateBasalProfile(){
	showConfirm();
	
	$("#confirmMessage").html(getLanguageString('activateProfile'));
	$("#confirmDetails").html(''+$('#basalProfileHomeName').html()+'<br />'+$('#basalProfileHomeValue').html());
	
	$('#confirmTitle').hide(0);
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	whichConfirmFunction = 'activateBasalProfile()';

}


<!-- SET CURRENT PROFILE AS ACTIVE -->
function activateBasalProfile(){
	activeProfileIndex = thisProfileIndex;
	var profileIndex = activeProfileIndex + 1;
	for(var i = 1; i <= profileNamesArr.length; i++){
		$('#existingBasalTextBot-'+i).html('');
	}
	
	$('#dashInsulinProfileName').html(''+profileNamesArr[profileIndex-1]+'');	
	$('#existingBasalTextBot-'+profileIndex).html(getLanguageString('acivatednotrunning'));
	
	createJournalItemBasalProfile(profileNamesArr[profileIndex-1],profileValArr[profileIndex-1]);
	$('#basalProfileHome').hide(0);
	$('#basalList').show(0);
}

<!-- TOGGLE SELECTED BASAL GRAPH BAR -->
function toggleBasalBar() {
	for (i=1;i<=24;i++) {
		if ($("#basalPreviewGraph-" + i).attr("class") == "basalGraphBar basalGraphBarActive") {
			$("#basalPreviewGraph-" + i).toggleClass("basalGraphBarActive");
		}
	}
}
<!-- GET CURRENT BASAL RATE -->
function getCurrentBasalRate(){
	var currentHour = getCurrentHour();
	if(activeProfileIndex != -1){
		var basalValArr = profilesArr[activeProfileIndex];
		$('#insulinBasalRate').html(basalValArr[currentHour]);
		$('#insulinBasalProfileName').html(parseFloat(profileNamesArr[activeProfileIndex]/20).toFixed(2));
		$('#dashInsulinValue').html(parseFloat(profileNamesArr[activeProfileIndex]/20).toFixed(2));
	}
}
<!-- CONFIRM START TEMPORARY BASAL -->
function confirmStartTempBasal(){
	showConfirm();
	$('#confirmTitle').hide(0);
	var tempBasalDuration = ""+$('#editTempBasalDuration').scroller('getValue')[0] + "hr ";
	if($('#editTempBasalDuration').scroller('getValue')[1] == 0){
		tempBasalDuration += "0"; 
	}
	tempBasalDuration += $('#editTempBasalDuration').scroller('getValue')[1];
	
	var tempBasalAdjust = ""+ $('#editTempBasalAdjust').scroller('getValue')[0]+"%";
	
	$("#confirmMessage").html(getLanguageString('tempbasalstart')+"<br />"+tempBasalDuration+"<br />"+tempBasalAdjust);
	
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();		
	});
	
	whichConfirmFunction = 'startTempBasal()';
}
<!-- START TEMPORARY BASAL -->
function startTempBasal(){
	$('#tempBasal').hide(0);
	$('#insulin').show(0);
	
	var tempBasalDuration = ""+$('#editTempBasalDuration').scroller('getValue')[0] + "hr ";
	if($('#editTempBasalDuration').scroller('getValue')[1] == 0){
		tempBasalDuration += "0"; 
	}
	tempBasalDuration += $('#editTempBasalDuration').scroller('getValue')[1];
	
	var tempBasalAdjust = ""+ $('#editTempBasalAdjust').scroller('getValue')[0]+"%";
	
	createJournalItemTempBasal(tempBasalDuration,tempBasalAdjust);
	
	$('#tempBasalStarted').html(getCurrentTime());
}

