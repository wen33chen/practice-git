import { ValidatorFn } from '@angular/forms/forms';
import { AbstractControl } from '@angular/forms';


export function validatorValidator(nameRe: String[], validate?: Function): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let value = control.value;


    if (nameRe.includes('required')) {
      if (value == '') {
        return { 'returnMessage': "請輸入" };
      }
    }
    if (nameRe.includes('chinese')) {
      if (!/^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(value)) {
        return { 'returnMessage': "非中文" };
      }
    } else if (nameRe.includes('english') && !/^[a-zA-Z]+$/.test(value)) {
      return { 'returnMessage': "非英文" };
    } else if (nameRe.includes('chineseOrEnglish')) {
      if (!textChineseOrEnglish(value)) {
        return { 'returnMessage': '非中英字' };
      }
    } else if (nameRe.includes('chineseOrEnglishOrBlank')) {
      if (!textChineseOrEnglish(value, true)) {
        return { 'returnMessage': '非中英字或空白' };
      }
    } else if (nameRe.includes('fullType')) {
      let checkResult = value.match(/[^\x00-\xff]/g);

      let checkLength = 0;
      if (checkResult) {
        checkLength += checkResult.length;
      }

      if (value.length != checkLength) {
        return { 'returnMessage': '非全形字' };
      }

    } else if (nameRe.includes('halfType')) {
      if (hasFullType(value)) {
        return { 'returnMessage': '非半形字' }
      }
    } else if (nameRe.includes('number')) {
      if (!number(value)) {
        return { 'returnMessage': '請輸入正確數值' }
      }
    } else if (nameRe.includes('englishOrInteger')) {

      if (/^[a-zA-Z0-9]+$/.test(value)) {
        return { 'returnMessage': "非英數字" };;
      }

    } else if (nameRe.includes('email')) {
      let reg = /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,}$/;
      if (!reg.test(value)) {
        return { 'returnMessage': "email格式錯誤" };

      }
    } else if (nameRe.includes('digits')) {
      if (!/^\d+$/.test(value)) {
        return { 'returnMessage': "非有效正整數" };
      }
    } else if (nameRe.includes('date')) {

    } else if (nameRe.includes('phone')) {
      if (!/^09[0-9]{8}$/.test(value)) {
        return { 'returnMessage': "手機格式錯誤" };
      }
    } else if (nameRe.includes('ROCID') && !checkID(value)) {
      return { 'returnMessage': "身份證字號格式錯誤" };
    } else if (nameRe.includes('UniSN') && !checkUniSN(value)) {
      return { 'returnMessage': "營業人統一編號格式錯誤" };

    } else if (validate) {
      return validate();
    }

    return null;
  };
}



// ---------- 「統一編號」相關 ----------

// 營業人統一編號八碼各自的乘數
const uniSNMultiple = [1, 2, 1, 2, 1, 2, 4, 1];

// ---------------------------------------------------------

// ---------- 「國民身分證統一編號、居留證檢查」相關 ----------

// 正常的字母順序表
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 依公佈之字母對應數值，個位數乘以 9 加上十位數後，除以 10 所得之餘數的對應表
const modInt = [1, 0, 9, 8, 7, 6, 5, 4, 9, 3, 2, 2, 1, 0, 8, 9, 8, 7, 6, 5, 4, 3, 1, 3, 2, 0];

// 公佈之字母對應數值之個位數對應表
const digitInt = [0, 1, 2, 3, 4, 5, 6, 7, 4, 8, 9, 0, 1, 2, 5, 3, 4, 5, 6, 7, 8, 9, 2, 0, 1, 3];

// 驗証時各指定的乘數
const mulInt = [1, 8, 7, 6, 5, 4, 3, 2, 1];

const convertNumMapping = 'ABCDEFGHIJ';

// 計算國民身分証、居留證、旅行證號是否符合邏輯
/**
 *  @private
 *  @class 計算國民身分証、居留證、旅行證號是否符合邏輯
 *  @param id (String)
 *  @param tmpStr (String)
 *  @return String
 *  @author 劉本傑
 *  @version 1.00
 **/
