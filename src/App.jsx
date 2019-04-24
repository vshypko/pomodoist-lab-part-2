import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null
    };
  }

  addItem(description) {
    const {nextItemId} = this.state;
    const newItem = {
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      items: this.state.items.concat([newItem]),
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    let clearedItems = this.state.items.filter(item => item.isCompleted === false);
    this.setState({
      items: clearedItems
    });
  }

  increaseSessionsCompleted(itemId) {
    let newItems = [];

    this.state.items.forEach(function (item) {
      if (item.id === itemId) {
        item.sessionsCompleted++;
      }
      newItems.push(item);
    });

    this.setState({
      items: newItems
    });
  }

  toggleItemIsCompleted(itemId) {
    let newItems = [];

    this.state.items.forEach(function (item) {
      if (item.id === itemId) {
        item.isCompleted = !item.isCompleted;
      }
      newItems.push(item);
    });

    this.setState({
      items: newItems
    });
  }

  startSession(id) {
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id
    });
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning
    } = this.state;
    let areItemsMarkedAsCompleted = false;
    items.forEach(function (item) {
      if (item.isCompleted === true) {
        areItemsMarkedAsCompleted = true;
      }
    });
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted
            && <ClearButton onClick={this.clearCompletedItems}/>}
          </header>
          {sessionIsRunning
          && <Timer
            key={itemIdRunning}
            mode="WORK"
            onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
            autoPlays
          />}
          <div className="items-container">
            {items.map((item) => (
              <TodoItem key={item.id}
                        description={item.description}
                        sessionsCompleted={item.sessionsCompleted}
                        isCompleted={item.isCompleted}
                        startSession={() => this.startSession(item.id)}
                        toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
              />))
            }
          </div>
        </div>
        {items.length === 0
        && < EmptyState/>
        }
        <footer>
          <TodoInput addItem={this.addItem}/>
        </footer>
      </div>
    );
  }
}

export default App;
