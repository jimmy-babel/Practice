package com.example.demo1.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String meaasge) {
        super(meaasge);
    }
}
