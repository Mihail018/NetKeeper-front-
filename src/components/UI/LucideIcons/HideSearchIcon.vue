<template>
    <SearchX class="search-icon" />
</template>

<script setup>
    import { SearchX } from 'lucide-vue-next';

    defineOptions({
        name: 'HideSearchIcon'
    })
</script>

<style scoped>
.search-icon {
    width: 28px;
    height: 28px;
    color: #3b82f6;
    cursor: pointer;
}

</style>