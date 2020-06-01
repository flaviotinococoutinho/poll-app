package poll.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import poll.app.models.Notification;
import poll.app.models.Poll;
import poll.app.models.User;
import poll.app.repositories.NotificationRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service ("notificationService")
public class NotificationServiceImpl implements NotificationService
{
        private final NotificationRepository notificationRepository;

        @Autowired
        public NotificationServiceImpl ( NotificationRepository notificationRepository )
        {
                this.notificationRepository = notificationRepository;
        }

        @Override
        public List<Notification> findByUser ()
        {
                User user;

                if ( SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User )
                {
                        user = ( User ) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                        if ( user != null )
                                return notificationRepository.findAllByPoll_CreatorOrderByCreatedAtDesc( user );

                }
                return null;
        }

        @Override
        public boolean create ( Poll poll )
        {
                Notification notification = new Notification("Someone voted in your poll", false, LocalDateTime.now(), poll);
                notificationRepository.save( notification );
                return true;
        }

        @Override
        public boolean update ()
        {
                return false;
        }

        @Override
        public List<Notification> readByUser ()
        {
                User user;

                if ( SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof User )
                {
                        user = ( User ) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                        return notificationRepository.findAllByPoll_CreatorOrderByCreatedAtDesc( user )
                                .stream()
                                .map( e -> {
                                        e.setRead( true );
                                        return notificationRepository.save( e );
                                } ).collect( Collectors.toList() );
                }
                return null;
        }
}