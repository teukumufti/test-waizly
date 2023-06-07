<template>
  <div class="animate__animated animate__fadeInLeft">
    <div class="flex justify-between">
      <h3 class="font-bold text-2xl">Todo List</h3>
      <Search />
    </div>
    <div class="bg-white rounded p-5">
      <!-- label and add category -->
      <div class="flex justify-between">
        <h2 class="text-black font-bold text-xl">Category:</h2>
        <div>
          <form class="flex" @submit.prevent="addCategory">
            <input
              type="text"
              class="bg-[#14C1C1]/50 rounded px-3 py-1 text-base focus:outline-none placeholder:italic placeholder:font-thin"
              placeholder="add new category"
              v-model="newCategory"
            />
            <button class="block ml-2" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#14C1C1"
                  d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <!-- list category -->
      <div
        class="flex my-5 animate__animated animate__flipInX"
        v-for="(category, index) in categories"
        :key="category.name"
      >
        <div class="absolute bg-[#FFC700] p-2 rounded-l-sm h-[60px]"></div>
        <div
          class="flex justify-between bg-[#14C1C1] rounded-sm py-4 px-7 w-full items-center"
        >
          <input
            ref="categoryInput"
            class="font-bold text-lg text-white outline-none bg-transparent"
            :value="category.name"
            @keydown.enter="updateCategory(index, $event.target.value)"
          />
          <!-- go to detail -->
          <NuxtLink
            :to="{
              path: 'detail',
              query: { category: category.name },
            }"
          >
            <div>
              <svg
                width="50"
                height="24"
                viewBox="0 0 84 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M83.0607 13.0607C83.6464 12.4749 83.6464 11.5251 83.0607 10.9393L73.5147 1.3934C72.9289 0.807611 71.9792 0.807611 71.3934 1.3934C70.8076 1.97918 70.8076 2.92893 71.3934 3.51472L79.8787 12L71.3934 20.4853C70.8076 21.0711 70.8076 22.0208 71.3934 22.6066C71.9792 23.1924 72.9289 23.1924 73.5147 22.6066L83.0607 13.0607ZM4.50714e-09 13.5L82 13.5L82 10.5L-4.50714e-09 10.5L4.50714e-09 13.5Z"
                  fill="#FFC700"
                />
              </svg>
            </div>
          </NuxtLink>
          <!--  -->
        </div>

        <!-- button delete -->
        <button type="button" class="ml-3" @click="deleteCategory(index)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";

export default {
  data() {
    return {
      categories: [],
      newCategory: "",
    };
  },

  created() {
    this.$root.$on("searchCategories", (searchQuery) => {
      this.loadCategoriesFromLocalStorage(searchQuery);
    });
  },

  mounted() {
    this.loadCategoriesFromLocalStorage();
  },

  methods: {
    addCategory() {
      if (this.newCategory) {
        this.categories.push({
          name: this.newCategory,
          todos: [],
        });
        this.newCategory = "";
        this.saveCategoriesToLocalStorage();
      }
    },
    deleteCategory(index) {
      this.categories.splice(index, 1);
      this.saveCategoriesToLocalStorage();
    },
    updateCategory(index, value) {
      this.categories[index].name = value;
      this.saveCategoriesToLocalStorage();
    },
    saveCategoriesToLocalStorage() {
      if (process.client) {
        localStorage.setItem("categories", JSON.stringify(this.categories));
      }
    },
    loadCategoriesFromLocalStorage(searchQuery = "") {
      if (process.client) {
        const storedCategories = localStorage.getItem("categories");
        if (storedCategories) {
          let categories = JSON.parse(storedCategories);
          if (searchQuery !== "") {
            categories = categories.filter((category) =>
              category.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          this.categories = categories;
        }
      }
    },
  },
};
</script>
