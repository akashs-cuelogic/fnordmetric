
var TimeRangePickerCalendar = function() {
  var translations = {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  };

  var elem;
  var date;

  this.render = function(parent_elem) {
    var tpl = templateUtil.getTemplate("f-timerange-picker-calendar-tpl");
    elem = tpl.querySelector("table");
    parent_elem.appendChild(tpl);

    date = new Date();
    date.setDate("1");

    watchMonthMover();

    renderMonthTitle();
    renderWeekdayTitles();
    renderDates();
  }

  this.setTranslations = function(custom_translations) {
    translations = custom_translations;
  }

/******************************** private *************************************/

  var watchMonthMover = function() {
    elem.querySelector("thead .prev").addEventListener("click", function(e) {
      date = getDateForMonthDiff(-1);
      update();
    }, false);

    elem.querySelector("thead .next").addEventListener("click", function(e) {
      date = getDateForMonthDiff(1);
      update();
    }, false);
  }

  var renderWeekdayTitles = function() {
    var tr = elem.querySelector("tr.weekdays");
    for (var i = 0; i < translations.weekdays.length; i++) {
      var td = document.createElement("td");
      td.innerHTML = translations.weekdays[i];
      tr.appendChild(td);
    }
  };

  var renderMonthTitle = function() {
    elem.querySelector(".title .month").innerHTML =
        translations.months[date.getMonth()];
    elem.querySelector(".title .year").innerHTML = date.getFullYear();
  }

  var renderDates = function() {
    var tr = elem.querySelector("tr.dates[data-week='0']");
    DomUtil.clearChildren(tr);

    var prev_month = getDateForMonthDiff(-1);
    var days_in_prev_month = dateUtil.daysInMonth(
        prev_month.getMonth() + 1,
        prev_month.getFullYear());

    /** weekday of first day in selected month **/
    var start_offset = (date.getDay() + 6) % 7;

    /** render days of previous month **/
    for (var i = 0; i < start_offset; i++) {
      var td = document.createElement("td");
      td.innerHTML = days_in_prev_month - start_offset + i + 1;
      tr.appendChild(td);
    }

    /** render days of selected month **/
    var counter = start_offset;
    var days_in_month = dateUtil.daysInMonth(
        date.getMonth() + 1,
        date.getFullYear());

    for (var i = 0; i < days_in_month; i++) {
      if (counter % 7 == 0) {
        tr = elem.querySelector("tr.dates[data-week='" + counter / 7 + "']");
        DomUtil.clearChildren(tr);
      }

      var td = document.createElement("td");
      td.innerHTML = i + 1;
      tr.appendChild(td);
      counter++;
    }

    /** render days of next month for remaining cells **/
    for (var i = 0; counter / 7 != 6; i++) {
      if (counter % 7 == 0) {
        tr = elem.querySelector("tr.dates[data-week='" + counter / 7 + "']");
        DomUtil.clearChildren(tr);
      }

      var td = document.createElement("td");
      td.innerHTML = i + 1;
      tr.appendChild(td);
      counter++;
    }
  }

  //FIXME better naming
  var getDateForMonthDiff = function(diff) {
    var d = new Date(date);
    var month = (d.getMonth() + (diff)) % 12;
    d.setMonth(month);
    if (diff < 0 && month == 11) {
      d.setFullYear(d.getFullYear() - 1);
    }

    if (diff > 0 && month == 0) {
      d.setFullYear(d.getFullYear() + 1);
    }

    return d;
  }

  var update = function() {
    renderMonthTitle();
    renderDates();
  }
}
