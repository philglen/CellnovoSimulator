<!-- GLOBAL VARIABLES -->

<!-- ARRAY OF FOOD ITEM NAMES -->
var foodItemsNameArr = new Array();
<!-- ARRAY OF FOOD ITEM FOOD GROUPS -->
var foodItemsFoodGroupArr = new Array();
<!-- ARRAY OF FOOD ITEM CARBOHYDRATE VALUES -->
var foodItemsCarbohydratesArr = new Array();
<!-- BOOLEAN ARRAY OF FOOD ITEMS FAVOURITE OR NOT -->
var foodItemsFavouriteArr = new Array();

<!-- CURRENT FOOD ITEM NAME -->
var newFoodItemName = '';
<!-- CURRENTLY SELECTED FOOD GROUP -->
var newFoodItemFoodGroup = '';
<!-- CURRENT CARBOHYDRATE VALUE -->
var newFoodItemCarbohydrates = 0;
<!-- WHETHER CURRENT FOOD ITEM IS A FAVOURITE OR NOT
var newFoodItemIsFavourite = false;
<!-- NEW OR EDIT FOOD ITEM -->
var isNewFoodItem;
<!-- LIST OF FOOD GROUPS -->
var foodGroupArr = new Array('Breakfast','Lunch','Dinner','Snack','Other');
<!-- LIST OF FOOD ITEM FILTERS -->
var foodFilterArr = new Array('All','Favourites','Breakfast','Lunch','Dinner','Snack','Other');
<!-- CURRENTLY EDITED FOOD ITEM -->
var thisFoodItemIndex;
<!-- CURRENT FOOD FILTER -->
var selectedFoodFilter;
<!-- NUMBER OF FOOD ITEMS CHECKED -->
var foodItemCheckedCount = 0;

var totalCarbohydrateValue = 0;

var foodPageCount;

var foodPageIndex;

