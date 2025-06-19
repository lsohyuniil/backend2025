import type { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

const PostForm: React.FC = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    alert("hihi~");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" required />
        </Form.Group>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" required />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name="content" />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default PostForm;
