import { BsTrash } from "react-icons/bs"
import styled from "styled-components";

export const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const CommentAuthor = styled.div`
  color: gray;
`;

export const CommentDeleteButton = styled(BsTrash)`
  &:hover {
    color: var(--quaternary);
  }
`;

