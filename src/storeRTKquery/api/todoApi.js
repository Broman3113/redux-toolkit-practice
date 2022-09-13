import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const todoApi = createApi({
		reducerPath: 'todoApi',
		tagTypes: ['Todos'],
		baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
		endpoints: (build) => ({
			getTodo: build.query({
				query: (limit = '') => `todos${limit && `?_limit=${limit}`}`,
				providesTags: result =>
					result ? [
						...result.map(({id}) => ({type: 'Todos', id})),
						{type: 'Todos', id: 'LIST'},
					] : [{type: 'Todos', id: 'LIST'}],
			}),
			addTodo: build.mutation({
				query: (body) => ({
					url: 'todos',
					method: 'POST',
					body,
				}),
				invalidatesTags: [{type: 'Todos', id: 'LIST'}],
			}),
			removeTodo: build.mutation({
				query: (id) => ({
					url: `todos/${id}`,
					method: 'DELETE',
				}),
				invalidatesTags: [{type: 'Todos', id: 'LIST'}],
			}),
		}),
	},
)

export const {useGetTodoQuery, useAddTodoMutation, useRemoveTodoMutation} = todoApi;
