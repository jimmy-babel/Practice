package com.example.demo1.service;

import com.example.demo1.dto.CreateTodoRequest;
import com.example.demo1.dto.TodoResponse;

import java.util.List;

public interface TodoService {
    TodoResponse createTodo(CreateTodoRequest request);
    List<TodoResponse> getAllTodos();
    TodoResponse getTodoById(Long id);

    TodoResponse updateTodo(Long id, CreateTodoRequest request);

    void deleteTodo(Long id);

}