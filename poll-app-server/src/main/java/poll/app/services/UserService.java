package poll.app.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import poll.app.dto.UserDTO;
import poll.app.models.User;

public interface UserService extends UserDetailsService
{
        User create ( UserDTO userDTO );

        boolean isLoginCorrect ( String login, String password );
}
