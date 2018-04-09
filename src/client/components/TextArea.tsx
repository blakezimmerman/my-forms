import styled from 'client/styling';
import TextareaAutosize from 'react-autosize-textarea';

const TextArea = styled(TextareaAutosize)`
  font-family: ${({theme}) => theme.fonts.body};
  font-size: 1.1rem;
  border: 1px solid rgba(0,0,0,0.2);
  width: 100%;
  resize: none;
`;

export default TextArea;
