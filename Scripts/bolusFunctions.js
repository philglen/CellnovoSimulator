<!-- GLOBAL VARIABLES -->

<!-- INITIALISE PREDICTED BLOOD GLUCOSE VALUE -->
var bgPredictedValue = 6.2;
<!-- INITIALISE TOTAL RECOMMENDED BOLUS VALUE -->
var totalRecommendedBolus = 0;
<!-- INITIALISE FOOD CARBOHYDRATES VALUE -->
var foodCarbsValue = 0;

<!-- VARIABLES FOR CALCULATING THE BOLUS VALUE -->
var bolusDeliveryType;
var bolusPercentage;
var bolusTimeHours;
var bolusTimeMins;
var bolusAmountPercent;
var bolusAmount40Percent;
var bolusAmount60Percent;
var bolusAmount;

Math.roundBy = function (n, r) {
	return Math.round(n / r) * r
} 

$(window).load(function(){
	<!-- CLICK QUICK ON BOLUS PAGE -->
	$('#bolusQuick').click(function(){
		$('#bolus').hide(0);
		$('#quickBolus').show(0);
		
		var recommendedBolus = parseFloat($('#bolusValue').html());
		
		if(recommendedBolus > 0){
			recommendedBolus = Math.roundBy(recommendedBolus*100,5);
			recommendedBolus = (recommendedBolus/100);
			var bolusTens = Math.floor(recommendedBolus);
			var bolusUnits = ((recommendedBolus - bolusTens).toFixed(2))*100;
			if(recommendedBolus > 20){
				$('#editBolusDelivery1').scroller('setValue',[20,0],true);
			}else{
				$('#editBolusDelivery1').scroller('setValue',[bolusTens,bolusUnits],true);
			}
		}else {
			$('#editBolusDelivery1').scroller('setValue',[0,5],true);
		}
	});
	<!-- CLICK BACK ON QUICK BOLUS PAGE -->
	$('#quickBolusBack').click(function(){
		$('#quickBolus').hide(0);
		calculateBGValueUnits();
		$('#bolus').show(0);
	});	
	<!-- CLICK DELIVER ON QUICK BOLUS PAGE -->
	$('#quickBolusDeliver').click(function(){
		confirmDeliverBolus('1');
	});
	<!-- SELECT A BOLUS OPTION -->
	$('.bolusChecked').click(function(event){
		event.stopPropagation();
		checkBolusOption(this);
	});
	<!-- SELECT A BOLUS DELIVERY TYPE -->
	$('.bolusDeliveryType').click(function(){
		toggleQuickBolusOptions(this);
	});
	<!-- CLICK BLOOD GLUCOSE BOLUS OPTION -->
	$('#bolusBG').bind('click',function(){
		$('#bolus').hide(0);
		$('#bloodglucose').show(0);
		$('#bloodGlucoseLast').trigger('click');
	});
	<!-- CLICK FOOD BOLUS OPTION -->
	$('#bolusFood').bind('click',function(){
		resetFoodOverview();
		$('#bolus').hide(0);
		$('#food').show(0);
	});
	<!-- INITIALISE IMMEDIATE DELIVERY BOLUS TUMBLER -->	
	$(function(){
		$('#editBolusDelivery1').scroller({
			wheels: [ { 'tens': { 0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20' }, 'units': { 0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95' } } ],
			display: 'inline',
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeBolusWheels(scrollerVals);
			}
		});    
	});
	<!-- SET INITIAL VALUE FOR IMMEDIATE DELIVERY BOLUS TUMBLER -->
	$('#editBolusDelivery1').scroller('setValue',[10,0],true);
	
	<!-- INITIALISE EXTENDED DELIVERY BOLUS TUMBLER -->
	$(function(){
		$('#editBolusDelivery2').scroller({
			wheels: [ { 'hours': { 0:'0 hr',1:'1 hr',2:'2 hr',3:'3 hr',4:'4 hr',5:'5 hr',6:'6 hr',7:'7 hr',8:'8 hr' }, 'minutes': { 0:'00 min',30: '30 min' } } ],
			display: 'inline',
			rows: 5,
			width: 115,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});    
	});
	<!-- SET INITIAL VALUE FOR EXTENDED DELIVERY BOLUS TUMBLER -->
	$('#editBolusDelivery2').scroller('setValue',[1,30],true);
	
	<!-- INITIALISE DUAL-PHASE DELIVERY BOLUS TUMBLER -->
	$(function(){
		$('#editBolusDelivery3').scroller({
			wheels: [ { 'percent': { 5:'5%',10:'10%',15:'15%',20:'20%',25:'25%',30:'30%',35:'35%',40:'40%',45:'45%',50:'50%',55:'55%',60:'60%',65:'65%',70:'70%',75:'75%',80:'80%',85:'85%',90:'90%',95:'95%' }, 'time': { 0.30:'0hr 30min',1.00: '1hr 00min',1.30: '1hr 30min',2.00:'2hr 00min',2.30:'2hr 30min',3.00:'3hr 00min',3.30:'3hr 30min',4.00:'4hr 00min' } } ],
			display: 'inline',
			width: 85,
			rows: 5,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});    
	});
	<!-- SET INITIAL VALUE FOR DUAL-PHASE DELIVERY BOLUS TUMBLER -->
	$('#editBolusDelivery3').scroller('setValue',[40,1.30],true);
	<!-- INITIALISE MULTI-PHASE DELIVERY BOLUS TUMBLER -->
	$(function(){
		$('#editBolusDelivery4').scroller({
			wheels: [ { 'percent': { 5:'5%',10:'10%',15:'15%',20:'20%',25:'25%',30:'30%',35:'35%',40:'40%',45:'45%',50:'50%',55:'55%',60:'60%',65:'65%',70:'70%',75:'75%',80:'80%',85:'85%',90:'90%',95:'95%' }, 'time': { 0.30:'0hr 30min',1.00: '1hr 00min',1.30: '1hr 30min',2.00:'2hr 00min',2.30:'2hr 30min',3.00:'3hr 00min',3.30:'3hr 30min',4.00:'4hr 00min',4.30:'4hr 30min',5.00:'5hr 00min',5.30:'5hr 30min',6.00:'6hr 00min',6.30:'6hr 30min',7.00:'7hr 00min',7.30:'7hr 30min',8.00:'8hr 00min' } } ],
			display: 'inline',
			width: 85,
			rows: 5,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});    
	});
	<!-- SET INITIAL VALUE FOR MULTI-PHASE DELIVERY BOLUS TUMBLER -->
	$('#editBolusDelivery4').scroller('setValue',[60,2.30],true);
});
<!-- CHECK BOLUS OPTION -->
function checkBolusOption(elem){
	totalRecommendedBolus = 0;	
	if($('#'+elem.id).hasClass('bolusCheckedActive')){
		$('#'+elem.id).removeClass('bolusCheckedActive');		
	}else{
		$('#'+elem.id).addClass('bolusCheckedActive');
	}
	
	if($('#bolusBGChecked').hasClass('bolusCheckedActive')){
		totalRecommendedBolus = parseFloat(totalRecommendedBolus+calculateBGBolus());
	}
	if($('#bolusFoodChecked').hasClass('bolusCheckedActive')){
		totalRecommendedBolus = parseFloat(totalRecommendedBolus+calculateFoodBolus());
	}
	if($('#bolusRemainingChecked').hasClass('bolusCheckedActive')){
		totalRecommendedBolus = totalRecommendedBolus + bolusAmount;
	}
	
	
	if($('#bolusBGChecked').hasClass('bolusCheckedActive') || $('#bolusFoodChecked').hasClass('bolusCheckedActive')){
		$('#bolusQuick').html(getLanguageString('use'));
	}else{
		$('#bolusQuick').html(getLanguageString('quickBolus'));
	}
	
	totalRecommendedBolus = totalRecommendedBolus.toFixed(2);
	
	$('#bolusValue').html(''+totalRecommendedBolus+'');
}
<!-- TOGGLE BETWEEN BOLUS DELIVERY OPTIONS -->
function toggleQuickBolusOptions(elem){
	var butWhichArr = elem.id.split("bolusPhase");
	var butWhich = butWhichArr[1];
	for(var i=1; i<=4; i++){
		$('#bolusPhase'+i).removeClass('bolusPhase'+i+'Active');
		$('#bolusPhase'+i+'Scroller').hide(0);
	}
	
	switch(butWhich){
		case '1':
			$('#bolusDeliveryTypeText').html(getLanguageString('journalBolusIMMEDIATE'));
			break;
		case '2':
			$('#bolusDeliveryTypeText').html(getLanguageString('journalBolusEXTENDED'));
			break;
		case '3':
			$('#bolusDeliveryTypeText').html(getLanguageString('journalBolusDUALPHASE'));
			break;
		case '4':
			$('#bolusDeliveryTypeText').html(getLanguageString('journalBolusMULTIPHASE'));
			break;
	}
	$('#bolusPhase'+butWhich+'Scroller').show(0);
	$('#quickBolusDeliver').unbind('click');
	$('#quickBolusDeliver').bind('click',function(){
		confirmDeliverBolus(butWhich);
	});
	
	$('#'+elem.id).addClass(elem.id+'Active');
}
<!-- CALCULATE THE BLOOD GLUCOSE VALUE IN UNITS -->
function calculateBGValueUnits(){
	currentHour = getCurrentHour();
	var insulinSensitivityFactor = (1/bgCorrectionValArr[currentHour]);
	var bgValueUnits = parseFloat(bgValue*insulinSensitivityFactor).toFixed(2);
	$('#bolusBGValue').html(''+bgValue+' mmol/l = '+bgValueUnits + ' '+getLanguageString('units').toLowerCase());
}
<!-- CALCULATE BOLUS FROM BLOOD GLUCOSE OPTION -->
function calculateBGBolus(){
	var currentHour = getCurrentHour();
	var insulinSensitivityFactor = (1/bgCorrectionValArr[currentHour]);
	
	var bgBolus = insulinSensitivityFactor*(bgValue - bgPredictedValue);
	return bgBolus;
}
<!-- CALCULATE BOLUS FROM FOOD OPTION -->
function calculateFoodBolus(){
	var currentHour = getCurrentHour();	
	var insulinToCarbRatio = parseFloat($('#editInsulinToCarbUnits').scroller('getValue')[0]) / parseFloat($('#editInsulinToCarbGrams').scroller('getValue')[0]);
	var foodBolus = insulinToCarbRatio*foodCarbsValue;
	
	return foodBolus;
}
<!-- CONFIRM DELIVER BOLUS -->
function confirmDeliverBolus(butWhich){
	showConfirm();
	$('#confirmTitle').show(0);
	$('#confirmTitle').html(getLanguageString('confirm'));
	
	$("#confirmMessage").html(getLanguageString('startBolus'));
	$("#confirmDetails").addClass('blue');
	bolusAmount = parseFloat($('#editBolusDelivery1').scroller('getValue')[0]) + (parseFloat($('#editBolusDelivery1').scroller('getValue')[1]))/100;
	bolusAmount = bolusAmount.toFixed(2);
	switch(butWhich){
		case '1':
			bolusDeliveryType = getLanguageString('journalBolusIMMEDIATE');
			$("#confirmDetails").html(bolusAmount+"u<br />"+getLanguageString('bolus')+": "+bolusDeliveryType);
			break;
		case '2':
			bolusTimeHours = $('#editBolusDelivery2').scroller('getValue')[0];
			bolusTimeMins = $('#editBolusDelivery2').scroller('getValue')[1];
			bolusDeliveryType = getLanguageString('journalBolusEXTENDED');
			$("#confirmDetails").html(bolusAmount+"u<br />"+getLanguageString('bolus')+": "+bolusDeliveryType+'<br />'+bolusTimeHours+'hr '+bolusTimeMins+'min');
			break;
		case '3':
			bolusPercentage = $('#editBolusDelivery3').scroller('getValue')[0];
			var time = $('#editBolusDelivery3').scroller('getValue')[1];
			bolusTimeHours = Math.floor(time);
			bolusTimeMins = Math.round((time - bolusTimeHours)*100);
			bolusDeliveryType = getLanguageString('journalBolusDUALPHASE');
			
			bolusAmountPercent = parseFloat((bolusAmount*bolusPercentage)/100).toFixed(2);
			bolusAmount60Percent = parseFloat(bolusAmount*0.6).toFixed(2);
			
			$("#confirmDetails").html(bolusAmount+"u<br />"+getLanguageString('bolus')+": "+bolusDeliveryType+"<br />"+bolusAmountPercent+"u/"+bolusTimeHours+"hr "+bolusTimeMins+"min/"+bolusAmount60Percent+"u");
			break;
		case '4':
			bolusPercentage = $('#editBolusDelivery4').scroller('getValue')[0];
			var time = $('#editBolusDelivery4').scroller('getValue')[1];
			bolusTimeHours = Math.floor(time);
			bolusTimeMins = Math.round((time - bolusTimeHours)*100);
			bolusDeliveryType = getLanguageString('journalBolusMULTIPHASE');
			
			bolusAmountPercent = parseFloat((bolusAmount*bolusPercentage)/100).toFixed(2);
			bolusAmount40Percent = parseFloat(bolusAmount*0.4).toFixed(2);
			
			$("#confirmDetails").html(bolusAmount+"u<br />"+getLanguageString('bolus')+": "+bolusDeliveryType+"<br />"+bolusAmountPercent+"u/"+bolusAmount40Percent+"u :"+bolusTimeHours+"hr :"+bolusTimeMins+"min");
			
			break;
	}
	
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();		
	});
	
	whichConfirmFunction = 'deliverBolus("'+butWhich+'")';	
}
<!-- DELIVER BOLUS -->
function deliverBolus(butWhich){
	var bolusBGValue = 0;
	var bolusFoodValue = 0;
	
	if($('#bolusBGChecked').hasClass('bolusCheckedActive')){
		bolusBGValue = bgValue;
	}
	if($('#bolusFoodChecked').hasClass('bolusCheckedActive')){
		bolusFoodValue = foodCarbsValue;
	}
	
	$('#bolusOverviewDeliveryValue').html(bolusAmount);
	$('#bolusOverviewDeliveryTime').html(getCurrentTime());
		
	$('#bolusRemainingUnits').html(bolusAmount);	
	$('#bolusRemainingStarted').html(getCurrentTime() + '&nbsp;&nbsp;&nbsp;'+getTodaysDate());
	
	switch(butWhich){
		case '1':
			createJournalItemBolus(bolusAmount,getLanguageString('journalBolusIMMEDIATE'),"",bolusFoodValue,bolusBGValue);
			break;
		case '2':
			createJournalItemBolus(bolusAmount,getLanguageString('journalBolusEXTENDED'),''+bolusTimeHours+'hr '+bolusTimeMins+'min',bolusFoodValue,bolusBGValue);
			break;
		case '3':
			createJournalItemBolus(bolusAmount,getLanguageString('journalBolusDUALPHASE'),""+bolusAmountPercent+"u/"+bolusTimeHours+"hr "+bolusTimeMins+"min/"+bolusAmount60Percent+"u",bolusFoodValue,bolusBGValue);
			break;
		case '4':
			createJournalItemBolus(bolusAmount,getLanguageString('journalBolusMULTIPHASE'),""+bolusAmountPercent+"u/"+bolusAmount40Percent+"u :"+bolusTimeHours+"hr :"+bolusTimeMins+"min",bolusFoodValue,bolusBGValue);
			break;
	}
	
	$('#quickBolus').hide(0);
	$('#insulin').show(0);
}
<!-- RESET BOLUS PAGE -->
function resetBolus(){
	$('.bolusChecked').removeClass('bolusCheckedActive');
	$('#bolusFoodUnits').html('---');
	
	$('#bolusValue').html(0.00);
	$('#bolusPhase1').trigger('click');
	
	$('#editBolusDelivery1').scroller('setValue',[10,0],true);
	$('#editBolusDelivery2').scroller('setValue',[1,30],true);
	$('#editBolusDelivery3').scroller('setValue',[40,1.30],true);
	$('#editBolusDelivery4').scroller('setValue',[60,2.30],true);
}

