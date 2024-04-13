<script setup lang="ts">
import { computed } from 'vue';
type IPaddingTypes = 'all'|'side'|'top-bottom' |'custom'


const props = defineProps<{
    bordered?: boolean
    borderRad?: string
    paddingType?: IPaddingTypes
    paddingNum?: string
}>()

const borderedStyle = computed(()=>{
    return props.bordered? 'bordered' : ''
})
const paddingStyle = computed(()=>{
    let res
    switch (props.paddingType) {
        case 'all':
            res = props.paddingNum + 'px'
            break;
        case 'side':
        res = '0px ' + props.paddingNum + 'px'

            break
        case 'top-bottom':
            res = props.paddingNum + 'px 0px' 
            break
        case 'custom':
            res = props.paddingNum
            break
        default:
            break;
    }
    return res
})
</script>
<template>
    <div :style="{padding: paddingStyle, borderRadius: borderRad+'px'}" :class="['e-card', borderedStyle]">
        <slot></slot>
    </div>
</template>
<style>
    .e-card{
        display: flex;
        flex-direction: column;
        background: var(--c-white)
    }
    .bordered{
        border: 1px solid var(--c-gray-400);
    }
    .padding{
        padding: 20px 22px;
    }
</style>