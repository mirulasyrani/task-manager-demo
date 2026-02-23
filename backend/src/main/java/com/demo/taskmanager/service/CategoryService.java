package com.demo.taskmanager.service;
import com.demo.taskmanager.exception.*;
import com.demo.taskmanager.model.Category;
import com.demo.taskmanager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional
public class CategoryService {
    private final CategoryRepository repo;
    public List<Category> findAll() { return repo.findAll(); }
    public Category findById(Long id) { return repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Category",id)); }
    public Category create(Category c) {
        if (repo.existsByNameIgnoreCase(c.getName())) throw new DuplicateResourceException("Category '"+c.getName()+"' already exists");
        return repo.save(c);
    }
    public Category update(Long id, Category u) {
        Category e = findById(id);
        if (!e.getName().equalsIgnoreCase(u.getName()) && repo.existsByNameIgnoreCase(u.getName()))
            throw new DuplicateResourceException("Category '"+u.getName()+"' already exists");
        e.setName(u.getName()); e.setDescription(u.getDescription()); return repo.save(e);
    }
    public void delete(Long id) { findById(id); repo.deleteById(id); }
}
