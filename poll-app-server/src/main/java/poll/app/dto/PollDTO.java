package poll.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import poll.app.models.Vote;

public class PollDTO {
	private List<Vote> votes;
	private String title;
	private String description;
	private boolean multipleAnswer;
	private LocalDateTime postDate;
	private boolean allowSameIp;
	private boolean nonPublic;
	private String code;

	public PollDTO() {
		super();
	}

	public PollDTO(List<Vote> votes, String title, String description, boolean multipleAnswer, LocalDateTime postDate, boolean allowSameIp,
			boolean nonPublic, String code) {
		super();
		this.votes = votes;
		this.title = title;
		this.description = description;
		this.multipleAnswer = multipleAnswer;
		this.postDate = postDate;
		this.allowSameIp = allowSameIp;
		this.nonPublic = nonPublic;
		this.code = code;
	}

	public List<Vote> getVotes() {
		return votes;
	}

	public void setVotes(List<Vote> votes) {
		this.votes = votes;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isMultipleAnswer() {
		return multipleAnswer;
	}

	public void setMultipleAnswer(boolean multipleAnswer) {
		this.multipleAnswer = multipleAnswer;
	}

	public LocalDateTime getPostDate() {
		return postDate;
	}

	public void setPostDate(LocalDateTime postDate) {
		this.postDate = postDate;
	}

	public boolean isAllowSameIp() {
		return allowSameIp;
	}

	public void setAllowSameIp(boolean allowSameIp) {
		this.allowSameIp = allowSameIp;
	}

	public boolean isNonPublic() {
		return nonPublic;
	}

	public void setNonPublic(boolean nonPublic) {
		this.nonPublic = nonPublic;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Override
	public String toString() {
		return "PollDTO [votes=" + votes + ", title=" + title + ", description=" + description + ", multipleAnswer="
				+ multipleAnswer + ", postDate=" + postDate + ", allowSameIp=" + allowSameIp + ", nonPublic="
				+ nonPublic + ", code=" + code + "]";
	}
	
	

}
