package com.demo.taskmanager.service;
import com.demo.taskmanager.exception.ResourceNotFoundException;
import com.demo.taskmanager.model.*;
import com.demo.taskmanager.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional
public class TaskService {
    private final TaskRepository taskRepo;
    private final CategoryRepository catRepo;
    public List<Task> findAll() { return taskRepo.findAll(); }
    public Task findById(Long id) { return taskRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Task",id)); }
    public List<Task> findByStatus(String s) { return taskRepo.findByStatus(Task.TaskStatus.valueOf(s.toUpperCase())); }
    public List<Task> findByPriority(String p) { return taskRepo.findByPriority(Task.TaskPriority.valueOf(p.toUpperCase())); }
    public List<Task> findByCategory(Long cid) { return taskRepo.findByCategoryId(cid); }
    public List<Task> search(String kw) { return taskRepo.searchByKeyword(kw); }
    public Task create(Task t) {
        if (t.getCategory()!=null && t.getCategory().getId()!=null)
            t.setCategory(catRepo.findById(t.getCategory().getId()).orElseThrow(()->new ResourceNotFoundException("Category",t.getCategory().getId())));
        return taskRepo.save(t);
    }
    public Task update(Long id, Task u) {
        Task e = findById(id);
        e.setTitle(u.getTitle()); e.setDescription(u.getDescription()); e.setStatus(u.getStatus()); e.setPriority(u.getPriority());
        if (u.getCategory()!=null && u.getCategory().getId()!=null)
            e.setCategory(catRepo.findById(u.getCategory().getId()).orElseThrow(()->new ResourceNotFoundException("Category",u.getCategory().getId())));
        else e.setCategory(null);
        return taskRepo.save(e);
    }
    public void delete(Long id) { findById(id); taskRepo.deleteById(id); }
}
