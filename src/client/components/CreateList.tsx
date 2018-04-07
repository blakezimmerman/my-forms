import * as React from 'react';
import * as styles from './createList.styles.scss';
import * as R from 'ramda';

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
      <div>
        <div className={styles.row}>
          <button
            className={styles.addButton}
            onClick={this.addToList}
            disabled={!this.validateAdd()}
          >
            <i className='material-icons'>add</i>
          </button>
          <input
            className={styles.listInput}
            type='text'
            value={this.state.input}
            onChange={this.updateState}
            onKeyPress={this.onKeyPress}
          />
        </div>
        <div>
          {this.props.list.map((item, index) =>
            <div key={item} className={styles.row}>
              <button
                className={styles.removeButton}
                onClick={this.removeFromList(index)}
              >
                <i className='material-icons'>remove</i>
              </button>
              {item}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateList;
