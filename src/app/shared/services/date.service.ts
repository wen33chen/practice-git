import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 *  Date Service
 *	@author NT83392
 *	@version 1.00
 *           function                         Description
 *      =============================   ===============================================================================
 *        diffDayY2KS                     計算二Date物件相差天數之方法（日期2-日期1）。
 *        diffDayY2KString                計算二西元日期相差天數之方法（日期2-日期1）。
 *        isLeap                          判斷傳入之西元日期是否為閏年。
 *        addDate                         日期加減。
 *        getY2KToday                     取得當天日期(西元年格式)。
 *        getTime                         取得現在時刻。
 *        isADdate                        判斷西元年。
 *        stringToDate_Y2K                西元日期轉為日期物件。
 *        format                          將傳入的Date物件根據pattern(參數二)輸出(參照Date Pipe)。
 **/
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private datepipe: DatePipe
  ) { }

  /**
  *	計算二日期相差天數（日期2-日期1）
  *	@param date1 (Date) : 日期1
  * @param date2 (Date) : 日期2
  * @returns — A number of differDays
  **/
  diffDayY2K(date1: Date, date2: Date) {
    return (date2.valueOf() - date1.valueOf()) / 86400000;
  }

  /**
  *	計算二日期相差天數（日期2-日期1）
  *	@param date1 (string) : 日期1
  * @param date2 (string) : 日期2
  * @returns — A number of differDays
  **/
  diffDayY2KString(str1: string, str2: string) {
    return this.diffDayY2K(this.stringToDate_Y2K(str1), this.stringToDate_Y2K(str2));
  }

  /**
  *	heck AD date format, 3 pattern can be accepted yyyyMMdd, yyyy/MM/dd, yyyy-MM-dd」。
  *	@param strDate (string) : 西元年月日。
  **/
  isADdate(strDate: string) {
    const d = this.stringToDate_Y2K(strDate);
    if (!d || d.getMonth() !== (parseInt(RegExp.$2, 10) - 1) || d.getDate() !== parseInt(RegExp.$3, 10)) {
      return false;
    }
    return true;
  }

  /**
  *	轉為日期物件
  *	@param srcData (string) : 西元日期
  *	@return Date
  **/
  stringToDate_Y2K(srcData: string) {
    let d: Date;
    if ((
      srcData.match(/^(\d{4})(\d{2})(\d{2})$/))
      || (srcData.match(/^(\d{4})\/(\d{2})\/(\d{2})$/))
      || (srcData.match(/^(\d{4})-(\d{2})-(\d{2})$/))
    ) {
      d = new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10));
    }
    return d;
  }

  /**
  *	calculate Date。
  *         Ex :
  *           addDate( '2016-02-29',  1,  0,  0 );    return 2017-02-28
  *           addDate( '2016-02-29', -1,  0,  0 );    return 2015-02-28
  *           addDate( '2016-02-29',  4,  0,  0 );    return 2020-02-29
  *           addDate( '2016-02-29',  1,  1,  0 );    return 2017-03-28
  *           addDate( '2016-02-29', -1, -1,  0 );    return 2015-01-28
  *           addDate( '2016-02-29',  4, -1,  0 );    return 2020-01-29
  *           addDate( '2016-03-29', -1, -1,  0 );    return 2015-02-28
  *           addDate( '2015-01-29',  0,  1,  0 );    return 2015-02-28
  *           addDate( '2015-01-29',  0,  1,  1 );    return 2015-03-01
  *           addDate( '2015-01-29',  0,  1, -2 );    return 2015-02-26
  *           addDate( '2002-03-31',  0, -1,  0 );    return 2002-02-28
  *	@param strDate (String) : input date ( DB2 format layout is yyyy-MM-dd )
  *	@param intYY (number) : add years。
  *	@param intMM (number) : add months。
  *	@param intDD (number) : add days。
  * @returns — A date string
  **/
  addDate(strDate: string, intYY: number, intMM: number, intDD: number) {
    if (!strDate && strDate.length !== 10) { return ''; }
    const formatYear = parseInt(strDate.substr(0, 4), 10);
    const formatMonth = parseInt(strDate.substr(5, 2), 10) - 1;
    const formatDate = parseInt(strDate.substr(8, 2), 10);
    const calculateDate = new Date(formatYear, formatMonth, formatDate);
    if (intYY !== 0) {
      calculateDate.setFullYear(calculateDate.getFullYear() + intYY);
      // different date is leap year to change month and -1 day
      if (calculateDate.getDate() !== formatDate) {
        calculateDate.setMonth(formatMonth);
        calculateDate.setDate(formatDate - 1);
      }
    }
    if (intMM !== 0) {
      // use first day by next month to calculate
      const tempDate = calculateDate.getDate();
      calculateDate.setDate(1);
      calculateDate.setMonth(calculateDate.getMonth() + intMM);
      // change date
      const tempMonth = calculateDate.getMonth();
      calculateDate.setDate(tempDate);
      // different month is leap year to -1 day
      if (tempMonth !== calculateDate.getMonth()) {
        calculateDate.setDate(0);
      }
    }
    if (intDD !== 0) {
      calculateDate.setDate(calculateDate.getDate() + intDD);
    }
    // get month, date
    let calculateAfterMonth: any = calculateDate.getMonth() + 1;
    calculateAfterMonth = (calculateAfterMonth < 10 ? '-0' : '-') + calculateAfterMonth;
    let calculateAfterDate: any = calculateDate.getDate();
    calculateAfterDate = (calculateAfterDate < 10 ? '-0' : '-') + calculateAfterDate;
    return calculateDate.getFullYear() + calculateAfterMonth + calculateAfterDate;
  }

  /**
  *	將日期物件轉為指定的格式
  *	@param srcData (Date) : Date 物件
  * @param pattern (string) : 日期格式
  * @returns — A date string in the desired format.
  **/
  format(srcData: Date, pattern: string) {
    return this.datepipe.transform(srcData, pattern);
  }

  /**
 *	@public
 *	@class 判斷傳入之西元日期是否為閏年。
 *	@param datInput (String)
 *  @returns boolean
 **/
  isLeap(datInput: string) {
    let intYY: number;
    if (typeof datInput === 'string') {
      if (datInput.length > 4) {
        intYY = parseInt(datInput.substring(0, 4), 10);
      } else {
        intYY = parseInt(datInput, 10);
      }
    } else {
      intYY = datInput;
    }
    if (intYY % 4 === 0) {
      if (intYY % 100 === 0) {
        if (intYY % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  /**
 *	@public
 *	@class 取得當天日期(西元年格式)。
  * @returns — A date string
 **/
  getY2KToday() {
    const dateObject = new Date();
    const yyyy = String(dateObject.getFullYear());
    let MM = String(dateObject.getMonth() + 1);
    if (MM.length < 2) {
      MM = '0' + MM;
    }
    let dd = String(dateObject.getDate());
    if (dd.length < 2) {
      dd = '0' + dd;
    }
    const returnDate = yyyy + '-' + MM + '-' + dd;
    return returnDate;
  }

  /**
 *	@public
 *	@class 取得現在時刻。 <br>
  * @returns — A date string
 **/
  getTime() {
    const dt = new Date();
    let hh = String(dt.getHours());
    let mm = String(dt.getMinutes());
    let ss = String(dt.getSeconds());
    if (hh.length < 2) {
      hh = '0' + hh;
    }
    if (mm.length < 2) {
      mm = '0' + mm;
    }
    if (ss.length < 2) {
      ss = '0' + ss;
    }
    const time = hh + mm + ss;
    return time;
  }
}
