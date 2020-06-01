package poll.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poll.app.dto.PollDTO;
import poll.app.services.PollService;

@RestController
@RequestMapping("/api/poll")
@CrossOrigin
public class PollController {
	
	@Autowired
	private PollService pollService;

	@GetMapping("/{code}")
	public PollDTO getPollByCode(@PathVariable String code) {
		return pollService.findOneByCode(code);
	}
	
	@PreAuthorize("isAuthenticated()")
	@PutMapping("/edit")
	public PollDTO getPollByCodeAndUsers(@RequestBody PollDTO poll) {
		String ip_user = "";
		return pollService.updateByIP(ip_user, poll);
	}

	@GetMapping
	public Page<PollDTO> getPublicPolls(Pageable pageable) {
		return pollService.findAllPublic(pageable);
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/autorized")
	public Page<PollDTO> getAuthPolls(Pageable pageable) {
		return pollService.findAllPublicAuth(pageable);
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/my/all")
	public Page<PollDTO> getUserPolls(Pageable pageable) {
		return pollService.findByUser(pageable);
	}

	@PostMapping
	public PollDTO save(@RequestBody PollDTO poll) {
		return pollService.create(poll);
	}

	@PutMapping("/all")
	public List<PollDTO> updateMany(@RequestBody List<PollDTO> pollList) {
		return pollService.updateMany(pollList);
	}
}
