<template>
  <div class="schedule-container">
    <div class="schedule-content">
      <div class="schedule-header">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.875 10.125L11.625 15L16.875 19.875" stroke="white" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="big-text">{{ selectedDate.format('LL') }}</span>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.125 10.125L18.375 15L13.125 19.875" stroke="white" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="schedule-body-cotainer">
        <div class="schedule-body-content">
          <div class="schedule-items">
            <div
              class="schedule-item d-flex"
              v-for="(time, index) in availableTime"
              :key="index">
              <div
                class="time-col small-text"
                :class="{ 'active-time': isActiveTime(time) }">
                {{ time }}
              </div>
              <div class="schedule-col">
                <template v-if="thereIsSchedule(time)">
                  <div
                    class="schedule-card d-flex"
                    :class="{
                      'fifity-percent': scheduleItem.estimatedTime/60 === 0.5,
                      'seventy-five-percent': scheduleItem.estimatedTime/60 === 0.75,
                      'top-90': scheduleItem.startTime.endsWith('45'),
                      'top-64': scheduleItem.startTime.endsWith('30'),
                      'yellow-card': isNotFinished(
                        scheduleItem.startTime,
                        scheduleItem.estimatedTime
                      )
                   }"
                    v-for="(scheduleItem, index) in processedSchedule(time)"
                    :key="index">
                    <div class="schedule-card-col">
                      <span>{{ scheduleItem.startTime }}</span>
                      <span>{{ scheduleItem.customer }}</span>
                    </div>
                    <div class="schedule-card-col">
                      <span class="schedule-card-estimated-time">
                        {{ scheduleItem.estimatedTime }}min
                      </span>
                      <div class="schedule-card-actions">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_72_328)"><path d="M8.7501 2.45L1.2251
                            9.975V12.775H4.0251L11.5501 5.25M8.7501 2.45L9.3952 1.8049C9.7665
                            1.43359 10.2701 1.225 10.7952 1.225C11.8887 1.225 12.7751 2.11143
                            12.7751 3.2049C12.7751 3.73 12.5665 4.23359 12.1952 4.6049L11.5501
                            5.25M8.7501 2.45L11.5501 5.25" stroke="#355ADC" stroke-width="1.5"
                            stroke-linejoin="round"/></g><defs><clipPath id="clip0_72_328"><rect
                            width="14" height="14" fill="white"/></clipPath></defs>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.19995 3.8H13.8M5.39995 3.8V3C5.39995 2.11635 6.1163 1.4
                          6.99995 1.4H8.99995C9.88361 1.4 10.6 2.11635 10.6 3V3.8M9.79995
                          7V11.4M6.19995 7V11.4M2.99995 3.8H13L12.4839 13.0888C12.4368 13.9366
                          11.7355 14.6 10.8864 14.6H5.11353C4.26436 14.6 3.5631 13.9366 3.51599
                          13.0888L2.99995 3.8Z" stroke="#DC3545" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 8.63636V11.6061M8 4.39394C8 4.89097 8 5.16964 8 5.66667M15
                          8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8
                          1C11.866 1 15 4.13401 15 8Z" stroke="#FFC107" stroke-width="1.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </template>
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

export default {
  name: 'ScheduleComponent',
  props: {
    selectedDate: {
      type: moment,
      required: true,
    },
    availableTime: {
      type: Array,
      required: true,
    },
    schedule: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isActiveTime(time) {
      return moment(time, 'HH:mm').isSame(this.today(), 'hour');
    },
    isSameTime(frstTime, secTime) {
      return moment(frstTime, 'HH:mm').isSame(moment(secTime, 'HH:mm'), 'hour');
    },
    today() {
      return moment();
    },
    thereIsSchedule(time) {
      return this.schedule.some((schedule) => this.isSameTime(time, schedule.startTime));
    },
    processedSchedule(time) {
      return this.schedule.filter((schedule) => this.isSameTime(time, schedule.startTime));
    },
    getEndTime(startTime, estimatedTime) {
      return moment(startTime, 'HH:mm').add(estimatedTime, 'm');
    },
    isNotFinished(startTime, estimatedTime) {
      const endTime = this.getEndTime(startTime, estimatedTime);

      return endTime.isAfter(this.today(), 'minute');
    },
  },
};
</script>

<style lang="scss" scoped>
.schedule-container {
  .schedule-content {
    .schedule-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $primary;
      padding: 10px;
      color: $white;
      text-align: center;
      border-radius: 15px 15px 0 0;
      svg {
        cursor: pointer;
      }
    }
    .schedule-body-cotainer {
      background: $gray20;
      padding: 8px;
      height: 550px;
      overflow-y: scroll;
      .schedule-body-content {
        background: $white;
        border-radius: 15px 15px 0 0;
        .schedule-items {
          .schedule-item {
            border-bottom: 2px solid $gray10;
            height: 120px;
            .time-col {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 15%;
              border-right: 2px solid $gray10;
            }
            .active-time {
              font-weight: bold;
            }
            .schedule-col {
              position: relative;
              width: 85%;
              .schedule-card {
                position: absolute;
                top: 8px;
                left: 8px;
                max-width: 362px;
                width: -webkit-fill-available;
                background: $green10;
                padding: 8px;
                border-radius: 10px;
                justify-content: space-between;
                align-items: center;
                height: 104px;
                .schedule-card-col {
                  span {
                    margin-bottom: 16px;
                  }
                  :last-child {
                    margin-bottom: 0;
                  }
                  .schedule-card-estimated-time {
                    text-align: right;
                  }
                  .schedule-card-actions {
                    svg {
                      cursor: pointer;
                      margin-right: 8px;
                    }
                    :last-child {
                      margin-right: 0;
                    }
                  }
                }
              }
              .fifity-percent {
                height: 52px;
                padding: 4px 8px;
                .schedule-card-col {
                  span {
                    margin-bottom: 2px;
                  }
                }
              }
              .seventy-five-percent {
                height: 78px;
                padding: 4px 8px;
                .schedule-card-col {
                  span {
                    margin-bottom: 8px;
                  }
                }
              }
              .top-90 {
                top: 90px;
              }
              .top-64 {
                top: 64px;
              }
              .yellow-card {
                background: $yellow10;
              }
            }
          }
        }
      }
    }
  }
}
</style>
