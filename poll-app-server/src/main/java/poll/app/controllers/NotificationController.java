package poll.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import poll.app.models.Notification;
import poll.app.services.NotificationService;

import java.util.List;

@RestController
@RequestMapping ("/api/notification")
@CrossOrigin
public class NotificationController
{
        private final NotificationService notificationService;

        @Autowired
        public NotificationController ( NotificationService notificationService )
        {
                this.notificationService = notificationService;
        }

        @GetMapping
        public List<Notification> findAllByUser ()
        {
                return notificationService.findByUser();
        }

        @PatchMapping
        public List<Notification> readByUser ()
        {
                return notificationService.readByUser();
        }
}
