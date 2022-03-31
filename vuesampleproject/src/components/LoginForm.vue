<template>
    <form @submit.prevent="formSubmit()">
        <h1> {{ title }} </h1>
        <div v-if="!success">
            <custominput v-for="input in inputs" :key="input" v-model="input.ivalue" :label="input.label" :type="input.type"  />
        </div>
        <h5 id="success_submit"  v-if="success"> Form submitted successfully.</h5>
        <button v-if="!success"> Submit </button>
    </form>
</template>

<script>
import custominput from './CustomInput.vue'
import {ref} from 'vue'
// import { formatTitle } from '@/utilities/helperFunctions';

export default {
    setup() {
        const title = ref("Employee Form");    
        // var title = {"value" : {title:"Login Form"}}
        const inputs = ref([
            {
                label: "Name",
                type: "text",
                ivalue: '',
            },
            {
                label: "Age",
                type: "text",
                ivalue: '',
            },
            {
                label: "Email",
                type: "email,",
                ivalue: '',
            },
            {
                label: "Department",
                type: "text,",
                ivalue: '',
            }
        ]);

        const success = ref(false);

        function formSubmit(){
            console.log("Form is submitted with vals as follows:- ");
            console.log(inputs.value);
            var data = {
                "name" : inputs.value[0].ivalue,
                "age" : inputs.value[1].ivalue,
                "email" : inputs.value[2].ivalue,
                "department" : inputs.value[3].ivalue
            }

            console.log(data);
            const url = 'http://127.0.0.1:8000/adddata/'
            const axios = require('axios')

            axios.post(url, data, {
                headers: {
                Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then(({response}) => {
                inputs.value[0].ivalue = ''
                inputs.value[1].ivalue = ''
                inputs.value[2].ivalue = ''
                inputs.value[3].ivalue = ''
                success.value = true;
            });


            
        }
        // Within the setup use the inputs.value
        // After returning, use inputs.ivalue
        console.log(inputs.value);
        return {
            title, inputs, formSubmit,success
        }
    },
    components : {
        custominput
    }
}
</script>

<style >

#success_submit {
    font-weight: bold;
    font-size: 30px;
}

form {
  display: block;
  border-spacing: 5px;
  align-items: center;
  /* justify-content: center; */
}

form>div {
    display: block;
    margin-left: 450px;
    padding: 10px;
}

#input_field{
    display: table-row;
}

label {
  display: table-cell;
  text-align: left;
}

input {
  display: table-cell;
  align-self: right;
  margin-left: 20px;
}


</style>