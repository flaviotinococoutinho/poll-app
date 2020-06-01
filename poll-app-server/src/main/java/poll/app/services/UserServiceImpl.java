package poll.app.services;

import java.util.Collections;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import poll.app.dto.UserDTO;
import poll.app.models.User;
import poll.app.models.UserRole;
import poll.app.repositories.UserRepository;
import poll.app.repositories.UserRoleRepository;

@Service("userService")
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;

	private final BCryptPasswordEncoder encoder;

	private final UserRoleRepository roleRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder encoder,
			UserRoleRepository roleRepository) {
		this.userRepository = userRepository;
		this.encoder = encoder;
		this.roleRepository = roleRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		User user = userRepository.findUserByUsername(s);

		if (user == null)
			throw new UsernameNotFoundException("User does not exists");

		return user;
	}

	@Override
	@Transactional
	public User create(@NotNull UserDTO userDTO) {
		
		if (!StringUtils.isEmpty(userDTO.getUsername()) && userRepository.findUserByUsername(userDTO.getUsername()) != null)
			throw new RuntimeException("User already exists");

		UserRole userType = roleRepository.findUserRoleByUserType(UserRole.UserType.ROLE_USER);
		
		User user = new User(userDTO.getUsername(), 
				encoder.encode(userDTO.getPassword()),
				userDTO.getEmail(),
				false,
				false, 
				true, 
				true,
				Collections.singleton(userType));
		userRepository.save(user);
		return user;
	}

	@Override
	public boolean isLoginCorrect(String login, String password) {
		User u = userRepository.findUserByUsername(login);
		if (u == null) {
			return false;
		}

		return u.getUsername().equals(login) && encoder.matches(password, u.getPassword());
	}

}
