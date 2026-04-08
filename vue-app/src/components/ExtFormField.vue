<template>
  <div class="ext-form-field" :class="{ 'has-error': error, required: required }">
    <label v-if="label">{{ label }}{{ required ? ' *' : '' }}</label>
    <div class="field-body">
      <slot>
        <input
          v-if="type !== 'textarea' && type !== 'select'"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <textarea
          v-else-if="type === 'textarea'"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :rows="rows"
          @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
        <select
          v-else-if="type === 'select'"
          :value="modelValue"
          :disabled="disabled"
          @change="$emit('update:modelValue', $event.target.value)"
        >
          <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
          <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </slot>
      <div v-if="error" class="field-error">{{ error }}</div>
      <div v-else-if="help" class="field-help">{{ help }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
  help: { type: String, default: '' },
  rows: { type: Number, default: 3 },
  options: { type: Array, default: () => [] },
})

defineEmits(['update:modelValue'])
</script>
