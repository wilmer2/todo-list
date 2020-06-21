import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HomeTaskList from '../components/HomeTaskList';
import HomeTaskEmptyList from '../components/HomeTaskEmptyList';
import HomeTaskListItemContainer from '../container/HomeTaskListItemContainer';

describe('src/pages/Home/components/HomeTaskList', () => {
  let users;
  let tasks;

  beforeEach(() => {
    users = {
      usersList: {
        items: [
          {email: 'ronald@gmail.com', id: 'ckbhc821b007s07lifcj22hju', __typename: 'User'},
          {email: 'kelly@gmail.com', id: 'ckbiwqdpw004p08jwb8hsg413', __typename: 'User'}
        ]
      },
    };

    tasks = {
      tasksList: {
        items: [
          {
            id: 'ckbph8qts01m807jkge7j3qh8', 
            name: 'tarea', 
            completed: false, 
            __typename: 'Task',
            user: {
              email: 'wilmer.payall@gmail.com',
              id: 'ckbgxcr6j000507mh3c08aei0',
              __typename: 'User'
            },
          },
          {
            id: 'ckbphddu302p109l18q0rgi6y', 
            name: 'tarea 2', 
            completed: true, 
            __typename: 'Task',
            user: {
              email: 'eduardo.payall@gmail.com',
              id: 'ckbgxcr6j000507mh3c08aei0',
              __typename: 'User'
            },
          }
        ]
      },
    };
  });

  it('should render empty list', () => {
    const tasks = {
      tasksList: {
        items: [],
      },
    };

    const wrapper = shallow(<HomeTaskList 
      tasks={tasks}
      users={users}
    />);

    expect(wrapper.find(HomeTaskEmptyList)).to.be.present();
  });

  it('should render list', () => {
    const wrapper = shallow(<HomeTaskList 
      tasks={tasks}
      users={users}
    />);
    
    const Taskitems = tasks.tasksList.items;

    expect(wrapper.find(HomeTaskEmptyList)).not.to.be.present();
    expect(wrapper.find(HomeTaskListItemContainer).length).to.equals(2);

    wrapper.find(HomeTaskListItemContainer).forEach((container, index) => {
      expect(container.props().task.id).to.equals(Taskitems[index].id);
      expect(container.props().task.name).to.equals(Taskitems[index].name);
      expect(container.props().task.completed).to.equals(Taskitems[index].completed);
      expect(container.props().task.user.id).to.equals(Taskitems[index].user.id);
      expect(container.props().task.user.email).to.equals(Taskitems[index].user.email);
    });

  });
  
});