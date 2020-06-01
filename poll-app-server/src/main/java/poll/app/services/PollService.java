package poll.app.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import poll.app.dto.PollDTO;

public interface PollService {
	PollDTO findOneByCode(String code);
	
	Page<PollDTO> findAllPublic(Pageable pageable);
	
	Page<PollDTO> findAllPublicAuth(Pageable pageable);

	PollDTO create(PollDTO poll);

	Page<PollDTO> findByUser(Pageable pageable);

	List<PollDTO> updateMany(List<PollDTO> pollList);
	
	PollDTO update(PollDTO pollDTO);
	
	PollDTO updateByIP(String ipUser, PollDTO pollDTO);
}
