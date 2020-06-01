package poll.app.services;

import java.util.List;

import poll.app.models.Notification;
import poll.app.models.Poll;

public interface NotificationService
{
        List<Notification> findByUser ();

        boolean create (Poll poll);

        boolean update ();

        List<Notification> readByUser();
}
