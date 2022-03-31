<template>
    <div id="input_field">
        <label>
            {{ computedLable }}
        </label>
        <input :type="type" v-model='inputValue'>
    </div>
</template>

<script>
import {ref, props, computed} from 'vue'

export default {
    props: ['label', 'modelValue', 'type'],
    setup(props,context) {

        // Attributes (Non-reactive object, equivalent to $attrs)
        console.log("Attrs:- ");
        console.log(context.attrs);

        // Slots (Non-reactive object, equivalent to $slots)
        console.log("Slots:- ");
        console.log(context.slots);

        // Emit events (Function, equivalent to $emit)
        console.log("Emit:- ");
        console.log(context.emit);

        // Expose public properties (Function)
        console.log("Expose:- ");
        console.log(context.expose);

        // a computed ref
        const inputValue = computed({
            get()
            {
                return props.modelValue;
            },
            set(newValue)
            {
                context.emit('update:modelValue', newValue);
            }
        });

        const computedLable = computed({
            get()
            {
                return props.label;
            }
        })

        // We can return the non-ref and non-reactive variable also
        // Not a reactive property

        return {
            inputValue,computedLable
        }

        // return is must in setup() function for the reactive properties
        // To access the props, use props object
        // To access the api function, use context
        // Porps are bydefault returned, directly use in template, no need to return
    }
}
</script>

<style scoped>
    /* #input_field{
        display: block;

    } */



</style>