function checkSum(id, tmpStr) {

  let lastChar = id.charAt(id.length - 1);
  if (isNaN(lastChar)) {
    return false;
  }

  //最後一碼為檢查碼
  let chkCode = parseInt(lastChar, 10);
  let sum = 0;

  //依各乘數計算和
  for (let i = 0; i < 9; i++) {
    let currChar = tmpStr.charAt(i);
    if (isNaN(currChar)) {
      return false;
    }
    sum += (parseInt(currChar) * mulInt[i]);
  }

  //取餘數
  let mod = sum % 10;

  //驗証補數
  return (mod == 0 && chkCode == 0) || (mod + chkCode == 10);
}

/**
 *  @private
 *  @class 轉換至檢核的 ID
 *  @param inputId (String) : 身分證號碼
 *  @return String
 *  @author 劉本傑
 *  @version 1.00
 **/
function convertCheckId(inputId) {
  inputId = inputId.toUpperCase();
  let lastWrodIndex = inputId.length - 1;
  let lastWord = inputId.charAt(lastWrodIndex);
  let num = convertNumMapping.indexOf(lastWord);
  let checkId;
  if (num >= 0) {
    checkId = inputId.substring(0, lastWrodIndex) + num;
  } else {
    checkId = inputId;
  }
  return checkId;
}

// ---------------------------------------------------------

/**
 *  @public
 *  @class 營業人統一編號檢核
 *  @param str (String) : 營業人統一編號
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function checkUniSN(str) {

  // 輸入參數不可為空值且長度共八位
  if (typeof (str) == 'undefined' || str == null || str == '' || str.length != 8) {
    return false;
  }

  // 組成驗證用的號碼字串
  let intValue = 0;

  // 傳入參數的第 7 碼的數字是否為 7
  let position7Is7 = false;

  for (let i = 0; i < str.length; i++) {

    let strTempCharAt = str.charAt(i);

    // 全部為數字型態
    if (isNaN(strTempCharAt)) {
      return false;
    }

    var num = parseInt(strTempCharAt, 10);

    // 判斷第 7 碼的數字是否為 7
    if (i == 6 && num == 7) {
      position7Is7 = true;
    }

    // 每個數字  × 乘數
    var multiplyNumber = num * uniSNMultiple[i];

    // 取得個位數（即 10 的餘數）
    var remainderByTen = multiplyNumber % 10;

    intValue += remainderByTen;

    // 取得十位數
    intValue += (multiplyNumber - remainderByTen) / 10;

  }

  // 若能被  10 整除，表示營業人統一編號正確
  var isValidate = intValue % 10 == 0;
  if (!isValidate && position7Is7) {
    intValue += 1;
    isValidate = intValue % 10 == 0;
  }

  return isValidate;
}
/**
 *  @public
 *  @class 檢核是否有輸入全形文字
 *  @param str (String) : 輸入文字
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function hasFullType(str) {
  var arr = str.match(/[^\x00-\xff]/g);
  return arr != null && arr.length > 0;
}
/**
 *  @public
 *  @class 檢核是否有輸入半形文字
 *  @param str (String) : 輸入文字
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function hasHalfType(str) {
  var arr = str.match(/[\x00-\xff]/g);
  return arr != null && arr.length > 0;
}
/**
 *  @public
 *  @class 檢核中華民國身份證字號
 *  @param str (String)
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function checkROCID(strID) {

  // 輸入參數不可為空值且長度共 10 碼
  if (typeof (strID) == 'undefined' || strID == null || strID == '' || strID.length != 10) {
    return false;
  }

  strID = convertCheckId(strID);

  var letterIndex = alphabet.indexOf(strID.charAt(0));

  if (letterIndex == -1) {
    return false;
  }

  var intNum = modInt[letterIndex];

  var tmpStr = '' + intNum + strID.substring(1, 10);

  return checkSum(strID, tmpStr);

}
/**
 *  @public
 *  @class 檢核中華民國護照
 *  @param str (String)
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function checkROCPassport(str) {
  // 第2碼性別碼
  if ("12".indexOf(str.substring(1, 2)) < 0) {
    return false;
  }
  return true;
}
/**
 *  @public
 *  @class 檢核中華民國無戶籍人民身份證號（居留證）
 *  @param str (String)
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function checkROCARC(strID) {

  // 輸入參數不可為空值且長度共 10 碼
  if (typeof (strID) == 'undefined' || strID == null || strID == '' || strID.length != 10) {
    return false;
  }

  strID = convertCheckId(strID);

  var letterIndex = alphabet.indexOf(strID.charAt(0));
  var secondIndex = alphabet.indexOf(strID.charAt(1));

  if (letterIndex == -1 || secondIndex == -1) {
    return false;
  }

  //轉換為數列
  var intNum = modInt[letterIndex];
  var intNum2 = digitInt[secondIndex];

  var tmpStr = '' + intNum + intNum2 + strID.substring(2, 10);

  return checkSum(strID, tmpStr);

}
/**
 *  @public
 *  @class 檢核中華民國無戶籍人民稅籍編號（舊制統一編號）
 *         稅籍編號共十碼（YYYYMMDDXX），其編碼規則為
 *         前八碼（YYYYMMDD）為護照內之西元出生年月日（例如：1979/06/30，則為 19790630）
 *         後兩碼（XX）為護照內英文姓名第一個字（不論姓或名）之前二個英文字母（例如：RANDY LIPE 則為 RA；KIN YEO YAP 則為 KI；CHEN, SHU HWA 則為 CH）
 *         以上述範例，則其稅籍編號為 19790630RA
 *  @param str (String)
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function checkROCOLDARC(strID) {

  // 輸入參數不可為空值且長度共 10 碼
  if (typeof (strID) == 'undefined' || strID == null || strID == '' || strID.length != 10) {
    return false;
  }

  var preStr = strID.substring(0, 8);
  if (!(preStr)) {
    return false;
  }

  var letter8Index = alphabet.indexOf(strID.charAt(8));
  var letter9Index = alphabet.indexOf(strID.charAt(9));

  if (letter8Index < 0 || letter9Index < 0) {
    return false;
  }

  return true;


}

function digits(v, isGreaterZero) {
  if (v == '') {
    return true;
  }
  var result = /^[0-9]+$/.test(v);
  if (result && isGreaterZero) {
    return parseInt(v, 10) > 0;
  }
  return result;
}
function number(v, isGreaterZero?) {
  if (v === '') {
    return true;
  }
  var result = /^[+-]?[\d\,]*\.?\d*([eE][+-]?\d+)?$/.test(v);
  if (result && isGreaterZero) {
    return parseInt(v, 10) > 0;
  }
  return result;
}
/**
 *  @public
 *  @class 檢查證件
 *           1.檢核中華民國身份證字號
 *           2.檢核中華民國無戶籍人民身份證號（居留證）
 *  @param str (String)
 *  @return boolean
 *  @author 劉本傑
 *  @version 1.00
 **/
