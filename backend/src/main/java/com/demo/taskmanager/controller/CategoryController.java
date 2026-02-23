package com.demo.taskmanager.controller;
import com.demo.taskmanager.model.Category;
import com.demo.taskmanager.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/categories") @RequiredArgsConstructor
public class CategoryController {
    private final CategoryService svc;
    @GetMapping                    public ResponseEntity<List<Category>> getAll()                                { return ResponseEntity.ok(svc.findAll()); }
    @GetMapping("/{id}")           public ResponseEntity<Category>       getById(@PathVariable Long id)         { return ResponseEntity.ok(svc.findById(id)); }
    @PostMapping                   public ResponseEntity<Category>       create(@Valid @RequestBody Category c)  { return ResponseEntity.status(HttpStatus.CREATED).body(svc.create(c)); }
    @PutMapping("/{id}")           public ResponseEntity<Category>       update(@PathVariable Long id,@Valid @RequestBody Category c){ return ResponseEntity.ok(svc.update(id,c)); }
    @DeleteMapping("/{id}")        public ResponseEntity<Void>           delete(@PathVariable Long id)           { svc.delete(id); return ResponseEntity.noContent().build(); }
}
