package poll.app.models;

import javax.persistence.*;

@Entity
@Table (name = "user_roles")
public class UserRole
{
        @Id
        @GeneratedValue (strategy = GenerationType.IDENTITY)
        private Long ID;

        @Enumerated (EnumType.STRING)
        private UserType userType;

        public enum UserType
        {
                ROLE_ADMIN,
                ROLE_USER
        }

		public UserRole() {
			super();
		}

		public UserRole(Long iD, UserType userType) {
			super();
			ID = iD;
			this.userType = userType;
		}

		public Long getID() {
			return ID;
		}

		public void setID(Long iD) {
			ID = iD;
		}

		public UserType getUserType() {
			return userType;
		}

		public void setUserType(UserType userType) {
			this.userType = userType;
		}
        
}
