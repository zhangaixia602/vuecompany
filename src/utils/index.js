export function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds(); 
    function check(num) {
      return num < 10 ? "0" + num : num;
    }
    let timeText = `${check(year)}年${check(month)}月${check(day)}日  ${check(hours)}: ${check(minutes)}: ${check(seconds)}`;
    let nowDay = date.getDay();
    let weeks = new Array(
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    );
    let week = weeks[nowDay];
    let timeArry = {
        timeText,
        week
    };
    return timeArry;
  }