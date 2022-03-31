<template>

    <h1>{{title}}</h1>

    <div class="between:flex bottom:margin-3">
        <div class="center:flex-items">
        <span class="right:margin-1">Show</span>
        <select v-model="currentEntries" class="select" @change="paginateEntries()">
            <option v-for="se in showEntries" :key="se" :value="se">{{ se }}</option>
        </select> 
        <span class="left:margin-1">entries</span>
        </div>

        <div class="end:flex">
            <input type="search" id="search" class="input px:width-25" placeholder="Search here..." v-model="searchInput" @keyup="searchEvent">
        </div>
    </div>

    <TableBase  :tableHeader="tableHeader" :tableData="filteredEntries" />

    <div class="between:flex y:margin-3">
    <div>Show {{ showInfo.from }} to {{ showInfo.to }} of {{ showInfo.of }} entries</div>
    <div class="end:flex">
      <ul class="pagination:nav">
        <li :class="['nav-item', { 'disabled': isDisabledPrev }]">
          <a href="#" class="nav-link" @click.prevent="clickPrevPage()">Prev</a>
        </li>
        <li v-for="pagi in showPagination" :key="pagi" class="nav-item">
          <a href="#" class="nav-link" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>
        </li>
         <li :class="['nav-item', { 'disabled': isDisabledNext }]">
          <a href="#" class="nav-link" @click.prevent="clickNextPage()">Next</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import {ref,computed,watch} from "vue"
import { $array} from 'alga-js'
import TableBase from './TableBase.vue'
// import {min,max} from 'Math'

export default {
    setup(props,ctx) {
        const tableHeader = ref(
            []
        );

        const tableData = ref(
            []
        );

        console.log("length of tableData");
        console.log(tableData.value.length);

        const title = ref("Client Side Datatable");
        const searchInput = ref('');
        const showEntries = ref([5,10,15,25,50,72,100]);
        const currentEntries = ref(10);
        const filteredEntries = ref([]);
        const currentPage = ref(1);
        const searchEntries = ref('');
        const allPages = ref(1);

        // Computed properties
        const showInfo = computed({
            get()
            {
                // fetch the data based on the search filter
                var data = getCurrentEntries();
                console.log("showinfo data")
                console.log(data);
                var from = (currentPage.value-1)*currentEntries.value + 1;
                var to = Math.min((currentPage.value)*currentEntries.value,data.length);
                var of ;
                if(data.length === 0)
                {
                    from = 0;
                    to = 0;
                    of = 0;
                }
                else{
                    of = data.length;
                }
                var obj = {
                    "from" : from,
                    "to" : to,
                    "of" : of
                }
                return obj;
            }
        });
        const showPagination = computed({
            get()
            {
                console.log("showPagination ");
                console.log($array.pagination(allPages.value, currentPage.value, 3));
                console.log($array.pagination);
                return $array.pagination(allPages.value, currentPage.value, 3);
            }
        });
        const isDisabledNext = computed({
            get(){
                return currentPage.value === allPages.value;
            }
        });
        const isDisabledPrev = computed({
            get(){
                return currentPage.value === 1;
            }
        });

        // Watchers
        watch(currentEntries, () => {
            console.log("Watchers called on currentEntries");
            currentPage.value = 1;
        })

        watch(tableHeader, (newValue) => {
            console.log("Watchers tableHeader");
            console.log(newValue);
            tableHeader.value = newValue;
        })


        watch(tableData, (newValue) => {
            console.log("Watchers tableData");
            console.log(newValue)
            tableData.value = newValue;
            paginateEntries()
        })

        //  Functions
        function paginateEvent(pagi)
        {
            console.log("paginateEvent, current page value");
            console.log(pagi);
            currentPage.value = pagi;
            paginateData(getCurrentEntries());
        }

        function paginateData(data) {
            console.log("Dollar array :- ");
            // console.log($array);
            console.log(data.slice((currentPage.value-1)*currentEntries.value+1,currentPage.value*currentEntries.value));
            console.log("Dollar pages :- ");
            console.log($array.pages(data, currentEntries.value));

            // filteredEntries.value = $array.paginate(data).slice(currentPage.value, currentEntries.value)
            filteredEntries.value = data.slice((currentPage.value-1)*currentEntries.value,currentPage.value*currentEntries.value);
            allPages.value = $array.pages(data, currentEntries.value);

            console.log("Filtered entries")
            console.log(filteredEntries.value);
        }

        //search function logic
        function searchLogic(data,filter,rw_length) {
            var newData = [];
            console.log("Search Logic")
            
            for (var i = 0; i < data.length; i++) {
                var bl = false;
                for(var j=0; j < rw_length; j++)
                {
                    var txtValue = data[i][j].toString();

                    if (txtValue.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                        console.log("found");
                        bl = true;
                        break;
                    }
                }

                if(bl)
                {
                    newData.push(data[i])
                    bl = false;
                }   
            }
            console.log("newData");
            console.log(newData);
            return newData;
        }

        function paginateEntries() {
            var data = tableData.value;
            console.log("paginateEntries")
            console.log(data);
            if(searchInput.value.length >= 3) 
            {
                console.log("searchEntries");
                console.log(searchInput.value);
                console.log(data[0].length)
                searchEntries.value = searchLogic(data,searchInput.value,data[0].length);
                console.log(searchEntries.value);
                paginateData(searchEntries.value);
            } 
            else 
            {
                console.log("paginateEntries ELSE");
                searchEntries.value = []
                paginateData(data);
            }
        }

        function getCurrentEntries() {
            console.log("getCurrentEntries");
            console.log(searchEntries.value);
            if (searchInput.value.length === 0)
            {
                console.log("IF");
                return tableData.value;
            }
            else
            {
                console.log("ELSE");
                return searchEntries.value;
            }
            // return (searchEntries.value.length <= 0) ? tableData.value : searchEntries.value;
        }
        
        function searchEvent() {
            console.log("searchEvent");
            currentPage.value = 1;
            paginateEntries();
        }

        function clickPrevPage()
        {
            console.log("Prev click");
            currentPage.value -= 1;
            paginateEvent(currentPage.value);
        }

        function loadDataFromAPI()
        {
            console.log("loadDataFromAPI");

            const axios = require('axios');
            const url = 'http://127.0.0.1:8000/getdata/';

            axios.get(
                url,
                {
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json",
                    },
                }
            ).then(function (response) {
                console.log(response);
                console.log(response.data.fields);
                tableData.value = response.data.data;
                tableHeader.value = response.data.fields;
                console.log("table header and table data")
                console.log(tableHeader);
                console.log(tableData);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
            console.log("exiting the loadDataFromAPI");
        }

        function clickNextPage()
        {
            console.log("Next click");
            currentPage.value += 1;
            paginateEvent(currentPage.value);
        }

        return {
            tableHeader,tableData,showEntries,currentEntries,filteredEntries,paginateEntries,searchInput,paginateData
            ,showInfo,showPagination,paginateEvent,searchEntries,searchEvent,clickPrevPage,
            clickNextPage,isDisabledPrev,isDisabledNext,loadDataFromAPI,title
        };
    },
    components : {
        TableBase
    },
    created() {
        // call the backend api and set the tableHeader and tableData
        this.loadDataFromAPI()
        // Paginate the Entries
        this.paginateEntries();
    },
}
</script>

<style>
    
</style>