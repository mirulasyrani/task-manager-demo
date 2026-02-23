package com.demo.taskmanager.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.*;
import java.time.LocalDateTime;

@Entity @Table(name="tasks") @Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Task {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @NotBlank @Size(max=200) @Column(nullable=false) private String title;
    @Size(max=1000) private String description;
    @Enumerated(EnumType.STRING) @Column(nullable=false) @Builder.Default private TaskStatus status = TaskStatus.TODO;
    @Enumerated(EnumType.STRING) @Column(nullable=false) @Builder.Default private TaskPriority priority = TaskPriority.MEDIUM;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="category_id") private Category category;
    @CreationTimestamp @Column(name="created_at",updatable=false) private LocalDateTime createdAt;
    @UpdateTimestamp  @Column(name="updated_at") private LocalDateTime updatedAt;
    public enum TaskStatus   { TODO, IN_PROGRESS, DONE, CANCELLED }
    public enum TaskPriority { LOW, MEDIUM, HIGH, CRITICAL }
}
