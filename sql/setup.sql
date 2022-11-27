-- Use this file to define your SQL tables.
-- The SQL in this file will be executed when you run `npm run setup-db`.

DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS teachers_students CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  type TEXT
);

INSERT INTO users (email, password_hash) VALUES
  ('db@test.com', 'fakeHash'),
  ('mo@salad.com', 'fakeHash'),
  ('cat@cat.com', 'catHash'),
  ('hsw@gmail.comm', 'hash'),
  ('beepboop@jlaurent.com', 'fakehash'),
  ('rh@dearrh.com', 'hash'),
  ('testuser@test.com', 'hash');

CREATE TABLE teachers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  bio TEXT,
  zip_code TEXT NOT NULL,
  city TEXT,
  state TEXT,
  phone_number TEXT,
  contact_email TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO teachers (user_id, subject, zip_code, first_name, last_name, image_url) VALUES
  (3, 'scratching', '97214', 'Arlop', 'Beans', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
  (4, 'Alexander Technique', '97214', 'Helen', 'Spencer-Wallace', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
  (5, 'ams', '97202', 'Jordan', 'Laurent', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
  (6, 'Alexander Technique', '48390', 'Rebecca', 'Harrison', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
  (1, 'p5.js', '97232', 'Dillon', 'Brock', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

CREATE TABLE subjects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  teacher_id BIGINT NOT NULL,
  subject TEXT NOT NULL,
  min_price TEXT NOT NULL,
  max_price TEXT NOT NULL,
  lesson_type TEXT NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE students (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  image_url TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO students (user_id, first_name, last_name, image_url) VALUES
  (1, 'Dillon', 'Brock', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'),
  (2, 'Mo', 'Saladino', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

CREATE TABLE teachers_students (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  teacher_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  connection_approved VARCHAR NOT NULL DEFAULT 'pending',
  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);

INSERT INTO teachers_students (teacher_id, student_id, connection_approved) VALUES
  (1, 1, 'approved'),
  (1, 2, 'rejected'),
  (2, 2, 'approved'),
  (3, 1, 'rejected'),
  (2, 1, 'approved');


CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  stars INT NOT NULL,
  detail VARCHAR,
  teacher_id BIGINT NOT NULL,
  student_id BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);

INSERT INTO reviews (stars, detail, teacher_id, student_id) VALUES
  (5, 'An absolutely incredible teacher!', 1, 1),
  (4, 'I came in as a total beginner and I definitely learned a lot! For the most part I thought Arlop was great, there were just a couple of times where it seemed like he might have a tough time explaining things to total beginners.', 1, 2);





