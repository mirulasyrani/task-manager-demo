package com.demo.taskmanager.repository;
import com.demo.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByStatus(Task.TaskStatus status);
    List<Task> findByPriority(Task.TaskPriority priority);
    List<Task> findByCategoryId(Long categoryId);
    @Query("SELECT t FROM Task t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%',:kw,'%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%',:kw,'%'))")
    List<Task> searchByKeyword(@Param("kw") String kw);
}
