package poll.app.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import poll.app.models.Poll;
import poll.app.models.Vote;
import poll.app.repositories.PollRepository;
import poll.app.repositories.VoteRepository;

@Service
public class VoteServiceImpl implements VoteService {
	private final VoteRepository voteRepository;

	private final PollRepository pollRepository;

	private final NotificationService notificationService;

	private final BCryptPasswordEncoder encoder;

	@Autowired
	public VoteServiceImpl(VoteRepository voteRepository, PollRepository pollRepository, BCryptPasswordEncoder encoder,
			NotificationService notificationService) {
		this.voteRepository = voteRepository;
		this.pollRepository = pollRepository;
		this.encoder = encoder;
		this.notificationService = notificationService;
	}

	@Override
	public void vote(Long id) {
		Vote vote = voteRepository.getOne(id);
		Poll poll = pollRepository.findByVotes(vote);
		if (poll != null) {
			throw new RuntimeException("User has already voted");
		}
		vote.setVoteCount(vote.getVoteCount() + 1);
		voteRepository.save(vote);
	}

	@Override
	public void voteAll(List<String> voteCodes, String ip) {
		if (voteCodes != null && !voteCodes.isEmpty()) {
			Poll poll = pollRepository.findByVotes(voteRepository.findByCode(voteCodes.get(0)).get());
			if (poll != null) {
				if (!poll.isAllowSameIp() && isAlreadyVoted(poll.getUsersIps(), ip)) {
					throw new RuntimeException("User already voted");
				}
				poll.getUsersIps().add(encoder.encode(ip));
				notificationService.create(poll);
			}

			voteCodes.stream().map(voteRepository::findByCode).map(Optional::get).forEach(e -> {
				e.setVoteCount(e.getVoteCount() + 1);
				voteRepository.save(e);
			});
		}
	}

	private boolean isAlreadyVoted(Set<String> ips, String ip) {
		return ips.stream().anyMatch(e -> encoder.matches(ip, e));
	}
}
