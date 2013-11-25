<!-- GLOBAL VARIABLES -->

<!-- BOOLEAN FOR COPYING PREVIOUS VALUE IN B.G. CORRECTION GRAPH -->
var isBGCorrectionBarCopy = false;
<!-- BOOLEAN FOR COPYING PREVIOUS VALUE IN INSULTN TO CARB RATIO GRAPH -->
var isInsulinToCarbBarCopy = false;
<!-- ARRAY OF B.G. CORRECTION VALUES -->
var bgCorrectionValArr = new Array();
<!-- TEMPORARY ARRAY OF B.G. CORRECTION VALUES -->
var bgCorrectionTempValArr = new Array();
<!-- TEMPORARY ARRAY OF INULIN TO CARB UNITS VALUES -->
var insulinToCarbTempUnitsArr = new Array();
<!-- ARRAY OF INSULIN TO CARB UNITS VALUES -->
var insulinToCarbUnitsArr = new Array();
<!-- ARRAY OF INSULIN TO CARB GRAMS VALUES -->
var insulinToCarbGramsArr = new Array();
<!-- TEMPORARY ARRAY OF INSULIN TO CARB GRAMS VALUES -->
var insulinToCarbTempGramsArr = new Array();
<!-- ARRAY OF PUMP NAMES -->
var pumpNameArr = new Array();
<!-- BOOLEAN FOR NEW PUMP -->
var isNewPump;
<!-- INDEX OF CURRENT PUMP -->
var thisPumpIndex;
<!-- INDEX OF CURRENTLY ACTIVATED PUMP -->
var activePumpIndex;

