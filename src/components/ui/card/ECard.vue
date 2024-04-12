<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    bordered?: boolean
    withPadding?: boolean
}>()

const borderedStyle = computed(()=>{
    return props.bordered? 'bordered' : ''
})
const paddingStyle = computed(()=>{
    return props.withPadding? 'padding' : ''
})
</script>
<template>
    <div :class="['e-card', borderedStyle, paddingStyle]">
        <slot></slot>
    </div>
</template>
<style>
    .e-card{
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        background: var(--c-white)
    }
    .bordered{
        border: 1px solid var(--c-gray-400);
    }
    .padding{
        padding: 20px 22px;
    }
</style>