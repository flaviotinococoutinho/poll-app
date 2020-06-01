package poll.app.mappers;

import org.mapstruct.Mapper;

import poll.app.dto.UserDTO;
import poll.app.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper
{
        User userDTOtoUser ( UserDTO userDTO );

        UserDTO userToDTO ( User user );
}
