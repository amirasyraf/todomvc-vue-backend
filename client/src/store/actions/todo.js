import { ACTION_TYPES } from '../../constants/action-types';
import { getAll, createTodoItem, updateTodoItem, deleteTodoItem } from '../../services/api';

export const todoActions = {
    onLoad: async ({ commit }) => {
        const result = await getAll();
        const todos = result.data;

        commit(ACTION_TYPES.load, { todos });
    },
    onCreate: async ({ commit, dispatch }, name) => {
        const result = await createTodoItem({ name: name, completed: false });

        dispatch('onLoad');
    },
    onRemove: async ({ commit, dispatch }, _id) => {
        const result = await deleteTodoItem(_id);

        dispatch('onLoad');
    },
    onUpdate: async ({ commit, dispatch }, payload) => {
        const result = await updateTodoItem(payload);

        dispatch('onLoad');
    },
    onCompleteAll: ({ commit }) => commit(ACTION_TYPES.completeAll),
    onClearCompleted: ({ commit }) => commit(ACTION_TYPES.clearCompleted),
};