function checkID(str) {
  // 輸入參數不可為空值且長度共 10 碼
  if (typeof (str) == 'undefined' || str == null || str == '' || str.length != 10) {
    return false;
  }
  // 第 2 碼為性別碼
  var gender = "ABCD".indexOf(str.charAt(1));
  return (gender >= 0) ? checkROCARC(str) : checkROCID(str);
}


function textChineseOrEnglish(v, allowBlank?) {
  if (v == '') {
    return true;
  }
  var checkResult1 = v.match(/[^\x00-\xff]/g);

  var checkResult2 = v.match(/[a-zA-Z]/g);

  var valueLength = v.length;
  var checkLenght = 0;
  if (checkResult1) {
    checkLenght += checkResult1.length;
  }
  if (checkResult2) {
    checkLenght += checkResult2.length;
  }
  var isSuccess = valueLength === checkLenght;

  if (!isSuccess && allowBlank === true) {
    var checkResult3 = v.match(/[\s]/g);
    if (checkResult3) {

      var addValue = checkResult3.length;
      if (checkResult1) {

        var beginIndex_checkResult3 = 0;
        for (var i = 0; i < checkResult1.length; i++) {
          if (beginIndex_checkResult3 >= checkResult3.length) {
            break;
          }
          var judgeCheckResult3 = checkResult3[beginIndex_checkResult3];
          if (checkResult1[i] === judgeCheckResult3) {
            beginIndex_checkResult3++;
          }
        }

        addValue -= beginIndex_checkResult3;

      }

      checkLenght += addValue;

      isSuccess = valueLength === checkLenght;
    }
  }
  return isSuccess;
}

// }
// export function ValidateValidator(control: AbstractControl) {


//   let str: string = control.value;

//   if (str.indexOf('-') == -1) {
//     return { 'phoneNumber': '電話格式錯誤!' };
//   }
//   else {
//     return null;
//   }
// }

