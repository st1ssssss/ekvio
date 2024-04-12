<script setup lang="ts"></script>
<template>
    <span class="e-loader">
        <img src="/src/assets/icons/loader.svg" alt="">
    </span>
</template>
<style>
.e-loader {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: rotation 1s linear infinite;
    }
    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>