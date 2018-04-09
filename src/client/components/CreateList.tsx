import * as React from 'react';
import styled from 'client/styling';
import * as R from 'ramda';
import { Input } from './Inputs';
import { IconButton } from './Buttons';

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const AddButton = IconButton.extend`
  color: ${({theme}) => theme.colors.success};
`;

const RemoveButton = IconButton.extend`
  color: ${({theme}) => theme.colors.failure};
`;

interface Props {
  list: string[];
  onChange: (newList: string[]) => void;
}

interface LocalState {
  input: string;
}

class CreateList extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  updateState = (event: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({input: event.currentTarget.value})

  onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && this.validateAdd()) {
      this.addToList();
    }
  }

  validateAdd = () => !!this.state.input.length && !R.contains(this.state.input, this.props.list);

  addToList = () => {
    this.props.onChange(R.append(this.state.input, this.props.list));
    this.setState({input: ''});
  }

  removeFromList = (index: number) => () => this.props.onChange(R.remove(index, 1, this.props.list));

  render() {
    return (
      <>
        <Row>
          <AddButton
            onClick={this.addToList}
            disabled={!this.validateAdd()}
          >
            <i className='material-icons'>add</i>
          </AddButton>
          <Input
            type='text'
            value={this.state.input}
            onChange={this.updateState}
            onKeyPress={this.onKeyPress}
          />
        </Row>
        {this.props.list.map((item, index) =>
          <Row key={item}>
            <RemoveButton
              onClick={this.removeFromList(index)}
            >
              <i className='material-icons'>remove</i>
            </RemoveButton>
            {item}
          </Row>
        )}
      </>
    );
  }
}

export default CreateList;
