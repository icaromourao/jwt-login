<template>
  <div class="custom-select" tabindex="0" @blur="open = false">
    <div
      class="selected"
      :class="{ 'open': open }"
      @click="toggleOption()"
      @keypress="toggleOption()">
      <span v-if="title" class="title small-text mb-1">{{ title }}</span>
      <span>{{ selected.name || selected }}</span>
    </div>
    <div v-show="open" class="options">
      <div
        v-for="(option, index) of options"
        :key="index"
        class="select"
        @keypress="selectOption(option)"
        @click="selectOption(option)">
        {{ option.name || option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelectComponent',
  emits: ['update:modelValue'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: [Object, String, Number],
      default() {
        return { name: 'Selecione', id: null };
      },
    },
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default,
      open: false,
    };
  },
  mounted() {
    this.selected = this.getDefaultOption();
  },
  methods: {
    selectOption(option) {
      this.selected = option;
      this.open = false;
      this.$emit('update:modelValue', option.id || option);
    },
    getDefaultOption() {
      if (this.default) {
        return this.default;
      }
      if (this.options.length > 0) {
        return this.options[0];
      }
      return null;
    },
    toggleOption() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  .title {
    color: $gray60;
  }
  .selected {
    background-color: $white;
    border-radius: 6px;
    padding: 12px;
    padding-left: 16px;
    padding-right: 32px;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    text-transform: capitalize;
    &.open {
      border-bottom: 1px solid $gray10;
      border-radius: 6px 6px 0px 0px;
    }
    &:after {
      position: absolute;
      content: "";
      top: calc(50% - 2px);
      right: 12px;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: $black transparent transparent transparent;
    }
  }
  .options {
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    position: absolute;
    background: $white;
    left: 0;
    right: 0;
    z-index: 1;
    line-height: 40px;
    text-transform: capitalize;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    div {
      padding-left: 16px;
      cursor: pointer;
      user-select: none;
      &:hover {
        background-color: $gray5;
      }
    }
  }
}
</style>
