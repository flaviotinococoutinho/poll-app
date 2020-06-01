package poll.app.models;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table (name = "users")
public class User implements UserDetails
{
	private static final long serialVersionUID = 1L;

		@Id
        @GeneratedValue (strategy = GenerationType.AUTO)
        private Long id;

        @Column (name = "username")
        private String username;

        @Column (name = "password")
        private String password;

        @Column (name = "email")
        private String email;

        @Column (name = "expired")
        private boolean expired;

        @Column (name = "locked")
        private boolean locked;

        @Column (name = "credentials")
        private boolean credentials;

        @Column (name = "enabled")
        private boolean enabled;

        @ManyToMany (fetch = FetchType.EAGER)
        @JoinTable (name = "users_roles",
                joinColumns = @JoinColumn (name = "user_id"),
                inverseJoinColumns = @JoinColumn (name = "role_id"))
        private Set<UserRole> userRoles;
        
        public User() {
			super();
		}

		public User(String username, String password, String email, boolean expired, boolean locked,
				boolean credentials, boolean enabled, Set<UserRole> userRoles) {
			super();
			this.username = username;
			this.password = password;
			this.email = email;
			this.expired = expired;
			this.locked = locked;
			this.credentials = credentials;
			this.enabled = enabled;
			this.userRoles = userRoles;
		}

		@Override
        public Collection<? extends GrantedAuthority> getAuthorities ()
        {
                return userRoles.stream()
                        .map( e -> new SimpleGrantedAuthority( e.getUserType().name() ) )
                        .collect( Collectors.toSet() );
        }

        @Override
        public String getPassword ()
        {
                return password;
        }

        @Override
        public String getUsername ()
        {
                return username;
        }

        @Override
        public boolean isAccountNonExpired ()
        {
                return !expired;
        }

        @Override
        public boolean isAccountNonLocked ()
        {
                return !locked;
        }

        @Override
        public boolean isCredentialsNonExpired ()
        {
                return !credentials;
        }

        @Override
        public boolean isEnabled ()
        {
                return enabled;
        }

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public boolean isExpired() {
			return expired;
		}

		public void setExpired(boolean expired) {
			this.expired = expired;
		}

		public boolean isLocked() {
			return locked;
		}

		public void setLocked(boolean locked) {
			this.locked = locked;
		}

		public boolean isCredentials() {
			return credentials;
		}

		public void setCredentials(boolean credentials) {
			this.credentials = credentials;
		}

		public Set<UserRole> getUserRoles() {
			return userRoles;
		}

		public void setUserRoles(Set<UserRole> userRoles) {
			this.userRoles = userRoles;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public void setEnabled(boolean enabled) {
			this.enabled = enabled;
		}
        
}
