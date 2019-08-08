import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getTWLocales() {
    return {
      closeText: '關閉',
      prevText: '上個月',
      nextText: '下個月',
      currentText: '今天',
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      weekHeader: '週',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: '', // 年
      timeOnlyTitle: '僅時間',
      timeText: '時間',
      hourText: '時',
      minuteText: '分',
      secondText: '秒',
      ampm: false,
      month: '月',
      week: '週',
      day: '日',
      allDayText: '全天',
      today: '今日',
      clear: '清空'
    };
  }
}
