<template>
    <table id="client_side_table"  class="table table:border secondary-5:border">

        <!-- Header -->
        <thead>
            <TableHeader :tableHeader="tableHeader" />
        </thead>

        <!-- Body -->
        <tbody>
            <TableRow  :tableData="tableData"  />
        </tbody>

    </table>
</template>

<script>
import {ref,computed} from "vue"
import TableHeader from './TableHeader.vue'
import TableRow from './TableRow.vue'

export default {
    props : ['tableData','tableHeader'],
    components : {
        TableHeader,TableRow
    }
}
</script>

<style >
    
</style>