package poll.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poll.app.models.Vote;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long>
{
        Optional<Vote> findByCode ( String code );

        boolean existsByCode ( String code );
}
