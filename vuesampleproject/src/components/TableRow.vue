<template>
    <tr v-for="td in tableData" :key="td">
        <CustomTd v-for="data in td" :key="data" :tdKey="data" :tdValue="data" />
    </tr>
</template>

<script>
import CustomTd from './CustomTd.vue'

export default {
    props : ['tableData'],
    components : {
        CustomTd
    },
    setup(props) {
        console.log("tdKey and tdValue");
            console.log(props.tableData);
    }
}
</script>