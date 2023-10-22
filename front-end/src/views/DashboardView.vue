<template>
  <div class="dashboard-container d-flex">
    <SideBar />
    <div class="dashboard-content">
      <AppHeader variant="dashboard" />
      <div class="dashboard-body d-flex">
        <div class="dashboard-main-card">
          <h5>Atendimentos</h5>

          <div
            class="dashboard-main-card-body"
            :class="{ 'empty-data': isEmpty(lastAttendances) && isEmpty(nextAttendances) }">
            <p v-if="!isEmpty(nextAttendances)" class="big-text">Próximos</p>
            <div class="main-card-attendance-items">
              <Attendance
                v-for="(attendance, index) in nextAttendances"
                :key="index"
                :startTime="attendance.startTime"
                :endTime="getEndTime(attendance.startTime, attendance.estimatedTime)"
                :date="attendance.date"
                :customer="attendance.customer"
                :phoneNumber="attendance.phoneNumber"
                :barber="attendance.barber"
                />
            </div>

            <p v-if="!isEmpty(lastAttendances)" class="big-text">Ultimos</p>
            <div class="main-card-attendance-items">
              <Attendance
                v-for="(attendance, index) in lastAttendances"
                :key="index"
                :startTime="attendance.startTime"
                :endTime="getEndTime(attendance.startTime, attendance.estimatedTime)"
                :date="attendance.date"
                :customer="attendance.customer"
                :phoneNumber="attendance.phoneNumber"
                :barber="attendance.barber"
                />
            </div>
            <template v-if="isEmpty(lastAttendances) && isEmpty(nextAttendances)">
              Nenhum atendimento ainda.
            </template>
          </div>
          <div class="dashboard-main-card-footer">
            <button class="button mb-2" @click.prevent="goToAgenda()">
              Ir para agenda
            </button>
          </div>
        </div>

        <div class="dashboard-record-cards d-flex-col">
          <div class="dashboard-record-card d-flex">
            <div class="dashboard-record-card-icon-container blue">
              <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.78 6.59999H7.49998C5.55594 6.59999 3.97998 8.17594 3.97998
                10.12V15.4M12.78 6.59999H24.22M12.78 6.59999V3.07999M12.78 6.59999V9.23999M24.22
                6.59999H29.5C31.444 6.59999 33.02 8.17594 33.02 10.12V15.4H3.97998M24.22
                6.59999V3.07999M24.22 6.59999V9.23999M3.97998 15.4V28.6C3.97998 30.544 5.55594
                32.12 7.49998 32.12H16.3M23.34 27.72L27.3 32.12L34.78 24.2" stroke="#1B1B1B"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="dashboard-record-card-info">
              <h5 class="dashboard-record-card-value">550</h5>
              <span class="dashboard-record-card-title">Serviços realizados</span>
            </div>
          </div>

          <div class="dashboard-record-card d-flex">
            <div class="dashboard-record-card-icon-container green">
              <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.78 14.72C26.939 14.72 29.5 12.1591 29.5 9C29.5 5.84093 26.939 3.28
                23.78 3.28M24.22 20.88H24.44C29.1786 20.88 33.02 24.7214 33.02 29.46C33.02 31.0395
                31.7395 32.32 30.16 32.32H27.3M18.94 9C18.94 12.1591 16.379 14.72 13.22
                14.72C10.0609 14.72 7.49998 12.1591 7.49998 9C7.49998 5.84093 10.0609 3.28 13.22
                3.28C16.379 3.28 18.94 5.84093 18.94 9ZM6.83998 32.32H19.6C21.1795 32.32 22.46
                31.0395 22.46 29.46C22.46 24.7214 18.6186 20.88 13.88 20.88H12.56C7.82138 20.88
                3.97998 24.7214 3.97998 29.46C3.97998 31.0395 5.26045 32.32 6.83998 32.32Z"
                stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="dashboard-record-card-info">
              <h5 class="dashboard-record-card-value">131</h5>
              <span class="dashboard-record-card-title">Clientes cadastrados</span>
            </div>
          </div>

          <div class="dashboard-record-card d-flex">
            <div class="dashboard-record-card-icon-container yellow">
              <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.22 9.20003C24.22 12.3591 21.6591 14.92 18.5 14.92C15.3409 14.92 12.78
                12.3591 12.78 9.20003C12.78 6.04096 15.3409 3.48003 18.5 3.48003C21.6591 3.48003
                24.22 6.04096 24.22 9.20003Z" stroke="#1B1B1B" stroke-width="1.5"
                stroke-linejoin="round"/>
                <path d="M7.5 29.66C7.5 24.9214 11.3414 21.08 16.08 21.08H20.92C25.6586 21.08 29.5
                24.9214 29.5 29.66C29.5 31.2396 28.2195 32.52 26.64 32.52H10.36C8.78047 32.52 7.5
                31.2396 7.5 29.66Z" stroke="#1B1B1B" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="dashboard-record-card-info">
              <h5 class="dashboard-record-card-value">2</h5>
              <span class="dashboard-record-card-title">Barbeiros cadastrados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import Attendance from '@/components/Dashboard/Attendance.vue';