$(window).load(function(){
	<!-- CHECK MUTE ALERTS -->
	$('#settingsCheckMuteAlerts').click(function(){
		toggleMuteAlerts();
	});
	<!-- CHECK FLIGHT SAFE MODE -->
	$('#settingsCheckFlightSafeMode').click(function(){
		toggleFlightSafeMode();
	});
	<!-- CLICK PUMP SETTINGS BUTTON ON SETTINGS PAGE -->
	$('#settingPumpBttn').click(function(){
		$('#settings').hide(0);
		$('#pumpSettings').show(0);
	});
	<!-- CLICK BACK BUTTON ON PUMP SETTINGS PAGE -->
	$('#pumpSettingsBack').click(function(){
		$('#pumpSettings').hide(0);
		$('#settings').show(0);
	});
	<!-- CLICK ADD PUMP BUTTON ON PUMP SETTINGS PAGE -->
	$('#pumpSettingsAdd').click(function(){
		$('#pumpSettings').hide(0);
		$('#pumpFound').show(0);
	});
	<!-- CLICK BACK BUTTON ON PUMP FOUND PAGE -->
	$('#pumpFoundBack').click(function(){
		$('#pumpFound').hide(0);
		$('#pumpSettings').show(0);	
	});
	<!-- CLICK SAVE BUTTONS ON PUMP FOUND PAGE -->
	$('#pumpFoundSave').click(function(){
		showKeyboard(getLanguageString('pump_name_label'));
		resetKeyboard();
		isNewPump = true;
		
		$('#keyboardNext').bind('click',function(){
			var caption = trim($('.caption').html());
	
			if(caption == ''){
				showKeyboardError(getLanguageString('pump_name_letters')+'<br />'+getLanguageString('basal/popup/wrongname/text'));
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
					confirmSavePump();
				}
			}			
			
		});	
	});
	<!-- CLICK EDIT NAME BUTTONS ON PUMP SETTINGS PAGE -->
	$('#pumpNameEditBttn').click(function(){
		resetKeyboard();
		$('.caption').html(''+pumpNameArr[thisPumpIndex]+'');
		showKeyboard(getLanguageString('pump_name_label'));
		
		
		$('#keyboardNext').bind('click',function(){
			var caption = trim($('.caption').html());
	
			if(caption == ''){
				showKeyboardError(getLanguageString('pump_name_letters')+'<br />'+getLanguageString('basal/popup/wrongname/text'));
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
					savePump();
				}
			}
		});
	});
	<!-- CLICK REMOVE BUTTON ON PUMP SETTINGS PAGE -->
	$('#pumpRemoveBttn').click(function(){
		//CONFIRM DELETE PUMP
	});
	<!-- CLICK BACK BUTTON ON PUMP DETAIL PAGE -->
	$('#pumpDetailBack').click(function(){
		$('#pumpDetail').hide(0);
		$('#pumpSettings').show(0);
	});
	<!-- CLICK ACTIVATE BUTTON ON PUMP DETAIL PAGE -->
	$('#pumpDetailActivate').click(function(){
		confirmActivatePump();
	});
	<!-- CLICK HANDSET SETTINGS BUTTON ON SETTINGS PAGE -->
	$('#settingsHandsetBttn').click(function(){
		$('#settings').hide(0);
		$('#handsetSettings').show(0);
	});
	<!-- CLICK BACK BUTTON ON HANDSET SETTINGS PAGE -->
	$('#handsetSettingsBack').click(function(){
		$('#handsetSettings').hide(0);
		$('#settings').show(0);
	});
	<!-- CLICK APPLICATION SETTINGS BUTTON ON SETTINGS PAGE -->
	$('#settingsApplicationBttn').click(function(){
		$('#settings').hide(0);
		$('#applicationSettings').show(0);
	});
	<!-- CLICK BACK BUTTON ON APPLICATION SETTINGS PAGE -->
	$('#applicationSettingsBack').click(function(){
		$('#applicationSettings').hide(0);
		$('#settings').show(0);
	});
	<!-- CLICK BIRGHTNESS BUTTON ON HANDSET SETTINGS PAGE -->
	$('#handsetBrightnessBttn').click(function(){
		$('#handsetSettings').hide(0);
		$('#brightness').show(0);
	});
	<!-- CLICK BACK BUTTON ON BRIGHTNESS PAGE -->
	$('#brightnessBack').click(function(){
		$('#brightness').hide(0);
		$('#handsetSettings').show(0);
	});
	<!-- CLICK SAVE BUTTON ON BRIGHTNESS PAGE -->
	$('#brightnessSave').click(function(){
		saveBrightness();
	});
	<!-- CLICK DATE/TIME BUTTON ON HANDSET SETTINGS PAGE -->
	$('#handsetDateTimeBttn').click(function(){
		$('#handsetSettings').hide(0);
		$('#dateTime').show(0);
		var now = new Date();
		createDateWheels([now.getDate(),dateFormat(now,"mmm"),now.getFullYear()]);
		$('#editDate').scroller('setValue',[now.getDate(),dateFormat(now,"mmm"),now.getFullYear()],true);
	});
	<!-- CLICK BACK BUTTON ON HANDSET SETTINGS PAGE -->
	$('#dateTimeBack').click(function(){
		$('#dateTime').hide(0);
		$('#handsetSettings').show(0);
	});
	<!-- CLICK TIME ON DATE/TIME PAGE -->
	$('#dateTimeEditTime').click(function(){
		toggleDateTime();
	});
	<!-- CLICK HANDSET NAME BUTTON ON HANDSET SETTINGS PAGE -->
	$('#handsetNameBttn').click(function(){
		resetKeyboard();
		$('.caption').html($('#handsetNameValue').html());
		showKeyboard(getLanguageString('handsetName_text'));
		$('#keyboardNext').bind('click',function(){
			var caption = trim($('.caption').html());
	
			if(caption == ''){
				showKeyboardError(getLanguageString('hanset_name_letters')+'<br />'+getLanguageString('basal/popup/wrongname/text'));
			}else{				
				saveHandsetName();
			}
			
			
		});
	});
		
	<!-- CLICK LANGUAGE BUTTON ON HANDSET SETTINGS PAGE -->
	$('#handsetLanguageBttn').click(function(){
		$('#handsetSettings').hide(0);
		$('#language').show(0);
	});
	<!-- CLICK BACK BUTTON ON LANGUAGE PAGE -->
	$('#languageBack').click(function(){
		$('#language').hide(0);
		$('#handsetSettings').show(0);
	});
		
	<!-- CLICK INFORMATION BUTTON ON HANDSET SETTINGS PAGE -->
	$('#handsetInformationBttn').click(function(){
		$('#handsetSettings').hide(0);
		$('#information').show(0);
	});
	<!-- CLICK BACK BUTTON ON INFORMATION PAGE -->
	$('#informationBack').click(function(){
		$('#information').hide(0);
		$('#handsetSettings').show(0);
	});
	<!-- CLICK BLOOD GLUCOSE BUTTON ON APPLICATION SETTINGS PAGE -->
	$('#applicationBGBttn').click(function(){
		$('#applicationSettings').hide(0);
		$('#applicationBG').show(0);
	});
	
	$('#applicationBGBack').click(function(){
		$('#applicationBG').hide(0);
		$('#applicationSettings').show(0);
	});
	
	$('#applicationInsulinBttn').click(function(){
		$('#applicationSettings').hide(0);
		$('#applicationInsulin').show(0);
	});
	
	$('#applicationInsulinBack').click(function(){
		$('#applicationInsulin').hide(0);
		$('#applicationSettings').show(0);
		
	});
	
	$('#applicationActivityBttn').click(function(){
		$('#applicationSettings').hide(0);
		$('#applicationActivity').show(0);
	});
	
	$('#applicationActivityBack').click(function(){
		$('#applicationActivity').hide(0);
		$('#applicationSettings').show(0);
	});
	
	$('#applicationTargetBGBttn').click(function(){
		$('#applicationBG').hide(0);
		$('#targetBGRange').show(0);
	});
	
	$('#targetBGRangeEditHigh').click(function(){
		toggleTargetBGRange();
	});
	
	$('#targetBGRangeBack').click(function(){
		$('#targetBGRange').hide(0);
		$('#applicationBG').show(0);
	});
	
	$('#targetBGRangeSave').click(function(){
		confirmSaveTargetBGRange();
	});
	
	$('#applicationHyperglycaemiaBttn').click(function(){
		$('#applicationBG').hide(0);
		$('#hyperglycaemiaLimit').show(0);
	});
		
	$('#hyperglycaemiaLimitBack').click(function(){
		$('#hyperglycaemiaLimit').hide(0);		
		$('#applicationBG').show(0);
	});
	
	$('#hyperglycaemiaLimitSave').click(function(){
		confirmSaveHyperglycaemiaLimit();
	});
	
	$('#applicationHypoglycaemiaBttn').click(function(){
		$('#applicationBG').hide(0);
		$('#hypoglycaemiaLimit').show(0);
	});
	
	$('#hypoglycaemiaLimitBack').click(function(){
		$('#hypoglycaemiaLimit').hide(0);		
		$('#applicationBG').show(0);
	});
	
	$('#hypoglycaemiaLimitSave').click(function(){
		confirmSaveHypoglycaemiaLimit();
	});
	
	$('#applicationBGReadingValidForBttn').click(function(){
		$('#applicationBG').hide(0);
		$('#bgReadingValidFor').show(0);
	});
	
	$('#bgReadingValidForBack').click(function(){
		$('#bgReadingValidFor').hide(0);
		$('#applicationBG').show(0);
	});
	
	$('#bgReadingValidForSave').click(function(){
		confirmSaveBGReadingValidFor();
	});
	
	
	$('#bgCorrectionRatioBttn').click(function(){
		$('#applicationInsulin').hide(0);
		$('#bgCorrectionRatio').show(0);
		$('.basalGraphBar').removeClass('basalGraphBarActive');
		$('.basalGraphBar').removeClass('basalGraphBarCopy');
		$('#bgCorrectionGraph-1').addClass('basalGraphBarActive');
		bgCorrectionTempValArr = bgCorrectionValArr;
	});
	
	$('#bgCorrectionRatioBack').click(function(){
		$('#bgCorrectionRatio').hide(0);
		$('#applicationInsulin').show(0);
	});
	
	$('#bgCorrectionRatioSave').click(function(){
		confirmSaveBGCorrectionRatio();
	});
	
	$('#insulinToCarbRatioBttn').click(function(){		
		$('#applicationInsulin').hide(0);
		$('#insulinToCarbRatio').show(0);				
		$('.basalGraphBar').removeClass('basalGraphBarActive');
		$('.basalGraphBar').removeClass('basalGraphBarCopy');
		$('#insulinToCarbGraph-1').addClass('basalGraphBarActive');
		insulinToCarbTempGramsArr = insulinToCarbGramsArr;
		insulinToCarbTempUnitsArr = insulinToCarbUnitsArr;
	});
	
	$('#insulinToCarbRatioBack').click(function(){
		$('#insulinToCarbRatio').hide(0);		
		$('#applicationInsulin').show(0);
	});
	
	$('#insulinToCarbRatioSave').click(function(){
		confirmSaveInsulinToCarbRatio();
	});
	
	
	$('#maxBasalRateBttn').click(function(){		
		$('#applicationInsulin').hide(0);
		$('#maxBasalRate').show(0);
	});
	
	$('#maxBasalRateBack').click(function(){
		$('#maxBasalRate').hide(0);		
		$('#applicationInsulin').show(0);
	});
	
	$('#maxBasalRateSave').click(function(){
		confirmSaveMaxBasalRate();
	});
	
	$('#maxBolusBttn').click(function(){
		$('#applicationInsulin').hide(0);
		$('#maxBolus').show(0);
	});
	
	$('#maxBolusBack').click(function(){
		$('#maxBolus').hide(0);
		$('#applicationInsulin').show(0);
	});
	
	$('#maxBolusSave').click(function(){
		confirmSaveMaxBolus();
	});
	
	$('#timeToTargetBttn').click(function(){
		$('#applicationInsulin').hide(0);
		$('#timeToTarget').show(0);
	});
	
	$('#timeToTargetBack').click(function(){
		$('#timeToTarget').hide(0);
		$('#applicationInsulin').show(0);
	});
		
	$('#timeToTargetSave').click(function(){
		confirmSaveTimeToTarget();
	});
	
	$('#lowReservoirAlertBttn').click(function(){
		$('#applicationInsulin').hide(0);
		$('#lowReservoirAlert').show(0);
	});
	
	$('#lowReservoirAlertBack').click(function(){
		$('#lowReservoirAlert').hide(0);
		$('#applicationInsulin').show(0);
	});
	
	$('#lowReservoirAlertSave').click(function(){
		confirmSaveLowReservoirAlert();
	});
	
	$('#targetActivityScoreBttn').click(function(){
		$('#targetActivityScore').show(0);
		$('#applicationActivity').hide(0);
	});
	
	$('#targetActivityScoreBack').click(function(){
		$('#applicationActivity').show(0);
		$('#targetActivityScore').hide(0);
	});
	
	$('#targetActivityScoreSave').click(function(){
		var targetScoreArr = $('#editTargetScore').scroller('getValue');
		var targetScore = (parseFloat(targetScoreArr[0])*100) + (parseFloat(targetScoreArr[1])*10) + parseFloat(targetScoreArr[2]);
		$('#activityTargetScoreValue').html(''+targetScore+'');
		$('#dashActivityTarget').html(''+targetScore+'');
		$('#targetScoreValue').html(''+targetScore+'');
		
		$('#applicationActivity').hide(0);
		$('#targetActivityScore').show(0);
		
	});
	
	<!-- CLICK PREVIOUS HOUR IN BG CORRECTION GRAPH -->
	$('#bgCorrectionTimePrev').click(function(){
		var activeGraphBar = getBGCorrectionGraphBar();
		if(activeGraphBar != 1){
			$('#bgCorrectionGraph-'+activeGraphBar).attr('class','basalGraphBar');
			if(isBGCorrectionBarCopy){
				$('#bgCorrectionGraph-'+(activeGraphBar - 1)).attr('class','basalGraphBar basalGraphBarCopy');
			}else{
				$('#bgCorrectionGraph-'+(activeGraphBar - 1)).attr('class','basalGraphBar basalGraphBarActive');
			}
			$('#bgCorrectionTimeText').html(hours_arr[activeGraphBar - 2]);
			var sliderValue =  bgCorrectionTempValArr[activeGraphBar];
				
			$('#editBGCorrectionRatio').scroller('setValue',[sliderValue],true);
			$('#bgCorrectionValue').html(''+parseFloat(sliderValue).toFixed(1)+'');
			updateBGCorrectionGraph();
		}
	});
	
	<!-- CLICK NEXT HOUR IN BG CORRECTION GRAPH -->
	$('#bgCorrectionTimeNext').click(function(){
		var activeGraphBar = getBGCorrectionGraphBar();
		
		if(isBGCorrectionBarCopy){
			bgCorrectionTempValArr[activeGraphBar] = bgCorrectionTempValArr[activeGraphBar - 1];
		}
		
		if(activeGraphBar != 24){
			$('#bgCorrectionGraph-'+ activeGraphBar).attr('class','basalGraphBar');
			
			if(isBGCorrectionBarCopy){
				$('#bgCorrectionGraph-'+(activeGraphBar + 1)).attr('class','basalGraphBar basalGraphBarCopy');
			}else{
				$('#bgCorrectionGraph-'+(activeGraphBar + 1)).attr('class','basalGraphBar basalGraphBarActive');
			}
			var sliderValue =  bgCorrectionTempValArr[activeGraphBar];
					
			$('#bgCorrectionTimeText').html(hours_arr[activeGraphBar]);
			$('#editBGCorrectionRatio').scroller('setValue',[sliderValue],true);
			$('#bgCorrectionValue').html(''+parseFloat(sliderValue).toFixed(1)+'');
			updateBGCorrectionGraph();
		}
	});
	
	$('.clickableBGCorrectionGraphBar').click(function(){
		toggleBGCorrectionBarCopy();
	});
	
	
	<!-- CLICK PREVIOUS HOUR IN INSULIN TO CARB GRAPH -->
	$('#insulinToCarbTimePrev').click(function(){
		var activeGraphBar = getInsulinToCarbGraphBar();
		if(activeGraphBar != 1){
			$('#insulinToCarbGraph-'+activeGraphBar).attr('class','basalGraphBar');
			if(isInsulinToCarbBarCopy){
				$('#insulinToCarbGraph-'+(activeGraphBar - 1)).attr('class','basalGraphBar basalGraphBarCopy');
			}else{
				$('#insulinToCarbGraph-'+(activeGraphBar - 1)).attr('class','basalGraphBar basalGraphBarActive');
			}
			$('#insulinToCarbTimeText').html(hours_arr[activeGraphBar - 2]);
			var sliderValueUnits =  insulinToCarbUnitslArr[activeGraphBar];
			var sliderValueGrams =  insulinToCarbGramslArr[activeGraphBar];	
			$('#editInsulinToCarbUnits').scroller('setValue',[sliderValueUnits],true);
			$('#editInsulinToCarbGrams').scroller('setValue',[sliderValueGrams],true);
			updateInsulinToCarbGraph();
		}
	});
	
	<!-- CLICK NEXT HOUR IN INSULIN TO CARB GRAPH -->
	$('#insulinToCarbTimeNext').click(function(){
		var activeGraphBar = getInsulinToCarbGraphBar();
		
		if(isInsulinToCarbBarCopy){
			insulinToCarbTempGramsArr[activeGraphBar] = insulinToCarbTempGramsArr[activeGraphBar - 1];
			insulinToCarbTempUnitsArr[activeGraphBar] = insulinToCarbTempUnitsArr[activeGraphBar - 1];
		}
		
		if(activeGraphBar != 24){
			$('#insulinToCarbGraph-'+ activeGraphBar).attr('class','basalGraphBar');
			
			if(isInsulinToCarbBarCopy){
				$('#insulinToCarbGraph-'+(activeGraphBar + 1)).attr('class','basalGraphBar basalGraphBarCopy');
			}else{
				$('#insulinToCarbGraph-'+(activeGraphBar + 1)).attr('class','basalGraphBar basalGraphBarActive');
			}
								
			$('#insulinToCarbTimeText').html(hours_arr[activeGraphBar]);
			var sliderValueUnits =  insulinToCarbTempUnitsArr[activeGraphBar];
			var sliderValueGrams =  insulinToCarbTempGramsArr[activeGraphBar];	
			$('#editInsulinToCarbUnits').scroller('setValue',[sliderValueUnits],true);
			$('#editInsulinToCarbGrams').scroller('setValue',[sliderValueGrams],true);
			updateInsulinToCarbGraph();
		}
	});
	
	$('.clickableInsulinToCarbGraphBar').click(function(){
		toggleInsulinToCarbBarCopy();
	});
	<!-- INITIALISE EDIT TIME SCROLLER -->
	$(function(){
		$('#editTime').scroller({
			wheels: [ { 'hours': { 0:'00',1:'01',2:'02',3:'03',4:'04',5:'05',6:'06',7:'07',8:'08',9:'09',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23'}, 'minutes': {0:'00',1:'01',2:'02',3:'03',4:'04',5:'05',6:'06',7:'07',8:'08',9:'09',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33',34:'34',35:'35',36:'36',37:'37',38:'38',39:'39',40:'40',41:'41',42:'42',43:'43',44:'44',45:'45',46:'46',47:'47',48:'48',49:'49',50:'50',51:'51',52:'52',53:'53',54:'54',55:'55',56:'56',57:'57',58:'58',59:'59'} } ],
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});		  
	});
	<!-- INITIALISE EDIT BRIGHTNESS SCROLLER -->
	
	$(function(){
		$('#editBrightness').scroller({
			wheels: [ { 'percent': {5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95',100: '100' } } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT BRIGHTNESS SCROLLER -->
	$('#editBrightness').scroller('setValue', [50], true);
	<!-- INITIALISE EDIT TARGET BG - LOW SCROLLER -->
	$(function(){
		$('#editTargetBGLow').scroller({
			wheels: [ { 'tens': {3:'3',4:'4',5:'5',6:'6',7:'7'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ],
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeTargetBGLowWheels(scrollerVals);
			}
		});		  
	});
	<!-- SET INITIAL VALUE FOR EDIT TARGET BG - LOW SCROLLER -->
	$('#editTargetBGLow').scroller('setValue',[4,5],true);
	<!-- INITIALISE EDIT TARGET BG - HIGH SCROLLER -->
	$(function(){
		$('#editTargetBGHigh').scroller({
			wheels: [ { 'tens': {4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ],
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeTargetBGHighWheels(scrollerVals);
			}
		});		  
	});
	<!-- SET INITIAL VALUE FOR EDIT TARGET BG - HIGH SCROLLER -->
	$('#editTargetBGHigh').scroller('setValue',[8,0],true);
	<!-- INITIALISE EDIT HYPERGLYCAEMIA SCROLLER -->
	$(function(){
		$('#editHyperglycaemia').scroller({
			wheels: [ { 'tens': {9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ],
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeHyperglycaemiaWheels(scrollerVals);
			}
		});		  
	});
	<!-- SET INITIAL VALUE FOR EDIT HYPERGLYCAEMIA SCROLLER -->
	$('#editHyperglycaemia').scroller('setValue',[14,0],true);
	<!-- INITIALISE EDIT HYPOGLYCAEMIA SCROLLER -->
	$(function(){
		$('#editHypoglycaemia').scroller({
			wheels: [ { 'tens': {2:'2',3:'3',4:'4',5:'5'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ],
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeHypoglycaemiaWheels(scrollerVals);
			}
		});		  
	});
	<!-- SET INITIAL VALUE FOR EDIT HYPOGLYCAEMIA SCROLLER -->
	$('#editHypoglycaemia').scroller('setValue',[3,4],true);
	<!-- INITIALISE EDIT BG READING VALID FOR SCROLLER -->
	$(function(){
		$('#editBGReadingValidFor').scroller({
			wheels: [ { 'percent': {5: '5', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30' } } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});
	});
	<!-- SET INITIAL VALUE FOR BG READING VALID FOR SCROLLER -->
	$('#editBGReadingValidFor').scroller('setValue',[15],true);
	<!-- INITIALISE EDIT MAX BASAL RATE SCROLLER -->
	$(function(){
		$('#editMaxBasalRate').scroller({
			wheels: [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5'}, 'units': {0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95'} } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeMaxBasalWheels(scrollerVals);
			}
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT MAX BASAL RATE SCROLLER -->
	$('#editMaxBasalRate').scroller('setValue',[1,50],true);
	<!-- INITIALISE EDIT MAX BOLUS SCROLLER -->
	$(function(){
		$('#editMaxBolus').scroller({
			wheels: [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30'}, 'units': {0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95'} } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeMaxBolusWheels(scrollerVals);
			}
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT MAX BOLUS SCROLLER -->
	$('#editMaxBolus').scroller('setValue',[10,0],true);
	<!-- INITIALISE EDIT TIME TO TARGET SCROLLER -->
	$(function(){
		$('#editTimeToTarget').scroller({
			wheels: [ { 'minutes': {90:'90 min',120:'120 min',150:'150 min',180:'180 min',210:'210 min',240:'240 min',270:'270 min',300:'300 min',330:'330 min',360:'360 min',390:'390 min',420:'420 min',450:'450 min',480:'480 min'} } ],
			display: 'inline',			
			rows: 5,
			width: 168,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT TIME TO TARGET SCROLLER -->
	$('#editTimeToTarget').scroller('setValue',[210],true);
	<!-- INITIALISE EDIT LOW RESERVOIR ALERT SCROLLER -->	
	$(function(){
		$('#editLowReservoirAlert').scroller({
			wheels: [ { 'percent': {5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33',34:'34',35:'35',36:'36',37:'37',38:'38',39:'39',40:'40',41:'41',42:'42',43:'43',44:'44',45:'45',46:'46',47:'47',48:'48',49:'49',50:'50' } } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT LOW RESERVOIR ALERT SCROLLER -->
	$('#editLowReservoirAlert').scroller('setValue',[20],true);
	
	<!-- INITIALISE EDIT BG CORRECTION RATIO SCROLLER -->
	$(function(){
		$('#editBGCorrectionRatio').scroller({
			wheels: [ { 'bg': {0.1:'0.1',0.2:'0.2',0.3:'0.3',0.4:'0.4',0.5:'0.5',0.6:'0.6',0.7:'0.7',0.8:'0.8',0.9:'0.9',1:'1',1.1:'1.1',1.2:'1.2',1.3:'1.3',1.4:'1.4',1.5:'1.5',1.6:'1.6',1.7:'1.7',1.8:'1.8',1.9:'1.9',2:'2',2.1:'2.1',2.2:'2.2',2.3:'2.3',2.4:'2.4',2.5:'2.5',2.6:'2.6',2.7:'2.7',2.8:'2.8',2.9:'2.9',3:'3',3.1:'3.1',3.2:'3.2',3.3:'3.3',3.4:'3.4',3.5:'3.5',3.6:'3.6',3.7:'3.7',3.8:'3.8',3.9:'3.9',4:'4',4.1:'4.1',4.2:'4.2',4.3:'4.3',4.4:'4.4',4.5:'4.5',4.6:'4.6',4.7:'4.7',4.8:'4.8',4.9:'4.9',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33',34:'34',35:'35',36:'36',37:'37',38:'38',39:'39',40:'40',41:'41',42:'42',43:'43',44:'44',45:'45',46:'46',47:'47',48:'48',49:'49',50:'50'} } ],
			display: 'inline',			
			rows: 5,
			width: 168,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				calculateBGCorrectionValue(scrollerVals);
			}
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT BG CORRECTION RATIO SCROLLER -->
	$('#editBGCorrectionRatio').scroller('setValue',[3],true);
	<!-- INITIALISE EDIT INSULIN TO CARB UNITS SCROLLER -->
	$(function(){
		$('#editInsulinToCarbUnits').scroller({
			wheels: [ { 'units': {0.1:'0.1',0.2:'0.2',0.3:'0.3',0.4:'0.4',0.5:'0.5',0.6:'0.6',0.7:'0.7',0.8:'0.8',0.9:'0.9',1.0:'1.0',1.1:'1.1',1.2:'1.2',1.3:'1.3',1.4:'1.4',1.5:'1.5',1.6:'1.6',1.7:'1.7',1.8:'1.8',1.9:'1.9',2.0:'2.0',2.1:'2.1',2.2:'2.2',2.3:'2.3',2.4:'2.4',2.5:'2.5',2.6:'2.6',2.7:'2.7',2.8:'2.8',2.9:'2.9',3.0:'3.0',3.1:'3.1',3.2:'3.2',3.3:'3.3',3.4:'3.4',3.5:'3.5',3.6:'3.6',3.7:'3.7',3.8:'3.8',3.9:'3.9',4.0:'4.0',4.1:'4.1',4.2:'4.2',4.3:'4.3',4.4:'4.4',4.5:'4.5',4.6:'4.6',4.7:'4.7',4.8:'4.8',4.9:'4.9',5.0:'5.0',5.1:'5.1',5.2:'5.2',5.3:'5.3',5.4:'5.4',5.5:'5.5',5.6:'5.6',5.7:'5.7',5.8:'5.8',5.9:'5.9',6.0:'6.0',6.1:'6.1',6.2:'6.2',6.3:'6.3',6.4:'6.4',6.5:'6.5',6.6:'6.6',6.7:'6.7',6.8:'6.8',6.9:'6.9',7.0:'7.0',7.1:'7.1',7.2:'7.2',7.3:'7.3',7.4:'7.4',7.5:'7.5',7.6:'7.6',7.7:'7.7',7.8:'7.8',7.9:'7.9',8.0:'8.0',8.1:'8.1',8.2:'8.2',8.3:'8.3',8.4:'8.4',8.5:'8.5',8.6:'8.6',8.7:'8.7',8.8:'8.8',8.9:'8.9',9.0:'9.0',9.1:'9.1',9.2:'9.2',9.3:'9.3',9.4:'9.4',9.5:'9.5',9.6:'9.6',9.7:'9.7',9.8:'9.8',9.9:'9.9',10.0:'10.0'} } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {				
				scrollerVals = inst.temp;
				calculateInsulinToCarbUnitsValue(scrollerVals);
			}
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT INSULIN TO CARB UNITS SCROLLER -->
	$('#editInsulinToCarbUnits').scroller('setValue',[1.0],true);
	<!-- INSULIN EDIT INSULIN TO CARB GRAMS SCROLLER -->
	$(function(){
		$('#editInsulinToCarbGrams').scroller({
			wheels: [ { 'grams': {0.1:'0.1',0.2:'0.2',0.3:'0.3',0.4:'0.4',0.5:'0.5',0.6:'0.6',0.7:'0.7',0.8:'0.8',0.9:'0.9',1.0:'1.0',1.1:'1.1',1.2:'1.2',1.3:'1.3',1.4:'1.4',1.5:'1.5',1.6:'1.6',1.7:'1.7',1.8:'1.8',1.9:'1.9',2.0:'2.0',2.1:'2.1',2.2:'2.2',2.3:'2.3',2.4:'2.4',2.5:'2.5',2.6:'2.6',2.7:'2.7',2.8:'2.8',2.9:'2.9',3.0:'3.0',3.1:'3.1',3.2:'3.2',3.3:'3.3',3.4:'3.4',3.5:'3.5',3.6:'3.6',3.7:'3.7',3.8:'3.8',3.9:'3.9',4.0:'4.0',4.1:'4.1',4.2:'4.2',4.3:'4.3',4.4:'4.4',4.5:'4.5',4.6:'4.6',4.7:'4.7',4.8:'4.8',4.9:'4.9',5.0:'5.0',5.1:'5.1',5.2:'5.2',5.3:'5.3',5.4:'5.4',5.5:'5.5',5.6:'5.6',5.7:'5.7',5.8:'5.8',5.9:'5.9',6.0:'6.0',6.1:'6.1',6.2:'6.2',6.3:'6.3',6.4:'6.4',6.5:'6.5',6.6:'6.6',6.7:'6.7',6.8:'6.8',6.9:'6.9',7.0:'7.0',7.1:'7.1',7.2:'7.2',7.3:'7.3',7.4:'7.4',7.5:'7.5',7.6:'7.6',7.7:'7.7',7.8:'7.8',7.9:'7.9',8.0:'8.0',8.1:'8.1',8.2:'8.2',8.3:'8.3',8.4:'8.4',8.5:'8.5',8.6:'8.6',8.7:'8.7',8.8:'8.8',8.9:'8.9',9.0:'9.0',9.1:'9.1',9.2:'9.2',9.3:'9.3',9.4:'9.4',9.5:'9.5',9.6:'9.6',9.7:'9.7',9.8:'9.8',9.9:'9.9',10.0:'10.0',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33',34:'34',35:'35',36:'36',37:'37',38:'38',39:'39',40:'40',41:'41',42:'42',43:'43',44:'44',45:'45',46:'46',47:'47',48:'48',49:'49',50:'50',51:'51',52:'52',53:'53',54:'54',55:'55',56:'56',57:'57',58:'58',59:'59',60:'60',61:'61',62:'62',63:'63',64:'64',65:'65',66:'66',67:'67',68:'68',69:'69',70:'70',71:'71',72:'72',73:'73',74:'74',75:'75',76:'76',77:'77',78:'78',79:'79',80:'80',81:'81',82:'82',83:'83',84:'84',85:'85',86:'86',87:'87',88:'88',89:'89',90:'90',91:'91',92:'92',93:'93',94:'94',95:'95',96:'96',97:'97',98:'98',99:'99',100:'100',101:'101',102:'102',103:'103',104:'104',105:'105',106:'106',107:'107',108:'108',109:'109',110:'110',111:'111',112:'112',113:'113',114:'114',115:'115',116:'116',117:'117',118:'118',119:'119',120:'120'} } ],
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				calculateInsulinToCarbGramsValue(scrollerVals);
			}
		});
	});
	<!-- SET INITIAL VALUE FOR EDIT INSULIN TO CARB GRAMS SCROLLER -->
	$('#editInsulinToCarbGrams').scroller('setValue',[10.0],true);
	<!-- INITIALISE EDIT TARGET SCORE SCROLLER -->
	$(function(){
		$('#editTargetScore').scroller({
			wheels:[ { 'hundreds': {0:'0',1:'1',2:'2'},'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'},'units': {1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ],
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeTargetScoreWheels(scrollerVals);
			}
		});  
	});
	<!-- SET INITIAL VALUE FOR EDIT TARGET SCORE SCROLLER -->
	$('#editTargetScore').scroller('setValue',[0,0,1],true);
	
	
	
	for(var i=0; i<24;i++){		 
		bgCorrectionValArr[i] = 3;		
		insulinToCarbUnitsArr[i] = 1.0;
		insulinToCarbGramsArr[i] = 10.0;
	}
	
	
});
<!-- TOGGLE BETWEEN MUTE ALERTS ON/OFF ON SETTINGS PAGE -->
function toggleMuteAlerts(){
	if($('#settingsCheckMuteAlerts').hasClass('settingsCheckSelectedActive')){
		$('#settingsCheckMuteAlerts').removeClass('settingsCheckSelectedActive');
		$('#muteAlerts').hide(0);
	}else{		
		$('#settingsCheckMuteAlerts').addClass('settingsCheckSelectedActive');
		$('#muteAlerts').show(0);
	}
}
<!-- TOGGLE BETWEEN FLIGHT SAFE MODE ON/OFF ON SETTINGS PAGE -->
function toggleFlightSafeMode(){
	if($('#settingsCheckFlightSafeMode').hasClass('settingsCheckSelectedActive')){
		$('#settingsCheckFlightSafeMode').removeClass('settingsCheckSelectedActive');
		$('#flightMode').hide(0);
	}else{		
		$('#settingsCheckFlightSafeMode').addClass('settingsCheckSelectedActive');
		$('#flightMode').show(0);
	}
}
<!-- TOGGLE BETWEEN DATE AND TIME ON HANDSET SETTINGS PAGE -->
function toggleDateTime(){
	if($('#dateTimeEditDate').hasClass('greenPromptButton')){
		$('#dateTimeEditDate').removeClass('greenPromptButton');
		$('#dateTimeEditTime').addClass('greenPromptButton');
		$('#editHandsetDate').hide(0);
		$('#editHandsetTime').show(0);
		
		$('#dateTimeEditTime').unbind('click');
		$('#dateTimeEditDate').bind('click',function(){
			toggleDateTime();
		});
		//SHOW TIME
		var now = new Date(); 
		$('#editTime').scroller('setValue', [now.getHours(),now.getMinutes()], true);
		
		
	}else{
		$('#dateTimeEditDate').addClass('greenPromptButton');
		$('#dateTimeEditTime').removeClass('greenPromptButton');
		$('#editHandsetDate').show(0);
		$('#editHandsetTime').hide(0);
		
		$('#dateTimeEditDate').unbind('click');
		$('#dateTimeEditTime').bind('click',function(){
			toggleDateTime();
		});
		//SHOW DATE
		var now = new Date(); 
		$('#editDate').scroller('setValue',[now.getDate(),dateFormat(now,"mmm"),now.getFullYear()],true);
		
	}
}
<!-- TOGGLE BETWEEN HIGH AND LOW ON EDIT TARGET BG RANGE PAGE -->
function toggleTargetBGRange(){
	if($('#targetBGRangeEditLow').hasClass('purplePromptButton')){
		$('#targetBGRangeEditLow').removeClass('purplePromptButton');
		$('#targetBGRangeEditHigh').addClass('purplePromptButton');
		$('#applicationTargetBGLow').hide(0);
		$('#applicationTargetBGHigh').show(0);
		
		$('#targetBGRangeEditHigh').unbind('click');
		$('#targetBGRangeEditLow').bind('click',function(){
			toggleTargetBGRange();
		});
	}else{
		$('#targetBGRangeEditLow').addClass('purplePromptButton');
		$('#targetBGRangeEditHigh').removeClass('purplePromptButton');
		$('#applicationTargetBGLow').show(0);
		$('#applicationTargetBGHigh').hide(0);
		
		$('#targetBGRangeEditLow').unbind('click');
		$('#targetBGRangeEditHigh').bind('click',function(){
			toggleTargetBGRange();
		});
	}
}
<!-- RE-INITIALISE EDIT DATE SCROLLER FOR VARYING MONTH LENGTHS -->
function createDateWheels(scrollerVals){
	var month = scrollerVals[1];
	var year = scrollerVals[2];
	
	switch(month){
		case 'Jan':
		case 'Mar':
		case 'May':
		case 'Jul':
		case 'Aug':
		case 'Oct':
		case 'Dec':
			var newDateWheel = [ { 'date': { 1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31'}, 'months': {Jan:'Jan',Feb:'Feb',Mar:'Mar',Apr:'Apr',May:'May',Jun:'Jun',Jul:'Jul',Aug:'Aug',Sep:'Sep',Oct:'Oct',Nov:'Nov',Dec:'Dec'}, 'years':{2010:'2010',2011:'2011',2012:'2012',2013:'2013',2014:'2014',2015:'2015',2016:'2016',2017:'2017',2018:'2018',2019:'2019',2020:'2020',2021:'2021',2022:'2022',2023:'2023',2024:'2024',2025:'2025',2026:'2026',2027:'2027',2028:'2028',2029:'2029',2030:'2030',2031:'2031',2032:'2032',2033:'2033',2034:'2034',2035:'2035',2036:'2036',2037:'2037',2038:'2038'} } ];
			break;
		case 'Apr':
		case 'Jun':
		case 'Sep':
		case 'Nov':
			var newDateWheel = [ { 'date': { 1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30'}, 'months': {Jan:'Jan',Feb:'Feb',Mar:'Mar',Apr:'Apr',May:'May',Jun:'Jun',Jul:'Jul',Aug:'Aug',Sep:'Sep',Oct:'Oct',Nov:'Nov',Dec:'Dec'}, 'years':{2010:'2010',2011:'2011',2012:'2012',2013:'2013',2014:'2014',2015:'2015',2016:'2016',2017:'2017',2018:'2018',2019:'2019',2020:'2020',2021:'2021',2022:'2022',2023:'2023',2024:'2024',2025:'2025',2026:'2026',2027:'2027',2028:'2028',2029:'2029',2030:'2030',2031:'2031',2032:'2032',2033:'2033',2034:'2034',2035:'2035',2036:'2036',2037:'2037',2038:'2038'} } ];
			break;
		case 'Feb':
			if(isLeapYear(year)){
				var newDateWheel = [ { 'date': { 1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29'}, 'months': {Jan:'Jan',Feb:'Feb',Mar:'Mar',Apr:'Apr',May:'May',Jun:'Jun',Jul:'Jul',Aug:'Aug',Sep:'Sep',Oct:'Oct',Nov:'Nov',Dec:'Dec'}, 'years':{2010:'2010',2011:'2011',2012:'2012',2013:'2013',2014:'2014',2015:'2015',2016:'2016',2017:'2017',2018:'2018',2019:'2019',2020:'2020',2021:'2021',2022:'2022',2023:'2023',2024:'2024',2025:'2025',2026:'2026',2027:'2027',2028:'2028',2029:'2029',2030:'2030',2031:'2031',2032:'2032',2033:'2033',2034:'2034',2035:'2035',2036:'2036',2037:'2037',2038:'2038'} } ];
			}else{
				var newDateWheel = [ { 'date': { 1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28'}, 'months': {Jan:'Jan',Feb:'Feb',Mar:'Mar',Apr:'Apr',May:'May',Jun:'Jun',Jul:'Jul',Aug:'Aug',Sep:'Sep',Oct:'Oct',Nov:'Nov',Dec:'Dec'}, 'years':{2010:'2010',2011:'2011',2012:'2012',2013:'2013',2014:'2014',2015:'2015',2016:'2016',2017:'2017',2018:'2018',2019:'2019',2020:'2020',2021:'2021',2022:'2022',2023:'2023',2024:'2024',2025:'2025',2026:'2026',2027:'2027',2028:'2028',2029:'2029',2030:'2030',2031:'2031',2032:'2032',2033:'2033',2034:'2034',2035:'2035',2036:'2036',2037:'2037',2038:'2038'} } ];
			}
			break;
	}
	
	$(function(){
		$('#editDate').scroller({
			wheels: newDateWheel,
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				createDateWheels(scrollerVals);
			}
		});  
	});
	
	
}
<!-- CHECK IF DATE YEAR IS A LEAP YEAR -->
function isLeapYear(year){
	switch(year){
		case '2012':
		case '2016':
		case '2020':
		case '2024':
		case '2028':
		case '2032':
		case '2036':
			return true;
			break;
		default: 
			return false;
			break;
	}
}

<!-- GET CURRENTLY SELECTED BG CORRECTION GRAPH BAR  -->
function getBGCorrectionGraphBar(){
	var activeGraphBar;
	for(var i = 1; i <= 24; i++){
		if($('#bgCorrectionGraph-'+i).hasClass('basalGraphBarActive') || $('#bgCorrectionGraph-'+i).hasClass('basalGraphBarCopy')){
			activeGraphBar = i;
			break;
		}
	}
	
	return activeGraphBar;
}
<!-- TOGGLE BETWEEN COPYING AND EDITING BG CORRECTION GRAPH BAR -->
function toggleBGCorrectionBarCopy(){
	var activeBGCorrectionGraphBar = getBGCorrectionGraphBar();
	
	if(isBGCorrectionBarCopy){
		isBGCorrectionBarCopy = false;
		$('#bgCorrectionGraph-'+activeBGCorrectionGraphBar).removeClass('basalGraphBarCopy');
		$('#bgCorrectionGraph-'+activeBGCorrectionGraphBar).addClass('basalGraphBarActive');
		//CHANGE NEXT BUTTON
		$('#bgCorrectionTimeNext').removeClass('basalTimeNextCopy');
		$('#bgCorrectionTimeNext').addClass('basalTimeNext');
		
	}else{
		isBGCorrectionBarCopy = true;
		$('#bgCorrectionGraph-'+activeBGCorrectionGraphBar).removeClass('basalGraphBarActive');
		$('#bgCorrectionGraph-'+activeBGCorrectionGraphBar).addClass('basalGraphBarCopy');
		//CHANGE NEXT BUTTON
		$('#bgCorrectionTimeNext').removeClass('basalTimeNext');
		$('#bgCorrectionTimeNext').addClass('basalTimeNextCopy');
	}
}
<!-- UPDATE BG CORRECTION GRAPH -->
function updateBGCorrectionGraph(){
	var max_val = Math.max.apply(0,bgCorrectionTempValArr);
	
	for(var i = 1; i <= 24; i++){
		var margin_top = Math.round(60 - (60/max_val)*bgCorrectionTempValArr[i-1]);
		$('#bgCorrectionGraph-'+i).css('margin-top',margin_top);
		
	}
}
<!-- CALCULATE THE BG CORRECTION VALUE FROM SCROLLER  -->
function calculateBGCorrectionValue(scrollerVals){
	graphVal = scrollerVals[0];
	var activeGraphBar = getBGCorrectionGraphBar();
	
	bgCorrectionTempValArr[activeGraphBar - 1] = graphVal;
	
	updateBGCorrectionGraph();
	$('#bgCorrectionValue').html(''+parseFloat(graphVal).toFixed(1)+'');
}

<!-- GET THE CURRENTLY SELCETED INSULIN TO CARB GRAPH BAR -->
function getInsulinToCarbGraphBar(){
	var activeGraphBar;
	for(var i = 1; i <= 24; i++){
		if($('#insulinToCarbGraph-'+i).hasClass('basalGraphBarActive') || $('#insulinToCarbGraph-'+i).hasClass('basalGraphBarCopy')){
			activeGraphBar = i;
			break;
		}
	}
	
	return activeGraphBar;
}
<!-- TOGGLE BETWEEN COPY OR EDIT INSULIN TO CARB GRAPH BAR -->
function toggleInsulinToCarbBarCopy(){
	var activeInsulinToCarbGraphBar = getInsulinToCarbGraphBar();
	
	if(isInsulinToCarbBarCopy){
		isInsulinToCarbBarCopy = false;
		$('#insulinToCarbGraph-'+activeInsulinToCarbGraphBar).removeClass('basalGraphBarCopy');
		$('#insulinToCarbGraph-'+activeInsulinToCarbGraphBar).addClass('basalGraphBarActive');
		//CHANGE NEXT BUTTON
		$('#insulinToCarbTimeNext').removeClass('basalTimeNextCopy');
		$('#insulinToCarbTimeNext').addClass('basalTimeNext');
		
	}else{
		isInsulinToCarbBarCopy = true;
		$('#insulinToCarbGraph-'+activeInsulinToCarbGraphBar).removeClass('basalGraphBarActive');
		$('#insulinToCarbGraph-'+activeInsulinToCarbGraphBar).addClass('basalGraphBarCopy');
		//CHANGE NEXT BUTTON
		$('#insulinToCarbTimeNext').removeClass('basalTimeNext');
		$('#insulinToCarbTimeNext').addClass('basalTimeNextCopy');
	}
}
<!-- UPDATE INSULIN TO CARB GRAPH -->
function updateInsulinToCarbGraph(){
	var tempGraphArr = new Array();
	for(var i = 1; i <= 24; i++){
		tempGraphArr[i-1] = parseFloat(insulinToCarbTempUnitsArr[i-1] / insulinToCarbTempGramsArr[i-1]);
	}
	
	var max_val = Math.max.apply(0,tempGraphArr);
	
	for(var i = 1; i <= 24; i++){
		var graphValue = insulinToCarbTempUnitsArr[i-1] / insulinToCarbTempGramsArr[i-1];
		var margin_top = Math.round(60 - (60/max_val)*(graphValue));
		if(margin_top > 59){
			margin_top = 59;
		}
		$('#insulinToCarbGraph-'+i).css('margin-top',margin_top);
		
	}
}

<!-- CALCULATE INSULIN TO CARB UNITS VALUE FROM SCROLLER -->
function calculateInsulinToCarbUnitsValue(scrollerVals){
	graphVal = scrollerVals[0];
	var activeGraphBar = getInsulinToCarbGraphBar();	
	insulinToCarbTempUnitsArr[activeGraphBar - 1] = graphVal;	
	updateInsulinToCarbGraph();
}
<!-- CALCULATE INSULIN TO CARB GRAMS VALUE FROM SCROLLER -->
function calculateInsulinToCarbGramsValue(scrollerVals){
	graphVal = scrollerVals[0];
	var activeGraphBar = getInsulinToCarbGraphBar();	
	insulinToCarbTempGramsArr[activeGraphBar - 1] = graphVal;	
	updateInsulinToCarbGraph();
}
<!-- CONFIRM SAVE PUMP -->
function confirmSavePump(){
	hideKeyboard();
	showConfirm();
	$('#confirmTitle').hide(0);
	$("#confirmMessage").html(getLanguageString('confirmPumpAddition'));
	$('#confirmDetails').html('');	
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
		showKeyboard(getLanguageString('pump_name_label'));
	});
	
	whichConfirmFunction = 'savePump()';	
}
<!-- SAVE PUMP -->
function savePump(){
	if(isNewPump){
		var pumpIndex = pumpNameArr.length + 1;
		pumpNameArr[pumpIndex-1] = $('.caption').html();
		
		var pumpList = '<div id="existingPumpButton-'+pumpIndex+'" class="existingBasal">';
		pumpList += '<div class="left med">';
		pumpList += '<div class="existingBasalTextTop" id="existingPumpTextTop-'+pumpIndex+'"></div>';
		pumpList += '</div>';
		pumpList += '<div class="right">';
		pumpList += '<div class="existingBasalTextBot green" id="existingPumpTextBot-'+pumpIndex+'"></div>';
		pumpList += '</div>';
		pumpList += '</div>';
		
		$('#pumpList').append(pumpList);
		$('#existingPumpTextTop-'+pumpIndex).html(''+pumpNameArr[pumpIndex-1]+'');
		
		$('#existingPumpButton-'+pumpIndex).bind('click',function(){
			viewPump(pumpIndex-1);
		});
		$('#pumpFound').hide(0);
		$('#pumpSettings').show(0);
	
	}else{
		var pumpIndex = thisPumpIndex + 1;
		pumpNameArr[pumpIndex-1] = $('.caption').html();
		$('#existingPumpTextTop-'+pumpIndex).html(''+pumpNameArr[pumpIndex-1]+'');
		$('#pumpDetail').hide(0);
		$('#pumpSettings').show(0);
		showAlert('',''+pumpNameArr[pumpIndex-1]+'<br />Name has been changed');
		viewPump(pumpIndex);
	}
}
<!-- VIEW PUMP DETAILS -->
function viewPump(butWhich){
	isNewPump = false;
	
	thisPumpIndex = butWhich;
	$('#pumpSettings').hide(0);
	$('#pumpDetail').show(0);
	
	$('#pumpName').html(''+pumpNameArr[thisPumpIndex]+'');
	$('#pumpNameEdit').html(''+pumpNameArr[thisPumpIndex]+'');
	
	
	if(thisPumpIndex == activePumpIndex){
		$('#isPumpActivated').html(getLanguageString('acivatednotrunning'));
		$('#testPumpAlarmBttn').hide(0);
		$('#pumpNameEditBttn').hide(0);
		$('#pumpRemoveBttn').hide(0);
		$('#pumpDetailActivate').html(getLanguageString('deactivate'));
	}else{
		$('#isPumpActivated').html(getLanguageString('pump_disconnected_status'));
		$('#testPumpAlarmBttn').show(0);
		$('#pumpNameEditBttn').show(0);
		$('#pumpRemoveBttn').show(0);
		$('#pumpDetailActivate').html(getLanguageString('activate'));
	}
	
}
<!-- CONFIRM ACTIVATE PUMP -->
function confirmActivatePump(){
	showConfirm();
	if(activePumpIndex != thisPumpIndex){
		$("#confirmMessage").html(getLanguageString('question_confirm_activation'));
		$("#confirmDetails").addClass('green');
		$("#confirmDetails").html(''+$('#pumpName').html()+'');
	}else{
		$("#confirmMessage").html(getLanguageString('disconnect_durable_info')+' '+$('#pumpName').html()+'');
		$("#confirmDetails").html('');
	}
	$('#confirmTitle').hide(0);
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	whichConfirmFunction = 'activatePump()';
}
<!-- ACTIVATE THE PUMP -->
function activatePump(){	
	var pumpIndex = thisPumpIndex + 1;
	if(activePumpIndex != thisPumpIndex){
		for(var i = 1; i <= pumpNameArr.length; i++){
			$('#existingPumpTextBot-'+i).html('');
		}		
		$('#existingPumpTextBot-'+pumpIndex).html(getLanguageString('acivatednotrunning'));
		activePumpIndex = thisPumpIndex;
		showAlert(getLanguageString('success'),getLanguageString('youHaveNowActivatedYourPump')+' "'+pumpNameArr[thisPumpIndex]+'"');	
	}else{
		$('#existingPumpTextBot-'+pumpIndex).html('');
		activePumpIndex = -1;
		showAlert(getLanguageString('info_pump_disconnected_title'),getLanguageString('youHaveBeenDisconnectedFrom')+' '+pumpNameArr[thisPumpIndex]);	
	}
		
	$('#pumpSettings').show(0);
	$('#pumpDetail').hide(0);
	
}
<!-- CONFIRM SAVE TARGET BG RANGE -->
function confirmSaveTargetBGRange(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+ getLanguageString('bg_apply_target'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	var targetBGLowArr = $('#editTargetBGLow').scroller('getValue');
	var targetBGLow = parseInt(targetBGLowArr[0]) + (parseInt(targetBGLowArr[1])/10); 
	var targetBGHighArr = $('#editTargetBGHigh').scroller('getValue');
	var targetBGHigh = parseInt(targetBGHighArr[0]) + (parseInt(targetBGHighArr[1])/10);
	
	$('#confirmDetails').addClass('blue');
	$("#confirmDetails").html(''+targetBGLow+' to '+targetBGHigh + ' mmol/l');
	whichConfirmFunction = 'saveTargetBGRange('+targetBGLow+','+targetBGHigh+')';
}
<!-- SAVE TARGET BG RANGE -->
function saveTargetBGRange(targetBGLow, targetBGHigh){
	$('#applicationTargetBGLowValue').html(''+targetBGLow+'');
	$('#applicationTargetBGHighValue').html(''+targetBGHigh+'');
	$('#targetBGRange').hide(0);
	$('#applicationBG').show(0);
}
<!-- CONFIRM SAVE HYPERGLYCAEMIA LIMIT -->
function confirmSaveHyperglycaemiaLimit(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('hyperglycaemicLevel'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	var hyperglycaemiaLimitArr = $('#editHyperglycaemia').scroller('getValue');
	var hyperglycaemiaLimit = parseInt(hyperglycaemiaLimitArr[0]) + (parseInt(hyperglycaemiaLimitArr[1])/10);
	$('#confirmDetails').addClass('blue');
	$("#confirmDetails").html(''+hyperglycaemiaLimit+' mmol/l');
	whichConfirmFunction = 'saveHyperglycaemiaLimit('+hyperglycaemiaLimit+')';	
}
<!-- SAVE HYPERGLYCAEMIA LIMIT -->
function saveHyperglycaemiaLimit(hyperglycaemiaLimit){
	$('#applicationHyperglycaemiaValue').html(''+hyperglycaemiaLimit+'');
	$('#hyperglycaemiaLimit').hide(0);
	$('#applicationBG').show(0);
}
<!-- CONFIRM SAVE HYPOGLYCAEMIA LIMIT -->
function confirmSaveHypoglycaemiaLimit(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('hypoglycaemicLevel'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	var hypoglycaemiaLimitArr = $('#editHypoglycaemia').scroller('getValue');
	var hypoglycaemiaLimit = parseInt(hypoglycaemiaLimitArr[0]) + (parseInt(hypoglycaemiaLimitArr[1])/10);
	$('#confirmDetails').addClass('blue');
	$("#confirmDetails").html(''+hypoglycaemiaLimit+' mmol/l');
	whichConfirmFunction = 'saveHypoglycaemiaLimit('+hypoglycaemiaLimit+')';	
}
<!-- SAVE HYPOGLYCAEMIA LIMIT -->
function saveHypoglycaemiaLimit(hypoglycaemiaLimit){
	$('#applicationHypoglycaemiaValue').html(''+hypoglycaemiaLimit+'');
	$('#hypoglycaemiaLimit').hide(0);
	$('#applicationBG').show(0);
}
<!-- CONFIRM SAVE BG READING VALID FOR -->
function confirmSaveBGReadingValidFor(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('durationOfActiveBGReading'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	var bgReadingValidForArr = $('#editBGReadingValidFor').scroller('getValue');
	var bgReadingFor = parseInt(bgReadingValidForArr[0]);
	$('#confirmDetails').addClass('blue');
	$("#confirmDetails").html(''+bgReadingFor+' '+getLanguageString('minutes'));
	whichConfirmFunction = 'saveBGReadingValidFor('+bgReadingFor+')';
}
<!-- SAVE BG READING VALID FOR -->
function saveBGReadingValidFor(bgReadingFor){
	$('#applicationBGReadingForValue').html(''+bgReadingFor+'');
	$('#bgReadingFor').hide(0);
	$('#applicationBG').show(0);
}
<!-- CONFIRM SAVE BG CORRECTION RATIO -->
function confirmSaveBGCorrectionRatio(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('insulinToBG'));
	$('#confirmDetails').html('');
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	whichConfirmFunction = 'saveBGCorrectionRatio()';
}
<!-- SAVE BG CORRECTION RATIO -->
function saveBGCorrectionRatio(){
	bgCorrectionValArr = bgCorrectionTempValArr;
	$('#bgCorrectionRatio').hide(0);	
	$('#applicationInsulin').show(0);
}
<!-- CONFIRM SAVE INSULIN TO CARB RATIO -->
function confirmSaveInsulinToCarbRatio(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('insulinToCarbRatio'));
	$('#confirmDetails').html('');
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	whichConfirmFunction = 'saveInsulinToCarbRatio()';
}
<!-- SAVE INSULIN TO CARB RATIO -->
function saveInsulinToCarbRatio(){
	insulinToCarbGramsArr = insulinToCarbTempGramsArr;
	insulinToCarbUnitsArr = insulinToCarbTempUnitsArr;
	$('#insulinToCarbRatio').hide(0);	
	$('#applicationInsulin').show(0);
}
<!-- CONFIRM SAVE MAX BASAL RATE -->
function confirmSaveMaxBasalRate(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('maxBasalPumpLimit'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	var maxBasalRateArr = $('#editMaxBasalRate').scroller('getValue');
	
	var maxBasalRate = parseInt(maxBasalRateArr[0]) + (parseInt(maxBasalRateArr[1])/100);
	$('#confirmDetails').addClass('blue');
	$("#confirmDetails").html(''+maxBasalRate+' u/hr');
	
	whichConfirmFunction = 'saveMaxBasalRate('+maxBasalRate+')';
}
<!-- SAVE MAX BASAL RATE -->
function saveMaxBasalRate(maxBasalRate){
	$('#maxBasalRateValue').html(''+maxBasalRate+'');
	$('#maxBasalRate').hide(0);	
	$('#applicationInsulin').show(0);
	
	var maxBasalRateArr = $('#editMaxBasalRate').scroller('getValue');
	var maxBasalRateTens = parseInt(maxBasalRateArr[0]);
	var maxBasalRateUnits = parseInt(maxBasalRateArr[1]);
	
	var basalRateWheelsStr = "[{'tens': {0:'0'";
	for(var i = 1; i <= maxBasalRateTens; i++){
		basalRateWheelsStr += ","+i+":'"+i+"'";
	}
	if(maxBasalRateTens == 0){
		basalRateWheelsStr += "}, 'units': { 5: '05'";
		
		for(var i = 10; i <= maxBasalRateUnits; i = i+5){
			basalRateWheelsStr += ","+i+":'"+i+"'";
		}
		basalRateWheelsStr += "} } ]";
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
	
		
}
<!-- CONFIRM SAVE MAX BOLUS -->
function confirmSaveMaxBolus(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('maxBolusPumpLimit'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});
	
	var maxBolusArr = $('#editMaxBolus').scroller('getValue');
	var maxBolus = parseInt(maxBolusArr[0]) + (parseInt(maxBolusArr[1])/100);
	$("#confirmDetails").html(''+maxBolus+' u');
	
	whichConfirmFunction = 'saveMaxBolus('+maxBolus+')';
}
<!-- SAVE MAX BOLUS -->
function saveMaxBolus(maxBolus){
	$('#maxBolusValue').html(''+maxBolus+'');
	$('#maxBolus').hide(0);	
	$('#applicationInsulin').show(0);
	
	//RE-INITIALISE BOLUS SCROLLER
	var maxBolusArr = $('#editMaxBolus').scroller('getValue');
	var maxBolusTens = parseInt(maxBolusArr[0]);
	var maxBolusUnits = parseInt(maxBolusArr[1]);
	
	if(maxBolusTens == 0){
		bolusWheelsStr += "}, 'units': { 5: '05'";
		
		for(var i = 10; i <= maxBolusUnits; i = i+5){
			bolusWheelsStr += ","+i+":'"+i+"'";
		}
		bolusWheelsStr += "} } ]";
	}else{
		bolusWheelsStr += "}, 'units': { 0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95' } } ]";
	}
	
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
<!-- CONFIRM SAVE TIME TO TARGET -->
function confirmSaveTimeToTarget(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('timeToTarget'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});	
	
	var timeToTargetArr = $('#editTimeToTarget').scroller('getValue');
	var timeToTarget = timeToTargetArr[0];
	$('#confirmDetails').addClass('blue');
	$("#confirmDetails").html(''+timeToTarget+' '+getLanguageString('minutes'));
	
	whichConfirmFunction = 'saveTimeToTarget('+timeToTarget+')';

}
<!-- SAVE TIME TO TARGET -->
function saveTimeToTarget(timeToTarget){
	$('#timeToTargetValue').html(''+timeToTarget+'');
	$('#timeToTarget').hide(0);
	$('#applicationInsulin').show(0);
}
<!-- CONFIRM SAVE LOW RESERVOIR ALERT -->
function confirmSaveLowReservoirAlert(){
	showConfirm();
	$('#confirmTitle').html(getLanguageString('applynewsett'));
	$('#confirmTitle').show(0);
	$("#confirmMessage").html(getLanguageString('settings_htc_title')+' '+getLanguageString('reservoirAlert'));
	$('#confirmBack').unbind('click');
	$('#confirmBack').bind('click',function(){
		hideConfirm();
	});	
	
	var lowReservoirAlertArr = $('#editLowReservoirAlert').scroller('getValue');
	var lowReservoirAlert = lowReservoirAlertArr[0];
	$("#confirmDetails").html(''+lowReservoirAlert+' '+getLanguageString('minutes'));
	
	whichConfirmFunction = 'saveLowReservoirAlert('+lowReservoirAlert+')';
}
<!-- SAVE LOW RESERVOIR ALERT -->
function saveLowReservoirAlert(lowReservoirAlert){
	$('#lowReservoirAlertValue').html(''+lowReservoirAlert+'');
	$('#lowReservoirAlert').hide(0);
	$('#applicationInsulin').show(0);
}
<!-- SAVE BRIGHTNESS -->
function saveBrightness(){
	var brightnessArr = $('#editBrightness').scroller('getValue');
	var brightness = brightnessArr[0];
	
	$('#handsetBrightnessValue').html(''+brightness+'');
	$('#brightness').hide(0);
	$('#handsetSettings').show(0);
}
<!-- SAVE HANDSET NAME -->
function saveHandsetName(){
	hideKeyboard();
	$('#handsetNameValue').html($('.caption').html());
}

function changeTargetBGLowWheels(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1])/10;
	
	if(scrollerValsTens == 3){
		var newWheels = [ { 'tens': {3:'3',4:'4',5:'5',6:'6',7:'7'}, 'units': {5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}else if(scrollerValsTens == 7){
		var newWheels = [ { 'tens': {3:'3',4:'4',5:'5',6:'6',7:'7'}, 'units': {0:'0'} } ];
	}else {
		var newWheels = [ { 'tens': {3:'3',4:'4',5:'5',6:'6',7:'7'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}
	
	$('#editTargetBGLow').scroller('destroy');
	
	$(function(){
		$('#editTargetBGLow').scroller({
			wheels: newWheels,
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeTargetBGLowWheels(scrollerVals);
			}
		});		  
	});
}

function changeTargetBGHighWheels(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1])/10;
	
	if(scrollerValsTens == 4){
		var newWheels = [ { 'tens': {4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13'}, 'units': {5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}else {
		var newWheels = [ { 'tens': {4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}
	
	$('#editTargetBGHigh').scroller('destroy');
	
	$(function(){
		$('#editTargetBGHigh').scroller({
			wheels: newWheels,
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeTargetBGLowWheels(scrollerVals);
			}
		});		  
	});
}

function changeHyperglycaemiaWheels(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1])/10;
	
	if(scrollerValsTens == 4){
		var newWheels = [ { 'tens': {9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33'}, 'units': {5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}else if(scrollerValsTens == 33){
		var newWheels = [ { 'tens': {9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33'}, 'units': {0:'0',1:'1',2:'2',3:'3'} } ];
	}else {
		var newWheels = [ { 'tens': {9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30',31:'31',32:'32',33:'33'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ]
	}
	
	$('#editHyperglycaemia').scroller('destroy');
	
	$(function(){
		$('#editHyperglycaemia').scroller({
			wheels: newWheels,
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeHyperglycaemiaWheels(scrollerVals);
			}
		});		  
	});
}

function changeHypoglycaemiaWheels(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1])/10;
	
	if(scrollerValsTens == 2 || scrollerValsTens == 5){
		var newWheels = [ { 'tens': {2:'2',3:'3',4:'4',5:'5'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8'} } ];
	}else {
		var newWheels = [ { 'tens': {2:'2',3:'3',4:'4',5:'5'}, 'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}	
	
	$('#editHypoglycaemia').scroller('destroy');
	
	$(function(){
		$('#editHypoglycaemia').scroller({
			wheels: newWheels, 
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeHypoglycaemiaWheels(scrollerVals);
			}
		});		  
	});
}

function changeMaxBasalWheels(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1])/100;
	
	if(scrollerValsTens == 0){
		var newWheels = [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5'}, 'units': {5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95'} } ];
	}else if(scrollerValsTens == 5){
		var newWheels = [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5'}, 'units': {0:'00'} } ];
	}else {
		var newWheels = [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5'}, 'units': {0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95'} } ];
	}
	
	$('#editMaxBasalRate').scroller('destroy');

	$(function(){
		$('#editMaxBasalRate').scroller({
			wheels: newWheels,
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeMaxBasalWheels(scrollerVals);
			}
		});
	});
}

function changeMaxBolusWheels(scrollerVals){
	var scrollerValsTens = parseInt(scrollerVals[0]);
	var scrollerValsUnits = parseInt(scrollerVals[1])/100;
	
	if(scrollerValsTens == 0){
		var newWheels = [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30'}, 'units': {5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95'} } ];
	}else if(scrollerValsTens == 30){
		var newWheels = [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30'}, 'units': {0:'00'} } ];
	}else {
		var newWheels = [ { 'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'11',12:'12',13:'13',14:'14',15:'15',16:'16',17:'17',18:'18',19:'19',20:'20',21:'21',22:'22',23:'23',24:'24',25:'25',26:'26',27:'27',28:'28',29:'29',30:'30'}, 'units': {0:'00',5: '05', 10: '10', 15: '15', 20: '20', 25: '25', 30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55', 60: '60', 65: '65', 70: '70', 75: '75', 80: '80', 85: '85', 90: '90', 95: '95'} } ];
	}
	
	$('#editMaxBolus').scroller('destroy');	
	
	$(function(){
		$('#editMaxBolus').scroller({
			wheels: newWheels,
			display: 'inline',			
			rows: 5,
			width: 69,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeMaxBolusWheels(scrollerVals);
			}
		});
	});
}

function changeTargetScoreWheels(scrollerVals){
	var scrollerValsHundreds = parseInt(scrollerVals[0]);
	var scrollerValsTens = parseInt(scrollerVals[1]);
	var scrollerValsUnits = parseInt(scrollerVals[2]);
	
	if(scrollerValsHundreds == 0 && scrollerValsTens == 0){
		var newWheels = [ { 'hundreds': {0:'0',1:'1',2:'2'},'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'},'units': {1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}else if(scrollerValsHundreds == 2){
		var newWheels = [ { 'hundreds': {0:'0',1:'1',2:'2'},'tens': {0:'0'},'units': {0:'0'} } ];
	}else {
		var newWheels = [ { 'hundreds': {0:'0',1:'1',2:'2'},'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'},'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}
	
	$('#editTargetScore').scroller('destroy');
	
	$(function(){
		$('#editTargetScore').scroller({
			wheels: newWheels,
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeTargetScoreWheels(scrollerVals);
			}
		});  
	});


}

