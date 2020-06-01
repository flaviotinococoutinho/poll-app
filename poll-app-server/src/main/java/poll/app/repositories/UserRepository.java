package poll.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poll.app.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>
{
        User findUserByUsername ( String username );
}
