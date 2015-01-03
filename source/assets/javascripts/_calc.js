
(function(){

    // variables
    var f = document.calc;
    var baseFontSize = f.baseFontSize;
    var ratio = f.ratio;
    var baselineHeight = f.baseline;
    var contentHeight = f.contentHeight;
    var numOfBaselines = f.numOfBaselines;
    var newContentHeight = f.newContentHeight;
    var outsideMargin = f.outsideMargin;
    var moreMarginThanBaseline = f.moreMarginThanBaseline;
    var takeCareOfRows = f.takeCareOfRows;
    var rows = document.getElementById('rows');
    var disableColor = "#C1D0D0";


    // Events
    calcBaselineHeight = function(){
        baselineHeight.value = Math.round(baseFontSize.value*ratio.value*1000)/1000;
    };
    calcLines = function(){
        lines = Math.floor(contentHeight.value/baselineHeight.value);
        numOfBaselines.value = lines;
    };
    calcNewContentHeight = function(){
        newContentHeight.value = lines*baselineHeight.value;
    };
    calcOutsideMargin = function(){
        outsideMargin.value = (contentHeight.value-newContentHeight.value)/2;
    };

    calcMoreMarginThanBaseline = function(){
        if (moreMarginThanBaseline.checked == true) {
            while(Number(outsideMargin.value) < Number(baselineHeight.value)){
                --lines;
                numOfBaselines.value = lines;
                newContentHeight.value = lines*baselineHeight.value;
                outsideMargin.value = (contentHeight.value-newContentHeight.value)/2;
            }
        }
    };



    calcRows = function(){

        // Set max # of rows
        var rows_max = numOfBaselines.value
        rows.value = rows_max;

        // Get valid # of rows with exactly the same gutter.
        var validRows_arr = [];
        for (var i = 1; i < rows.value ; i++){
            var rowsCurrentValue = i;

            // Get gutter size.
            // Again, doesn’t know its row height
            // is the integer or not. (e.g. 20.125 || 45)
            // example: 10 rows has 9 gutters (= 10 - 1)
            var gutter = rowsCurrentValue - 1;

            // Get new # of baselines.
            // Again, doesn’t know its each row height
            // is the integer or not. (e.g. 20.125 || 45)
            var newLinesSubstractGutters = rows_max - gutter;

            // Get # of baselines in a single row.
            // Again, doesn’t know its each row height
            // is the integer or not. (e.g. 20.125 || 45)
            var singleRowLines = newLinesSubstractGutters/rowsCurrentValue;

            // Check the # of single row baseline is the integer or not.
            var j = singleRowLines;
            if (Math.round(j) === j){
                validRows_arr.push(rowsCurrentValue);
            }
        }

        // Clear rows text
        rows.innerHTML = "";

        // Remove the max row and 1 row.
        var rows_result = validRows_arr;
        for (var i = 0; i < rows_result.length; i++){
            if (rows_result[i] != 1 && rows_result[i] != rows_max){
                rows.innerHTML = rows.innerHTML + ', ' + rows_result[i];
            }
        }

        // Remove a comma and a space.
        var rows_prettify = rows.innerHTML.replace(/^,\s/,'');
        rows.innerHTML = rows_prettify;
    };


    checkTakeCareOfRowsBtn = function(){
        var label = takeCareOfRows.parentNode.previousSibling;
        var inputBox = takeCareOfRows.parentNode.nextSibling;

        if (takeCareOfRows.checked == false) {
            label.style.color = disableColor;
            rows.innerHTML = '';
        }
        if (takeCareOfRows.checked == true) {
            label.removeAttribute("style");
            calcRows();
       }
    };

    // Check input field
    validateInputs = function(){
        // validate object height input field
        // if (contentHeight.innerHTML === 0){
        //     console.log('empty');
        // } else {
        //     console.log('hello');
        //     console.log(contentHeight.value);
        // }

        if (takeCareOfRows.checked == true && rows.innerHTML == ""){
            rows.innerHTML = "There’s no valid rows :( <br>Tips: Try changing base font size or ratio.";
        }
    }

    copyAsMarkdown = function(){
        var copyButton = document.getElementById('copyAsMarkdown');
        var copy_sectionHead_keyValue = "# My key values";
        var copy_contentHeight = "Object height: " + contentHeight.value;
        var copy_baseFontSize = "Base font size: " + baseFontSize.value;
        var copy_ratio = "Ratio: " + ratio.value + " (" + ratio.options[ratio.selectedIndex].text + ")";
        var copy_sectionHead_newValue = "# My new values";
        var copy_newContentHeight = "New object height: " + newContentHeight.value;
        var copy_baselineHeight = "Baseline height: " + baselineHeight.value;
        var copy_numOfBaselines = "Number of baselines in the new object: " + numOfBaselines.value;
        var copy_outsideMargin = "Outside margin: " + outsideMargin.value;
        var copy_validRows = "Valid rows: " + rows.innerHTML;


        copyButton.dataset.clipboardText =
            copy_sectionHead_keyValue + "\n" +
            copy_contentHeight + "\n" +
            copy_baseFontSize + "\n" +
            copy_ratio + "\n" + "\n" +
            copy_sectionHead_newValue + "\n" +
            copy_newContentHeight + "\n" +
            copy_baselineHeight + "\n" +
            copy_numOfBaselines + "\n" +
            copy_outsideMargin + "\n";

        if (takeCareOfRows.checked == true) {
            copyButton.dataset.clipboardText += copy_validRows;
        }
        copyButton.addEventListener('mouseenter', function(){
            this.style.color = '#4958E5';
        }, false);
        copyButton.addEventListener('mouseout', function(){
            this.removeAttribute("style");
        }, false);

    };

    calculate = function(){
        calcBaselineHeight();
        calcLines();
        calcNewContentHeight();
        calcOutsideMargin();
        calcMoreMarginThanBaseline();
        checkTakeCareOfRowsBtn();
        copyAsMarkdown();
        validateInputs();
    };


    // Trigger
    calculate();
    f.onchange = function(){
        calculate();
    };


})();
