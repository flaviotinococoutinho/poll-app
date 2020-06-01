package poll.app.config;

import java.util.Collections;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import poll.app.models.User;
import poll.app.models.UserRole;
import poll.app.repositories.UserRepository;
import poll.app.repositories.UserRoleRepository;

@Component
public class RepositoryInitializer {
	private final UserRoleRepository userRoleRepository;

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder encoder;

	@Autowired
	public RepositoryInitializer(UserRoleRepository userRoleRepository, UserRepository userRepository,
			BCryptPasswordEncoder encoder) {
		this.userRoleRepository = userRoleRepository;
		this.userRepository = userRepository;
		this.encoder = encoder;
	}

	@Bean
	public InitializingBean intializeRepositories() {
		return () -> {
			UserRole adminRole;
			UserRole userRole;
			if (userRoleRepository.findAll().isEmpty()) {
				adminRole = new UserRole();
				adminRole.setUserType(UserRole.UserType.ROLE_ADMIN);
				userRoleRepository.save(adminRole);

				userRole = new UserRole();
				userRole.setUserType(UserRole.UserType.ROLE_USER);
				userRoleRepository.save(userRole);
			}

			if (userRepository.findAll().isEmpty()) {
				userRepository.save(new User("admin", encoder.encode("admin"), "admin@admin.br", false, false, false,
						true, Collections
								.singleton(userRoleRepository.findUserRoleByUserType(UserRole.UserType.ROLE_ADMIN))));

				userRepository.save(new User("test", encoder.encode("test"), "test@test.br", false, false, false, true,
						Collections.singleton(userRoleRepository.findUserRoleByUserType(UserRole.UserType.ROLE_USER))));
			}
		};
	}
}