function changeBolusWheels(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1]);
	
	var maxBolusArr = $('#editMaxBolus').scroller('getValue');
	var maxBolusTens = parseInt(maxBolusArr[0]);
	var maxBolusUnits = parseInt(maxBolusArr[1]);
	
	var bolusWheelsStr = "[{'tens': {0:'0'";
	for(var i = 1; i <= maxBolusTens; i++){
		bolusWheelsStr += ","+i+":'"+i+"'";
	}
	if(scrollerValsTens == maxBolusTens){
		
		if(maxBolusTens == 0){
			bolusWheelsStr += "}, 'units': { 5: '05'";
		
			for(var i = 10; i <= maxBolusUnits; i = i+5){			
				bolusWheelsStr += ","+i+":'"+i+"'";
			}
		}else{
			bolusWheelsStr += "}, 'units': { 0: '00'";
		
			for(var i = 5; i <= maxBolusUnits; i = i+5){			
				bolusWheelsStr += ","+i+":'";
				if(i < 10){
					bolusWheelsStr += "0";
				}
				bolusWheelsStr += ""+i+"'";
			}
		}
		
		bolusWheelsStr += "} } ]";
	}else if(scrollerValsTens == 0){
		bolusWheelsStr += "}, 'units': { 5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95' } } ]";
	}else{		
		bolusWheelsStr += "}, 'units': { 0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95' } } ]";
	}
		
	$('#editBolusDelivery1').scroller('destroy');
	
	$(function(){
		$('#editBolusDelivery1').scroller({
			wheels: eval(bolusWheelsStr),
			display: 'inline',
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeBolusWheels(scrollerVals);
			}
		});    
	});
}
