package poll.app.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "notification")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "message")
	private String message;

	@Column(name = "is_read")
	private boolean read;

	@Column(name = "created_at", columnDefinition = "TIMESTAMP NULL")
	private LocalDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "poll_id")
	private Poll poll;

	public Notification() {
		super();
	}

	public Notification(String message, boolean read, LocalDateTime createdAt, Poll poll) {
		super();
		this.message = message;
		this.read = read;
		this.createdAt = createdAt;
		this.poll = poll;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isRead() {
		return read;
	}

	public void setRead(boolean read) {
		this.read = read;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Poll getPoll() {
		return poll;
	}

	public void setPoll(Poll poll) {
		this.poll = poll;
	}

}
