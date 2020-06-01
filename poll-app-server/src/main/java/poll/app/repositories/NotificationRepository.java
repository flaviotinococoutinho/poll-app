package poll.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poll.app.models.Notification;
import poll.app.models.User;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>
{
        List<Notification> findAllByPoll_CreatorOrderByCreatedAtDesc ( User user );
}
