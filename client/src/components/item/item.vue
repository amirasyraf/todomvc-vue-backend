<script>
import { ref } from 'vue';

export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const editing = ref(false);
        const name = ref(props.todo.name);

        const handleEdit = () => (editing.value = true);
        const handleCompleted = () =>
            emit('update', {
                _id: props.todo._id,
                completed: !props.todo.completed,
            });
        const handleRemove = () => emit('remove', props.todo._id);
        const handleChange = event => (name.value = event.target.value);
        const handleBlur = () => {
            emit('update', { _id: props.todo._id, name: name.value });
            editing.value = false;
        };

        return {
            name,
            editing,
            handleRemove,
            handleCompleted,
            handleEdit,
            handleChange,
            handleBlur,
        };
    },
};
</script>
<template>
    <li :class="{ completed: todo.completed, editing: editing }">
        <div class="view">
            <input
                class="toggle"
                type="checkbox"
                :checked="todo.completed"
                @change="handleCompleted"
            />
            <label @dblclick="handleEdit">{{ todo.name }}</label>
            <button class="destroy" @click="handleRemove" />
        </div>
        <input
            v-if="editing"
            class="edit"
            :value="name"
            @input="handleChange"
            @blur="handleBlur"
        />
    </li>
</template>
