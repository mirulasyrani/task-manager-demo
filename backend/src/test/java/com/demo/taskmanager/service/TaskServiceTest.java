package com.demo.taskmanager.service;
import com.demo.taskmanager.exception.ResourceNotFoundException;
import com.demo.taskmanager.model.Task;
import com.demo.taskmanager.repository.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {
    @Mock TaskRepository taskRepo;
    @Mock CategoryRepository catRepo;
    @InjectMocks TaskService svc;
    Task sample;
    @BeforeEach void setUp() { sample = Task.builder().id(1L).title("Test").status(Task.TaskStatus.TODO).priority(Task.TaskPriority.MEDIUM).build(); }
    @Test void findAll_returnsList() { when(taskRepo.findAll()).thenReturn(List.of(sample)); assertThat(svc.findAll()).hasSize(1); }
    @Test void findById_found()    { when(taskRepo.findById(1L)).thenReturn(Optional.of(sample)); assertThat(svc.findById(1L).getId()).isEqualTo(1L); }
    @Test void findById_missing()  { when(taskRepo.findById(99L)).thenReturn(Optional.empty()); assertThatThrownBy(()->svc.findById(99L)).isInstanceOf(ResourceNotFoundException.class); }
    @Test void create_saves()      { when(taskRepo.save(sample)).thenReturn(sample); assertThat(svc.create(sample).getTitle()).isEqualTo("Test"); }
    @Test void delete_callsRepo()  { when(taskRepo.findById(1L)).thenReturn(Optional.of(sample)); svc.delete(1L); verify(taskRepo).deleteById(1L); }
}
