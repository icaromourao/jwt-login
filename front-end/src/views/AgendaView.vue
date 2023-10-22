<template>
  <div class="agenda-container d-flex">
    <SideBar />
    <div class="agenda-content">
      <AppHeader variant="search" />
      <div class="agenda-body">
        <div class="agenda-body-title d-flex mb-4">
          <h3>Agenda</h3>
          <button class="button mb-2" @click.prevent="newSchedule()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.75 16.0001H16M16 16.0001H19.25M16 16.0001V12.75M16 16.0001V19.25M6.75
              3.75H3.75C2.64543 3.75 1.75 4.64543 1.75 5.75C1.75 5.75 1.75 7.57843 1.75 8.75M6.75
              3.75H13.25M6.75 3.75V1.75M6.75 3.75V5.25M13.25 3.75H16.25C17.3546 3.75 18.25 4.64543
              18.25 5.75V8.75C18.25 8.75 8.19365 8.75 1.75 8.75M13.25 3.75V1.75M13.25
              3.75V5.25M1.75 8.75C1.75 11.6789 1.75 16.25 1.75 16.25C1.75 17.3546 2.64543
              18.25 3.75 18.25H8.75" stroke="white" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
            </svg>
            Novo Agendamento
          </button>
        </div>

        <div class="agenda-body-content">
          <div class="agenda-barber-selector-container mb-4">
            <CustomSelect :options="barbers" v-model="barber" :default="barbers[0]" />
          </div>
          <div class="agenda-body-content-row d-flex">
            <div class="agenda-body-content-col col-4 pr-2">
              <h6 class="mb-4">Calendário</h6>
              <div class="d-flex mb-2">
                <CustomSelect
                  class="mr-4"
                  :options="years"
                  v-model="year"
                  :default="year"
                  title="Ano" />
                <CustomSelect
                  :options="months"
                  v-model="month"
                  :default="getCurrentMonth('MMMM')"
                  title="Mês" />
              </div>
              <Calendar
                v-model="day"
                :day="day"
                :month="Number.parseInt(month, 10)"
                :year="year"/>
            </div>

            <div class="agenda-body-content-col col-4 px-2">
              <Schedule
                :selectedDate="today()"
                :availableTime="availableTime"
                :schedule="schedule"/>
            </div>

            <div class="agenda-body-content-col col-4">
              <div class="">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import ScheduleMockup from '@/resources/ScheduleMockup.json';

import Calendar from '@/components/Agenda/Calendar.vue';
import Schedule from '@/components/Agenda/Schedule.vue';

export default {
  name: 'AgendaView',
  components: {
    Calendar,
    Schedule,
  },
  data() {
    return {
      barber: null,
      barbers: [
        { id: 0, name: 'Leonardo Lima de Oliveira' },
        { id: 1, name: 'Nikolas de Sena Mourão' },
        { id: 2, name: 'Acássio Alves Portela' },
      ],
      years: this.getYears(),
      months: this.getMonths(),
      year: this.getCurrentYear(),
      month: this.getCurrentMonth(),
      day: this.getCurrentDay(),
      availableTime: [
        '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
        '19:00'],
      schedule: ScheduleMockup,
    };
  },
  methods: {
    newSchedule() {
      console.log('newSchedule');
    },
    getYears(back = 3) {
      const currentYear = moment().year();

      return Array.from({ length: back }, (_, index) => currentYear - back + index + 1);
    },
    getCurrentMonth(format = 'M') {
      return moment().format(format);
    },
    getCurrentYear() {
      return moment().year();
    },
    getCurrentDay() {
      return moment().date();
    },
    getMonths() {
      return moment.months().map((month, index) => ({ name: month, id: index + 1 }));
    },
    today() {
      return moment();
    },
  },
};
</script>

<style lang="scss" scoped>
.agenda-container {
  height: 100vh;
  .agenda-content {
    width: 100%;
    overflow: auto;
    .agenda-body {
      padding: 32px 64px;
      .agenda-body-title {
        justify-content: space-between;
        .button {
          display: flex;
          align-items: center;
          background-color: $green20;
          svg {
            margin-right: 8px;
          }
        }
      }
      .agenda-body-content {
        .agenda-barber-selector-container {
          display: flex;
          justify-content: center;
          max-width: 280px;
          margin: auto;
        }
        .agenda-body-content-row {
          display: flex;
        }
      }
    }
  }
}
</style>
