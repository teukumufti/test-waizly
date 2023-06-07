<template>
  <div>
    <div class="flex justify-between">
      <NuxtLink to="/">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="black"
              d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0z"
            />
          </svg>
          <h3 class="font-semibold text-2xl">Back</h3>
        </div>
      </NuxtLink>
      <Search />
    </div>
    <div class="bg-white rounded p-5">
      <!-- label and add todo -->
      <div class="flex justify-between">
        <h2 class="text-black font-bold text-xl">
          {{ $route.query.category }}:
        </h2>
        <div>
          <form class="flex" @submit.prevent="addTodo">
            <input
              type="text"
              class="bg-[#14C1C1]/50 rounded px-3 py-1 text-base focus:outline-none placeholder:italic placeholder:font-thin"
              placeholder="add todo ..."
              v-model="newTodo"
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

      <!-- list todo -->
      <div class="flex my-5" v-for="(todo, index) in todos" :key="todo">
        <div
          class="absolute bg-[#FFC700] p-2 rounded-l-sm h-[60px] max-h-[60px]"
        ></div>
        <div
          class="flex justify-between bg-[#14C1C1] rounded-sm py-4 px-7 w-full items-center"
        >
          <input
            ref="categoryInput"
            class="font-bold text-lg text-white outline-none bg-transparent"
            :value="todo"
            @keydown.enter="updateTodo(index, $event.target.value)"
          />
          <div class="w-6 h-6 rounded-full bg-transparent border-2"></div>
        </div>

        <!-- button delete -->
        <button type="button" class="ml-3" @click="deleteTodo(index)">
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
export default {
  data() {
    return {
      todos: [],
      newTodo: "",
    };
  },
  mounted() {
    this.loadTodosFromLocalStorage();
  },
  methods: {
    addTodo() {
      if (this.newTodo) {
        this.todos.push(this.newTodo);
        this.newTodo = "";
        this.saveTodosToLocalStorage();
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodosToLocalStorage();
    },
    saveTodosToLocalStorage() {
      if (process.client) {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      }
    },
    loadTodosFromLocalStorage() {
      if (process.client) {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
          this.todos = JSON.parse(storedTodos);
        }
      }
    },
  },
};
</script>