/* GLOBAL VARIABLES */
var xmlFileName = "Xml/appText.xml";
var deviceLanguage = "English";
var languageNode;

var wantedCount = 0;
var xmlWantedArr = new Array();

$(window).load(function(){
	//LOAD THE XML LANGUAGE FILE
	loadXmlFile();
});
//LOADS THE XML LANGUAGE FILE
function loadXmlFile(){
	$.ajax({
    type: "GET",
    url: xmlFileName,
    dataType: "xml",
    success: parseXml
  });
}
//PARSES THE XML LANGUAGE FILE
function parseXml(xml){
	$(xml).find("language").each(function(){
    	if($(this).attr('name') == deviceLanguage){
			languageNode = $(this);
			readLanguage();
		}
  	});
}
//RETURNS A STRING FROM THE XML LANGUAGE NODE BASED ON INPUT ID
function getLanguageString(butWhich){
	var outputStr = '';
	languageNode.find("text").each(function(){
		if($(this).attr('id') == butWhich){
			outputStr = $(this).text();
		}
	});
		
	return outputStr;
}
//REPLACES THE APP TEXT WITH LANGUAGE STRINGS
function readLanguage(){
	$('#holdConfirm').html(getLanguageString('HoldToConfirm'));
	$('#confirmBack').html(getLanguageString('back'));
	
	$('#alertPopupYes').html(getLanguageString('yes'));
	$('#standardPopupNo').html(getLanguageString('no'));
	$('#standardPopupYes').html(getLanguageString('yes'));
		
	$('#strJournalBGReading').html(getLanguageString('reading')+':');
	$('#strJournalBGAssessment').html(getLanguageString('healtAssessmentTitle')+':');
	$('#strJournalBGNote').html(getLanguageString('JournalBGNote')+':');
	$('#strJournalTempBasalDuration').html(getLanguageString('journalTempbasalDuration')+':');
	$('#strJournalTempBasalAdjust').html(getLanguageString('journalTempbasalAdjustment')+':');
	
	$('#strJournalBasalName').html(getLanguageString('JournalBasalProfileName'+':'));
	$('#strJournalBasalAmount').html(getLanguageString('JournalBasalAmountOfInsulin')+':');
	$('#strJournalBolusTotal').html(getLanguageString('total')+':');
	$('#strJournalBolusFood').html(getLanguageString('JournalBolusFood')+':');
	$('#strJournalBolusBG').html(getLanguageString('JournalBolusBG')+':');
	$('#strJournalTotalCarbs').html(getLanguageString('journalfoodTotalCarb')+':');
	$('#strJournalFoodItems').html(getLanguageString('journalfoodItems')+':');
	
	$('#strJournalActivityType').html(getLanguageString('JournalActivityPeriodActivityType')+':');
	$('#strJournalActivityDuration').html(getLanguageString('JournalActivityDuration'+':'));
	$('#strJournalActivityScore').html(getLanguageString('score')+':');
	
	$('#journalPopupHide').html(getLanguageString('hide'));
	
	$('#strDashBG').html(getLanguageString('bloodGlucose'));
	$('#strDashBGReading').html(getLanguageString('reading')+': ');
	$('#strDashInsulin').html(getLanguageString('insulin'));
	$('#dashInsulinProfileName').html(getLanguageString('noBasalProfile'));
	$('#strDashFood').html(getLanguageString('food_title'));
	$('#strDashFoodRecorded').html(getLanguageString('recorded')+': ');
	$('#strDashFoodGrams').html(getLanguageString('grams').toLowerCase());
	$('#strDashActivity').html(getLanguageString('activity'));
	$('#strDashActivityTarget').html(getLanguageString('target')+': ');
	$('#strDashFoodScore').html(getLanguageString('score').toLowerCase());
	$('#strDashJournal').html(getLanguageString('journal'));
	$('#strDashSettings').html(getLanguageString('settings'));
	
	$('#pumpText').html(getLanguageString('hsStartPumpButton'));
	
	$('#strbloodglucose').html(getLanguageString('bloodGlucose'));
	$('#bloodGlucoseLast').html(getLanguageString('lastBGReading'));
	$('#bloodGlucoseAverages').html(getLanguageString('analysis'));
	$('#strBloodGlucoseLastTakenAt').html(getLanguageString('takenAt'));
	
	$('#strBGOverviewInsideRange').html(getLanguageString('insideTargetBG'));
	$('#strBGOverviewAboveRange').html(getLanguageString('aboveTargetBG'));
	$('#strBGOverviewBelowRange').html(getLanguageString('belowTargetBG'));
	$('#strBGOverviewHyperglycaemic').html(getLanguageString('bgHyperLevel'));
	$('#strBGOverviewHypoglycaemic').html(getLanguageString('bgHypoLevel'));
	$('#strBGOverviewFeelingWell').html(getLanguageString('feelingwell'));
	$('#strBGOverviewFeelingUnwell').html(getLanguageString('feelingpoorly'));
	$('#strBGOverviewPostMeal').html(getLanguageString('postmeal'));
	$('#strBGOverviewPreMeal').html(getLanguageString('premeal'));
	$('#strBGOverviewFasting').html(getLanguageString('fasting'));
	$('#strBGOverviewNote').html(getLanguageString('note')+':');
	
	$('#strBGAverages7Day').html(getLanguageString('day'));
	$('#strBGAverages30Day').html(getLanguageString('day'));
	$('#strBGAverages90Day').html(getLanguageString('day'));
	
	$('#bgOverviewBack').html(getLanguageString('back'));
	
	$('#strBGReadingTaken').html(getLanguageString('bloodGlucose'));
	$('#measurementSuccessful').html(getLanguageString('measurementSuccessful'));
	$('#strBGReadingTakenAt').html(getLanguageString('takenAt'));
	$('#strBGInsideTargetRange').html(getLanguageString('insideTargetBG'));
	$('#strBGOutsideTargetRangeHigh').html(getLanguageString('aboveTargetBG'));
	$('#strBGOutsideTargetRangeLow').html(getLanguageString('belowTargetBG'));
	$('#strBGAboveHyperglycaemic').html(getLanguageString('bgHyperLevel'));
	$('#strBGBelowHypoglycaemic').html(getLanguageString('bgHypoLevel'));
	
	$('#bgReadingTakenContinue').html(getLanguageString('continue'));
	
	$('#strHealthAssessment').html(getLanguageString('healtAssessmentTitle'));
	$('#strBGHealthAssessmentSelect').html(getLanguageString('tickWhereApplicable'));
	$('#strBGHealthAssessmentFeelingWell').html(getLanguageString('feelingwell'));
	$('#strBGHealthAssessmentFeelingUnwell').html(getLanguageString('feelingpoorly'));
	$('#strBGHealthAssessmentPreMeal').html(getLanguageString('premeal'));
	$('#strBGHealthAssessmentPostMeal').html(getLanguageString('postmeal'));
	$('#strBGHealthAssessmentFasting').html(getLanguageString('fasting'));
	
	$('#strAddNoteBttn').html(getLanguageString('addnote'));
	$('#bgHealthAssessmentContinue').html(getLanguageString('continue'));
	$('#strBGReadingResults').html(getLanguageString('bgReadingSummary'));
	$('#strBGReadingResultsTakenAt').html(getLanguageString('takenAt'));
	$('#strBGResultsInsideRange').html(getLanguageString('insideTargetBG'));
	$('#strBGResultsAboveRange').html(getLanguageString('aboveTargetBG'));
	$('#strBGResultsBelowRange').html(getLanguageString('belowTargetBG'));
	$('#strBGResultsHyperglycaemic').html(getLanguageString('bgHyperLevel'));
	$('#strBGResultsHypoglycaemic').html(getLanguageString('bgHypoLevel'));
	$('#strBGResultsFeelingWell').html(getLanguageString('feelingwell'));
	$('#strBGResultsFeelingUnwell').html(getLanguageString('feelingpoorly'));
	$('#strBGResultsPostMeal').html(getLanguageString('postmeal'));
	$('#strBGResultsPreMeal').html(getLanguageString('premeal'));
	$('#strBGResultsFasting').html(getLanguageString('fasting'));
	$('#strBGResultsNote').html(getLanguageString('note'));
	
	$('#bgReadingResultsBack').html(getLanguageString('back'));
	$('#bgReadingResultsRecord').html(getLanguageString('record'));
	
	$('#strInsulin').html(getLanguageString('insulin'));
	$('#basalHeader').html(getLanguageString('tab/basal'));
	$('#strInsulinTemporaryBasal').html(getLanguageString('tab/tempbasal'));
	$('#strInsulinCommunicating').html(getLanguageString('communicating'));
	$('#bolusHeader').html(getLanguageString('tab/bolus'));
	$('#strBolusOverviewUnits').html(getLanguageString('units').toLowerCase());
	$('#strBolusOverviewNotRunning').html(getLanguageString('not_running'));
	
	$('#insulinOverviewBack').html(getLanguageString('back'));
	$('#insulinOverviewPrime').html(getLanguageString('prime'));
	
	$('#strBasalList').html(getLanguageString('basal'));
	$('#basalTempButton').html(getLanguageString('tab/tempbasal'));
	$('#insulinBasalListBack').html(getLanguageString('back'));
	$('#insulinBasalListCreate').html(getLanguageString('create'));
	
	$('#strBasalProfileHome').html(getLanguageString('basal'));
	$('#basalPreviewProfileBttn').html(getLanguageString('previewProfile'));
	$('#basalCopyProfileBttn').html(getLanguageString('copyProfile'));
	$('#basalEditProfileBttn').html(getLanguageString('editProfile'));
	$('#basalDeleteProfileBttn').html(getLanguageString('deleteProfile'));
	$('#insulinBasalProfileHomeBack').html(getLanguageString('back'));
	$('#insulinBasalProfileHomeActivate').html(getLanguageString('activate'));
	
	$('#insulinBasalPreviewBack').html(getLanguageString('back'));
	$('#insulinBasalProfileNext').html(getLanguageString('next'));
	
	$('#insulinBasalEditBack').html(getLanguageString('cancel'));
	$('#insulinBasalEditReview').html(getLanguageString('review'));
	
	$('#strTempBasal').html(getLanguageString('tab/tempbasal'));	
	$('#strTempBasalDuration').html(getLanguageString('journalTempbasalDuration'));
	$('#strTempBasalAdjust').html(getLanguageString('journalTempbasalAdjustment'));
	$('#tempBasalBack').html(getLanguageString('back'));
	$('#tempBasalStart').html(getLanguageString('start'));
	
	$('#strBolus').html(getLanguageString('bolus'));
	$('#strBolusBG').html(getLanguageString('bloodGlucose'));
	$('#strBolusPredicted').html(getLanguageString('bgBolus/predicted'));
	$('#strBolusFood').html(getLanguageString('food_title'));
	$('#strBolusRemaining').html(getLanguageString('bolus/remainingBolus'));
	$('#strBolusRemainingUnits').html(getLanguageString('units'));
	
	$('#strBolusStarted').html(getLanguageString('remainingBolus/started'));
	$('#strBolusRecommendedBolus').html(getLanguageString('recommBolus'));
	$('#strBolusValueUnits').html(getLanguageString('units'));
	
	$('#bolusBack').html(getLanguageString('back'));
	$('#bolusQuick').html(getLanguageString('quickBolus'));
	
	$('#strQuickBolus').html(getLanguageString('bolus'));
	$('#bolusDeliveryTypeText').html(getLanguageString('journalBolusIMMEDIATE'));
	$('#strBolusPhase1Units').html(getLanguageString('units'));
	$('#strBolusPhase2DeliveryPeriod').html(getLanguageString('deliveryPeriod'));
	$('#strBolusPhase3PercentNow').html(getLanguageString('percentNow'));
	$('#strBolusPhase360PercentOver').html(getLanguageString('sixtyPercentOver'));
	$('#strBolusPhase4PercentNow').html(getLanguageString('percentNow'));
	$('#strBolusPhase440PercentOver').html(getLanguageString('fortyPercentOver'));
	
	$('#quickBolusBack').html(getLanguageString('back'));
	$('#quickBolusDeliver').html(getLanguageString('deliver'));
	
	$('#foodTitle').html(getLanguageString('food_title'));
	$('#strFoodHomeFoodLibrary').html(getLanguageString('foodItemsTitle'));
	$('#strFoodHomeCarbohydrates').html(getLanguageString('addFoodCarbo')+':');
	$('#strFoodHomeGrams').html(getLanguageString('carbohydrate_grams_value'));
	
	$('#foodOverviewBack').html(getLanguageString('back'));
	$('#foodOverviewBolus').html(getLanguageString('bolus'));
	
	$('#strFoodLibrary').html(getLanguageString('foodItemsTitle'));
	$('#foodFilter').html(getLanguageString('filter'));
	$('#foodAddFood').html(getLanguageString('foodItemsAddFood'));
	$('#foodListBack').html(getLanguageString('back'));	
	$('#strFoodListCalculate').html(getLanguageString('foodItemsCalculate'));
	
	$('#strFoodCalculatorCalculateTotal').html(getLanguageString('bolus_calc_title'));
	$('#strFoodCalculatorTotalCarbs').html(getLanguageString('journalfoodTotalCarb'));
	$('#foodCalculateBolus').html(getLanguageString('bolus_calc_send'));
	$('#foodCalculatorBack').html(getLanguageString('back'));
	$('#foodCalculatorRecord').html(getLanguageString('record'));
	
	$('#strFoodFilterList').html(getLanguageString('filter'));
	$('#strFoodFilterAll').html(getLanguageString('filtersAll'));
	$('#strFoodFilterFavourites').html(getLanguageString('filtersFavourites'));
	$('#strFoodFilterBreakfast').html(getLanguageString('filtersBreakfast'));
	$('#strFoodFilterLunch').html(getLanguageString('filtersLunch'));
	$('#strFoodFilterDinner').html(getLanguageString('filtersDinner'));
	$('#strFoodFilterSnack').html(getLanguageString('filtersSnack'));
	$('#strFoodFilterOther').html(getLanguageString('filtersOther'));
	
	$('#foodFilterBack').html(getLanguageString('back'));
	$('#foodFilterOk').html(getLanguageString('ok'));
	
	$('#strAddFoodItem').html(getLanguageString('addFoodItem'));
	$('#strNewFoodItemName').html(getLanguageString('addFoodItemName'));
	$('#newFoodItemNameValue').html(getLanguageString('newFood'));
	$('#strNewFoodItemCarbohydrates').html(getLanguageString('addFoodCarbo'));
	$('#strNewFoodItemFoodGroup').html(getLanguageString('addFoodFoodGroup'));
	$('#newFoodItemFoodGroupValue').html(getLanguageString('addFoodFoodGroupNone'));
	$('#strNewFoodItemFavourite').html(getLanguageString('addFoodFav'));
	$('#strNewFoodItemDelete').html(getLanguageString('delete'));
	
	$('#foodAddNewItemCancel').html(getLanguageString('cancel'));
	$('#foodAddNewItemSave').html(getLanguageString('save'));
	
	$('#strFoodCarbohydrates').html(getLanguageString('carbohydrates_grams'));
	$('#strFoodCarbohydratesGrams').html(getLanguageString('carbohydrate_grams_value'));
	
	$('#editFoodCarbohydratesBack').html(getLanguageString('back'));
	$('#editFoodCarbohydratesSave').html(getLanguageString('save'));
	
	$('#strSelectFoodGroup').html(getLanguageString('food_group_title'));
	$('#strFoodGroupItemBreakfast').html(getLanguageString('filtersBreakfast'));
	$('#strFoodGroupItemLunch').html(getLanguageString('filtersLunch'));
	$('#strFoodGroupItemDinner').html(getLanguageString('filtersDinner'));
	$('#strFoodGroupItemSnack').html(getLanguageString('filtersSnack'));
	$('#strFoodGroupItemOther').html(getLanguageString('filtersOther'));
	
	$('#editFoodGroupBack').html(getLanguageString('back'));
	$('#editFoodGroupSave').html(getLanguageString('save'));
	
	$('#strActivity').html(getLanguageString('activity'));
	$('#strActivityCurrent').html(getLanguageString('current'));
	$('#strActivityCurrentScore').html(getLanguageString('score'));
	$('#strActivityDaily').html(getLanguageString('daily'));
	$('#strActivityAverage').html(getLanguageString('average'));
	$('#strActivityTarget').html(getLanguageString('target'));
	$('#strActivityTargetScore').html(getLanguageString('score'));
	
	$('#activityRecordActivity').html(getLanguageString('activity_record_activity'));
	$('#activityOverviewBack').html(getLanguageString('back'));
	
	$('#strRecordActivity').html(getLanguageString('select_activity'));
	$('#strRecordActivityPlay').html(getLanguageString('activity_play'));
	$('#strRecordActivitySport').html(getLanguageString('activity_sport'));
	$('#strRecordActivityWalk').html(getLanguageString('activity_walk'));
	$('#strRecordActivityGym').html(getLanguageString('activity_gym'));
	$('#strRecordActivityCycle').html(getLanguageString('activity_cycle'));
	$('#strRecordActivityRow').html(getLanguageString('activity_row'));
	$('#strRecordActivityRun').html(getLanguageString('activity_run'));
	$('#strRecordActivitySwim').html(getLanguageString('activity_swim'));
	
	$('#activityStartTimer').html(getLanguageString('start_button'));
	$('#recordActivityBack').html(getLanguageString('back'));
	
	$('#strActivityCompleteScore').html(getLanguageString('score'));
	$('#activityCompleteDiscard').html(getLanguageString('discard_upper'));
	$('#activityCompleteRecord').html(getLanguageString('record_upper'));	
	
	$('#strJournal').html(getLanguageString('journal'));
	$('#journalOverviewBack').html(getLanguageString('back'));
	$('#journalOverviewFilter').html(getLanguageString('filter'));
	
	$('#strJournalFilter').html(getLanguageString('filterOptions'));
	$('#strJournalFilterAll').html(getLanguageString('filtersAll'));
	$('#strJournalFilterBG').html(getLanguageString('bloodGlucose'));
	$('#strJournalFilterBasal').html(getLanguageString('basalProfile'));
	$('#strJournalFilterTempBasal').html(getLanguageString('tab/tempbasal'));
	$('#strJournalFilterBolus').html(getLanguageString('bolus'));
	$('#strJournalFilterFood').html(getLanguageString('food_title'));
	$('#strJournalFilterActivity').html(getLanguageString('activity'));
	$('#strJournalFilterEvents').html(getLanguageString('event'));
	
	$('#journalFilterBack').html(getLanguageString('back'));
	$('#journalFilterOk').html(getLanguageString('ok'));
	
	$('#strSettings').html(getLanguageString('settings'));
	$('#strSettingsMuteAlerts').html(getLanguageString('notification'));
	$('#strSettingsFlightSafeMode').html(getLanguageString('airplane_mode'));
	$('#strSettingsPump').html(getLanguageString('pump'));
	$('#strSettingsHandset').html(getLanguageString('basicSettings'));
	$('#strSettingsApplication').html(getLanguageString('application'));	
	$('#settingsOverviewBack').html(getLanguageString('back'));
	
	$('#strPumpSettings').html(getLanguageString('pump_list_title'));
	$('#pumpSettingsBack').html(getLanguageString('back'));
	$('#pumpSettingsAdd').html(getLanguageString('foodBolus/add'));
	
	$('#strPumpFoundSuccess').html(getLanguageString('success'));
	$('#strPumpFound').html(getLanguageString('pumpFound'));
	$('#pumpFoundBack').html(getLanguageString('back'));
	$('#pumpFoundSave').html(getLanguageString('save'));
	
	$('#strPumpDetail').html(getLanguageString('pump_details_title'));
	$('#strPumpDetailReservoirLevel').html(getLanguageString('reservoir_level'));
	$('#strPumpDetailBatteryLevel').html(getLanguageString('battery_level'));
	$('#strPumpDetailSoftwareVersion').html(getLanguageString('softwareversion'));
	$('#strPumpDetailTestAlarm').html(getLanguageString('details_test'));
	$('#strPumpDetailEditName').html(getLanguageString('details_edit'));
	$('#strPumpDetailRemove').html(getLanguageString('details_remove'));
	$('#pumpDetailBack').html(getLanguageString('back'));
	$('#pumpDetailActivate').html(getLanguageString('activate'));
	
	$('#strHandsetSettings').html(getLanguageString('handsetSettings'));
	$('#strHandsetSettingsBrightness').html(getLanguageString('brightness'));
	$('#strHandsetSettingsAlarmTest').html(getLanguageString('details_test'));
	$('#strHandsetSettingsDateAndTime').html(getLanguageString('dateTime'));
	$('#strHandsetSettingsHandsetName').html(getLanguageString('handsetName_text'));
	$('#strHandsetSettingsLanguage').html(getLanguageString('language'));
	$('#strHandsetSettingsInformation').html(getLanguageString('factorySettings'));
	$('#strHandsetSettingsSubscription').html(getLanguageString('subscription'));
	$('#handsetSettingsBack').html(getLanguageString('back'));
	
	$('#strApplicationSettings').html(getLanguageString('application_title'));
	$('#strApplicationSettingsBG').html(getLanguageString('bloodGlucose'));
	$('#strApplicationSettingsInsulin').html(getLanguageString('insulin'));
	$('#strApplicationSettingsActivity').html(getLanguageString('activity'));
	$('#applicationSettingsBack').html(getLanguageString('back'));
	
	$('#strBrightness').html(getLanguageString('brightness'));
	$('#brightnessBack').html(getLanguageString('back'));
	$('#brightnessSave').html(getLanguageString('save'));
	
	$('#strDateTime').html(getLanguageString('setDateTime'));
	$('#dateTimeEditDate').html(getLanguageString('date'));
	$('#dateTimeEditTime').html(getLanguageString('time'));
	$('#dateTimeBack').html(getLanguageString('back'));
	$('#dateTimeSave').html(getLanguageString('save'));
	
	$('#strLanguage').html(getLanguageString('language'));
	$('#languageBack').html(getLanguageString('back'));
	$('#languageNext').html(getLanguageString('next'));
	
	$('#strInformation').html(getLanguageString('factorySettings'));
	$('#strInformationSIM').html(getLanguageString('SIM'));
	$('#strInformationBGMeasurementUnit').html(getLanguageString('bgUnit'));
	$('#strInformationCustomerSupport').html(getLanguageString('customerSupport'));
	$('#strInformationSoftwareVersion').html(getLanguageString('softwareversion'));
	$('#informationBack').html(getLanguageString('back'));
	
	$('#strApplicationBG').html(getLanguageString('bloodglucoseSettingsTitle'));
	$('#strApplicationBGTargetBGRange').html(getLanguageString('targetBGLevel'));
	$('#strApplicationBGHyperglycaemiaLimit').html(getLanguageString('hyperglycaemicLevel'));
	$('#strApplicationBGHypoglycaemiaLimit').html(getLanguageString('hypoglycaemicLevel'));
	$('#strApplicationBGBGReadingValidFor').html(getLanguageString('durationOfActiveBGReading'));
	$('#applicationBGBack').html(getLanguageString('back'));
	
	$('#strTargetBGRange').html(getLanguageString('targetBGLevel'));
	$('#targetBGRangeEditLow').html(getLanguageString('lowerTab'));
	$('#targetBGRangeEditHigh').html(getLanguageString('higherTab'));
	$('#targetBGRangeBack').html(getLanguageString('back'));
	$('#targetBGRangeSave').html(getLanguageString('save'));
	
	$('#strHyperglycaemiaLimit').html(getLanguageString('hyperglycaemicLevel'));
	$('#hyperglycaemiaLimitBack').html(getLanguageString('back'));
	$('#hyperglycaemiaLimitSave').html(getLanguageString('save'));
	
	$('#strHypoglycaemiaLimit').html(getLanguageString('hypoglycaemicLevel'));
	$('#hypoglycaemiaLimitBack').html(getLanguageString('back'));
	$('#hypoglycaemiaLimitSave').html(getLanguageString('save'));
	
	$('#strBGReadingValidFor').html(getLanguageString('durationOfActiveBGReading')+':');
	$('#strBGReadingValidForMinutes').html(getLanguageString('minutes'));
	$('#bgReadingValidForBack').html(getLanguageString('back'));
	$('#bgReadingValidForSave').html(getLanguageString('save'));
	
	$('#strApplicationInsulin').html(getLanguageString('insulin'));
	$('#bgCorrectionRatioBttn').html(getLanguageString('insulinToBG'));
	$('#insulinToCarbRatioBttn').html(getLanguageString('insulinToCarbRatio'));
	$('#strApplicationInsulinMaxBasalRate').html(getLanguageString('maxBasalPumpLimit'));
	$('#strApplicationInsulinMaxBolus').html(getLanguageString('maxBolusPumpLimit'));
	$('#strApplicationInsulinTimeToTarget').html(getLanguageString('timeToTarget'));
	$('#strApplicationInsulinTimeToTargetMinutes').html(getLanguageString('minutes'));
	$('#strApplicationInsulinLowReservoirAlert').html(getLanguageString('reservoirAlert'));
	$('#applicationInsulinBack').html(getLanguageString('back'));
	
	$('#strBGCorrectionRatio').html(getLanguageString('insulinToBG'));
	$('#bgCorrectionRatioBack').html(getLanguageString('back'));
	$('#bgCorrectionRatioSave').html(getLanguageString('save'));
	
	$('#strInsulinToCarbRatio').html(getLanguageString('insulinToCarbRatio'));
	$('#strInsulinToCarbRatioUnits').html(getLanguageString('units'));
	$('#strInsulinToCarbRatioGrams').html(getLanguageString('grams'));
	$('#insulinToCarbRatioBack').html(getLanguageString('back'));
	$('#insulinToCarbRatioSave').html(getLanguageString('save'));
	
	$('#strMaxBasalRate').html(getLanguageString('maxBasalPumpLimitTitle'));
	$('#strMaxBolusUnits').html(getLanguageString('units'));
	$('#maxBasalRateBack').html(getLanguageString('back'));
	$('#maxBasalRateSave').html(getLanguageString('save'));
	
	$('#strMaxBolus').html(getLanguageString('maximumBolusPumpLimit'));
	$('#maxBolusBack').html(getLanguageString('back'));
	$('#maxBolusSave').html(getLanguageString('save'));
	
	$('#strTimeToTarget').html(getLanguageString('timeToTarget'));
	$('#timeToTargetBack').html(getLanguageString('back'));
	$('#timeToTargetSave').html(getLanguageString('save'));
	
	$('#strLowReservoirAlert').html(getLanguageString('reservoirAlert'));
	$('#strLowReservoirAlertUnits').html(getLanguageString('units'));
	$('#lowReservoirAlertBack').html(getLanguageString('back'));
	$('#lowReservoirAlertSave').html(getLanguageString('save'));
	
	$('#strApplicationActivity').html(getLanguageString('settings_application_activity_settings'));
	$('#strApplicationActivityTargetScore').html(getLanguageString('settings_application_activity_button_title'));
	$('#applicationActivityBack').html(getLanguageString('back'));
	
	$('#strTargetActivityScore').html(getLanguageString('pam_target_title'));
	$('#targetActivityScoreBack').html(getLanguageString('back'));
	$('#targetActivityScoreSave').html(getLanguageString('save'));
	
	$('#keyboardBack').html(getLanguageString('back'));
	$('#keyboardNext').html(getLanguageString('save'));
	
	
	
}