CREATE OR REPLACE PROCEDURE register_user(
	email_p users.email%TYPE,
	name_p users.name%TYPE,
	username_p users.username%TYPE,
	password_p users.password%TYPE,
	display_name_p users.display_name%TYPE
)
LANGUAGE plpgsql
AS $$

DECLARE
	password_v users.password%TYPE;
	user_exists_v BOOLEAN;

BEGIN
	SELECT count(user_id)
	INTO user_exists_v
	FROM users
	WHERE username = username_p or email = email_p;

	IF user_exists_v THEN
		RAISE EXCEPTION 'User already exists ID';
	ELSE
		password_v := crypt(password_p, gen_salt('bf'));

		INSERT INTO users (email, "name", username, "password", display_name) VALUES (email_p, name_p, username_p, password_v, display_name_p);
	END IF;
END $$;