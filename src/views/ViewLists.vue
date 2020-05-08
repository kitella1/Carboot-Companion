<template>
    <div class="lists">
        <h1>Shopping Lists</h1>
        <ul>
            <li is="ListItem" v-for="(item, index) in listItems" :key="index" :title="item.title" :desc="item.desc" v-on:remove="listItems.splice(index, 1)" />
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
                listItems: [
                    {
                        id: 1,
                        title: 'Ketch Car Boot sale'
                    },
                    {
                        id: 2,
                        title: 'Tesco Car Park Sale'
                    },
                    {
                        id: 3,
                        title: 'Powyck Car Boot'
                    },
                    {
                        id: 4,
                        title: 'Comer Gardens Church Sale'
                    },
                    {
                        id: 5,
                        title: 'Title'
                    },
                    {
                        id: 6,
                        title: 'Title'
                    },
                    {
                        id: 7,
                        title: 'Title'
                    },
                    {
                        id: 8,
                        title: 'Title'
                    },
                    {
                        id: 9,
                        title: 'Title'
                    }
                ],
                nextId: 10
            }
        },
        methods: {
            
        }
}
</script>
