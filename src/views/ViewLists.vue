<template>
    <div class="lists">
        <h1>Boot Lists</h1>
        <ul>
            <li id="noLists" v-if="this.lists.length < 1">No lists yet.</li>
            <li is="ListItem" :title="item.title" v-on:remove="removeList(index)" :key="item.id" v-for="(item, index) in lists" :link="{ name: 'EditList', 
           params: { listID: item.id }}" />
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .lists {
        margin: 0em 2em;
        width: 85%;
    }

    ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0em;
        & *

    {
        color: $font;
        text-decoration: none;
    }
    }

    #noLists {
        width: 85%;
        list-style: none;
        color: $fontLight;
        justify-self: center;
        text-align: center;
    }
</style>

<script>
    import ListItem from '@/components/ListItem.vue'

    export default {
        name: 'ViewList',
        components: {
            ListItem,
        },
        data() {
            return {
                lists: [
                ],
                nextId: 10
            }
        },
        mounted() {
            if (localStorage.getItem('Available lists')) {
                try {
                    this.lists = JSON.parse(localStorage.getItem('Available lists'));
                } catch (e) {
                    localStorage.removeItem('Available lists');
                    console.log(e.toString())
                }
            }
        },
        beforeDestroy() {
            let parsed = JSON.stringify(this.lists);
            localStorage.setItem("Available lists", parsed);
        },
        methods: {
            saveList() {
                let parsed = JSON.stringify(this.lists);
                localStorage.setItem("Available lists", parsed);
            },
            removeList(index) {
                this.lists.splice(index, 1)
                this.saveList()
            }
        }
    }
</script>
