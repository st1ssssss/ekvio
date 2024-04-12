<script setup lang="ts">

interface IEBtn{
    label: string,
    disable?: boolean
}

const props = defineProps<IEBtn>()
</script>
<template>
    <button class="e-button" :disabled="disable">{{ label }}</button>
</template>
<style scoped>
.e-button{
    font-family: Inter;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--c-gray-300);
    background: var(--c-white);
    cursor: pointer;
    transition: all .2s linear;
}
.e-button:hover{
    background: var(--c-gray-200);
    border: 1px solid var(--c-gray-400);
    transition: all .2s linear;
}
.e-button:active{
    background: var(--c-gray-300);
    border: 1px solid var(--c-gray-400);
    transition: all .2s linear;
}
.e-button:disabled{
    pointer-events: none;
}
</style>