<template>
  <div class="calendar-container d-flex">
    <div
      class="calendar-week"
      v-for="(week, index) in getCalendar()"
      :key="index">
      <div
        @click="selectDay(item.date)"
        @keypress="selectDay(item.date)"
        class="calendar-item"
        :class="{
          'calendar-weekday': item.type === 'weekday',
          'calendar-lastmonth': item.type === 'lastmonth',
          'calendar-currentmonth': item.type === 'currentmonth',
          'calendar-nextmonth': item.type === 'nextmonth',
          'calendar-today': item.date && item.date.isSame(today(), 'day'),
          'calendar-active': item.date && item.date.isSame(selectedDate, 'day'),
        }"
        v-for="(item, index) in week"
        :key="index">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CalendarComponent',
  props: {
    day: {
      type: [Number, Object],
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedDate: moment(`${this.day}/${this.month}/${this.year}`, 'D/M/Y'),
    };
  },
  methods: {
    getWeekdays() {
      return moment.weekdaysShort().map((weekday) => ({ name: weekday, type: 'weekday' }));
    },
    getCurrentMonth(format = 'M') {
      return Number.parseInt(moment().format(format), 10);
    },
    getDaysOfTheMonth(monthNumber, type) {
      if (monthNumber === 0) {
        const daysInMonth = moment(12, 'M').daysInMonth();
        return Array.from({ length: daysInMonth }, (_, index) => ({
          name: index + 1,
          type,
          date: moment(`${index + 1}/12/${this.year - 1}`, 'D/M/Y'),
        }));
      }
      const daysInMonth = moment(monthNumber, 'M').daysInMonth();
      return Array.from({ length: daysInMonth }, (_, index) => ({
        name: index + 1,
        type,
        date: moment(`${index + 1}/${monthNumber}/${this.year}`, 'D/M/Y'),
      }));
    },
    getLastDays(daysOfTheMonth, numberOfDays) {
      if (numberOfDays === 0) {
        return [];
      }
      return daysOfTheMonth.slice(-numberOfDays);
    },
    getDays() {
      const lastMonth = this.month - 1;
      const nextMonth = this.month + 1;
      const frstDayOfTheMonth = moment(`1/${this.month}/${this.year}`, 'D/M/Y');
      const dayOfTheWeekOfTheFirstDayOfTheMonth = frstDayOfTheMonth.day();
      const daysOfTheLastMonth = this.getDaysOfTheMonth(lastMonth, 'lastmonth');
      const lastDays = this.getLastDays(daysOfTheLastMonth, dayOfTheWeekOfTheFirstDayOfTheMonth);
      const days = lastDays.concat(this.getDaysOfTheMonth(this.month, 'currentmonth'));
      let nextDay = 1;

      while (days.length < 42) {
        if (nextMonth === 13) {
          days.push({
            name: nextDay,
            type: 'nextmonth',
            date: moment(`${nextDay}/1/${this.year + 1}`, 'D/M/Y'),
          });
        } else {
          days.push({
            name: nextDay,
            type: 'nextmonth',
            date: moment(`${nextDay}/${nextMonth}/${this.year}`, 'D/M/Y'),
          });
        }
        nextDay += 1;
      }

      return days;
    },
    getCalendar() {
      const weekdays = this.getWeekdays();
      const days = this.getDays();
      const weekdaysAndDays = weekdays.concat(days);
      const calendar = [];
      const sunday = [];
      const monday = [];
      const tuesday = [];
      const wednesday = [];
      const thursday = [];
      const friday = [];
      const saturday = [];

      let i = 0;

      while (i < 7) {
        sunday.push(weekdaysAndDays.shift());
        monday.push(weekdaysAndDays.shift());
        tuesday.push(weekdaysAndDays.shift());
        wednesday.push(weekdaysAndDays.shift());
        thursday.push(weekdaysAndDays.shift());
        friday.push(weekdaysAndDays.shift());
        saturday.push(weekdaysAndDays.shift());

        i += 1;
      }

      calendar.push(sunday);
      calendar.push(monday);
      calendar.push(tuesday);
      calendar.push(wednesday);
      calendar.push(thursday);
      calendar.push(friday);
      calendar.push(saturday);

      return calendar;
    },
    today() {
      return moment();
    },
    selectDate(date) {
      this.selectedDate = date;
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-container {
  background-color: $white;
  padding: 24px;
  border-radius: 10px;
  justify-content: space-between;
  .calendar-week {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: capitalize;
    .calendar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      line-height: 16px;
      border-radius: 100%;
      user-select: none;
      &:hover {
        cursor: pointer;
        background-color: $gray20;
        color: $primary;
      }
    }
    .calendar-weekday {
      margin-bottom: 8px;
      &:hover {
        cursor: default;
        background-color: unset;
        color: unset;
      }
    }
    .calendar-lastmonth {
      color: $gray30;
    }
    .calendar-nextmonth {
      color: $gray30;
    }
    .calendar-today {
      border: 1px solid $primary !important;
      background-color: unset !important;
      color: unset !important;
    }
    .calendar-active {
      background-color: $primary !important;
      color: $white !important;
    }
    :last-child {
      margin-bottom: 0;
    }
  }
}
</style>
