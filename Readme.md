# User Management Backend

This project is a backend application for managing users and their notes using TypeScript, Firebase Functions, Firebase Authentication, and Firestore. It provides APIs for user registration, editing, deletion, and note management.

---

## **Features**

- **User Management**
  - Register a new user and store their profile in Firestore.
  - Update user information.
  - Delete a user from Firebase Authentication and Firestore.
- **User Notes Management**
  - Save personal notes with a title, content, and timestamp.
  - Retrieve all notes for a user.

---

## **Setup and Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/webbedpiyush/intern-assignment.git
   cd intern-assignment

   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

- Go to the Firebase Console.
- Create a Firebase project.
- Enable Firestore and Firebase Authentication (Email/Password provider).
- Download the service account key JSON file and save it as firebase-service-account.json in the root folder.

4. Start the server:

```bash
npm run start
```

## **API Endpoints**

1. Register User

- Endpoint: POST /api/user/register
- Request body:

```json
{
  "email": "testuser@example.com",
  "password": "password123",
  "name": "Test User"
}
```

- Example CURL:

```bash
curl -X POST http://localhost:3000/api/user/register \
    -H "Content-Type: application/json" \
    -d '{
      "email": "testuser@example.com",
      "password": "password123",
      "name": "Test User"
    }'
```

- Response:

```json
{
  "message": "User registered successfully",
  "uid": "user-unique-id"
}
```

2. Edit User

- Endpoint: PUT /api/user/edit
- Request body:

```json
{
  "uid": "user-unique-id",
  "name": "Updated User",
  "email": "updateduser@example.com"
}
```

- Example CURL:

```bash
curl -X PUT http://localhost:3000/api/user/edit \
     -H "Content-Type: application/json" \
     -d '{
       "uid": "user-unique-id",
       "name": "Updated User",
       "email": "updateduser@example.com"
     }'
```

- Response:

```json
{
  "message": "User updated successfully"
}
```

3. Delete User

- Endpoint: DELETE /api/user/delete
- Request body:

```json
{
  "uid": "user-unique-id"
}
```

- Example CURL:

```bash
curl -X DELETE http://localhost:3000/api/user/delete \
     -H "Content-Type: application/json" \
     -d '{
       "uid": "user-unique-id"
     }'
```

- Response:

```json
{
  "message": "User deleted successfully"
}
```

4. Save Note

- Endpoint: POST /api/note/save
- Request body:

```json
{
  "uid": "user-unique-id",
  "title": "My First Note",
  "content": "This is the content of my first note."
}
```

- Example CURL:

```bash
curl -X POST http://localhost:3000/api/note/save \
     -H "Content-Type: application/json" \
     -d '{
       "uid": "user-unique-id",
       "title": "My First Note",
       "content": "This is the content of my first note."
     }'
```

- Response:

```json
{
  "message": "Note saved successfully"
}
```

5. Get Notes

- Endpoint: GET /api/note/get
- Query Parameter = uid : the unique user ID

- Example CURL:

```bash
curl -X GET "http://localhost:3000/api/note/get?uid=user-unique-id" \
     -H "Content-Type: application/json"
```

- Response:

```json
[
  {
    "id": "note-document-id-1",
    "uid": "user-unique-id",
    "title": "My First Note",
    "content": "This is the content of my first note.",
    "timestamp": "2024-11-17T10:00:00.000Z"
  },
  {
    "id": "note-document-id-2",
    "uid": "user-unique-id",
    "title": "My Second Note",
    "content": "This is another note.",
    "timestamp": "2024-11-18T12:30:00.000Z"
  }
]
```
