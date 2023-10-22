<template>
  <div class="this-container row">
    <div class="col-2">
      <div class="row">
        <div class="this-status-bar col-3 mr-1" :class="{'completed': status}"></div>
        <div class="col-10">
          <span class="this-hour">{{ startTime }} - {{ endTime }}</span>
          <span class="this-date">{{ date }}</span>
        </div>
      </div>
    </div>
    <div class="col-4">
      <span class="this-value">{{ customer }}</span>
      <span class="this-title">Cliente</span>
    </div>
    <div class="col-3">
      <span class="this-value">{{ phoneNumber }}</span>
      <span class="this-title">Contato</span>
    </div>
    <div class="last-column col-3">
      <span class="this-value">{{ barber }}</span>
      <span class="this-title">Barbeiro</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'thisComponent',
  props: {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    barber: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    status() {
      const endDate = moment(`${this.date} ${this.endTime}`, 'DD-MM-YYYY HH:mm');
      const now = moment();

      return endDate.isBefore(now);
    },
  },
};
</script>

<style lang="scss" scoped>
.this-container {
  widows: 100%;
  border-bottom: dashed 1px $gray30;
  padding-bottom: 16px;
  .this-status-bar {
    width: 5px;
    height: 40px;
    background: $yellow20;
    border-radius: 5px;
    &.completed {
      background: $green20;
    }
  }
  .this-hour {
    font-weight: 600;
  }
  .this-date {
    color: $gray60;
  }
  .this-value {
    font-weight: 500;
  }
  .this-title {
    color: $gray60;
  }
  .last-column {
    display: flex;
    flex-direction: column;
  }
}
</style>