import Attendances from '@/resources/AttendancesMockup.json';

export default {
  name: 'DashboardView',
  components: {
    Attendance,
  },
  data() {
    return {
      attendancesData: Attendances,
      lastAttendances1: [],
    };
  },
  computed: {
    lastAttendances() {
      return this.attendancesData.filter((attendance) => {
        const startDate = moment(`${attendance.date} ${attendance.startTime}`, 'DD-MM-YYYY HH:mm');
        const endDate = startDate.add(attendance.estimatedTime, 'm');
        const now = moment();

        return endDate.isBefore(now);
      });
    },
    nextAttendances() {
      return this.attendancesData.filter((attendance) => {
        const startDate = moment(`${attendance.date} ${attendance.startTime}`, 'DD-MM-YYYY HH:mm');
        const endDate = startDate.add(attendance.estimatedTime, 'm');
        const now = moment();

        return endDate.isAfter(now);
      });
    },
  },
  methods: {
    goToAgenda() {
      this.$router.push('/agenda');
    },
    getEndTime(startTime, estimatedTime) {
      return moment(startTime, 'HH:mm').add(estimatedTime, 'm').format('HH:mm');
    },
    isEmpty(array) {
      return array.length === 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  .dashboard-content {
    width: 100%;
    .dashboard-body {
      margin-top: -80px;
      padding: 0 64px;
      justify-content: space-between;
      .dashboard-main-card {
        background: $white;
        width: 70%;
        border-radius: 15px;
        min-height: 750px;
        padding: 32px;
        h5 {
          padding-bottom: 16px;
          text-align: center;
          border-bottom: 1px solid $gray20;
          margin-bottom: 32px;
        }
        .dashboard-main-card-body {
          min-height: 70%;
          &.empty-data {
            display: flex;
            justify-content: center;
            align-items: center;
            color: $gray60;
          }
          .main-card-attendance-items {
            div {
              margin-bottom: 16px;
            }
            :last-child {
              border: unset;
            }
          }
        }
        .dashboard-main-card-footer {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid $gray20;
          text-align: center;
        }
      }
      .dashboard-record-cards {
        width: 25%;
        .dashboard-record-card {
          background: $white;
          border-radius: 15px;
          padding: 16px;
          justify-content: space-between;
          margin-bottom: 16px;
          .dashboard-record-card-icon-container {
            padding: 10px;
            width: fit-content;
            border-radius: 6px;
            &.blue {
              background: $blue10;
            }
            &.green {
              background: $green10;
            }
            &.yellow {
              background: $yellow10;
            }
          }
          .dashboard-record-card-info {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