// $('.required').each(function(index, ele) {
//   var tagName =  ele.tagName.toUpperCase();
//   let jEle = $(ele);
//   var suggestionDiv = jEle.parents('.suggestion-div');
//   if (tagName == 'INPUT' && suggestionDiv.length != 0) {
//       var emptyErrorMsg = suggestionDiv.attr(_emptyErrorMsg_attrName);
//       var notFoundErrorMsg = suggestionDiv.attr(_notFoundErrorMsg_attrName);
//       _checking(ele, function(v) {
//           return v != '';
//       }, emptyErrorMsg ? emptyErrorMsg : i18nUtil.getMessage('COMMON_VALIDATE_001', '請輸入'));
//       if (jEle.val().trim()) {
//           _checking(ele, function(v) {
//               return SuggestionUtil.getValue(jEle);
//           }, notFoundErrorMsg ? notFoundErrorMsg : i18nUtil.getMessage('COMMON_VALIDATE_001', '請輸入'));
//       }
//       return;
//   }
//   _checking(ele, function(v) {
//       return v != '';
//   }, i18nUtil.getMessage('COMMON_VALIDATE_001', '請輸入'));
// });

// $('.validate-text-chinese').each(function(index, ele) {
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_002', '非中文字'));
// });

// $('.validate-text-english').each(function(index, ele) {
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       return /^[a-zA-Z]+$/.test(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_003', '非英文字'));
// });

// $('.validate-text-chineseOrEnglish').each(function(index, ele) {
//   _checking(ele, function(v) {
//       return _validateRule.textChineseOrEnglish(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_004', '非中英字'));
// });

// $('.validate-text-chineseOrEnglishOrBlank').each(function(index, ele) {
//   _checking(ele, function(v) {
//       return _validateRule.textChineseOrEnglish(v, true);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_005', '非中英字或空白'));
// });

// $('.validate-text-fullType').each(function(index, ele) {
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       var checkResult = v.match(/[^\x00-\xff]/g);

//       var checkLenght = 0;
//       if (checkResult) {
//           checkLenght += checkResult.length;
//       }

//       return v.length == checkLenght;
//   }, i18nUtil.getMessage('COMMON_VALIDATE_006', '非全形字'));
// });

// $('.validate-text-halfType').each(function(index, ele) {
//   _checking(ele, function(v) {
//       return !validation.hasFullType(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_007', '非半形字'));
// });

// $('.validate-text-integer').each(function(index, ele) {
//   _checking(ele, _validateRule.digits, i18nUtil.getMessage('COMMON_VALIDATE_008', '非數字'));
// });

// $('.validate-text-digits').each(function(index, ele) {
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       return /^\d+$/.test(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_009', '非有效正整數'));
// });

// $('.validate-greater-than-zero').each(function(index, ele) {
//   _checking(ele, function(v) {
//       return _validateRule.digits(v, true);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_010', '請輸入大於零之有效數字格式'));
// });

// $('.validate-number').each(function(index, ele) {
//   _checking(ele, _validateRule.number, i18nUtil.getMessage('COMMON_VALIDATE_011', '請輸入正確數值'));
// });

// $('.validate-number-greater-than-zero').each(function(index, ele) {
//   _checking(ele, function(v) {
//       return _validateRule.number(v, true);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_012', '請輸入大於零之有效數值'));
// });

// $('.validate-text-englishOrInteger').each(function(index, ele) {
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       return /^[a-zA-Z0-9]+$/.test(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_013', '非英數字'));
// });

// $('.validate-email').each(function(index, ele) {
//   var reg = /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,}$/;
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       return reg.test(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_014', 'email格式錯誤'));
// });

// $('.validate-date').each(function(index, ele) {
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       return isADdate(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_015', '日期格式錯誤'));
// });

// $('.validate-cellphone').each(function(index, ele) { // 國內手機驗證09
//   _checking(ele, function(v) {
//       if (v == '') {
//           return true;
//       }
//       return /^09[0-9]{8}$/.test(v);// ←數字驗證範例
//   }, i18nUtil.getMessage('COMMON_VALIDATE_016', '手機格式錯誤'));
// });

// $('.validate-ROCID').each(function(index, ele) {
//   _checking(ele, function(v) {
//       return validation.checkID(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_017', '身份證字號格式錯誤'));
// });

// $('.validate-UniSN').each(function(index, ele) {
//   _checking(ele, function(v) {
//       return validation.checkUniSN(v);
//   }, i18nUtil.getMessage('COMMON_VALIDATE_018', '營業人統一編號格式錯誤'));
// });
