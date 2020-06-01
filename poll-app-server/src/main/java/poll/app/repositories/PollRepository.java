package poll.app.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import poll.app.models.Poll;
import poll.app.models.User;
import poll.app.models.Vote;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long>
{
        Poll findByVotes ( Vote vote );

        Page<Poll> findAllByNonPublicFalseOrderByPostDateDesc ( Pageable pageable );
        
        Page<Poll> findAll ( Pageable pageable );

        Page<Poll> findAllByCreatorOrderByPostDateDesc ( Pageable pageable, User currentUser );

        Poll findByCode(String code);
        
        boolean existsByCode(String code);
}
