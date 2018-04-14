
 <!-- 所有的数据都声明在todo.vue这个顶层组件中，在使用vue或react这种框架开发的时候，尽量将顶层数据生命在一个集中的地方，如果没有使用store，
 vuex，或者react中的redux的时候，基本上会把大部分的主要数据都声明在最外层的app里面，或者是有一个集中地地方比如说这里的todo.vue里面，这样数据
 就会便于管理
  -->
<template>
    <section class="real-app">
        <input type="text"
               class="add-input"
               autofocus="autofocus"
               placeholder="接下来要做什么?"
               @keyup.enter="addTodo" 
               
        >
        <!-- addTodo这个方法要在js中声明，否则vue就会报错 -->
        <!-- @keyup 等价于v-on:keyup -->
        <!-- 使用items组件 -->
        <!-- :todo="todo" 往子组件item.vue 传入todo对象
             v-for="todo in filteredTodos" 遍历 todos 数组
             @del="deleteTodo" 接收子组件要触发的del方法
        -->
        <APP_Item :todo="todo"
                  v-for="todo in filteredTodos"
                  :key="todo.id"
                  @del="deleteTodo"
        >
        </APP_Item>
        <!--
            用 key 管理可复用的元素
            Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
            这么做除了使 Vue 变得非常快之外，还有其它一些好处。
        -->


        <!-- 使用tabs组件 -->
        <APP_Tabs :filter="filter"
                  :todos="todos"
                  @toggle="toggleFilter"
                  @clearAllCompleted="clearAllCompleted"
        >
        </APP_Tabs>
    </section>
</template>

<script>
    import APP_Item from './items.vue';
    import APP_Tabs from './tabs.vue';

    let id = 0;

    export default {
        // data() 声明数据
        data() {
            return {
                todos: [],
                filter: 'all'
            }

        },

        // 计算
        computed: {
            filteredTodos() {
                if (this.filter === 'all') {
                    return this.todos;
                }
                const completed = this.filter === 'completed';

                // 将todos数组中，completed为true的值过滤出来，并返回一个新数组
                return this.todos.filter(todo => completed === todo.completed);

            }
        },

        // 组件
        components: {
            APP_Item,
            APP_Tabs,
        },

        //声明方法
        methods: {
            addTodo(e) {
                if (e.target.value.trim()) {
                    this.todos.unshift({
                        id: id++,
                        content: e.target.value.trim(),
                        completed: false
                    });
                    e.target.value = '';//输入完确定之后将输入框清空
                } else {
                    alert('傻X，输入不能为空 !-_-');
                }
            },
            deleteTodo(id) {
                //删除节点
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },
            toggleFilter(state) {
                this.filter = state;

            },
            clearAllCompleted() {
                // 给todos赋一个新的值（即todo.completed为false的值）
                this.todos = this.todos.filter(todo => todo.completed === false)

            }
        }
    };
</script>

<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>