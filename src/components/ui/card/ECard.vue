<script setup lang="ts"></script>
<template>
    <div class="e-card">
        <slot></slot>
    </div>
</template>
<style>
    .e-card{
        display: flex;
        flex-direction: column;
        padding: 20px 22px;
        border: 1px solid var(--c-gray-400);
        border-radius: 16px;
        background: var(--c-white)
    }
</style>