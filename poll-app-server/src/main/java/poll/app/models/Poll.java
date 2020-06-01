package poll.app.models;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table (name = "polls")
public class Poll
{
        @Id
        @GeneratedValue (strategy = GenerationType.IDENTITY)
        private Long id;

        @OneToMany (fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        private List<Vote> votes;

        @Column (name = "title")
        private String title;
        
        @Column (name = "description")
        private String description;

        @Column (name = "multiple_answer")
        private boolean multipleAnswer;

        @Column (name = "post_date", columnDefinition = "TIMESTAMP NULL")
        private LocalDateTime postDate;

        @Column (name = "allow_same_ip")
        private boolean allowSameIp;

        @Column (name = "ips")
        @ElementCollection (targetClass = String.class)
        private Set<String> usersIps;

        @ManyToOne
        private User creator;

        @Column (name = "private")
        private boolean nonPublic;

        @Column (name = "code")
        private String code;
 
		public Poll() {
			super();
		}

		public Poll(List<Vote> votes, String title, String description, boolean multipleAnswer, LocalDateTime postDate,
				boolean allowSameIp, Set<String> usersIps, User creator, boolean nonPublic, String code) {
			super();
			this.votes = votes;
			this.title = title;
	        this.description = description;
			this.multipleAnswer = multipleAnswer;
			this.postDate = postDate;
			this.allowSameIp = allowSameIp;
			this.usersIps = usersIps;
			this.creator = creator;
			this.nonPublic = nonPublic;
			this.code = code;
		}



		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
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

		public Set<String> getUsersIps() {
			return usersIps;
		}

		public void setUsersIps(Set<String> usersIps) {
			this.usersIps = usersIps;
		}

		public User getCreator() {
			return creator;
		}

		public void setCreator(User creator) {
			this.creator = creator;
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
        
        

}
