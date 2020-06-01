package poll.app.dto;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public class UserDTO
{
        private Long ID;

        @NotNull
        @NotBlank
        @Length (min = 4, max = 30)
        private String username;

        @NotNull
        @NotBlank
        @Length (min = 4)
        private String password;

        @NotNull
        @NotBlank
        @Length (min = 4)
        private String confirmPassword;

        @Email
        @NotNull
        @NotBlank
        private String email;

        private Boolean locked;

        @AssertTrue
        public boolean isPasswordEqual ()
        {
                return password.equals( confirmPassword );
        }

		public Long getID() {
			return ID;
		}

		public void setID(Long iD) {
			ID = iD;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getConfirmPassword() {
			return confirmPassword;
		}

		public void setConfirmPassword(String confirmPassword) {
			this.confirmPassword = confirmPassword;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public Boolean getLocked() {
			return locked;
		}

		public void setLocked(Boolean locked) {
			this.locked = locked;
		}
        
        
}