$(window).load(function(){
	<!-- INITIALISE FOOD CARBOHYDRATES TUMBLER FOR BOLUS -->
	$(function(){
		$('#editFoodBolus').scroller({
			wheels: [ { 'hundreds': { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'}, 'tens': { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'}, 'units': { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'} } ],
			display: 'inline',
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeFoodBolusWheels(scrollerVals);
			}
		});    
	});
	
	$('#editFoodBolus').scroller('setValue', [0, 3, 0], true);
	
	<!-- INITIALISE CARBOHYDRATES TUMBLER FOR FOOD ITEM -->
	$(function(){
		$('#editCarbohydrates').scroller({
			wheels: [ { 'hundreds': { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'}, 'tens': { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'}, 'units': {0:'0',1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'} } ],
			display: 'inline',
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false
		});    
	});
	
	$('#editCarbohydrates').scroller('setValue', [0, 0, 0], true);
	
	<!-- CLICK FOOD LIBRARY BUTTON -->	
	$('#foodLibrary').click(function(){
		$('#food').hide(0);
		$('.foodFilterSelected').removeClass('foodFilterSelectedActive');
		$('#foodFilterSelect-1').addClass('foodFilterSelectedActive');
		showFoodLibrary();
	});
	<!-- CLICK BACK ON FOOD LIBRARY PAGE -->
	$('#foodListBack').click(function(){
		$('#foodList').hide(0);
		$('#food').show(0);
	});
	
	<!-- CLICK FILTER FOOD ITEMS BUTTON -->
	$('#foodFilter').click(function(){
		$('#foodList').hide(0);
		$('#foodFilterList').show(0);
		
		$('.foodFilterSelected').unbind('click');
		$('.foodFilterSelected').bind('click',function(){
			toggleFoodFilterSelected(this);
		});
	});
	<!-- CLICK BACK BUTTON ON FOOD FILTERS PAGE -->
	$('#foodFilterBack').click(function(){
		$('#foodFilterList').hide(0);
		$('#foodList').show(0);
	});
	
	$('#foodFilterOk').click(function(){
		$('#foodFilterList').hide(0);
		showFoodLibrary();
	});
	<!-- CLICK ADD FOOD BUTTON -->
	$('#foodAddFood').click(function(){
		addNewFoodItem();
	});
	<!-- CLICK CANCEL BUTTON ON NEW FOOD ITEM PAGE -->
	$('#foodAddNewItemCancel').click(function(){
		$('#foodList').show(0);
		$('#addFoodItem').hide(0);
	});
	<!-- CLICK FOOD ITEM NAME BUTTON -->
	$('#newFoodItemName').click(function(){
		resetKeyboard();
		if(trim(newFoodItemName) != ''){
			$('.caption').html(''+newFoodItemName+'');
		}
		showKeyboard(getLanguageString('qwerty_title'));
		$('#keyboardNext').bind('click',function(){
			var caption = trim($('.caption').html());
	
			if(caption == ''){
				showKeyboardError(getLanguageString('food_item_name_letters')+'<br />'+getLanguageString('basal/popup/wrongname/text'));
			}else{
				var duplicate = false;
				for(var i = 0;i<profileNamesArr.length; i++){
					if(caption == foodItemsNameArr[i]){
						duplicate = true;
						break;
					}
				}
				if(duplicate){
					showKeyboardError(getLanguageString('basal/popup/wrongname/title')+'<br />'+getLanguageString('basal/popup/wrongname/text'));
				}else{
					hideKeyboard();
					$('#newFoodItemNameValue').html('' + $('.caption').html() + '');
					newFoodItemName = '' + $('.caption').html() + '';
					$('#foodAddNewItemSave').removeClass('promptButtonDisabled');
					$('#foodAddNewItemSave').unbind('click');
					$('#foodAddNewItemSave').bind('click',function(){
						saveNewFoodItem();
					});
				}
			}
			
			/*
			
			if(trim($('.caption').html()) == ''){
				$('#newFoodItemNameValue').html(getLanguageString('newFood'));
				newFoodItemName = '';
				$('#foodAddNewItemSave').unbind('click');
				$('#foodAddNewItemSave').addClass('promptButtonDisabled');  
			}else{
				$('#newFoodItemNameValue').html('' + $('.caption').html() + '');
				 newFoodItemName = '' + $('.caption').html() + '';
				 $('#foodAddNewItemSave').removeClass('promptButtonDisabled');
				 $('#foodAddNewItemSave').unbind('click');
				$('#foodAddNewItemSave').bind('click',function(){
					saveNewFoodItem();
				});
			}
			*/
		});
	});
	<!-- CLICK CARBOHYDRATES BUTTON -->
	$('#newFoodItemCarbohydrates').click(function(){
		$('#foodCarbohydrates').show(0);
		$('#addFoodItem').hide(0);
		
		var sliderValueHundreds =  Math.floor(newFoodItemCarbohydrates/100);
		var sliderValueTens = Math.floor(((newFoodItemCarbohydrates - (sliderValueHundreds*100)))/10);	
		var sliderValueUnits = newFoodItemCarbohydrates - (sliderValueHundreds*100) - (sliderValueTens*10);
	
		$('#editCarbohydrates').scroller('setValue', [sliderValueHundreds,sliderValueTens,sliderValueUnits], true);
		
		
	});
	<!-- CLICK BACK BUTTON ON SET CARBOHYDRATES VALUE PAGE --> 
	$('#editFoodCarbohydratesBack').click(function(){
		$('#foodCarbohydrates').hide(0);
		$('#addFoodItem').show(0);
	});
	<!-- CLICK SAVE CARBOHYDRATES VALUE BUTTON -->
	$('#editFoodCarbohydratesSave').click(function(){
		$('#foodCarbohydrates').hide(0);
		$('#addFoodItem').show(0);
		
		newFoodItemCarbohydrates = calculateCarbohydrateValue();
		$('#newFoodItemCarbohydrateValue').html('' + newFoodItemCarbohydrates + '');
	});
	<!-- CLICK FOOD GROUP BUTTON -->
	$('#newFoodItemFoodGroup').click(function(){
		$('#foodGroupList').show(0);
		$('#addFoodItem').hide(0);
		
		$('.foodGroupItem').removeClass('foodGroupItemActive');
		var foodGroupIndex = checkIfIsInArray(newFoodItemFoodGroup,foodGroupArr) + 1;
		//var foodGroupIndex = checkIfIsInArray($('#newFoodItemFoodGroupValue').html(),foodGroupArr) + 1;
		if(foodGroupIndex != 0){
			$('#foodGroupSelect-'+foodGroupIndex).addClass('foodGroupItemActive');
		}
		
		$('.foodGroupItem').unbind('click');
		$('.foodGroupItem').bind('click',function(){
			toggleFoodGroupSelected(this);
		});
	});
	<!-- CLICK BACK BUTTON ON SELECT FOOD GROUP PAGE -->
	$('#editFoodGroupBack').click(function(){
		$('#foodGroupList').hide(0);
		$('#addFoodItem').show(0);
	});
	<!-- CLICK SAVE SELECTED FOOD GROUP BUTTON -->
	$('#editFoodGroupSave').click(function(){
		$('#foodGroupList').hide(0);
		$('#addFoodItem').show(0);
		if(newFoodItemFoodGroup == ''){
			$('#newFoodItemFoodGroupValue').html(getLanguageString('addFoodFoodGroupNone'));
		}else{
			$('#newFoodItemFoodGroupValue').html(''+newFoodItemFoodGroup+'');
		}
		
		
	});
	<!-- CLICK FAVOURITE FOOD ITEM BUTTON -->
	$('#newFoodItemIsFavourite').click(function(){
		toggleIsFoodItemFavourite();
	});
	
	<!-- CLICK DELETE FOOD ITEM BUTTON -->
	$('#newFoodItemDelete').click(function(){
		confirmDeleteFoodItem();
	});
	
	<!-- CLICK FOOD CALCULATOR BACK -->
	$('#foodCalculatorBack').click(function(){
		$('#foodCalculator').hide(0);
		showFoodLibrary()
	});
	
	<!-- CLICK FOOD CALCULATOR RECORD -->
	$('#foodCalculatorRecord').click(function(){
		//SAVE ANIMATION
		$('#foodCalculator').hide(0);
		showFoodLibrary();
		createJournalItemFood(foodItemCheckedCount, totalCarbohydrateValue);
		$('#dashFoodValue').html(''+totalCarbohydrateValue+'');
		$('#dashFoodRecordedAt').html(''+getCurrentTime()+'');
	});
	
	$('#foodItemNavigationNext').click(function(){
		if(foodPageIndex < foodPageCount){
			foodPageIndex++;
			updateFoodNavigation();
			var marginTop = (foodPageIndex*254)-254;
			$('#foodItemList').animate({"slide": "show", top:"-"+marginTop+"px"}, 1000);
		}
	});
	$('#foodItemNavigationPrev').click(function(){
		if(foodPageIndex > 1){
			foodPageIndex--;
			updateFoodNavigation();
			var marginTop = 254 - (foodPageIndex*254);
			$('#foodItemList').animate({"slide": "show", top:""+marginTop+"px"}, 1000);
		}
	});
	$('#foodOverviewBolus').click(function(){
		$('#food').hide(0);
		calculateBGValueUnits();
		
		$('#bolus').show(0);
		foodCarbsValue = calculateBolusCarbohydrateValue();
		
		$('#bolusFoodUnits').html(''+foodCarbsValue+'');
		$('#bolusFoodChecked').trigger('click');
	});
	
	$('#foodCalculateBolus').click(function(){
		resetFoodBolusCarbohydrates();
		$('#food').show(0);
		$('#foodCalculator').hide(0);
	});
	
});
<!-- TOGGLE WHETHER FOOD ITEM IS FAVOURITE OR NOT -->
function toggleIsFoodItemFavourite(){
	if(newFoodItemIsFavourite){
		newFoodItemIsFavourite = false;
		$('#newFoodItemIsFavourite').removeClass('newFoodItemActive');
		$('#newFoodItemIsFavouriteIcon').removeClass('newFoodItemIsFavouriteActive');
		
	}else{
		newFoodItemIsFavourite = true;
		$('#newFoodItemIsFavourite').addClass('newFoodItemActive');
		$('#newFoodItemIsFavouriteIcon').addClass('newFoodItemIsFavouriteActive');
		
	}

}
<!-- ADD FOOD ITEM -->
function addNewFoodItem(){
	$('#foodList').hide(0);
	$('#addFoodItem').show(0);
	
	isNewFoodItem = true;
	$('#newFoodItemDelete').hide(0);
	
	newFoodItemName = '';
	
	newFoodItemFoodGroup = null;
	newFoodItemCarbohydrates = 0;
	newFoodItemIsFavourite = false;
	
	$('#newFoodItemNameValue').html(getLanguageString('newFood'));
	$('#newFoodItemCarbohydrateValue').html('0');
	$('#newFoodItemFoodGroupValue').html(getLanguageString('addFoodFoodGroupNone'));
	$('#newFoodItemIsFavourite').removeClass('newFoodItemActive');
	$('#newFoodItemIsFavouriteIcon').removeClass('newFoodItemIsFavouriteActive');
}

<!-- TOGGLE BETWEEN SELCTED FOOD FILTER -->
function toggleFoodFilterSelected(butWhichItem){
	var foodFilterIndex = (butWhichItem.id).split('-')[1];
	selectedFoodFilter = foodFilterArr[foodFilterIndex-1];
	$('.foodFilterSelected').removeClass('foodFilterSelectedActive');
	$('#foodFilterSelect-'+foodFilterIndex).addClass('foodFilterSelectedActive');
}
<!-- CALCULATE CARBOHYDRATE VALUE BASED ON TUMBLER -->
function calculateCarbohydrateValue(){
	var carbohydrateScrollerVal = $('#editCarbohydrates').scroller('getValue');
	var carbohydrateValue = (carbohydrateScrollerVal[0]*100) + (carbohydrateScrollerVal[1]*10) + (carbohydrateScrollerVal[2]*1);
		
	return carbohydrateValue;
}
<!-- SAVE FOOD ITEM -->
function saveNewFoodItem(){
	if(isNewFoodItem){
		var foodIndex = foodItemsNameArr.length + 1;
		foodItemsNameArr[foodIndex-1] = $('#newFoodItemNameValue').html();
		foodItemsCarbohydratesArr[foodIndex-1] = $('#newFoodItemCarbohydrateValue').html();
		foodItemsFoodGroupArr[foodIndex-1] = $('#newFoodItemFoodGroupValue').html();
		foodItemsFavouriteArr[foodIndex-1] = newFoodItemIsFavourite;
		
		var foodListItem = '<div class="foodItem" id="foodItem-'+foodIndex+'">';                    	
        foodListItem += '<div class="foodItemChecked" id="foodItemChecked-'+foodIndex+'"></div>';
        foodListItem += '<div class="left">';
        foodListItem += '<div class="foodItemName yellow bold left" id="foodItemName-'+foodIndex+'"></div>';
		foodListItem +=	'<div class="foodItemIsFavourite" id="foodItemIsFavourite-'+foodIndex+'"></div>';
        foodListItem += '<div class="foodItemFoodGroup med white" id="foodItemFoodGroup-'+foodIndex+'"></div>';
        foodListItem += '</div>';
        foodListItem += '<div class="right bold yellow foodItemCarbohydrateValue"><span id="foodItemCarbohydrateValue-'+foodIndex+'"></span>g</div>';
        foodListItem += '</div>';
		
		$('#foodItemList').append(foodListItem);
		$('#foodItemName-'+foodIndex).html(''+foodItemsNameArr[foodIndex-1]+'');
		$('#foodItemFoodGroup-'+foodIndex).html(''+foodItemsFoodGroupArr[foodIndex-1]+'');
		$('#foodItemCarbohydrateValue-'+foodIndex).html(''+foodItemsCarbohydratesArr[foodIndex-1]+'');
		if(foodItemsFavouriteArr[foodIndex-1]){
			$('#foodItemIsFavourite-'+foodIndex).addClass('foodItemIsFavouriteActive');
		}
		
		$('#foodItemChecked-'+foodIndex).bind('click',function(event){
			event.stopPropagation();
			toggleFoodItemChecked(foodIndex);
		});
		
		$('#foodItem-'+foodIndex).bind('click',function(){
			editFoodItem(foodIndex-1);
		});
	}else{
		var foodIndex = thisFoodItemIndex + 1;
				
		foodItemsNameArr[foodIndex-1] = $('#newFoodItemNameValue').html();
		foodItemsCarbohydratesArr[foodIndex-1] = $('#newFoodItemCarbohydrateValue').html();
		foodItemsFoodGroupArr[foodIndex-1] = $('#newFoodItemFoodGroupValue').html();
		foodItemsFavouriteArr[foodIndex-1] = newFoodItemIsFavourite;
		
		$('#foodItemName-'+foodIndex).html(''+foodItemsNameArr[foodIndex-1]+'');
		$('#foodItemFoodGroup-'+foodIndex).html(''+foodItemsFoodGroupArr[foodIndex-1]+'');
		$('#foodItemCarbohydrateValue-'+foodIndex).html(''+foodItemsCarbohydratesArr[foodIndex-1]+'');
		if(foodItemsFavouriteArr[foodIndex-1]){
			$('#foodItemIsFavourite-'+foodIndex).addClass('foodItemIsFavouriteActive');
		}
		
	}
	$('#addFoodItem').hide(0);
	showFoodLibrary();
}
<!-- TOOGLE BETWEEN FOOD GROUPS LIST -->
function toggleFoodGroupSelected(butWhichItem){
	var foodGroupIndex = (butWhichItem.id).split('-')[1];
	newFoodItemFoodGroup = foodGroupArr[foodGroupIndex-1];
	$('.foodGroupItem').removeClass('foodGroupItemActive');
	$('#foodGroupSelect-'+foodGroupIndex).addClass('foodGroupItemActive');
}

<!-- EDIT FOOD ITEM -->
function editFoodItem(butWhich){
	thisFoodItemIndex = butWhich;
	
	newFoodItemName = foodItemsNameArr[thisFoodItemIndex];
	newFoodItemFoodGroup = foodItemsFoodGroupArr[thisFoodItemIndex];
	newFoodItemCarbohydrates = foodItemsCarbohydratesArr[thisFoodItemIndex];
	newFoodItemIsFavourite = foodItemsFavouriteArr[thisFoodItemIndex];
	
	isNewFoodItem = false;
	$('#newFoodItemDelete').show(0);
	
	$('#newFoodItemNameValue').html(''+newFoodItemName+'');
	$('#newFoodItemCarbohydrateValue').html(''+newFoodItemCarbohydrates+'');
	$('#newFoodItemFoodGroupValue').html(''+newFoodItemFoodGroup+'');
	
	if(newFoodItemIsFavourite){
		$('#newFoodItemIsFavourite').addClass('newFoodItemActive');
		$('#newFoodItemIsFavouriteIcon').addClass('newFoodItemIsFavouriteActive');	
	}else{
		$('#newFoodItemIsFavourite').removeClass('newFoodItemActive');
		$('#newFoodItemIsFavouriteIcon').removeClass('newFoodItemIsFavouriteActive');
	}
	//foodItemsFavouriteArr[foodIndex-1] = newFoodItemIsFavourite;
	$('#foodList').hide(0);
	$('#addFoodItem').show(0);
}

<!-- CONFIRM DELETE FOOD ITEM -->
function confirmDeleteFoodItem(){
	var foodIndex = thisFoodItemIndex;
	$('#standardPopup').show();
	$('#standardPopupYes').unbind('click');
	$('#popupTitle').html(getLanguageString('delete_confirm_title'));
	var popupTextHtml = '<span class="yellow bold">'+foodItemsNameArr[foodIndex]+'</span><br />'+getLanguageString('delete_confirm_info');
	$('#popupText').html(popupTextHtml);
	$('#standardPopupYes').bind('click',function(){
		$('#standardPopup').hide();
		deleteFoodItem();
	});
}
<!-- DELETE A FOOD ITEM -->
function deleteFoodItem(){
	var foodIndex = thisFoodItemIndex + 1;
				
	profilesArr[profileIndex-1] = null; 
	profileNamesArr[profileIndex-1] = null;
	profileBasalCountArr[profileIndex-1] = null;
	
	foodItemsNameArr[foodIndex-1] = null;
	foodItemsFoodGroupArr[foodIndex-1] = null;
	foodItemsCarbohydratesArr[foodIndex-1] = null;
	foodItemsFavouriteArr[foodIndex-1] = null;	
	$('#foodItem-'+foodIndex).hide(0);
	$('#addFoodItem').hide(0);
	$('#foodList').show(0);
}
<!-- TOGGLE CHECK A FOOD ITEM -->
function toggleFoodItemChecked(butWhich){
	if(foodItemCheckedCount == 0){
		$('#foodAddFood').addClass('promptButtonDisabled');
		$('#foodAddFood').removeClass('yellowPromptButton');
		$('#foodAddFood').unbind('click');
		$('#foodListCalculate').removeClass('promptButtonDisabled');
		$('#foodListCalculate').bind('click',function(){
			showFoodCalculator();
		});
	}
	
	if($('#foodItemChecked-'+butWhich).hasClass("foodItemCheckedActive")){
		$('#foodItemChecked-'+butWhich).removeClass("foodItemCheckedActive");
		
		$('#foodItem-'+butWhich).bind('click',function(){
			editFoodItem(butWhich-1);
		});
		
		foodItemCheckedCount--;
	}else{
		$('#foodItemChecked-'+butWhich).addClass("foodItemCheckedActive");
		$('#foodItem-'+butWhich).unbind('click');
		foodItemCheckedCount++;
	}
	$('#foodItemCheckedCount').html(foodItemCheckedCount);
	
	if(foodItemCheckedCount == 0){
		$('#foodAddFood').removeClass('promptButtonDisabled');
		$('#foodAddFood').addClass('yellowPromptButton');
		$('#foodAddFood').bind('click',function(){
			addNewFoodItem();
		});
		$('#foodListCalculate').addClass('promptButtonDisabled');
		$('#foodListCalculate').unbind('click');
		
	}
}
<!-- SHOW FOOD CALCULATOR -->
function showFoodCalculator(){
	$('#foodList').hide(0);
	$('#foodCalculator').show(0);
	$('#foodCalculatorList').html("");
	totalCarbohydrateValue = 0;
	
	for(i=0;i<foodItemsNameArr.length;i++){
		var foodIndex = i+1;
		if($('#foodItemChecked-'+foodIndex).hasClass("foodItemCheckedActive")){
			var foodListItem = '<div class="foodItem" id="foodCalculatorItem-'+foodIndex+'">';                    	
			foodListItem += '<div class="foodCalculatorItemRemove" id="foodCalculatorItemRemove-'+foodIndex+'"></div>';
			foodListItem += '<div class="left">';
			foodListItem += '<div class="foodItemName white bold left" id="foodCalculatorItemName-'+foodIndex+'"></div>';
			foodListItem += '<div class="foodItemFoodGroup med yellow" id="foodCalculatorItemFoodGroup-'+foodIndex+'"></div>';
			foodListItem += '</div>';
			foodListItem += '<div class="right bold yellow foodItemCarbohydrateValue"><span id="foodCalculatorItemCarbohydrateValue-'+foodIndex+'"></span>g</div>';
			foodListItem += '</div>';
			
			$('#foodCalculatorList').append(foodListItem);
			
			$('#foodCalculatorItemName-'+foodIndex).html(''+foodItemsNameArr[foodIndex-1]+'');
			$('#foodCalculatorItemFoodGroup-'+foodIndex).html(''+foodItemsFoodGroupArr[foodIndex-1]+'');
			$('#foodCalculatorItemCarbohydrateValue-'+foodIndex).html(''+foodItemsCarbohydratesArr[foodIndex-1]+'');
			totalCarbohydrateValue += parseInt(foodItemsCarbohydratesArr[foodIndex-1]);
			$('#foodCalculatorItemRemove-'+foodIndex).unbind('click');
			//alert(foodIndex);
			$('#foodCalculatorItemRemove-'+foodIndex).bind('click',function(){
				removeFoodCalculatorItem(this);
			});
			
		}
	}
	$('#foodCalculatorTotal').html(''+totalCarbohydrateValue+'');
}
<!-- REMOVE FOOD ITEM FROM FOOD CALCULATOR -->
function removeFoodCalculatorItem(elem){
	var foodIndex = elem.id.split('foodCalculatorItemRemove-')[1];
	$('#foodCalculatorItem-'+foodIndex).hide(0);
	totalCarbohydrateValue = (parseInt(totalCarbohydrateValue) - parseInt(foodItemsCarbohydratesArr[foodIndex-1]));
	$('#foodCalculatorTotal').html(''+totalCarbohydrateValue+'');
	toggleFoodItemChecked(foodIndex);
	
}
<!-- SHOW THE FOOD LIBRARY -->
function showFoodLibrary(){
	filterFood();
		
	foodPageIndex = 1;
	$('#foodItemList').css('top','0px');
	updateFoodNavigation();
	$('#foodList').show(0);
}
<!-- UPDATE FOOD PAGINATION -->
function updateFoodNavigation(){
	
	if(foodPageCount > 1){
		//DISPLAY PAGINATION
		$('#foodItemNavigation').show(0);
		
		var pageCountStr = '';
		var pageIndexStr = '';
		
		if(foodPageIndex < 10){
			pageIndexStr = '0'+foodPageIndex;
		}else{
			pageIndexStr = ''+foodPageIndex;
		}
		
		if(foodPageCount < 10){
			pageCountStr = '0'+foodPageCount;
		}else{
			pageCountStr = ''+ foodPageCount;
		}
		$('#foodItemNavigationPageNo').html(pageIndexStr+'/'+pageCountStr);
	}else{
		$('#foodItemNavigation').hide(0);
	}
}
<!-- FILTER LIST OF FOOD ITEMS -->
function filterFood(){
	var foodFilterIndex;
	for(var i = 1; i <= 7; i++){
		if($('#foodFilterSelect-'+i).hasClass('foodFilterSelectedActive')){
			foodFilterIndex = i-1;
			break;
		}
	}
	var foodItemCount = 0;
	for(var i = 0; i < foodItemsNameArr.length; i++){
		var foodIndex = i+1;
		if(foodItemsNameArr[i] != null){
			if(foodFilterIndex == 0){
				//ALL
				$('#foodItem-'+foodIndex).show(0);
				foodItemCount++;
			}else if(foodFilterIndex == 1){
				//FAVOURITES
				if(foodItemsFavouriteArr[i]){
					$('#foodItem-'+foodIndex).show(0);
					foodItemCount++;
				}else{
					$('#foodItem-'+foodIndex).hide(0);
				}
			}else if(foodItemsFoodGroupArr[i] == foodFilterArr[foodFilterIndex]){
				$('#foodItem-'+foodIndex).show(0);
				foodItemCount++;
			}else{
				$('#foodItem-'+foodIndex).hide(0);
			}
		}
	}
	foodPageCount = Math.ceil(foodItemCount / 4);
	

}

<!-- CALCULATE CARBOHYDRATE VALUE BASED ON TUMBLER -->
function calculateBolusCarbohydrateValue(){
	var carbohydrateScrollerVal = $('#editFoodBolus').scroller('getValue');
	var carbohydrateValue = (carbohydrateScrollerVal[0]*100) + (carbohydrateScrollerVal[1]*10) + (carbohydrateScrollerVal[2]*1);
		
	return carbohydrateValue;
}
<!-- RESET FOOD OVERVIEW -->
function resetFoodOverview(){
	$('#foodTitle').html(getLanguageString('food_title'));
	$('#editFoodBolus').scroller('setValue', [0, 3, 0], true);
	$('#foodOverviewBack').unbind('click');
	$('#foodOverviewBack').bind('click',function(){
		$("#food").animate({"slide": "hide", left:"272px"}, 600);
		$("#homepage").animate({"slide": "show", left:"0px"}, 600);
	});
	$('#foodLibrary').show(0);
}
<!-- RESET THE FOOD BOLUS CALCULATOR -->
function resetFoodBolusCarbohydrates(){
	$('#foodTitle').html(getLanguageString('food_customcarbo_title'));
	$('#editFoodBolus').scroller('setValue', [0, 3, 0], true);
	$('#foodOverviewBack').unbind('click');
	$('#foodOverviewBack').bind('click',function(){
		$('#food').hide(0);
		$('#foodCalculator').show(0);
		resetFoodOverview();
	});
	$('#foodLibrary').hide(0);
}

function changeFoodBolusWheels(scrollerVals){
	var scrollerValsHundreds = parseInt(scrollerVals[0]);
	var scrollerValsTens = parseInt(scrollerVals[1]);
	var scrollerValsUnits = parseInt(scrollerVals[2]);
	
	if(scrollerValsHundreds == 0 && scrollerValsTens == 0){
		var newWheels = [ { 'hundreds': {0:'0',1:'1',2:'2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'},'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'},'units': {1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}else {
		var newWheels = [ { 'hundreds': {0:'0',1:'1',2:'2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9'},'tens': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'},'units': {0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'} } ];
	}
	
	$('#editFoodBolus').scroller('destroy');
	
	$(function(){
		$('#editFoodBolus').scroller({
			wheels: newWheels,
			display: 'inline',			
			rows: 5,
			width: 75,
			height: 38,
			mode: 'scroller',
			showLabel: false,
			onChange: function(valueText, inst) {
				scrollerVals = inst.temp;
				changeFoodBolusWheels(scrollerVals);
			}
		});  
	});
}
