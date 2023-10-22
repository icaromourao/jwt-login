CREATE OR REPLACE FUNCTION verify_password(
	password_p 	users.password%TYPE,
	username_p 	users.username%TYPE DEFAULT NULL,
	email_p 	users.email%TYPE DEFAULT NULL
)
RETURNS BOOLEAN 
LANGUAGE plpgsql

AS $$

DECLARE
	password_matched_v BOOLEAN;

BEGIN
	IF email_p IS NULL AND username_p IS NULL THEN
		RAISE EXCEPTION 'Username or email must be informed';
	ELSE
		SELECT count(user_id)
		INTO password_matched_v
		FROM users
		WHERE (email = email_p OR username = username_p) AND password = crypt(password_p, password);
	END IF;
	
	return password_matched_v;
END;
$$