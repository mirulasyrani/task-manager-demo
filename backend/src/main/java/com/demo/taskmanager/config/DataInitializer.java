package com.demo.taskmanager.config;
import com.demo.taskmanager.model.*;
import com.demo.taskmanager.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;

@Configuration @RequiredArgsConstructor
public class DataInitializer {
    @Bean @Profile("!test")
    CommandLineRunner seed(CategoryRepository catRepo, TaskRepository taskRepo) {
        return args -> {
            if (catRepo.count() > 0) return;
            Category be = catRepo.save(Category.builder().name("Backend").description("Java / Spring Boot").build());
            Category fe = catRepo.save(Category.builder().name("Frontend").description("Angular / UI").build());
            Category dv = catRepo.save(Category.builder().name("DevOps").description("CI/CD, Docker").build());
            taskRepo.save(Task.builder().title("Set up Spring Boot project").status(Task.TaskStatus.DONE).priority(Task.TaskPriority.HIGH).category(be).build());
            taskRepo.save(Task.builder().title("Design REST API endpoints").status(Task.TaskStatus.DONE).priority(Task.TaskPriority.HIGH).category(be).build());
            taskRepo.save(Task.builder().title("Build Angular task list component").status(Task.TaskStatus.IN_PROGRESS).priority(Task.TaskPriority.HIGH).category(fe).build());
            taskRepo.save(Task.builder().title("Integrate HttpClient in Angular").status(Task.TaskStatus.TODO).priority(Task.TaskPriority.MEDIUM).category(fe).build());
            taskRepo.save(Task.builder().title("Write Dockerfile for backend").status(Task.TaskStatus.DONE).priority(Task.TaskPriority.MEDIUM).category(dv).build());
            taskRepo.save(Task.builder().title("Configure GitHub Actions CI pipeline").status(Task.TaskStatus.IN_PROGRESS).priority(Task.TaskPriority.CRITICAL).category(dv).build());
            taskRepo.save(Task.builder().title("Write Python seed script").status(Task.TaskStatus.TODO).priority(Task.TaskPriority.LOW).category(be).build());
        };
    }
}
