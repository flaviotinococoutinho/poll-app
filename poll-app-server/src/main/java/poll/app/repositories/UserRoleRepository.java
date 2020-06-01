package poll.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poll.app.models.UserRole;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long>
{
        UserRole findUserRoleByUserType(UserRole.UserType userType);
}
