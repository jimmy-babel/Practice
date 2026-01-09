package com.example.demo1.service.impl;

import com.example.demo1.dto.CreateTodoRequest;
import com.example.demo1.dto.TodoResponse;
import com.example.demo1.entity.Todo;
import com.example.demo1.exception.EntityNotFoundException;
import com.example.demo1.repository.TodoRepository;
import com.example.demo1.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Lombok: 自动生成包含所有 final 字段的构造函数，用于依赖注入
//public class TodoServiceImpl {
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;
    @Override
    public TodoResponse createTodo(CreateTodoRequest request) {
        Todo todo = new Todo();
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getTitle());

        Todo savedTodo = todoRepository.save(todo);
        return mapToResponse(savedTodo);
    }

    @Override
    public List<TodoResponse> getAllTodos(){
        return todoRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TodoResponse getTodoById(Long id){
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("Todo not found with id:" + id));
        return mapToResponse(todo);
    }

    @Override
    public TodoResponse updateTodo(Long id, CreateTodoRequest request){
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("Todo not found with id:" + id));

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());

        Todo updateTodo = todoRepository.save(todo);
        return mapToResponse(updateTodo);
    }

    @Override
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new EntityNotFoundException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }


    private TodoResponse mapToResponse(Todo todo){
        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.isCompleted()
        );
    }


}

