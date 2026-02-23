package com.demo.taskmanager.exception;
import org.springframework.http.*;
import org.springframework.web.bind.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String,Object>> handleNotFound(ResourceNotFoundException ex) { return build(HttpStatus.NOT_FOUND, ex.getMessage()); }
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String,Object>> handleDuplicate(DuplicateResourceException ex) { return build(HttpStatus.CONFLICT, ex.getMessage()); }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> handleValidation(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors().stream().map(e->e.getField()+": "+e.getDefaultMessage()).collect(Collectors.joining("; "));
        return build(HttpStatus.BAD_REQUEST, errors);
    }
    private ResponseEntity<Map<String,Object>> build(HttpStatus s, String msg) {
        Map<String,Object> b = new HashMap<>();
        b.put("timestamp", LocalDateTime.now().toString()); b.put("status", s.value());
        b.put("error", s.getReasonPhrase()); b.put("message", msg);
        return ResponseEntity.status(s).body(b);
    }
}
