<template>
  <div class="mb-3">
    <div class="relative mb-4 flex w-full flex-wrap items-stretch">
      <input
        type="search"
        class="bg-white/75 rounded px-3 py-1 text-base focus:outline-none placeholder:italic placeholder:font-thin"
        placeholder="Search"
        aria-label="Search"
        v-model="searchQuery"
        @input="searchCategories"
      />

      <!--Search icon-->
      <span class="px-3 py-1.5 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-5 w-5"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    searchCategories() {
      if (this.searchQuery === "") {
        this.$parent.loadCategoriesFromLocalStorage();
      } else {
        const filteredCategories = this.$parent.categories.filter((category) =>
          category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.$parent.categories = filteredCategories;
      }
    },
  },
};
</script>
