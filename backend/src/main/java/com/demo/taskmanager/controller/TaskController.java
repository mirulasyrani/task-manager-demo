package com.demo.taskmanager.controller;
import com.demo.taskmanager.model.Task;
import com.demo.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/tasks") @RequiredArgsConstructor
public class TaskController {
    private final TaskService svc;
    @GetMapping
    public ResponseEntity<List<Task>> getAll(
            @RequestParam(required=false) String status,
            @RequestParam(required=false) String priority,
            @RequestParam(required=false) Long categoryId,
            @RequestParam(required=false) String search) {
        if (search!=null && !search.isBlank())  return ResponseEntity.ok(svc.search(search));
        if (status!=null)                        return ResponseEntity.ok(svc.findByStatus(status));
        if (priority!=null)                      return ResponseEntity.ok(svc.findByPriority(priority));
        if (categoryId!=null)                    return ResponseEntity.ok(svc.findByCategory(categoryId));
        return ResponseEntity.ok(svc.findAll());
    }
    @GetMapping("/{id}")    public ResponseEntity<Task> getById(@PathVariable Long id)                 { return ResponseEntity.ok(svc.findById(id)); }
    @PostMapping            public ResponseEntity<Task> create(@Valid @RequestBody Task t)              { return ResponseEntity.status(HttpStatus.CREATED).body(svc.create(t)); }
    @PutMapping("/{id}")    public ResponseEntity<Task> update(@PathVariable Long id,@Valid @RequestBody Task t){ return ResponseEntity.ok(svc.update(id,t)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id)                  { svc.delete(id); return ResponseEntity.noContent().build(); }
}
