<template>
    <div class="search">
        <label class="search__label"
            ><input type="search" placeholder="Search..." class="search__input" />
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #111111" />
        </label>
    </div>
</template>

<script>
export default {
    name: 'SearchHeader',
}
</script>

<style lang="scss" scoped>
.search {
    // .search__label
    &__label {
        display: flex;
        justify-content: center;
    }
    // .search__input
    &__input {
        position: relative;
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.75rem;
        line-height: 1.125rem; /* 150% */
        letter-spacing: 0.2px;
        width: 10.9375rem;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
        outline: none;
        transition: 0.3s;
        background-color: transparent;
    }
    // .search__icon
    &__icon {
        width: 1rem;
        height: 1rem;
        transition: 0.3s;
        font-size: 1rem;
    }
}
</style>
